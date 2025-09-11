import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Typography, Button, Container, Paper} from '@mui/material';
import AddressAutocomplete from './AddressAutocomplete';
import {motion} from 'framer-motion';
import {toast} from 'react-toastify';
import {useTheme} from "@mui/material/styles";

export const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const theme = useTheme();

    const handleCreateVideo = () => {
        if (!address.trim()) {
            toast.error("Please enter a valid address.");
            return;
        }
        navigate('/extracting-details', {state: {address}});
    };

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {staggerChildren: 0.2, delayChildren: 0.3},
        },
    };

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {y: 0, opacity: 1, transition: {duration: 0.5}},
    };

    return (
        <Box
            sx={{
                width: '100%',
                py: {xs: 12, md: 20},
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.secondary.light,
                color: theme.palette.text.primary,
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="md" sx={{textAlign: 'center'}}>
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={itemVariants}>
                        <Typography variant="h1" component="h1" fontWeight="bold" gutterBottom>
                            Bring Listings to Life
                        </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Typography variant="h5" component="p" sx={{mb: 5, color: theme.palette.text.primary, opacity: 0.8}}>
                            Turn your property listing into a stunning narrated video in minutes.
                        </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: {xs: 'column', sm: 'row'},
                                gap: 1,
                                maxWidth: '600px',
                                mx: 'auto',
                                borderRadius: '12px',
                                bgcolor: 'background.default'
                            }}
                        >
                            <AddressAutocomplete onAddressSelect={setAddress} fullWidth />
                            <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={handleCreateVideo}
                                    sx={{px: 4, height: '100%', whiteSpace: 'nowrap', borderRadius: '8px'}}
                                >
                                    Create Video
                                </Button>
                            </motion.div>
                        </Paper>
                    </motion.div>
                </motion.div>
            </Container>
        </Box>
    );
};