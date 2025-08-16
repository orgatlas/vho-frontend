import React, {useState, useEffect} from 'react';
import {Box, Typography, TextField} from '@mui/material';
import {Scene} from 'src/types';
import {updateScene} from 'src/services/api';
import {toast} from 'react-toastify';
import {useDebounce} from 'src/hooks/useDebounce';

interface ScriptEditorProps {
    scene: Scene;
}

export const ScriptEditor: React.FC<ScriptEditorProps> = ({scene}) => {
    const [script, setScript] = useState(scene.audio.script || '');
    const [status, setStatus] = useState<'Script' | 'Saving' | 'Saved'>('Script');
    const debouncedScript = useDebounce(script, 1000);

    useEffect(() => {
        setScript(scene.audio.script || '');
    }, [scene]);

    useEffect(() => {
        const handleSave = async () => {
            setStatus('Saving');
            try {
                await updateScene(scene.id, {script: debouncedScript});
                toast.success("Script saved and audio regenerated.");
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
                sx={{mb: 2}}
            />
            <Typography variant="body1" sx={{textAlign: 'right', width: '100%', pr: 4}} gutterBottom>
                {status === 'Saving' ? 'Saving...' : status === 'Saved' ? 'Saved' : 'Saved'}
            </Typography>
        </Box>
    );
};