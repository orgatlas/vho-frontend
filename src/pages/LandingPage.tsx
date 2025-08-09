
import React, {useState} from 'react';
import {Box, Button, Container, Grid, TextField, Typography, CircularProgress} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {extractPropertyDetails} from 'src/services/api';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUrlSubmit = async () => {
        setLoading(true);
        try {
            navigate('/loading', { state: { url } });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{my: 4}}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Create stunning property videos in minutes.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Enter property listing URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUrlSubmit}
                        disabled={loading}
                        sx={{
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            minWidth: 120,
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Started'}
                    </Button>
                </Box>
            </Box>

            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h2" gutterBottom>
                    How it works
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">1. Enter a property URL</Typography>
                        <Typography>We extract the property details and images for you.</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">2. Customize your video</Typography>
                        <Typography>Add your branding, choose music, and select a voiceover.</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">3. Generate your video</Typography>
                        <Typography>Our AI-powered video generator will create a stunning video in minutes.</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Frequently Asked Questions
                </Typography>
                <Typography variant="h6">What is Clover?</Typography>
                <Typography>Clover is a video generation platform for real estate agents. We make it easy to create stunning property videos in minutes.</Typography>
                <Typography variant="h6">How much does it cost?</Typography>
                <Typography>We have a range of pricing options to suit your needs. See our pricing page for more details.</Typography>
                <Typography variant="h6">Can I use my own branding?</Typography>
                <Typography>Yes, you can add your own logo and branding to your videos.</Typography>
            </Box>
        </Container>
    );
};
