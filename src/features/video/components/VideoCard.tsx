import React from 'react';
import {Card, Typography, Box, CardContent, CardMedia, useTheme} from '@mui/material';
import { Video } from 'src/types';
import {VideocamOutlined} from "@mui/icons-material";

interface VideoCardProps {
    video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const theme = useTheme();

    return (
        <Card sx={{
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[4],
            },
            borderRadius: '10px',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: 'none'
        }}>
            <CardMedia
                sx={{
                    height: 180,
                    backgroundColor: theme.palette.secondary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.secondary.main
                }}
            >
                <VideocamOutlined sx={{fontSize: 60}}/>
            </CardMedia>
            <CardContent>
                <Typography variant="h6" component="div" noWrap>
                    {video.title || 'Video Title'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Created: {new Date(video.created).toLocaleDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
};