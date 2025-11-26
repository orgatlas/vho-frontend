import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Typography, Button, Container, Grid, Stack} from '@mui/material';
import {motion} from 'framer-motion';
import {toast} from 'react-toastify';
import AddressAutocomplete from "src/features/landing/components/AddressAutocomplete";

export const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((err) => {
                    console.warn('Autoplay prevented, muting & retrying…', err);
                    videoRef.current!.muted = true;
                    videoRef.current!.play().catch(() => {
                    });
                });
            }
        }
    }, []);

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
        <Box sx={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                position: 'absolute',
                top: '2rem',
                bottom: '2rem',
                left: '2rem',
                right: '2rem',
                backgroundColor: 'black',
                borderRadius: '12px',
                overflow: 'hidden',
            }}>
                <video
                    ref={videoRef}
                    src="https://virtualhomeopen.sgp1.cdn.digitaloceanspaces.com/static/homepage/hero/hero.mp4"
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                />
            </Box>

            <Container maxWidth="lg" sx={{position: 'relative', zIndex: 2, mt:'100px'}}>
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <Grid container spacing={{xs: 6, md: 10}} alignItems="center">
                        {/* Left Column */}
                        <Grid item xs={12} md={6}
                              sx={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                  backdropFilter: 'blur(10px)',
                                  p: 6,
                                  borderRadius: '12px',
                              }}>
                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h1"
                                    component="h1"
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: {xs: '3rem', md: '4.5rem'},
                                        fontWeight: 700,
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.02em',
                                        mb: 3,
                                    }}
                                >
                                    Bring Properties <br/> <Box component="span" sx={{color: 'primary.main'}}>To
                                    Life</Box> <br/>
                                </Typography>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Stack direction={{xs: 'column', sm: 'column'}} spacing={2}>
                                    <motion.div variants={itemVariants}>
                                        <Typography
                                            variant="h6"
                                            component="p"
                                            sx={{mb: 4, color: 'text.primary', fontWeight: 400}}
                                        >
                                            Create beautiful property video tours within minutes from your listing
                                            images.
                                        </Typography>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            bgcolor: 'white',
                                            borderRadius: 50,
                                            p: '6px',
                                            width: '100%',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                            }
                                        }}>
                                            <Box sx={{flexGrow: 1, pl: 3}}>
                                                <AddressAutocomplete
                                                    onAddressSelect={setAddress}
                                                    fullWidth
                                                    placeholder="Enter an address..."
                                                />
                                            </Box>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                onClick={handleCreateVideo}
                                                sx={{
                                                    borderRadius: 50,
                                                    whiteSpace: 'nowrap',
                                                    py: 1.5,
                                                    px: 4,
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        boxShadow: 'none',
                                                    }
                                                }}
                                            >
                                                Go
                                            </Button>
                                        </Box>
                                    </motion.div>

                                </Stack>
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};
