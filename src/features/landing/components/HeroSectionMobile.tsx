import React from 'react';
import { Box, Typography, Container, Stack, Paper } from '@mui/material';
import { motion } from 'framer-motion';

export const HeroSectionMobile: React.FC = () => {
    const textContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const textItem = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            {/* Hero Callout */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
                <motion.div initial="hidden" animate="visible" variants={textContainer}>
                    <motion.div variants={textItem}>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '4.5rem' },
                                fontWeight: 800,
                                mt:'50px',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Bring Properties <br />
                            <Box component="span" sx={{ color: 'primary.main' }}>
                                To Life
                            </Box>
                        </Typography>
                    </motion.div>

                    <motion.div variants={textItem}>
                        <Typography
                            variant="h6"
                            sx={{
                                mt: 3,
                                maxWidth: '700px',
                                mx: 'auto',
                                color: 'text.primary',
                                fontWeight: 400,
                            }}
                        >
                            Create beautiful property video tours within minutes from your listing images.
                        </Typography>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Video Section */}
            <Container maxWidth="md" sx={{ pb: { xs: 8, md: 12 } }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: 6,
                        }}
                    >
                        <Box
                            component="video"
                            src="https://virtualhomeopen.sgp1.cdn.digitaloceanspaces.com/static/homepage/hero/hero.mp4"
                            autoPlay
                            muted
                            loop
                            preload="auto"
                            controls
                            sx={{
                                width: '100%',
                                height: '100%',
                                aspectRatio: '16/9',
                                objectFit: 'cover',
                            }}
                        />
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};