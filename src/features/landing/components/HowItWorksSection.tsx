import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { Link, FindInPage, MovieCreation } from '@mui/icons-material';
import { motion } from 'framer-motion';

const steps = [
    {
        icon: <Link sx={{ fontSize: 48 }} color="primary" />,
        title: '1. Paste Your Property Link',
        description: 'Enter your listing URL from your real estate site to get started.',
    },
    {
        icon: <FindInPage sx={{ fontSize: 48 }} color="primary" />,
        title: '2. We Extract the Details',
        description: 'Our system automatically pulls property photos, descriptions, and key details.',
    },
    {
        icon: <MovieCreation sx={{ fontSize: 48 }} color="primary" />,
        title: '3. Get Your Video',
        description: 'Download, share, or edit your professional video instantly.',
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
    return (
        <Box sx={{ py: { xs: 6, md: 10 } }}>
            <Container maxWidth="lg">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={itemVariants}>
                    <Typography variant="h3" component="h2" textAlign="center" fontWeight="bold" gutterBottom>
                        How It Works
                    </Typography>
                    <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
                        A seamless process from listing to video.
                    </Typography>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
                    <Grid container spacing={4}>
                        {steps.map((step, index) => (
                            <Grid item key={index} xs={12} md={4}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <motion.div whileHover={{ scale: 1.05, y: -5 }} style={{ height: '100%' }}>
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                p: 4,
                                                textAlign: 'center',
                                                height: '100%',
                                                borderColor: 'grey.300'
                                            }}
                                        >
                                            <Box sx={{ mb: 2 }}>{step.icon}</Box>
                                            <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                                                {step.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {step.description}
                                            </Typography>
                                        </Paper>
                                    </motion.div>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};