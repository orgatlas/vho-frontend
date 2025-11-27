import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
    Grid,
    alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const FAQS = [
    {
        question: 'How long will my video take?',
        answer: 'It depends on the amount of images your listing has. Allow for 10-15 minutes per image. If you uploaded 5 images, your video should be ready in 50 - 75 minutes',
    },
    {
        question: 'What types of listings are supported?',
        answer: 'Our platform supports most major real estate listing websites. Just paste the link, and we will do our best to extract the information. If you encounter an unsupported site, please let us know!',
    },
    {
        question: 'Can I edit the video after it’s created?',
        answer: 'Yes! After the initial video is generated, you can make an account to access the video editor where you can reorder scenes and modify the script if necessary. You can also change background music and the narrator voice if you selected a premium package.',
    },
    {
        question: 'Do I need to install any software?',
        answer: 'No, our platform is entirely web-based. All you need is a modern web browser to create, edit, and manage your videos.',
    },
    {
        question: 'Is there a free trial?',
        answer: 'Unfortunately, we dont offer a free trial. But no worries! We guarantee you will be satisfied or we will give you your money back! Just email our friendly support team.',
    },
    {
        question: 'Can I use my own branding in the video?',
        answer: 'Yes! You can add your companies logo to our virtual tours. Simply select where you would like the logo placed in the video settings.',
    },
];

export const FaqSection = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState('panel0'); // Open first one by default

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : '');
    };

    return (
        <Box
            id="faq"
            sx={{
                py: { xs: 8, md: 16 },
                backgroundColor: theme.palette.background.default,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Elements */}
            <Box
                component={motion.div}
                animate={{
                    y: [0, -30, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: -100,
                    width: { xs: 300, md: 500 },
                    height: { xs: 300, md: 500 },
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
                    opacity: 0.6,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />
            <Box
                component={motion.div}
                animate={{
                    y: [0, 40, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                sx={{
                    position: 'absolute',
                    bottom: -100,
                    right: -100,
                    width: { xs: 400, md: 600 },
                    height: { xs: 400, md: 600 },
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                    opacity: 0.3,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={{ xs: 6, md: 10 }}>

                    {/* Left Column: Sticky Header */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: { md: 'sticky' }, top: 120 }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <Typography variant="overline" sx={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 800,
                                    letterSpacing: 1.5,
                                    mb: 1,
                                    display: 'block'
                                }}>
                                    SUPPORT
                                </Typography>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 800,
                                        color: theme.palette.text.primary,
                                        mb: 2,
                                        fontSize: { xs: '2rem', md: '2.5rem' },
                                        lineHeight: 1.1
                                    }}
                                >
                                    Frequently Asked <br />
                                    <Box component="span" sx={{ color: theme.palette.primary.main }}>Questions.</Box>
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: alpha(theme.palette.text.primary, 0.7),
                                        mb: 4,
                                        fontSize: '1.1rem',
                                        lineHeight: 1.6
                                    }}
                                >
                                    Can't find the answer you're looking for? Reach out to our friendly support team.
                                </Typography>

                                <Link to="/support" style={{ textDecoration: 'none' }}>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 1.5,
                                        alignItems: 'center',
                                        color: theme.palette.primary.dark,
                                        cursor: 'pointer'
                                    }}>
                                        <Box sx={{ p: 1, borderRadius: '50%' }}>
                                            <HelpCircle size={20} />
                                        </Box>
                                        <Typography variant="button" fontWeight="700"
                                            sx={{ textTransform: 'none', fontSize: '1rem' }}>
                                            Contact Support
                                        </Typography>
                                    </Box>
                                </Link>
                            </motion.div>
                        </Box>
                    </Grid>

                    {/* Right Column: Animated Accordion List */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {FAQS.map((faq, index) => {
                                const panelId = `panel${index}`;
                                const isExpanded = expanded === panelId;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Accordion
                                            expanded={isExpanded}
                                            onChange={handleChange(panelId)}
                                            elevation={0}
                                            disableGutters
                                            sx={{
                                                backgroundColor: 'white',
                                                borderRadius: '16px !important',
                                                overflow: 'hidden',
                                                border: '1px solid',
                                                borderColor: isExpanded ? theme.palette.primary.main : 'transparent',
                                                transition: 'all 0.3s ease',
                                                '&:before': { display: 'none' },
                                                boxShadow: isExpanded
                                                    ? `0 15px 30px -10px ${alpha(theme.palette.secondary.light, 0.5)}`
                                                    : `0 4px 6px -4px rgba(0,0,0,0.05)`
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={
                                                    <Box sx={{
                                                        color: isExpanded ? 'white' : alpha(theme.palette.text.primary, 0.5),
                                                        bgcolor: isExpanded ? theme.palette.primary.main : alpha(theme.palette.background.default, 0.8),
                                                        p: 0.5,
                                                        borderRadius: '8px',
                                                        display: 'flex',
                                                        transition: 'all 0.3s ease'
                                                    }}>
                                                        {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                                                    </Box>
                                                }
                                                aria-controls={`${panelId}bh-content`}
                                                id={`${panelId}bh-header`}
                                                sx={{
                                                    px: 3,
                                                    py: 1,
                                                    flexDirection: 'row-reverse', // Icon on left? Or right? Material default is right.
                                                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                                                        transform: 'rotate(180deg)',
                                                    },
                                                    '& .MuiAccordionSummary-content': {
                                                        marginLeft: 2
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontSize: '1.1rem',
                                                        fontWeight: isExpanded ? 700 : 600,
                                                        color: isExpanded ? theme.palette.primary.dark : theme.palette.text.primary
                                                    }}
                                                >
                                                    {faq.question}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, ml: { sm: 6 } }}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: alpha(theme.palette.text.primary, 0.7),
                                                        lineHeight: 1.7,
                                                    }}
                                                >
                                                    {faq.answer}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </motion.div>
                                );
                            })}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};