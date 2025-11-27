import React from 'react';
import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AddressAutocomplete from './AddressAutocomplete';

export const CallToAction = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleAddressSelect = (address: string) => {
        navigate('/extracting-details', { state: { address } });
    };

    return (
        <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.paper', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative Background */}
            <Box
                component={motion.div}
                animate={{
                    rotate: [0, 360],
                }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                sx={{
                    position: 'absolute',
                    top: -200,
                    left: -200,
                    width: 800,
                    height: 800,
                    background: `conic-gradient(from 0deg, ${alpha(theme.palette.primary.main, 0.1)}, transparent, transparent, ${alpha(theme.palette.secondary.main, 0.1)}, transparent)`,
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.text.secondary,
                            mb: 3,
                            fontSize: { xs: '2.5rem', md: '3.5rem' }
                        }}
                    >
                        Ready to transform your <br />
                        <span style={{ color: theme.palette.primary.main }}>listings?</span>
                    </Typography>
                    
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '1.2rem',
                            color: alpha(theme.palette.text.secondary, 0.7),
                            mb: 6,
                            maxWidth: 600,
                            mx: 'auto'
                        }}
                    >
                        Create stunning video tours and staged photos for your listing now.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                         <AddressAutocomplete 
                            onAddressSelect={handleAddressSelect} 
                            variant="hero"
                            sx={{ maxWidth: '600px' }}
                        />
                    </Box>

                    <Typography variant="caption" sx={{ display: 'block', mt: 3, color: alpha(theme.palette.text.secondary, 0.5) }}>
                        If you're not satisfied, we'll give you your money back.
                    </Typography>
                </motion.div>
            </Container>
        </Box>
    );
};
