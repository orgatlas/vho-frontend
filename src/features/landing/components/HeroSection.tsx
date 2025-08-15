import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');

    const handleCreateVideo = () => {
        if (!url.trim() || !url.includes('.')) {
            toast.error("Please enter a valid property listing URL.");
            return;
        }
        navigate('/extracting-details', { state: { url } });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <Box
            sx={{
                width: '100%',
                py: { xs: 8, md: 12 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(45deg, #2a2d34 30%, #535766 90%)',
                color: 'white',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={itemVariants}>
                        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                            Intelligent Property Videos
                        </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Typography variant="h5" component="p" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
                            Turn your property listing into a stunning marketing video in seconds.
                        </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 1,
                                maxWidth: '600px',
                                mx: 'auto',
                                alignItems: 'stretch' // Ensure children stretch to the same height
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Paste your property listing URL here..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                sx={{
                                    flexGrow: 1,
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        height: '100%'
                                    },
                                }}
                            />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={handleCreateVideo}
                                    sx={{ px: 4, height: '100%', whiteSpace: 'nowrap' }}
                                >
                                    Create Video
                                </Button>
                            </motion.div>
                        </Box>
                    </motion.div>
                </motion.div>
            </Container>
        </Box>
    );
};