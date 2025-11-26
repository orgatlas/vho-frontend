import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Grid,
    useMediaQuery,
    useTheme,
    Chip
} from '@mui/material';
import { Sofa, Smartphone, MousePointer2, ArrowRight, CheckCircle2 } from 'lucide-react';
import AddressAutocomplete from './AddressAutocomplete'; // Ensure correct path

// --- Theme Colors ---
const THEME = {
    light: '#c2f2ed',
    normal: '#33998f',
    dark: '#02645b',
    error: '#ff5757',
    text_dark: '#373e40',
    text_light: '#f2f2f2',
    paper: '#373e40'
};

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

// --- 3D Tilt Card Component ---
const TiltCard = ({ product }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Parallax
    const contentX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
    const contentY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <Grid item xs={12} md={product.colSpan}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    perspective: 1000,
                    height: product.height,
                }}
            >
                <motion.a
                    href={product.link}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        display: 'block',
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        borderRadius: '20px',
                    }}
                    className="group"
                >
                    {/* Background Layer (Clips Image) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '20px',
                            overflow: 'hidden',
                            backgroundColor: THEME.paper,
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            transform: 'translateZ(0)',
                        }}
                    >
                        <Box
                            component={motion.div}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            sx={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${product.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Box sx={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(to top, ${THEME.paper} 0%, transparent 60%, rgba(0,0,0,0.4) 100%)`,
                            opacity: 0.9,
                        }} />
                        <Box
                            className="opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: `radial-gradient(circle at 50% 0%, ${THEME.normal}, transparent 70%)`,
                                mixBlendMode: 'screen',
                            }}
                        />
                    </Box>

                    {/* Content Layer (Parallax) */}
                    <Box
                        component={motion.div}
                        style={{ x: contentX, y: contentY, z: 50 }}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            p: { xs: 3, md: 4, lg:6 }, // Responsive padding
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            transform: 'translateZ(50px)',
                            pointerEvents: 'none',
                        }}
                    >
                        <Typography variant="h4" sx={{
                            color: THEME.text_light,
                            fontSize: { xs: '1.25rem', md: '1.75rem' },
                            fontWeight: 700,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                            mb: 0.5
                        }}>
                            {product.title}
                        </Typography>

                        <Typography variant="body1" sx={{
                            color: THEME.light,
                            fontWeight: 500,
                            mb: 1,
                            opacity: 0.9,
                            fontSize: { xs: '0.9rem', md: '1rem' }
                        }} noWrap>
                            {product.subtitle}
                        </Typography>

                        <Box
                            sx={{
                                height: 0,
                                opacity: 0,
                                overflow: 'hidden',
                                transition: 'all 0.4s ease',
                            }}
                            className="group-hover:h-auto group-hover:opacity-100 group-hover:mb-2"
                        >
                            <Typography variant="body2" sx={{ color: '#bdbdbd', lineHeight: 1.4 }}>
                                {product.description}
                            </Typography>
                        </Box>
                    </Box>
                </motion.a>
            </motion.div>
        </Grid>
    );
};

// --- Main Hero Section ---
export const HeroSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const handleAddressSelect = (address) => {
        navigate('/extracting-details', { state: { address } });
    };

    return (
        <Box
            sx={{
                mt: '60px', // Header offset
                backgroundColor: THEME.text_light,
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
                    background: `radial-gradient(circle, ${THEME.light} 0%, transparent 70%)`,
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
                                    color: THEME.text_dark,
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    mb: 3
                                }}
                            >
                                Bring your listings to <Box component="span" sx={{ color: THEME.normal }}>life.</Box>
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: THEME.text_dark,
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
                                    <CheckCircle2 size={16} color={THEME.normal} />
                                    <Typography variant="caption" fontWeight="600">Instant Delivery</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircle2 size={16} color={THEME.normal} />
                                    <Typography variant="caption" fontWeight="600">Money Back Guarantee</Typography>
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
                                background: `linear-gradient(120deg, ${THEME.light}30 0%, transparent 100%)`,
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