import React from 'react';
import { Box, Card, CardContent, Typography, Button, Container, Grid, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const PRICING_PLANS = [
    {
        id: 'staging',
        title: 'Virtual Staging',
        description: 'Transform empty rooms into beautifully furnished spaces using our SmartDesigner technology.',
        price: '$95',
        period: 'per listing',
        features: [
            'Up to 20 images per listing',
            'Ready in minutes!',
            'Smart Interior Designer',
            'Money Back Guarantee',
        ],
        highlight: false
    },
    {
        id: 'tour',
        title: 'Virtual Property Tour',
        description: 'Bring listings to life with cinematic, sales focussed property tours.',
        price: '$149',
        period: 'per listing',
        features: [
            'Static Image to Dynamic Video',
            'Professional Sales Script',
            'Voice Over & Music',
            'Widescreen HD Video',
            'Custom Branding',
            'Money Back Guarantee',
        ],
        highlight: false
    },
    {
        id: 'combo',
        title: 'Staged Property Tour',
        description: 'Combine virtual staging with our property tours to showcase fully furnished spaces in motion.',
        price: '$199',
        period: 'per listing',
        features: [
            'Includes Full Virtual Staging',
            'Smooth Cinematic Transitions',
            'Perfect for Premium Listings',
            'Priority Support',
            'Money Back Guarantee',
        ],
        highlight: true
    },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

export const Pricing = () => {
    const theme = useTheme();
    return (
        <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: theme.palette.background.default, overflow: 'hidden' }} id="pricing">
            <Container maxWidth="lg">

                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 700, mx: 'auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography variant="h2" sx={{ color: theme.palette.text.primary, fontWeight: 800, mb: 2 }}>
                            Pay per listing. <br/>
                            <span style={{ color: theme.palette.primary.main }}>No hidden fees.</span>
                        </Typography>
                        <Typography variant="body1" sx={{ color: alpha(theme.palette.text.primary, 0.7), fontSize: '1.1rem' }}>
                            Choose the package that fits your property marketing needs. All plans include our satisfaction guarantee.
                        </Typography>
                    </motion.div>
                </Box>

                {/* Pricing Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <Grid container spacing={4} alignItems="stretch">
                        {PRICING_PLANS.map((plan) => (
                            <Grid item xs={12} md={4} key={plan.id} sx={{ display: 'flex' }}>
                                <motion.div
                                    variants={cardVariants}
                                    style={{ width: '100%', display: 'flex' }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Card
                                        elevation={plan.highlight ? 8 : 0}
                                        sx={{
                                            width: '100%',
                                            borderRadius: '24px',
                                            border: plan.highlight ? `2px solid ${theme.palette.primary.main}` : `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                                            bgcolor: 'white',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'visible', // Allow badge to pop out
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {/* Popular Badge */}
                                        {plan.highlight && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: -16,
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    bgcolor: theme.palette.primary.dark,
                                                    color: 'white',
                                                    py: 0.5, px: 2,
                                                    borderRadius: '50px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                                    zIndex: 10
                                                }}
                                            >
                                                <Sparkles size={14} />
                                                <Typography variant="caption" fontWeight={700} letterSpacing={1}>
                                                    MOST POPULAR
                                                </Typography>
                                            </Box>
                                        )}

                                        <CardContent sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column' }}>

                                            {/* Title & Price */}
                                            <Box sx={{ mb: 3, textAlign: 'center' }}>
                                                <Typography variant="h5" fontWeight={800} gutterBottom color={theme.palette.text.primary}>
                                                    {plan.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.primary" sx={{ minHeight: '48px', mb: 2 }}>
                                                    {plan.description}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
                                                    <Typography variant="h3" fontWeight={800} color={plan.highlight ? theme.palette.primary.main : theme.palette.text.primary}>
                                                        {plan.price}
                                                    </Typography>
                                                    <Typography variant="subtitle2" color="text.primary">
                                                        {plan.period}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Feature List */}
                                            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', flexGrow: 1, mb: 4 }}>
                                                {plan.features.map((feature, idx) => (
                                                    <Box
                                                        component="li"
                                                        key={idx}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                            gap: 1.5,
                                                            mb: 2,
                                                            color: alpha(theme.palette.text.primary, 0.8)
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            mt: 0.25,
                                                            p: 0.25,
                                                            borderRadius: '50%',
                                                            width: 20,
                                                            height: 20,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            bgcolor: plan.highlight ? theme.palette.secondary.light : alpha(theme.palette.background.default, 0.8),
                                                            color: plan.highlight ? theme.palette.primary.dark : alpha(theme.palette.text.primary, 0.4)
                                                        }}>
                                                            <Check size={14} strokeWidth={3} />
                                                        </Box>
                                                        <Typography variant="body2" fontWeight={500}>
                                                            {feature}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>

                                            {/* CTA Button */}
                                            <Button
                                                variant={plan.highlight ? "contained" : "outlined"}
                                                fullWidth
                                                size="large"
                                                href="#"
                                                sx={{
                                                    py: 1.5,
                                                    borderRadius: '12px',
                                                    fontWeight: 700,
                                                    fontSize: '1rem',
                                                    textTransform: 'none',
                                                    bgcolor: plan.highlight ? theme.palette.primary.main : 'transparent',
                                                    color: plan.highlight ? 'white' : theme.palette.text.primary,
                                                    borderColor: plan.highlight ? 'transparent' : alpha(theme.palette.text.primary, 0.3),
                                                    '&:hover': {
                                                        bgcolor: plan.highlight ? theme.palette.primary.dark : alpha(theme.palette.background.default, 0.5),
                                                        borderColor: plan.highlight ? 'transparent' : theme.palette.primary.main,
                                                    }
                                                }}
                                            >
                                                Get Started
                                            </Button>

                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>

            </Container>
        </Box>
    );
};