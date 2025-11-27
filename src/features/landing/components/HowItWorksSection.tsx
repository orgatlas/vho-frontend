import React from 'react';
import { Box, Typography, Container, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { MapPin, UploadCloud, Wand2, SlidersHorizontal, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
    {
        id: 1,
        title: "Enter Address",
        description: "Start by typing your listing address. We instantly fetch available data to jumpstart the process.",
        icon: MapPin,
        color: 'primary.main'
    },
    {
        id: 2,
        title: "Upload & Confirm",
        description: "Drag and drop your photos and confirm property and agent details.",
        icon: UploadCloud,
        color: 'primary.main'
    },
    {
        id: 3,
        title: "Refine & Download",
        description: "When we're done, you'll be notified via email. Use our editor to tweak staging, scripts, or video if something needs adjustment.",
        icon: Wand2,
        color: 'primary.dark',
        highlight: true // Special styling for the final step
    }
];

export const HowItWorksSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50, damping: 20 }
        }
    };

    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 }
        }
    };

    return (
        <Box sx={{ py: { xs: 8, md: 16 }, bgcolor: 'white', position: 'relative', overflow: 'hidden' }}>
            <Container maxWidth="lg">

                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 }, maxWidth: 700, mx: 'auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography variant="h2" sx={{ color: 'text.primary', fontWeight: 800, mb: 2 }}>
                            From listing to launch in <br/>
                            <span style={{ color: 'primary.main' }}>three simple steps.</span>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '1.1rem' }}>
                            We've stripped away the complexity. You don't need even need to leave the office.
                        </Typography>
                    </motion.div>
                </Box>

                {/* Steps Container */}
                <Box sx={{ position: 'relative' }}>

                    {/* CONNECTING LINE (SVG) */}
                    {/* We absolutely position this SVG behind the grid items */}
                    <Box
                        component={motion.svg}
                        viewBox={isMobile ? "0 0 100 800" : "0 0 1200 200"}
                        fill="none"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        sx={{
                            position: 'absolute',
                            top: isMobile ? 0 : '40px',
                            left: isMobile ? '50%' : 0,
                            width: '100%',
                            height: isMobile ? '100%' : 'auto',
                            zIndex: 0,
                            pointerEvents: 'none',
                            transform: isMobile ? 'translateX(-50%)' : 'none',
                            display: 'block'
                        }}
                    >
                        {isMobile ? (
                            // Vertical Line for Mobile
                            <motion.path
                                d="M50 0 L50 800"
                                stroke={theme.palette.primary.light}
                                strokeWidth="4"
                                strokeDasharray="12 12"
                                variants={lineVariants}
                            />
                        ) : (
                            // Horizontal Curve for Desktop
                            <motion.path
                                d="M150 100 C 400 100, 400 100, 600 100 S 800 100, 1050 100"
                                stroke={theme.palette.primary.light}
                                strokeWidth="4"
                                strokeDasharray="12 12"
                                variants={lineVariants}
                            />
                        )}
                    </Box>

                    <Grid
                        container
                        spacing={4}
                        component={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {STEPS.map((step, index) => (
                            <Grid item xs={12} md={4} key={step.id}>
                                <motion.div variants={itemVariants} style={{ height: '100%', position: 'relative', zIndex: 1 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 4,
                                            height: '100%',
                                            borderRadius: '24px',
                                            bgcolor: 'white',
                                            border: '1px solid',
                                            borderColor: step.highlight ? theme.palette.primary.main : 'grey.200',
                                            textAlign: 'center',
                                            position: 'relative',
                                            transition: 'all 0.3s ease',
                                            boxShadow: step.highlight ? `0 20px 40px ${theme.palette.primary.light}80` : 'none',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: `0 20px 40px ${theme.palette.primary.light}`
                                            }
                                        }}
                                    >
                                        {/* Step Number Badge */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -20,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                bgcolor: 'white',
                                                p: 1,
                                                borderRadius: '50%'
                                            }}
                                        >
                                            <Box sx={{
                                                width: 40, height: 40,
                                                borderRadius: '50%',
                                                bgcolor: step.highlight ? theme.palette.primary.dark : theme.palette.primary.light,
                                                color: step.highlight ? 'white' : theme.palette.primary.dark,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 800,
                                                border: `4px solid white`,
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                            }}>
                                                {step.id}
                                            </Box>
                                        </Box>

                                        {/* Icon */}
                                        <Box
                                            sx={{
                                                mt: 2, mb: 3,
                                                display: 'inline-flex',
                                                p: 2,
                                                borderRadius: '20px',
                                                bgcolor: step.highlight ? theme.palette.primary.dark : theme.palette.primary.main,
                                                color: 'text.secondary'
                                            }}
                                        >
                                            <step.icon size={32} strokeWidth={1.5} />
                                        </Box>

                                        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: 'text.primary' }}>
                                            {step.title}
                                        </Typography>

                                        <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.6, mb: 2 }}>
                                            {step.description}
                                        </Typography>

                                        {/* Editor Feature Highlight (Step 3 only) */}
                                        {step.highlight && (
                                            <Box
                                                sx={{
                                                    mt: 3,
                                                    pt: 3,
                                                    borderTop: `1px dashed ${theme.palette.primary.light}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 1
                                                }}
                                            >
                                                <SlidersHorizontal size={16} color={theme.palette.primary.main} />
                                                <Typography variant="caption" fontWeight={700} color={theme.palette.primary.main}>
                                                    INCLUDES SMART EDITOR
                                                </Typography>
                                            </Box>
                                        )}
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Container>
        </Box>
    );
};