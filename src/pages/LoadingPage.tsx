import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { extractPropertyDetails } from 'src/services/api';

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

export const LoadingPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { url } = location.state as { url: string };
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    useEffect(() => {
        const phraseInterval = setInterval(() => {
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length);
        }, 3000);

        const fetchData = async () => {
            try {
                const propertyDetails = await extractPropertyDetails(url);
                navigate('/property-details', { state: { propertyDetails } });
            } catch (error) {
                console.error("Error extracting property details:", error);
                // Optionally navigate back or show an error toast
                navigate('/', { state: { error: "Failed to load property details." } });
            }
        };

        fetchData();

        return () => clearInterval(phraseInterval);
    }, [url, navigate]);

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 8, textAlign: 'center' }}>
                <CircularProgress size={60} sx={{ mb: 3 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                    Loading Property Details...
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ mb: 6 }}>
                    {loadingPhrases[currentPhraseIndex]}
                </Typography>
            </Box>
        </Container>
    );
};