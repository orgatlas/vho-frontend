import React from 'react';
import { Box, Container, Grid, useTheme, Typography } from '@mui/material';
import { motion } from "framer-motion";
import TestimonialCard from './TestimonialCard';

const testimonials = [
    {
        quote: "VirtualHomeOpen has completely changed the way I market my listings. What used to take me hours now takes minutes, and my sellers love the professional videos.",
        name: "Sarah Mitchell",
        role: "Licensed Agent",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    },
    {
        quote: "I started offering VirtualHomeOpen videos as an add-on to my photography packages, and it’s been a great upsell. It makes me look like I have a full video production team.",
        name: "David Chen",
        role: "RE Photographer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
        quote: "I decided to sell my home myself and was worried about standing out online. Virtual Home Open made it easy. Buyers took my listing more seriously.",
        name: "Emily Johnson",
        role: "Homeowner",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
    },
];

export const Testimonials: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                bgcolor: theme.palette.background.default,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Elements */}
            <Box
                component={motion.div}
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                sx={{
                    position: 'absolute',
                    bottom: -100,
                    left: -100,
                    width: { xs: 300, md: 500 },
                    height: { xs: 300, md: 500 },
                    borderRadius: '40%',
                    background: `linear-gradient(135deg, ${theme.palette.secondary.light}20 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />
            <Box
                component={motion.div}
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                sx={{
                    position: 'absolute',
                    top: 50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.text.primary,
                                mb: 2,
                                fontSize: { xs: '2rem', md: '3rem' }
                            }}
                        >
                            <Box component="span" sx={{ color: theme.palette.error.main }}>Loved</Box> by Agents & Owners.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.primary,
                                opacity: 0.7,
                                fontSize: { xs: '1rem', md: '1.2rem' },
                                maxWidth: '600px',
                                mx: 'auto'
                            }}
                        >
                            Don't just take our word for it. See how VirtualHomeOpen is transforming real estate marketing for everyone.
                        </Typography>
                    </motion.div>
                </Box>

                {/* Grid */}
                <Grid container spacing={4} justifyContent="center">
                    {testimonials.map((testimonial, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                style={{ height: '100%' }}
                            >
                                <TestimonialCard data={testimonial} />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
