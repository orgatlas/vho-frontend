import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Paper, Button, Stack } from '@mui/material';
import { Edit, Share, Download } from '@mui/icons-material';
import { getVideoDetails } from 'src/services/api';
import { Video } from 'src/types';
import { toast } from 'react-toastify';
import { useAuth } from 'src/contexts/AuthContext';

export const VideoViewPage: React.FC = () => {
    const { videoId } = useParams<{ videoId: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [video, setVideo] = useState<Video | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (!videoId) {
            toast.error("Video ID not found.");
            navigate('/');
            return;
        }

        const fetchVideo = async () => {
            setIsLoading(true);
            try {
                const videoData = await getVideoDetails(videoId);
                setVideo(videoData);
            } catch (error) {
                toast.error("Failed to load video.");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideo();
    }, [videoId, navigate]);

    const handleEdit = () => {
        if (isAuthenticated) {
            navigate(`/video/${videoId}/edit`);
        } else {
            navigate('/login');
        }
    };

    const handleShare = () => {
        if (!video?.file) return;
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    };

    const handleDownload = async () => {
        if (!video?.file) return;
        setIsDownloading(true);
        try {
            const response = await fetch(video.file);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', video.title || 'video.mp4');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed", error);
            toast.error("Failed to download video.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
    }

    if (!video) {
        return <Typography sx={{textAlign: 'center', my: 4}}>Video not found.</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper elevation={3}>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                    <video
                        src={video.file}
                        controls
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'black'
                        }}
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h5" component="h1" gutterBottom>{video.title || 'Video'}</Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <Button variant="contained" startIcon={<Share />} onClick={handleShare} disabled={isDownloading}>
                            Share
                        </Button>
                        <Button variant="contained" startIcon={isDownloading ? <CircularProgress size={20} /> : <Download />} onClick={handleDownload} disabled={isDownloading}>
                            {isDownloading ? 'Downloading...' : 'Download'}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};
