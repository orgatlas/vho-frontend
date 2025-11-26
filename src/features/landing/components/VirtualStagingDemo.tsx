import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Paper, useTheme, useMediaQuery, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowRight, Sparkles, MoveRight, ScanEye } from 'lucide-react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// --- THEME CONSTANTS ---
const THEME = {
    light: '#c2f2ed',
    normal: '#33998f',
    dark: '#02645b',
    text_dark: '#373e40',
    text_light: '#f2f2f2',
    paper: '#373e40'
};

// --- MOCK DATA ---
const ROOMS = [
    {
        id: 'living',
        title: 'Living Room',
        subtitle: 'Modern Minimalist',
        description: 'See how we transformed this cold, empty space into a cozy family hub.',
        before: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
        gridArea: { xs: 12, md: 8 } // Spans 8 cols in grid
    },
    {
        id: 'bedroom',
        title: 'Master Suite',
        subtitle: 'Scandinavian Style',
        description: 'Soft textures and warm lighting added to create the perfect retreat.',
        before: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1595526051245-4506e0005bd0?q=80&w=1200&auto=format&fit=crop',
        gridArea: { xs: 12, md: 4 } // Spans 4 cols in grid
    },
    {
        id: 'kitchen',
        title: 'Kitchen',
        subtitle: 'Warm & Inviting',
        description: 'A modern chef\'s kitchen visualization that helps buyers imagine cooking here.',
        before: 'https://images.unsplash.com/photo-1556912173-3db996e7c608?q=80&w=1200&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
        gridArea: { xs: 12, md: 4 } // Spans 4 cols in grid
    }
];

// --- BEFORE/AFTER SLIDER COMPONENT ---
const BeforeAfterContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    cursor: 'ew-resize',
    touchAction: 'none',
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
        backgroundColor: THEME.normal,
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
    left: '50%',
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
            setSliderValue(Math.max(0, Math.min(100, percentage)));
        }
    };

    return (
        <BeforeAfterContainer
            ref={containerRef}
            onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={(e) => isDragging && handleMove(e.clientX)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={(e) => isDragging && handleMove(e.touches[0].clientX)}
        >
            <BeforeImage style={{ backgroundImage: `url(${before})` }} />
            <AfterImage style={{ backgroundImage: `url(${after})` }} clip={sliderValue} />

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

// --- MAIN COMPONENT ---
export const VirtualStagingDemo = () => {
    const [viewState, setViewState] = useState('grid'); // 'grid' | 'split'
    const [selectedId, setSelectedId] = useState(ROOMS[0].id);
    const theme = useTheme();

    const handleRoomClick = (id) => {
        setSelectedId(id);
        setViewState('split');
    };

    const activeRoom = ROOMS.find(r => r.id === selectedId);
    const inactiveRooms = ROOMS.filter(r => r.id !== selectedId);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15
            }
        }
    };

    return (
        <Box sx={{ py: 12, bgcolor: '#f8fafc', overflow: 'hidden', minHeight: '800px' }}>
            <Container maxWidth="xl">

                {/* Header - Always visible */}
                <Box sx={{ mb: 6, maxWidth: 600 }}>
                    <Chip label="Interactive Gallery" sx={{ bgcolor: 'white', color: THEME.normal, fontWeight: 700, mb: 2 }} />
                    <Typography variant="h2" sx={{ color: THEME.text_dark, fontWeight: 800, mb: 2 }}>
                        Virtual Staging <br/>
                        <span style={{ color: THEME.normal }}>Showcase.</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b' }}>
                        Explore our gallery of transformed spaces. Click any room to enter the interactive comparison tool.
                    </Typography>
                </Box>

                <LayoutGroup>
                    {viewState === 'grid' ? (
                        // --- GRID VIEW (INITIAL STATE) ---
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            exit={{ opacity: 0 }}
                        >
                            <Grid container spacing={3}>
                                {/* Map through rooms with custom grid spans */}
                                {ROOMS.map((room) => (
                                    <Grid item xs={room.gridArea.xs} md={room.gridArea.md} key={room.id}>
                                        <motion.div
                                            variants={itemVariants}
                                            layoutId={`card-${room.id}`}
                                            onClick={() => handleRoomClick(room.id)}
                                            whileHover={{ y: -5 }}
                                            style={{ height: '100%', cursor: 'pointer' }}
                                        >
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    height: '400px', // Fixed height for grid aesthetic
                                                    borderRadius: '32px',
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    bgcolor: 'white',
                                                    transition: 'box-shadow 0.3s ease',
                                                    '&:hover': {
                                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                                    }
                                                }}
                                            >
                                                {/* Image Background */}
                                                <Box sx={{ position: 'absolute', inset: 0 }}>
                                                    <motion.img
                                                        layoutId={`image-${room.id}`}
                                                        src={room.after}
                                                        alt={room.title}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                    <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                                                </Box>

                                                {/* Content Overlay */}
                                                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 4 }}>
                                                    <motion.div layoutId={`content-${room.id}`}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                            <Box>
                                                                <Chip
                                                                    label={room.subtitle}
                                                                    size="small"
                                                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)', mb: 1.5 }}
                                                                />
                                                                <motion.h3
                                                                    layoutId={`title-${room.id}`}
                                                                    style={{ margin: 0, color: 'white', fontSize: '2rem', fontWeight: 700 }}
                                                                >
                                                                    {room.title}
                                                                </motion.h3>
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    bgcolor: 'white',
                                                                    width: 48,
                                                                    height: 48,
                                                                    borderRadius: '50%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    color: THEME.normal
                                                                }}
                                                            >
                                                                <ScanEye size={24} />
                                                            </Box>
                                                        </Box>
                                                    </motion.div>
                                                </Box>
                                            </Paper>
                                        </motion.div>
                                    </Grid>
                                ))}

                                {/* CTA Block in Grid */}
                                <Grid item xs={12} md={8}>
                                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                height: '100%',
                                                minHeight: '200px',
                                                borderRadius: '32px',
                                                bgcolor: THEME.dark,
                                                p: 5,
                                                display: 'flex',
                                                flexDirection: { xs: 'column', md: 'row' },
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                color: 'white',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {/* Decorative blobs */}
                                            <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />

                                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                                <Typography variant="h4" fontWeight={800} gutterBottom>
                                                    Ready to sell faster?
                                                </Typography>
                                                <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 400 }}>
                                                    Join 1,000+ agencies using Virtual Home Open to create stunning marketing assets instantly.
                                                </Typography>
                                            </Box>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                sx={{
                                                    bgcolor: 'white',
                                                    color: THEME.dark,
                                                    fontWeight: 700,
                                                    px: 4, py: 1.5, borderRadius: '12px',
                                                    mt: { xs: 3, md: 0 },
                                                    '&:hover': { bgcolor: THEME.light }
                                                }}
                                            >
                                                Get Started Free
                                            </Button>
                                        </Paper>
                                    </motion.div>
                                </Grid>
                            </Grid>
                        </motion.div>
                    ) : (
                        // --- SPLIT VIEW (ACTIVE STATE) ---
                        <Grid container spacing={4} alignItems="stretch" sx={{ height: { md: '600px' } }}>

                            {/* LEFT SIDEBAR STACK */}
                            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        startIcon={<ArrowBackIos size={14} />}
                                        onClick={() => setViewState('grid')}
                                        sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}
                                    >
                                        Back to Gallery
                                    </Button>
                                </Box>

                                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
                                    <AnimatePresence>
                                        {inactiveRooms.map((room) => (
                                            <motion.div
                                                key={room.id}
                                                layoutId={`card-${room.id}`}
                                                onClick={() => setSelectedId(room.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: 2,
                                                        borderRadius: '20px',
                                                        bgcolor: 'white',
                                                        border: '2px solid transparent',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 2,
                                                        transition: 'all 0.2s',
                                                        '&:hover': { bgcolor: '#f1f5f9', transform: 'scale(1.02)' }
                                                    }}
                                                >
                                                    <Box sx={{ width: 60, height: 60, borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                                                        <motion.img
                                                            layoutId={`image-${room.id}`}
                                                            src={room.after}
                                                            alt={room.title}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <motion.h4 layoutId={`title-${room.id}`} style={{ margin: 0, fontSize: '1rem', color: THEME.text_dark }}>
                                                            {room.title}
                                                        </motion.h4>
                                                        <Typography variant="caption" color="text.secondary" noWrap>
                                                            {room.subtitle}
                                                        </Typography>
                                                    </Box>
                                                    <MoveRight size={16} color={THEME.normal} />
                                                </Paper>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </Box>

                                {/* Sidebar CTA */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: '20px',
                                        bgcolor: THEME.normal,
                                        color: 'white',
                                        textAlign: 'center'
                                    }}
                                >
                                    <Sparkles size={24} style={{ marginBottom: 8 }} />
                                    <Typography variant="h6" fontWeight={700}>Try it on your listing</Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 2, bgcolor: 'white', color: THEME.normal, fontWeight: 'bold', '&:hover': { bgcolor: '#f0fdfa' } }}
                                    >
                                        Upload Photo
                                    </Button>
                                </Paper>
                            </Grid>

                            {/* RIGHT ACTIVE CARD */}
                            <Grid item xs={12} md={8} sx={{ height: '100%' }}>
                                <motion.div
                                    key={activeRoom.id}
                                    layoutId={`card-${activeRoom.id}`}
                                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <Paper
                                        elevation={10}
                                        sx={{
                                            flexGrow: 1,
                                            borderRadius: '32px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            bgcolor: 'white',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Box sx={{ flexGrow: 1, position: 'relative', minHeight: '400px' }}>
                                            <motion.div
                                                layoutId={`image-${activeRoom.id}`}
                                                style={{ width: '100%', height: '100%' }}
                                            >
                                                <BeforeAfterSlider before={activeRoom.before} after={activeRoom.after} />
                                            </motion.div>
                                        </Box>

                                        <Box sx={{ p: 4, bgcolor: 'white' }}>
                                            <motion.div layoutId={`content-${activeRoom.id}`}>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} md={8}>
                                                        <motion.h2 layoutId={`title-${activeRoom.id}`} style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: THEME.text_dark }}>
                                                            {activeRoom.title}
                                                        </motion.h2>
                                                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                                            {activeRoom.description}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} sx={{ textAlign: 'right', mt: { xs: 2, md: 0 } }}>
                                                        <Button variant="outlined" size="large" sx={{ borderRadius: '50px', borderColor: THEME.normal, color: THEME.normal }}>
                                                            View Details
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </motion.div>
                                        </Box>
                                    </Paper>
                                </motion.div>
                            </Grid>

                        </Grid>
                    )}
                </LayoutGroup>
            </Container>
        </Box>
    );
};

export default VirtualStagingDemo;