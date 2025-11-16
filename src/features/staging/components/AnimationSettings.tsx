import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControlLabel, Switch, CircularProgress } from '@mui/material';
import { Scene } from 'src/types';
import { updateSceneAnimation } from 'src/services/api';
import { toast } from 'react-toastify';

interface AnimationSettingsProps {
    scene: Scene;
}

export const AnimationSettings: React.FC<AnimationSettingsProps> = ({ scene }) => {
    const [animate, setAnimate] = useState(scene.animate || false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setAnimate(scene.animate || false);
    }, [scene]);

    const handleToggleAnimation = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const shouldAnimate = event.target.checked;
        setAnimate(shouldAnimate);
        setIsSaving(true);
        try {
            await updateSceneAnimation(scene.id, shouldAnimate);
            toast.success(`Animation turned ${shouldAnimate ? 'ON' : 'OFF'}.`);
        } catch (error) {
            // Revert on failure
            setAnimate(!shouldAnimate);
            console.error("Failed to update animation", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{ pt: 4 }}>
            <Typography variant="h6" gutterBottom>Animation Settings</Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={animate}
                        onChange={handleToggleAnimation}
                        disabled={isSaving}
                    />
                }
                label={animate ? "Animation is ON" : "Animation is OFF"}
            />
            {isSaving && <CircularProgress size={20} sx={{ ml: 2 }} />}
        </Box>
    );
};