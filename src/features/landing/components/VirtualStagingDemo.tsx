import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Paper, useTheme, Chip, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowRight, Sparkles, MoveRight, ScanEye } from 'lucide-react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AddressAutocomplete from './AddressAutocomplete';

// --- MOCK DATA ---
const ROOMS = [
    {
        id: 'living',
        title: 'Living Room',
        subtitle: 'Modern Minimalist',
        description: 'See how we transformed this cold, empty space into a chic family hub.',
        before: 'https://sgp1.digitaloceanspaces.com/virtualhomeopen/static/homepage/staging/livingroom-before.jpeg',
        after: 'https://sgp1.digitaloceanspaces.com/virtualhomeopen/static/homepage/staging/livingroom-after.png',
        gridArea: { xs: 12, md: 6 } // Spans 8 cols in grid
    },
    {
        id: 'bedroom',
        title: 'Bedroom',
        subtitle: 'Scandinavian Style',
        description: 'Soft textures and designer touches added to create the perfect retreat.',
        before: 'https://sgp1.digitaloceanspaces.com/virtualhomeopen/static/homepage/staging/bedroom-before.jpeg',
        after: 'https://sgp1.digitaloceanspaces.com/virtualhomeopen/static/homepage/staging/bedroom-after.jpeg',
        gridArea: { xs: 12, md: 3 } // Spans 4 cols in grid
    },
    {
        id: 'kitchen',
        title: 'Kitchen',
        subtitle: 'Warm & Inviting',
        description: 'A modern entertainer\'s kitchen, visualise cooking here.',
        before: 'https://sgp1.digitaloceanspaces.com/virtualhomeopen/static/homepage/staging/kitchen-before.jpeg',
        after: 'https://sgp1.digitaloceanspaces.com/virtualhomeopen/static/homepage/staging/kitchen-after.png',
        gridArea: { xs: 12, md: 3 } // Spans 4 cols in grid
    },
    {
        id: 'bathroom',
        title: 'Bathroom',
        subtitle: 'Warm & Inviting',
        description: 'Premium styled touches bring this bathroom to life.',
        before: 'https://sgp1.digitaloceanspaces.com/virtualhomeopen/static/homepage/staging/bathroom-before.jpg',
        after: 'https://sgp1.digitaloceanspaces.com/virtualhomeopen/static/homepage/staging/bathroom-after.png',
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

interface AfterImageProps {
    clip: number;
}

const AfterImage = styled('div')<AfterImageProps>(({ clip }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    clipPath: `polygon(0 0, ${clip}% 0, ${clip}% 100%, 0 100%)`,
}));

interface ResizeHandleProps {
    left: number;
}

const ResizeHandle = styled('div')<ResizeHandleProps>(({ theme, left }) => ({
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
        backgroundColor: theme.palette.primary.main,
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

interface BeforeAfterSliderProps {
    before: string;
    after: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ before, after }) => {
    const [sliderValue, setSliderValue] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    const handleMove = (clientX: number) => {
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
            <Box sx={{ position: 'absolute', top: 20, left: 20, bgcolor: theme.palette.primary.main, color: 'white', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, zIndex: 5 }}>AFTER</Box>

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
    const [viewState, setViewState] = useState<'grid' | 'split'>('grid');
    const [selectedId, setSelectedId] = useState(ROOMS[0].id);
    const theme = useTheme();
    const navigate = useNavigate();

    const handleRoomClick = (id: string) => {
        setSelectedId(id);
        setViewState('split');
    };
    
    const handleAddressSelect = (address: string) => {
        navigate('/extracting-details', { state: { address } });
    };

    const activeRoom = ROOMS.find(r => r.id === selectedId) || ROOMS[0];
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
        <Box id="virtual-staging" sx={{ py: 12, bgcolor: theme.palette.background.default, overflow: 'hidden', minHeight: '800px' }}>
            <Container maxWidth="xl">

                {/* Header - Always visible */}
                <Box sx={{ mb: 6, maxWidth: 600 }}>
                    <Chip label="Interactive Gallery" sx={{ bgcolor: 'white', color: theme.palette.primary.main, fontWeight: 700, mb: 2 }} />
                    <Typography variant="h2" sx={{ color: theme.palette.text.primary, fontWeight: 800, mb: 2 }}>
                        Virtual Staging
                        <span style={{ color: theme.palette.primary.main }}> Showcase.</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
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
                                    <Grid item xs={room.gridArea.xs as any} md={room.gridArea.md as any} key={room.id}>
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
                                                        loading="lazy"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />                                                    <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                                                </Box>

                                                {/* Content Overlay */}
                                                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 4 }}>
                                                    <motion.div layoutId={`content-${room.id}`}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                            <Box>
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
                                                                    color: theme.palette.primary.main
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
                                                bgcolor: theme.palette.primary.dark,
                                                p: 5,
                                                display: 'flex',
                                                flexDirection: { xs: 'column', md: 'row' },
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                color: 'white',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                gap: 4
                                            }}
                                        >
                                            {/* Decorative blobs */}
                                            <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />

                                            <Box sx={{ position: 'relative', zIndex: 1, flexShrink: 0, maxWidth: {md: '50%'} }}>
                                                <Typography variant="h4" fontWeight={800} gutterBottom>
                                                    Ready to sell faster?
                                                </Typography>
                                                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                                                    Join successful agencies already using Virtual Home Open and create stunning marketing assets instantly.
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 2 }}>
                                                <AddressAutocomplete 
                                                    onAddressSelect={handleAddressSelect} 
                                                    variant="contrast"
                                                />
                                            </Box>
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
                                        sx={{ color: alpha(theme.palette.text.primary, 0.7), textTransform: 'none', fontWeight: 600 }}
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
                                                        '&:hover': { bgcolor: alpha(theme.palette.background.default, 0.5), transform: 'scale(1.02)' }
                                                    }}
                                                >
                                                    <Box sx={{ width: 60, height: 60, borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                                                        <motion.img
                                                            layoutId={`image-${room.id}`}
                                                            src={room.after}
                                                            alt={room.title}
                                                            loading="lazy"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />                                                    </Box>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <motion.h4 layoutId={`title-${room.id}`} style={{ margin: 0, fontSize: '1.2rem', color: theme.palette.text.primary }}>
                                                            {room.title}
                                                        </motion.h4>
                                                    </Box>
                                                    <MoveRight size={16} color={theme.palette.primary.main} />
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
                                        bgcolor: theme.palette.primary.main,
                                        color: 'white',
                                        textAlign: 'center'
                                    }}
                                >

                                    <Typography variant="h6" fontWeight={700}><Sparkles size={24}/> Try it on your listing</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pt:2 }}>
                                        <AddressAutocomplete
                                            onAddressSelect={handleAddressSelect}
                                            variant="hero"
                                            sx={{ maxWidth: '600px' }}
                                        />
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* RIGHT ACTIVE CARD */}
                            <Grid item xs={12} md={8} sx={{ height: '100%', }}>
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
                                                        <motion.h2 layoutId={`title-${activeRoom.id}`} style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: theme.palette.text.primary }}>
                                                            {activeRoom.title}
                                                        </motion.h2>
                                                        <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
                                                            {activeRoom.description}
                                                        </Typography>
                                                    </Grid>
                                                    {/*<Grid item xs={12} md={4} sx={{ textAlign: 'right', mt: { xs: 2, md: 0 } }}>*/}
                                                    {/*    <Button variant="outlined" size="large" sx={{ borderRadius: '50px', borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}>*/}
                                                    {/*        View Details*/}
                                                    {/*    </Button>*/}
                                                    {/*</Grid>*/}
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