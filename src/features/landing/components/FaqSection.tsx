import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
    Grid
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
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

export const FaqSection: React.FC = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState<string | false>('panel0');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            id="faq"
            sx={{
                py: { xs: 8, md: 12 },
                backgroundColor: theme.palette.background.default,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Elements (Matches HeroSection) */}
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
                    opacity: 0.4,
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
                    background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, transparent 70%)`,
                    opacity: 0.3,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={6}>
                    {/* Header Column */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 700,
                                        color: theme.palette.text.primary,
                                        mb: 2,
                                        fontSize: { xs: '2rem', md: '2.5rem' }
                                    }}
                                >
                                    Frequently Asked <Box component="span" sx={{ color: theme.palette.primary.main }}>Questions.</Box>
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.primary,
                                        opacity: 0.7,
                                        mb: 4,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Can't find the answer you're looking for? Reach out to our friendly support team.
                                </Typography>
                                
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', color: theme.palette.primary.main }}>
                                    <HelpCircle size={24} />
                                    <Typography variant="button" fontWeight="bold">Contact Support</Typography>
                                </Box>
                            </motion.div>
                        </Box>
                    </Grid>

                    {/* FAQ List Column */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {faqs.map((faq, index) => {
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
                                            sx={{
                                                backgroundColor: theme.palette.background.paper,
                                                color: theme.palette.text.secondary,
                                                borderRadius: '16px !important',
                                                overflow: 'hidden',
                                                mb: 0,
                                                border: isExpanded ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                                                transition: 'all 0.3s ease',
                                                '&:before': {
                                                    display: 'none',
                                                },
                                                boxShadow: isExpanded 
                                                    ? `0 10px 30px -10px rgba(0,0,0,0.5)` 
                                                    : `0 4px 10px -4px rgba(0,0,0,0.1)`
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={
                                                    isExpanded 
                                                        ? <Minus size={20} color={theme.palette.primary.main} /> 
                                                        : <Plus size={20} color={theme.palette.text.secondary} />
                                                }
                                                aria-controls={`${panelId}bh-content`}
                                                id={`${panelId}bh-header`}
                                                sx={{
                                                    px: 3,
                                                    py: 1,
                                                    '& .MuiAccordionSummary-content': {
                                                        margin: '12px 0',
                                                    }
                                                }}
                                            >
                                                <Typography 
                                                    variant="h6" 
                                                    sx={{ 
                                                        fontSize: '1.1rem', 
                                                        fontWeight: isExpanded ? 600 : 500,
                                                        color: isExpanded ? theme.palette.primary.main : theme.palette.text.secondary
                                                    }}
                                                >
                                                    {faq.question}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                                                <Typography 
                                                    sx={{ 
                                                        color: theme.palette.secondary.light,
                                                        lineHeight: 1.6,
                                                        opacity: 0.9
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
