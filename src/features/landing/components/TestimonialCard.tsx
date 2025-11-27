import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Box, Typography, useTheme, Avatar } from '@mui/material';
import { Quote } from 'lucide-react';

interface TestimonialProps {
    data: {
        quote: string;
        name: string;
        role: string;
        image?: string;
    };
}

const TestimonialCard: React.FC<TestimonialProps> = ({ data }) => {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                height: '100%',
                minHeight: '320px',
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    height: '100%',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        p: 4,
                        borderRadius: '20px',
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                        border: `1px solid ${theme.palette.divider}`,
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        transform: 'translateZ(0)',
                    }}
                >
                    {/* Decorative Gradient Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '6px',
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
                        }}
                    />

                    {/* Quote Icon Background */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            opacity: 0.05,
                            color: theme.palette.text.secondary, // Fixed: Use light text for contrast
                            transform: 'rotate(10deg)',
                            pointerEvents: 'none',
                        }}
                    >
                        <Quote size={120} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ position: 'relative', zIndex: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        
                        <Box sx={{ mb: 3 }}>
                            <Quote size={32} color={theme.palette.primary.main} style={{ marginBottom: 16, opacity: 0.8 }} />
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.6,
                                    fontStyle: 'italic',
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                "{data.quote}"
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                            <Avatar 
                                src={data.image} 
                                alt={data.name}
                                sx={{ 
                                    width: 48, 
                                    height: 48,
                                    bgcolor: theme.palette.primary.main,
                                    fontWeight: 'bold'
                                }}
                            >
                                {data.name.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.secondary }}> {/* Fixed: Light color */}
                                    {data.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
                                    {data.role}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </motion.div>
        </motion.div>
    );
};

export default TestimonialCard;
