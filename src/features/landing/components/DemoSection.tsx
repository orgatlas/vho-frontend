import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Container, Grid, Paper, MobileStepper, Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import img1 from 'src/assets/images/demo/1.jpg';
import img2 from 'src/assets/images/demo/2.jpg';
import img3 from 'src/assets/images/demo/3.jpg';
import img4 from 'src/assets/images/demo/4.jpg';
import img5 from 'src/assets/images/demo/5.jpg';
import img6 from 'src/assets/images/demo/6.jpg';
import video from 'src/assets/images/demo/video.mp4';

const images = [
    {
        label: 'Exterior',
        imgPath: img1,
    },
    {
        label: 'Kitchen',
        imgPath: img2,
    },
    {
        label: 'Living Room',
        imgPath: img3,
    },
    {
        label: 'Living Room',
        imgPath: img4,
    },
    {
        label: 'Living Room',
        imgPath: img5,
    },
    {
        label: 'Living Room',
        imgPath: img6,
    },

];

const VideoPlayer = ({ inView }: { inView: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (inView) {
                videoRef.current.play().catch(error => console.error("Video play failed:", error));
            } else {
                videoRef.current.pause();
            }
        }
    }, [inView]);

    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'black', borderRadius: 2, overflow: 'hidden' }}>
            <video
                ref={videoRef}
                src={video}
                width="100%"
                height="100%"
                controls
                loop
                playsInline
                style={{ objectFit: 'cover' }}
            />
        </Box>
    );
};

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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <Box sx={{ py: { xs: 6, md: 10 } }} ref={ref}>
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
                                <Paper elevation={4} sx={{ height: 450, borderRadius: 2 }}><VideoPlayer inView={isInView} /></Paper>
                            </motion.div>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
