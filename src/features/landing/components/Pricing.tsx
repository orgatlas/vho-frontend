import React from 'react';
import { Box, Card, CardContent, Typography, Button, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

// --- THEME ---
const THEME = {
    light: '#c2f2ed',
    normal: '#33998f',
    dark: '#02645b',
    text_dark: '#373e40',
    text_light: '#f2f2f2',
    paper: '#373e40'
};

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
    return (
        <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#f8fafc', overflow: 'hidden' }} id="pricing">
            <Container maxWidth="lg">

                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 700, mx: 'auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography variant="h2" sx={{ color: THEME.text_dark, fontWeight: 800, mb: 2 }}>
                            Pay per listing. <br/>
                            <span style={{ color: THEME.normal }}>No hidden fees.</span>
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1.1rem' }}>
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
                                            border: plan.highlight ? `2px solid ${THEME.normal}` : '1px solid #e2e8f0',
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
                                                    bgcolor: THEME.dark,
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
                                                <Typography variant="h5" fontWeight={800} gutterBottom color={THEME.text_dark}>
                                                    {plan.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.primary" sx={{ minHeight: '48px', mb: 2 }}>
                                                    {plan.description}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
                                                    <Typography variant="h3" fontWeight={800} color={plan.highlight ? THEME.normal : THEME.text_dark}>
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
                                                            color: '#475569'
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            mt: 0.5,
                                                            p: 0.25,
                                                            borderRadius: '50%',
                                                            bgcolor: plan.highlight ? THEME.light : '#f1f5f9',
                                                            color: plan.highlight ? THEME.dark : '#94a3b8'
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
                                                    bgcolor: plan.highlight ? THEME.normal : 'transparent',
                                                    color: plan.highlight ? 'white' : THEME.text_dark,
                                                    borderColor: plan.highlight ? 'transparent' : '#cbd5e1',
                                                    '&:hover': {
                                                        bgcolor: plan.highlight ? THEME.dark : '#f8fafc',
                                                        borderColor: plan.highlight ? 'transparent' : THEME.normal,
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