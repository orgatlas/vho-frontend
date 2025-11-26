import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Grid,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Sofa, Smartphone, MousePointer2, CheckCircle2 } from 'lucide-react';
import AddressAutocomplete from './AddressAutocomplete';
import TiltCard from './TiltCard';

// --- Assets ---
const IMAGES = {
    staging: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    tours: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=800&auto=format&fit=crop",
    social: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"
};

const PRODUCTS = [
    {
        id: 'staging',
        title: 'Virtual Staging',
        subtitle: 'Furnish empty spaces',
        description: 'Transform vacant properties into warm homes.',
        link: '/demo/virtual-staging',
        image: IMAGES.staging,
        icon: <Sofa size={24} />,
        colSpan: 12,
        height: 280
    },
    {
        id: 'tours',
        title: 'Virtual Tours',
        subtitle: '360° Walkthroughs',
        description: 'Immersive exploration from anywhere.',
        link: '/demo/virtual-tours',
        image: IMAGES.tours,
        icon: <MousePointer2 size={24} />,
        colSpan: 6,
        height: 320
    },
    {
        id: 'social',
        title: 'Social Content',
        subtitle: 'Viral Reels',
        description: 'Stop the scroll with video.',
        link: '/demo/social-content',
        image: IMAGES.social,
        icon: <Smartphone size={24} />,
        colSpan: 6,
        height: 320
    }
];

// --- Main Hero Section ---
export const HeroSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    // isMobile unused in logic but might be useful for conditional rendering if needed later. 
    // Keeping it as per original file logic if it was there, but original used it.
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const handleAddressSelect = (address: string) => {
        navigate('/extracting-details', { state: { address } });
    };

    return (
        <Box
            sx={{
                mt: '60px', // Header offset
                backgroundColor: theme.palette.background.default, // text_light from original map
                py: { xs: 6, md: 10, lg: 12 },
                position: 'relative',
                overflow: 'hidden',
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {/* Background Blob */}
            <Box
                component={motion.div}
                animate={{
                    y: [0, -30, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                sx={{
                    position: 'absolute',
                    top: -100,
                    right: -100,
                    width: { xs: 300, md: 600 },
                    height: { xs: 300, md: 600 },
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
                    opacity: 0.5,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={{ xs: 6, lg: 8 }} alignItems="center">

                    {/* Left Column: CTA & Address Input */}
                    <Grid item xs={12} lg={5} sx={{ position: 'relative', zIndex: 10 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >

                            <Typography
                                variant="h1"
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    mb: 3
                                }}
                            >
                                Bring your listings to <Box component="span" sx={{ color: theme.palette.primary.main }}>life.</Box>
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                    mb: 6,
                                    opacity: 0.8,
                                    maxWidth: 500,
                                    lineHeight: 1.6
                                }}
                            >
                                Our property marketing assets turn impress buyers and sellers alike. Explore our suite of virtual tools designed for modern real estate.
                            </Typography>

                            {/* THE NEW AUTOCOMPLETE COMPONENT */}
                            <Box sx={{ mb: 4, width: '100%' }}>
                                <AddressAutocomplete onAddressSelect={handleAddressSelect} />
                            </Box>

                            {/* Trust Signals */}
                            <Box sx={{ display: 'flex', gap: 3, opacity: 0.7 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircle2 size={16} color={theme.palette.primary.main} />
                                    <Typography variant="caption" fontWeight="600" color={theme.palette.text.primary}>Instant Delivery</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircle2 size={16} color={theme.palette.primary.main} />
                                    <Typography variant="caption" fontWeight="600" color={theme.palette.text.primary}>Money Back Guarantee</Typography>
                                </Box>
                            </Box>

                        </motion.div>
                    </Grid>

                    {/* Right Column: Interactive Product Cards */}
                    <Grid item xs={12} lg={7}>
                        <Box sx={{
                            position: 'relative',
                            // On mobile, we might want to push this down or adjust spacing
                            mt: { xs: 4, lg: 0 }
                        }}>
                            {/* Decorative Background for Grid */}
                            <Box sx={{
                                position: 'absolute',
                                inset: -20,
                                background: `linear-gradient(120deg, ${theme.palette.secondary.light}30 0%, transparent 100%)`,
                                borderRadius: '40px',
                                transform: 'rotate(-2deg)',
                                zIndex: -1
                            }} />

                            <Grid container spacing={3}>
                                {PRODUCTS.map((product) => (
                                    <TiltCard key={product.id} product={product} />
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};
