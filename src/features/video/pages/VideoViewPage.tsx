import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Paper, Button, Stack } from '@mui/material';
import { Edit, Share, Download } from '@mui/icons-material';
import { getVideoDetails } from 'src/services/api';
import { Video } from 'src/types';
import { toast } from 'react-toastify';

export const VideoViewPage: React.FC = () => {
    const { videoId } = useParams<{ videoId: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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

    const handleShare = () => {
        if (!video?.video_url) return;
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    };

    const handleDownload = () => {
        if (!video?.video_url) return;
        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = video.video_url;
        link.setAttribute('download', video.title || 'video.mp4');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                        src={video.video_url}
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
                            onClick={() => navigate(`/video/${videoId}/edit`)}
                        >
                            Edit
                        </Button>
                        <Button variant="outlined" startIcon={<Share />} onClick={handleShare}>
                            Share
                        </Button>
                        <Button variant="outlined" startIcon={<Download />} onClick={handleDownload}>
                            Download
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};
