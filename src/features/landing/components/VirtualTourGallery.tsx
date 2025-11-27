import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, Chip, useTheme, useMediaQuery, IconButton, alpha } from '@mui/material';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Play, X, ArrowRight } from 'lucide-react';

// --- MOCK DATA ---
const VIDEO_URL = "https://virtualhomeopen.sgp1.cdn.digitaloceanspaces.com/static/homepage/hero/examples.mp4";

const TOURS = [
    {
        id: 1,
        title: "Coastal Modern Villa",
        location: "Malibu, CA",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
        video: VIDEO_URL
    },
    {
        id: 2,
        title: "Urban Penthouse",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
        video: VIDEO_URL
    },
    {
        id: 3,
        title: "Nordic Cabin",
        location: "Reykjavik, IS",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1600&auto=format&fit=crop",
        video: VIDEO_URL
    },
    {
        id: 4,
        title: "Desert Oasis",
        location: "Palm Springs, CA",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1600&auto=format&fit=crop",
        video: VIDEO_URL
    },
    {
        id: 5,
        title: "Alpine Chalet",
        location: "Zermatt, CH",
        image: "https://images.unsplash.com/photo-1513584685908-95c9e2d013d4?q=80&w=1600&auto=format&fit=crop",
        video: VIDEO_URL
    }
];

// Tripled for infinite loop illusion on Desktop
const INFINITE_TOURS = [...TOURS, ...TOURS, ...TOURS];

// --- HELPER: AURORA GLOW ---
const AuroraGlow = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: 'absolute',
                inset: -20,
                zIndex: -1,
                filter: 'blur(30px)',
                opacity: 0.6,
                borderRadius: '40px',
                pointerEvents: 'none',
            }}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                    width: '100%', height: '100%',
                    background: `conic-gradient(from 0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light}, #818cf8, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
                }}
            />
        </Box>
    );
};

// --- COMPONENT: DESKTOP TOUR CARD ---
const DesktopTourCard = ({ tour, onExpand, onHoverChange }: { tour: any, onExpand: (t: any) => void, onHoverChange: (h: boolean) => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const theme = useTheme();

    // --- TILT LOGIC (Subtle) ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    // REDUCED TILT INTENSITY (5deg instead of 15deg)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isHovered) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    useEffect(() => {
        if (!isHovered) {
            x.set(0);
            y.set(0);
        }
    }, [isHovered, x, y]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        onHoverChange(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHoverChange(false);
    };

    return (
        <Box sx={{ position: 'relative', mx: 2, perspective: '1000px' }}>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, zIndex: -1 }}
                    >
                        <AuroraGlow />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                onHoverStart={handleMouseEnter}
                onHoverEnd={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onClick={() => onExpand(tour)}
                animate={{
                    width: isHovered ? 500 : 280,
                    aspectRatio: isHovered ? '16/9' : '9/16',
                    scale: isHovered ? 1.1 : 0.9,
                    zIndex: isHovered ? 100 : 1,
                    filter: isHovered ? 'brightness(1)' : 'brightness(0.6)',
                }}
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: "preserve-3d",
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    backgroundColor: '#000',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    transformOrigin: 'center center'
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${tour.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {isHovered && (
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        sx={{ position: 'absolute', inset: 0, bgcolor: 'black' }}
                    >
                        <video
                            ref={videoRef}
                            src={tour.video}
                            muted
                            autoPlay
                            playsInline
                            loop
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </Box>
                )}

                <Box
                    sx={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)',
                        pointerEvents: 'none', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                        transform: 'translateZ(30px)'
                    }}
                >
                    <motion.div layout>
                        <Typography variant="h6" fontWeight={800} color="white" noWrap>
                            {tour.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: theme.palette.secondary.light, mt: 0.5 }}>
                            <MapPin size={14} />
                            <Typography variant="caption" fontWeight={600}>{tour.location}</Typography>
                        </Box>
                    </motion.div>

                    <motion.div
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        style={{ position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    >
                        <Box sx={{ p: 2,display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%', borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: `1px solid ${theme.palette.primary.main}` }}>
                            <Play fill="white" size={24} color="white" />
                        </Box>
                    </motion.div>
                </Box>
            </motion.div>
        </Box>
    );
};

// --- COMPONENT: MOBILE TOUR CARD ---
const MobileTourCard = ({ tour, onExpand }: { tour: any, onExpand: (t: any) => void }) => {
    const theme = useTheme();
    return (
        <Box
            onClick={() => onExpand(tour)}
            sx={{
                minWidth: '85vw', // Shows a peek of next card
                aspectRatio: '3/4',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                scrollSnapAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${tour.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Box
                sx={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%)',
                    p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                }}
            >
                <Typography variant="h5" fontWeight={800} color="white">
                    {tour.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: theme.palette.secondary.light, mt: 0.5, mb: 2 }}>
                    <MapPin size={16} />
                    <Typography variant="body2" fontWeight={600}>{tour.location}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', bgcolor: 'rgba(255,255,255,0.2)', width: 'fit-content', px: 2, py: 1, borderRadius: '50px', backdropFilter: 'blur(4px)' }}>
                    <Play size={16} fill="white" />
                    <Typography variant="button" fontSize="0.8rem" fontWeight={700}>Watch Tour</Typography>
                </Box>
            </Box>
        </Box>
    );
};

// --- MAIN GALLERY COMPONENT ---
export const VirtualTourGallery = () => {
    const [expandedTour, setExpandedTour] = useState<any | null>(null);
    const [isMarqueePaused, setIsMarqueePaused] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, py: 12, overflow: 'hidden', position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <Container maxWidth="lg" sx={{textAlign: 'center', mb: {xs: 4, md: 8}, position: 'relative', zIndex: 10}}>
                <Typography variant="h2" sx={{color: theme.palette.text.primary, fontWeight: 800, mb: 2, display:'inline-flex'}}>
                    Properties We've Brought to&nbsp;
                </Typography>
                <Typography variant="h2" sx={{color: theme.palette.primary.main, fontWeight: 800, mb: 2, display:'inline-flex'}}>
                     Life.
                </Typography>
                <Typography variant="body1" sx={{color: theme.palette.text.primary}}>
                    {isMobile ? "Swipe to explore our latest tours." : "Hover to preview. Click to step inside."}
                </Typography>
            </Container>

            {/* --- CONTENT AREA --- */}

            {isMobile ? (
                // MOBILE: Horizontal Snap Carousel
                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: 2,
                        px: 3,
                        py: 4, // Increased vertical padding to prevent shadow clipping
                        scrollSnapType: 'x mandatory',
                        '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',
                    }}
                >
                    {TOURS.map((tour, i) => (
                        <MobileTourCard
                            key={i}
                            tour={tour}
                            onExpand={setExpandedTour}
                        />
                    ))}
                    {/* Spacer for end padding */}
                    <Box sx={{ minWidth: '16px' }} />
                </Box>
            ) : (
                // DESKTOP: Infinite Horizontal Marquee
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                    }}
                >
                    <Box
                        className="marquee-track"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            py: 4,
                            width: 'max-content',
                            animation: 'scroll 60s linear infinite',
                            animationPlayState: isMarqueePaused ? 'paused !important' : 'running',
                            '@keyframes scroll': {
                                '0%': { transform: 'translateX(0)' },
                                '100%': { transform: 'translateX(-33.33%)' }
                            },
                            willChange: 'transform'
                        }}
                    >
                        {INFINITE_TOURS.map((tour, index) => (
                            <DesktopTourCard
                                key={`${tour.id}-${index}`}
                                tour={tour}
                                onExpand={setExpandedTour}
                                onHoverChange={setIsMarqueePaused}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            {/* --- MODAL OVERLAY (FULLSCREEN PLAYER) --- */}
            <AnimatePresence>
                {expandedTour && (
                    <Box
                        sx={{
                            position: 'fixed', inset: 0, zIndex: 9999,
                            bgcolor: 'rgba(0,0,0,0.95)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            p: { xs: 0, md: 4 }
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{
                                width: '100%', maxWidth: '1200px', aspectRatio: '16/9',
                                position: 'relative', backgroundColor: 'black',
                                borderRadius: isMobile ? 0 : '24px', overflow: 'hidden',
                                boxShadow: `0 0 100px ${alpha(theme.palette.primary.main, 0.4)}`
                            }}
                        >
                            <video
                                src={expandedTour.video}
                                autoPlay
                                controls
                                playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                                onClick={() => setExpandedTour(null)}
                                sx={{
                                    position: 'absolute', top: 20, right: 20,
                                    bgcolor: 'rgba(0,0,0,0.5)', color: 'white',
                                    backdropFilter: 'blur(4px)',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }, zIndex: 10
                                }}
                            >
                                <X />
                            </IconButton>
                            <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10, pointerEvents: 'none' }}>
                                <Typography variant="h5" fontWeight={700} color="white" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                    {expandedTour.title}
                                </Typography>
                            </Box>
                        </motion.div>
                    </Box>
                )}
            </AnimatePresence>

        </Box>
    );
};

export default VirtualTourGallery;