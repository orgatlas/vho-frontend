import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Video } from 'src/types';

interface VideoCardProps {
    video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">{video.title || 'Video Title'}</Typography>
            <Typography>Created: {new Date(video.created_at).toLocaleDateString()}</Typography>
        </Paper>
    );
};