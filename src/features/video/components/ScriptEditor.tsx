import React, {useState, useEffect} from 'react';
import {Box, Typography, TextField} from '@mui/material';
import {Scene} from 'src/types';
import {updateSceneOrder, updateSceneScript} from 'src/services/api';
import {toast} from 'react-toastify';
import {useDebounce} from 'src/hooks/useDebounce';
import {alpha, useTheme} from "@mui/material/styles";

interface ScriptEditorProps {
    scene: Scene;
}

export const ScriptEditor: React.FC<ScriptEditorProps> = ({scene}) => {
    const [script, setScript] = useState(scene.audio.script || '');
    const [status, setStatus] = useState<'Script' | 'Saving' | 'Saved'>('Script');
    const debouncedScript = useDebounce(script, 1000);
    const theme = useTheme();

    useEffect(() => {
        setScript(scene.audio.script || '');
    }, [scene]);

    useEffect(() => {
        const handleSave = async () => {
            setStatus('Saving');
            try {
                await updateSceneScript(scene.id, debouncedScript);
                setStatus('Saved');
            } catch (error) {
                console.error("Failed to update script", error);
                setStatus('Script'); // Revert to script on error
            }
        };

        if (debouncedScript && debouncedScript !== scene.audio.script) {
            handleSave();
        }
    }, [debouncedScript, scene.id, scene.audio.script]);

    useEffect(() => {
        if (status === 'Saved') {
            const timer = setTimeout(() => setStatus('Saved'), 2000);
            return () => clearTimeout(timer);
        }
    }, [status]);


    return (
        <Box sx={{pt: 4}}>
            <TextField
                fullWidth
                multiline
                rows={10}
                value={script}
                onChange={(e) => setScript(e.target.value)}
                variant="outlined"
                sx={{
                    mb: 2,
                    background: alpha(theme.palette.secondary.main, 0.1),
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',   // removes the outline border
                        },
                        '&:hover fieldset': {
                            border: 'none',   // prevents border on hover
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',   // prevents border on focus
                        },
                    },
                }}
            />
            <Typography variant="body1" sx={{textAlign: 'right', width: '100%', pr: 4}} gutterBottom>
                {status === 'Saving' ? 'Saving...' : status === 'Saved' ? 'Saved' : 'Saved'}
            </Typography>
        </Box>
    );
};