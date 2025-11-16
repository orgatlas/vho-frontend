import React from 'react';
import {Paper, Typography, Button, CircularProgress, Box, IconButton} from '@mui/material';
import { Video } from 'src/types';
import {ArrowBack} from "@mui/icons-material";

interface VideoEditorHeaderProps {
    video: Video | null;
    onSave: () => void;
    isSaving: boolean;
    onBack: () => void;
}

export const VideoEditorHeader: React.FC<VideoEditorHeaderProps> = ({ video, onSave, isSaving, onBack }) => {
    return (
        <Paper sx={{ p: 2, borderRadius:0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={onBack} sx={{ mr: 2 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" component="h1">
                    {video?.property.address || 'Video Editor'}
                </Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={onSave} disabled={isSaving}>
                {isSaving ? <CircularProgress size={24} /> : 'Save'}
            </Button>
        </Paper>
    );
};
