import React, {useRef, useState, useEffect} from 'react';
import {Box, Typography, Chip, Button, useMediaQuery, IconButton} from '@mui/material';
import {motion, useScroll, useTransform, useSpring, AnimatePresence} from 'framer-motion';
import {Zap, Play, Database, RotateCcw, RefreshCcw} from 'lucide-react';

// --- ASSETS ---
const IMAGE_MAIN = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop";
const IMAGE_WIREFRAME = "http://googleusercontent.com/image_generation_content/8";
const VIDEO_URL = "https://virtualhomeopen.sgp1.cdn.digitaloceanspaces.com/static/homepage/hero/examples.mp4";

// --- THEME ---
const THEME = {
    light: '#c2f2ed',
    normal: '#33998f',
    dark: '#02645b',
    text_dark: '#373e40',
    text_light: '#f2f2f2',
    paper: '#373e40'
};

// --- AURORA GLOW COMPONENT ---
const VideoGlow = () => (
    <Box
        sx={{
            position: 'absolute',
            inset: -10, // Extend significantly beyond the video
            zIndex: -1,
            filter: 'blur(40px)', // Strong blur for a soft, flowing effect
            opacity: 0.6, // Slightly lower opacity for a subtle effect
        }}
    >
        <motion.div
            animate={{rotate: 360}}
            transition={{duration: 10, repeat: Infinity, ease: "linear"}} // Slower rotation
            style={{
                position: 'absolute',
                top: '-50%', left: '-50%', right: '-50%', bottom: '-50%',
                background: `conic-gradient(from 0deg, ${THEME.normal}, ${THEME.light}, #818cf8, ${THEME.dark}, ${THEME.normal})`
            }}
        />
    </Box>
);

// --- MAIN COMPONENT ---
export const VirtualTourDemo = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [videoFinished, setVideoFinished] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    // Track scroll progress within this specific section
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll value
    const smoothScroll = useSpring(scrollYProgress, {stiffness: 200, damping: 30});

    // --- ANIMATION MAPPINGS ---

    // 1. Layer Separation (The Explosion)
    const bgZ = useTransform(smoothScroll, [0.1, 0.5, 0.8], [0, -150, 0]);
    const wireframeZ = useTransform(smoothScroll, [0.1, 0.5, 0.8], [0, 100, 0]);
    const bgScale = useTransform(smoothScroll, [0.1, 0.5, 0.8], [1, 0.9, 1]);

    // 2. Wireframe Opacity
    const wireframeOpacity = useTransform(smoothScroll, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

    // 3. Scanning Line
    const scanLineTop = useTransform(smoothScroll, [0, 0.3], ["0%", "120%"]);
    const scanOpacity = useTransform(smoothScroll, [0, 0.8], [1, 0]);

    // 4. Final Video Opacity
    const videoOpacity = useTransform(smoothScroll, [0.80, 0.9], [0, 1]);

    // 5. Video Z-Index management
    const videoZIndex = useTransform(smoothScroll, (v) => v > 0.85 ? 50 : -1);

    // 6. Header Opacity
    const headerOpacity = useTransform(smoothScroll, [0, 0.2], [1, 0]);

    // 7. Bottom Indicator Animations
    const indicatorOpacity = useTransform(smoothScroll, [0.8, 0.9], [1, 0]);
    const indicatorY = useTransform(smoothScroll, [0, 1], [0, 20]);

    // Handle Scroll-based Video Logic & Locking
    useEffect(() => {
        const unsubscribe = videoOpacity.on("change", (v) => {
            // LOCK TRIGGER: If video is fully visible (scroll near end), lock the state
            if (v > 0.9 && !isLocked) {
                setIsLocked(true);
            }

            // PLAYBACK LOGIC: Only control playback via scroll if NOT locked
            if (!isLocked && videoRef.current) {
                if (v > 0.5) {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("Auto-play prevented");
                        });
                    }
                } else {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                    setVideoFinished(false);
                }
            }
        });
        return () => unsubscribe();
    }, [videoOpacity, isLocked]);

    const handleReplay = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setVideoFinished(false);
        }
    };

    const handleReset = () => {
        setIsLocked(false);
        setVideoFinished(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        if (containerRef.current) {
            containerRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        // A 300vh container creates the scroll space ("track")
        <Box ref={containerRef} sx={{height: '300vh', bgcolor: 'primary.main', position: 'relative'}}>

            {/* Sticky Viewport */}
            <Box sx={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                {/* Dynamic Header */}
                <Box sx={{
                    position: 'absolute',
                    top: {xs: 40, md: 80},
                    zIndex: 20,
                    textAlign: 'center',
                    width: '100%',
                    px: 2,
                    pt: 2
                }}>
                    <Typography variant="h3" fontWeight={800} color="text.secondary" sx={{display:'inline-flex'}}>
                        Static Becomes&nbsp;
                        <Typography variant="h3" fontWeight={800} color="text.primary">
                            Dynamic
                        </Typography>
                    </Typography>
                    <Typography color="rgba(255,255,255,0.6)">
                        We transform static 2D images into 3D video
                    </Typography>
                </Box>

                {/* Reset Button */}
                <AnimatePresence>
                    {isLocked && (
                        <motion.div
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            style={{position: 'absolute', top: 40, right: 40, zIndex: 100}}
                        >
                            <Button
                                startIcon={<RefreshCcw size={14}/>}
                                onClick={handleReset}
                                sx={{
                                    color: 'rgba(255,255,255,0.5)',
                                    textTransform: 'none',
                                    '&:hover': {color: 'white', bgcolor: 'rgba(255,255,255,0.1)'}
                                }}
                            >
                                Reset Experience
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3D STAGE */}
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1000px',
                    aspectRatio: '16/9',
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    px: {xs: 2, md: 0}
                }}>

                    {/* LAYER 1: Main Photo */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${IMAGE_MAIN})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '24px',
                            z: bgZ,
                            scale: bgScale,
                            opacity: isLocked ? 0 : 1,
                            filter: 'brightness(0.7)',
                            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
                        }}
                    />

                    {/* LAYER 2: Wireframe Mesh */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${IMAGE_WIREFRAME})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '24px',
                            z: wireframeZ,
                            opacity: isLocked ? 0 : wireframeOpacity,
                            mixBlendMode: 'screen',
                            border: `1px solid ${THEME.normal}`,
                            boxShadow: `0 0 100px ${THEME.normal}40`
                        }}
                    />


                    {/* SCANNING LINE OVERLAY */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: scanLineTop,
                            left: 0, right: 0,
                            height: '4px',
                            background: THEME.normal,
                            boxShadow: `0 0 40px 5px ${THEME.normal}`,
                            opacity: isLocked ? 0 : scanOpacity,
                            zIndex: 50
                        }}
                    />

                    {/* FINAL STATE: VIDEO PLAYER */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: isLocked ? 1 : videoOpacity,
                            zIndex: isLocked ? 50 : videoZIndex,
                            borderRadius: '24px',
                            // We remove overflow hidden here so the Glow effect can spill out
                        }}
                    >
                        {/* Aurora Background Effect (Only visible when playing/locked) */}
                        <AnimatePresence>
                            {isLocked && <VideoGlow/>}
                        </AnimatePresence>

                        {/* Inner container to clip the video, but keep glow outside */}
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            bgcolor: 'black'
                        }}>
                            <video
                                ref={videoRef}
                                src={VIDEO_URL}
                                muted
                                playsInline
                                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                onEnded={() => setVideoFinished(true)}
                            />

                            {/* Overlay for Replay Button */}
                            <AnimatePresence>
                                {videoFinished && (
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(0,0,0,0.4)',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={<RotateCcw/>}
                                            onClick={handleReplay}
                                            sx={{
                                                bgcolor: 'white',
                                                color: '#0f172a',
                                                fontWeight: 800,
                                                fontSize: '1.2rem',
                                                px: 6, py: 2,
                                                borderRadius: '50px',
                                                boxShadow: '0 20px 50px rgba(255,255,255,0.3)',
                                                '&:hover': {bgcolor: '#f1f5f9', transform: 'scale(1.05)'}
                                            }}
                                        >
                                            Watch Full Tour
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </motion.div>

                </Box>

                {/* Bottom Scroll Indicator */}
                {!isLocked && (
                    <motion.div
                        style={{
                            position: 'absolute', bottom: 40,
                            opacity: indicatorOpacity
                        }}
                        animate={{y: [0, 20, 0]}} // Bouncing animation
                        transition={{duration: 1, repeat: Infinity, ease: "easeInOut"}}
                    >
                        <Box
                            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, opacity: 0.5}}>
                            <Typography variant="caption" color="white" sx={{letterSpacing: 2}}>KEEP
                                SCROLLING</Typography>
                            <Box sx={{width: 1, height: 40, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 1}}>
                                <motion.div
                                    style={{
                                        width: '100%',
                                        height: '50%',
                                        bgcolor: 'white',
                                        borderRadius: 1,
                                        y: indicatorY
                                    }}
                                />
                            </Box>
                        </Box>
                    </motion.div>
                )}

            </Box>
        </Box>
    );
};

export default VirtualTourDemo;