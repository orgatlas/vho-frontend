import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Container, Grid, Paper, MobileStepper, Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { motion } from 'framer-motion';

const images = [
    {
        label: 'Living Room',
        imgPath: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    },
    {
        label: 'Kitchen',
        imgPath: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    },
    {
        label: 'Exterior',
        imgPath: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    },
];

const VideoPlayer = () => (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'black', borderRadius: 2, overflow: 'hidden' }}>
        <video
            src="https://videos.pexels.com/video-files/2099239/2099239-hd_1280_720_25fps.mp4"
            width="100%"
            height="100%"
            controls
            muted
            loop
            autoPlay
            style={{ objectFit: 'cover' }}
        />
    </Box>
);

const ImageCarousel = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
    };

    return (
        <Box sx={{ flexGrow: 1, borderRadius: 2, overflow: 'hidden' }}>
            <Box
                component="img"
                sx={{
                    height: 398, // Adjusted height to match video player better
                    display: 'block',
                    width: '100%',
                    objectFit: 'cover',
                }}
                src={images[activeStep].imgPath}
                alt={images[activeStep].label}
            />
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </Box>
    );
};

export const DemoSection: React.FC = () => {
    return (
        <Box sx={{ py: { xs: 6, md: 10 } }}>
            <Container maxWidth="lg">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
                    <Typography variant="h3" component="h2" textAlign="center" fontWeight="bold" gutterBottom>
                        From Static to Dynamic
                    </Typography>
                </motion.div>
                <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                            <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>Before</Typography>
                            <motion.div whileHover={{ y: -5 }}>
                                <Paper elevation={4} sx={{ borderRadius: 2 }}><ImageCarousel /></Paper>
                            </motion.div>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                            <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>After</Typography>
                            <motion.div whileHover={{ y: -5 }}>
                                <Paper elevation={4} sx={{ height: 450, borderRadius: 2 }}><VideoPlayer /></Paper>
                            </motion.div>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};