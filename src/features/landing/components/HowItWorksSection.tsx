import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import {Home, LocationOn, CameraIndoor} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {useTheme} from "@mui/material/styles";
import {SectionHeader} from "src/theme/components/SectionHeader";

const steps = [
    {
        icon: <LocationOn sx={{ fontSize: 48 }} color="primary" />,
        title: '1. Provide Address',
        description: 'Simply enter the property address to get started.',
    },
    {
        icon: <Home sx={{ fontSize: 48 }} color="primary" />,
        title: '2. Confirm Details',
        description: 'Validate the property information and upload photos.',
    },
    {
        icon: <CameraIndoor sx={{ fontSize: 48 }} color="primary" />,
        title: '3. Generate Video',
        description: 'Your professional video will be created within minutes!',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const HowItWorksSection: React.FC = () => {
    const theme = useTheme();
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: theme.palette.primary.main }} id={'howitworks'}>
            <Container maxWidth="lg">
                <SectionHeader
                    title="How It Works"
                    subtitle="A seamless three-step process from listing to video."
                    color={"text.secondary"}
                />
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {steps.map((step, index) => (
                            <Grid item key={index} xs={12} md={4}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 4,
                                            textAlign: 'center',
                                            height: '100%',
                                            borderRadius: '12px',
                                            bgcolor: 'background.default',
                                            borderColor: 'grey.300'
                                        }}
                                    >
                                        <Box sx={{ mb: 2, color: theme.palette.primary.main }}>{step.icon}</Box>
                                        <Typography variant="h6" component="h3" fontWeight="bold" color="text.primary" gutterBottom>
                                            {step.title}
                                        </Typography>
                                        <Typography color="text.primary">
                                            {step.description}
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};