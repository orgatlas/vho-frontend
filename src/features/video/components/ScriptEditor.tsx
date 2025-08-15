import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { Scene } from 'src/types';
import { updateScene } from 'src/services/api';
import { toast } from 'react-toastify';

interface ScriptEditorProps {
    scene: Scene;
}

export const ScriptEditor: React.FC<ScriptEditorProps> = ({ scene }) => {
    const [script, setScript] = useState(scene.script || '');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setScript(scene.script || '');
    }, [scene]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateScene(scene.id, { script });
            toast.success("Script saved and audio regenerated.");
        } catch (error) {
            console.error("Failed to update script", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{ pt: 4 }}>
            <Typography variant="h6" gutterBottom>Edit Script</Typography>
            <TextField
                fullWidth
                multiline
                rows={10}
                value={script}
                onChange={(e) => setScript(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleSave}
                disabled={isSaving || script === scene.script}
            >
                {isSaving ? <CircularProgress size={24} /> : 'Save Script'}
            </Button>
        </Box>
    );
};