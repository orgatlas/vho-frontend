import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Box, Grid, Typography, useTheme } from '@mui/material';

interface TiltCardProps {
    product: {
        id: string;
        title: string;
        subtitle: string;
        description: string;
        link: string;
        image: string;
        icon: React.ReactNode;
        colSpan: number;
        height: number;
    };
}

const TiltCard: React.FC<TiltCardProps> = ({ product }) => {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Parallax
    const contentX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
    const contentY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

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
                        textDecoration: 'none', // Ensure no underline from anchor
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
                            backgroundColor: theme.palette.background.paper,
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
                            background: `linear-gradient(to top, ${theme.palette.background.paper} 0%, transparent 60%, rgba(0,0,0,0.4) 100%)`,
                            opacity: 0.9,
                        }} />
                        <Box
                            className="opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.main}, transparent 70%)`,
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
                            p: { xs: 3, md: 4, lg: 6 }, // Responsive padding
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            transform: 'translateZ(50px)',
                            pointerEvents: 'none',
                        }}
                    >
                        <Typography variant="h4" sx={{
                            color: theme.palette.text.secondary, // text_light
                            fontSize: { xs: '1.25rem', md: '1.75rem' },
                            fontWeight: 700,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                            mb: 0.5
                        }}>
                            {product.title}
                        </Typography>

                        <Typography variant="body1" sx={{
                            color: theme.palette.secondary.light, // light
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

export default TiltCard;
