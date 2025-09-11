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
import {SectionHeader} from "src/theme/components/SectionHeader";

const images = [
    { label: 'Exterior', imgPath: img1 },
    { label: 'Kitchen', imgPath: img2 },
    { label: 'Living Room', imgPath: img3 },
    { label: 'Bedroom', imgPath: img4 },
    { label: 'Bathroom', imgPath: img5 },
    { label: 'Garden', imgPath: img6 },
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
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'black', borderRadius: '12px', overflow: 'hidden' }}>
            <video
                ref={videoRef}
                src={'https://virtualhomeopen.sgp1.cdn.digitaloceanspaces.com/static/demo.mp4'}
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
        <Box sx={{ flexGrow: 1, borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            <Box
                component="img"
                sx={{
                    height: 450,
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
                sx={{ bgcolor: 'transparent', borderTop: `1px solid ${theme.palette.divider}` }}
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
        <Box sx={{ py: { xs: 8, md: 12 } }} ref={ref}>
            <Container maxWidth="lg">
                <SectionHeader
                    title="From Static to Dynamic"
                    subtitle="See how we transform your property photos into a captivating video tour."
                />
                <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                            <Typography variant="h5" textAlign="center" sx={{ mb: 2, fontWeight: 'bold' }}>Before</Typography>
                            <Paper elevation={0} variant={'outlined'} sx={{ borderRadius: '12px' }}><ImageCarousel /></Paper>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                            <Typography variant="h5" textAlign="center" sx={{ mb: 2, fontWeight: 'bold' }}>After</Typography>
                            <Paper elevation={4} sx={{ height: 500, borderRadius: '12px', boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }}><VideoPlayer inView={isInView} /></Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
