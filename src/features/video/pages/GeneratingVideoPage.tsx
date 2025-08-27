import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, CircularProgress, Container, Paper, TextField, Typography} from '@mui/material';
import {
    createVideo,
    getVideoDetails,
} from 'src/services/api';
import {toast} from "react-toastify";

export const GeneratingVideoPage: React.FC = () => {
    const navigate = useNavigate();
    const {videoId} = useParams<{ videoId: string }>();

    useEffect(() => {
        if (!videoId) return;

        let cancelled = false;

        const init = async () => {
            try {
                const video = await getVideoDetails(videoId);

                if (!video.package) {
                    navigate('/checkout', {state: {videoId: video.id}});
                    return;
                }

                if (video.locked) {
                    navigate('/video-generated');
                    return;
                }


                const pollCreateVideo = async () => {
                    while (!cancelled) {
                        try {
                            const response = await createVideo(videoId);
                            console.log(response.message);

                            if (response.success) {
                                console.log(`Video successfully submitted: ${videoId}`);
                                navigate('/video-generated');
                                return; // stop loop
                            } else {
                                console.log('Payment not yet received, retrying...');
                            }
                        } catch (error) {
                            toast.error('Error during video creation');
                            console.error('Error during video creation:', error);
                        }

                        // Wait 2 seconds before trying again
                        await new Promise(res => setTimeout(res, 2000));
                    }
                };

                pollCreateVideo();
            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        };

        init();

        return () => {
            cancelled = true;
        };

    }, [videoId, navigate]);


    return (
        <Container maxWidth="md">
            <Box sx={{my: 8, textAlign: 'center'}}>
                <CircularProgress size={60} sx={{mb: 3}}/>
                <Typography variant="h4" component="h1" gutterBottom>
                    Submitting your video
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{mb: 6}}>
                    Please wait, do not close this page
                </Typography>
            </Box>
        </Container>
    );
};
