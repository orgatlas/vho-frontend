
import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, TextField, Typography, CircularProgress} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">What is Clover?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Clover is an AI-powered video generation platform designed specifically for real estate agents. We automate the creation of stunning, professional-quality property videos, helping you market your listings more effectively and save valuable time.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How does it work?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            It's simple! Just paste the URL of your property listing into our platform. Our AI will automatically extract all the necessary details, including photos, property features, and descriptions. You can then customize the video with your branding, choose from a library of music, and select a voiceover. Finally, generate your video in minutes.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">What property listing websites do you support?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We support most major property listing platforms. If you're unsure about a specific website, feel free to try it out or contact our support team for assistance. We are continuously expanding our compatibility.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How much does it cost?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We offer a variety of pricing plans to suit different needs, from individual agents to large brokerages. For detailed information, please visit our pricing page.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Can I customize the videos with my own branding?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Absolutely! Our premium plans allow you to add your own logo, brand colors, and contact information to your videos, ensuring a consistent and professional look for your brand.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
};
