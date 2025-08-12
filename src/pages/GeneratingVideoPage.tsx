import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, CircularProgress, Container, Paper, TextField, Typography} from '@mui/material';
import {
    createVideo,
    extractPropertyDetails,
    getMusicTracks,
    getPackages,
    getVideoDetails,
    getVoiceTracks
} from 'src/services/api';
import {PropertyDetails} from "src/types";
import {useTheme} from "@mui/material/styles";

export const GeneratingVideoPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme()
    const location = useLocation();
    const {videoId, images, voice, music, logo, logoPlacement, agents} = location.state as {
        videoId: string,
        images: File[],
        voice: string,
        music: string,
        logo: File | null,
        logoPlacement: string,
        agents: Agent[]
    };
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(true);

    useEffect(() => {
        if (!videoId) return;

        const fetchAndCreateVideo = async () => {
            try {
                const video = await getVideoDetails(videoId);

                if (video.package) {
                    if (video.locked) {
                        navigate('/video-generated');
                        return;
                    }

                    try {
                        const data = await createVideo(videoId);
                        console.log(`Video created with ID: ${data.videoId}`);
                        setIsSubmitting(false);
                    } catch (error) {
                        console.error('Error creating video:', error);
                    }

                } else {
                    navigate('/checkout', { state: { videoId: video.id } });
                }
            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        };

        fetchAndCreateVideo();
    }, [videoId]);

    const handleUrlSubmit = async () => {
        setLoading(true);
        try {
            const newPropertyDetails = await extractPropertyDetails(url);
            navigate('/property-details', {state: {propertyDetails: newPropertyDetails}});
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{my: 8, textAlign: 'center'}}>
                {isSubmitting ? (
                    <>
                        <CircularProgress size={60} sx={{mb: 3}}/>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Submitting your video
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{mb: 6}}>
                            Please wait, do not close this page
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Your video is being created!
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{mb: 6}}>
                            It is safe to leave this page. You will receive an email when your video is ready.
                        </Typography>
                    </>
                )}

                {!isSubmitting && (
                    <Paper sx={{p: 4, mt: 6}} elevation={3}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Ready for Your Next Video?
                        </Typography>
                        <Typography color="text.secondary" sx={{mb: 3}}>
                            Enter another property URL to start a new project.
                        </Typography>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                fullWidth
                                placeholder="Enter property URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                sx={{mr: 2, background: theme.palette.background.default}}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUrlSubmit}
                                size="large"
                                disabled={loading}
                                sx={{
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                    minWidth: 120,
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit"/> : 'Get Started'}
                            </Button>
                        </Box>
                    </Paper>
                )}
            </Box>
        </Container>
    );
};
