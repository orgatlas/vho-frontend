import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { extractVideoDetailsFromAddress } from 'src/services/api';
import { toast } from 'react-toastify';

const loadingPhrases = [
    "Looking up your listing...",
    "Laying the foundation...",
    "Measuring every square foot...",
    "Finding the keys...",
    "Polishing your virtual tour...",
    "Finalizing property details...",
    "Staging your perfect viewing...",
    "Highlighting every feature...",
    "Preparing your grand property reveal..."
];

export const ExtractingDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState<string | null>(null);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    useEffect(() => {
        const address = location.state?.address;
        if (!address) {
            toast.error("No address provided.");
            navigate('/');
            return;
        }

        const phraseInterval = setInterval(() => {
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length);
        }, 3000);

        const extract = async () => {
            try {
                const videoDetails = await extractVideoDetailsFromAddress(address);
                navigate(`/property-details/${videoDetails.id}`, { state: { video: videoDetails } });
            } catch (err) {
                console.error("Failed to get property details", err);
                setError("Something went wrong with that address. Please try again.");
            }
        };

        extract();

        return () => clearInterval(phraseInterval);
    }, [location.state, navigate]);

    return (
        <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <Box sx={{ textAlign: 'center' }}>
                {error ? (
                    <>
                        <Typography variant="h5" component="h1" color="error" gutterBottom>
                            Something went wrong :(
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                            {error}
                        </Typography>
                        <Button variant="contained" onClick={() => navigate('/')}>
                            Go Back Home
                        </Button>
                    </>
                ) : (
                    <>
                        <CircularProgress size={60} sx={{ mb: 3 }} />
                        <Typography variant="body1" gutterBottom>
                            {loadingPhrases[currentPhraseIndex]}
                        </Typography>
                    </>
                )}
            </Box>
        </Container>
    );
};