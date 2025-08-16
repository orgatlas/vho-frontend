import React from 'react';
import { Paper, Typography, Button, CircularProgress } from '@mui/material';
import { Video } from 'src/types';

interface VideoEditorHeaderProps {
    video: Video | null;
    onSave: () => void;
    isSaving: boolean;
}

export const VideoEditorHeader: React.FC<VideoEditorHeaderProps> = ({ video, onSave, isSaving }) => {
    return (
        <Paper sx={{ p: 2, borderRadius:0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h1">
                {video?.property.address || 'Video Editor'}
            </Typography>
            <Button variant="contained" color="primary" onClick={onSave} disabled={isSaving}>
                {isSaving ? <CircularProgress size={24} /> : 'Save & Generate'}
            </Button>
        </Paper>
    );
};
