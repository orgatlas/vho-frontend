import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// --- THEME CONSTANTS (Matching your system) ---
const THEME = {
    light: '#c2f2ed',
    normal: '#33998f',
    dark: '#02645b',
    text_dark: '#373e40',
    text_light: '#f2f2f2',
    paper: '#373e40'
};

// --- MOCK DATA FOR ROOMS ---
const ROOMS = [
    {
        id: 'living',
        title: 'Living Room',
        description: 'Modern Minimalist',
        // Using placeholder images for demo purposes
        before: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop', // Empty-ish room
        after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop'   // Furnished room
    },
    {
        id: 'bedroom',
        title: 'Master Bedroom',
        description: 'Scandinavian Style',
        before: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1595526051245-4506e0005bd0?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'kitchen',
        title: 'Kitchen & Dining',
        description: 'Warm & Inviting',
        before: 'https://images.unsplash.com/photo-1556912173-3db996e7c608?q=80&w=1200&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop'
    }
];

// --- BEFORE/AFTER SLIDER COMPONENT (Adapted from your provided code) ---
const BeforeAfterContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    cursor: 'ew-resize',
    touchAction: 'none', // Prevents scrolling while dragging on mobile
    borderRadius: '24px',
});

const BeforeImage = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

const AfterImage = styled('div')(({ clip }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    clipPath: `polygon(0 0, ${clip}% 0, ${clip}% 100%, 0 100%)`,
}));

const ResizeHandle = styled('div')(({ left }) => ({
    position: 'absolute',
    top: 0,
    left: `${left}%`,
    transform: 'translateX(-50%)',
    width: '4px',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    zIndex: 10,
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'background.default',
        border: '4px solid white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    },
}));

const HandleIconContainer = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%', // Centered within the handle
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    zIndex: 11,
    pointerEvents: 'none'
});

const BeforeAfterSlider = ({ before, after }) => {
    const [sliderValue, setSliderValue] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (clientX) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            const clampedPercentage = Math.max(0, Math.min(100, percentage));
            setSliderValue(clampedPercentage);
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault(); // Prevent text selection
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (isDragging) handleMove(e.clientX);
    };

    const handleTouchStart = () => {
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (isDragging) handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        // Reset slider when images change
        setSliderValue(50);
    }, [before, after]);

    return (
        <BeforeAfterContainer
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
        >
            <BeforeImage style={{ backgroundImage: `url(${before})` }} />
            <AfterImage style={{ backgroundImage: `url(${after})` }} clip={sliderValue} />

            {/* Labels */}
            <Box sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, zIndex: 5 }}>BEFORE</Box>
            <Box sx={{ position: 'absolute', top: 20, left: 20, bgcolor: THEME.normal, color: 'white', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, zIndex: 5 }}>AFTER</Box>

            <ResizeHandle left={sliderValue}>
                <HandleIconContainer>
                    <ArrowBackIos sx={{ fontSize: 16, mr: -0.5 }} />
                    <ArrowForwardIos sx={{ fontSize: 16, ml: -0.5 }} />
                </HandleIconContainer>
            </ResizeHandle>
        </BeforeAfterContainer>
    );
};

// --- MAIN DEMO COMPONENT ---
export const VirtualStagingDemo = () => {
    const [selectedId, setSelectedId] = useState(ROOMS[0].id);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const activeRoom = ROOMS.find(r => r.id === selectedId);
    const inactiveRooms = ROOMS.filter(r => r.id !== selectedId);

    return (
        <Box sx={{ py: 12, bgcolor: '#f8fafc', overflow: 'hidden' }}>
            <Container maxWidth="xl">

                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="overline" sx={{ color: THEME.normal, fontWeight: 800, letterSpacing: 2 }}>
                        INTERACTIVE DEMO
                    </Typography>
                    <Typography variant="h2" sx={{ color: THEME.text_dark, fontWeight: 700, mb: 2 }}>
                        See the magic for yourself.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 600, mx: 'auto' }}>
                        Click on different rooms to see how our virtual staging transforms empty spaces into sold properties.
                    </Typography>
                </Box>

                {/* Interactive Layout Group */}
                <LayoutGroup>
                    <Grid container spacing={4} alignItems="stretch">

                        {/* LEFT COLUMN: Stack of Inactive Cards */}
                        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <AnimatePresence>
                                {inactiveRooms.map((room) => (
                                    <motion.div
                                        key={room.id}
                                        layoutId={`card-${room.id}`}
                                        onClick={() => setSelectedId(room.id)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2,
                                                borderRadius: '20px',
                                                bgcolor: 'white',
                                                border: '2px solid transparent',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                '&:hover': {
                                                    borderColor: THEME.light,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                                                }
                                            }}
                                        >
                                            {/* Thumbnail */}
                                            <Box
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    flexShrink: 0
                                                }}
                                            >
                                                <motion.img
                                                    layoutId={`image-${room.id}`}
                                                    src={room.after}
                                                    alt={room.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </Box>

                                            {/* Text Info */}
                                            <Box sx={{ flexGrow: 1 }}>
                                                <motion.h4
                                                    layoutId={`title-${room.id}`}
                                                    style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: THEME.text_dark }}
                                                >
                                                    {room.title}
                                                </motion.h4>
                                                <motion.p
                                                    layoutId={`desc-${room.id}`}
                                                    style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}
                                                >
                                                    {room.description}
                                                </motion.p>
                                            </Box>

                                            <Box sx={{ color: THEME.normal }}>
                                                <ArrowRight />
                                            </Box>
                                        </Paper>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* CTA Box in the stack */}
                            <Box
                                sx={{
                                    mt: 'auto',
                                    p: 4,
                                    borderRadius: '24px',
                                    bgcolor: THEME.dark,
                                    color: 'white',
                                    textAlign: 'center',
                                    display: { xs: 'none', md: 'block' } // Hide on mobile to save space
                                }}
                            >
                                <Sparkles size={32} style={{ marginBottom: 16, opacity: 0.8 }} />
                                <Typography variant="h5" fontWeight="700" gutterBottom>
                                    Ready to start?
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                                    Get your first image staged for free.
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        bgcolor: 'white',
                                        color: THEME.dark,
                                        fontWeight: 'bold',
                                        borderRadius: '12px',
                                        py: 1.5,
                                        '&:hover': { bgcolor: THEME.light }
                                    }}
                                >
                                    Try It Now
                                </Button>
                            </Box>
                        </Grid>

                        {/* RIGHT COLUMN: Active Maximized Card */}
                        <Grid item xs={12} md={8}>
                            <motion.div
                                layoutId={`card-${activeRoom.id}`}
                                style={{ height: '100%', minHeight: '500px' }}
                                transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                            >
                                <Paper
                                    elevation={10}
                                    sx={{
                                        height: '100%',
                                        borderRadius: '32px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        bgcolor: 'white',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    {/* Slider Area */}
                                    <Box sx={{ flexGrow: 1, position: 'relative', minHeight: '400px' }}>
                                        <motion.div
                                            layoutId={`image-${activeRoom.id}`}
                                            style={{ width: '100%', height: '100%' }}
                                        >
                                            <BeforeAfterSlider before={activeRoom.before} after={activeRoom.after} />
                                        </motion.div>
                                    </Box>

                                    {/* Active Card Details Footer */}
                                    <Box sx={{ p: 4, bgcolor: 'white', borderTop: '1px solid #f1f5f9' }}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item xs={12} sm={8}>
                                                <motion.h2
                                                    layoutId={`title-${activeRoom.id}`}
                                                    style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: THEME.text_dark, marginBottom: '0.5rem' }}
                                                >
                                                    {activeRoom.title}
                                                </motion.h2>
                                                <motion.p
                                                    layoutId={`desc-${activeRoom.id}`}
                                                    style={{ margin: 0, fontSize: '1.1rem', color: '#64748b' }}
                                                >
                                                    {activeRoom.description}
                                                </motion.p>
                                            </Grid>
                                            <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                                                <Button
                                                    variant="outlined"
                                                    size="large"
                                                    endIcon={<ArrowRight />}
                                                    sx={{
                                                        borderColor: THEME.normal,
                                                        color: THEME.normal,
                                                        borderRadius: '50px',
                                                        borderWidth: 2,
                                                        px: 4,
                                                        '&:hover': { borderWidth: 2, bgcolor: THEME.light, borderColor: THEME.dark, color: THEME.dark }
                                                    }}
                                                >
                                                    Stage This
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                </Paper>
                            </motion.div>
                        </Grid>

                        {/* Mobile-only CTA (since we hide the sidebar one on mobile) */}
                        <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{
                                    bgcolor: THEME.normal,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: '12px',
                                    py: 2,
                                }}
                            >
                                Try It Now
                            </Button>
                        </Grid>

                    </Grid>
                </LayoutGroup>
            </Container>
        </Box>
    );
};

export default VirtualStagingDemo;