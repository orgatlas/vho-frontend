import React from 'react';
import {Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails, Paper} from '@mui/material';
import {motion} from 'framer-motion';
import {SectionHeader} from "src/theme/components/SectionHeader";
import {useTheme} from "@mui/material/styles";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FaqBgImage from 'src/assets/images/demo/3.jpg'; // Using one of the demo images for the background

const faqs = [
    {
        question: 'How long will my video take?',
        answer: 'It depends on the amount of images your listing has. Allow for 10-15 minutes per image. If you uploaded 10 images, your video should be ready in 1h40m - 2h30m',
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
        question: 'How much does it cost?',
        answer: 'Our pricing ranges based on the amount of images in your listing, and the settings you wish to apply to your video. You can use our pricing calculator to see our available packages.',
    },
    {
        question: 'Can I use my own branding in the video?',
        answer: 'This functionality is coming soon, stay tuned!',
    },
];

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {staggerChildren: 0.1, delayChildren: 0.2},
    },
};

const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {y: 0, opacity: 1, transition: {duration: 0.5, ease: "easeOut"}},
};

export const FaqSection: React.FC = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState<string | false>('panel0');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const glassmorphicStyles = {
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
    };

    return (
        <Box sx={{
            position: 'relative',
            py: {xs: 8, md: 12},
            overflow: 'hidden',
        }} id={'faq'}>
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${FaqBgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)',
                }
            }}/>

            <Container maxWidth="md" sx={{position: 'relative', zIndex: 2}}>
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Can't find the answer you're looking for? Reach out to our friendly support team."
                    color={'text.secondary'}
                />
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.2}}
                    variants={containerVariants}
                >
                    <Box sx={{mt: 6, display: 'flex', flexDirection: 'column', gap: 2}}>
                        {faqs.map((faq, index) => {
                            const panelId = `panel${index}`;
                            const isExpanded = expanded === panelId;
                            return (
                                <motion.div key={index} variants={itemVariants}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            ...glassmorphicStyles,
                                            ...(isExpanded && {
                                                boxShadow: `0 0 20px ${theme.palette.primary.light}33`,
                                            }),
                                        }}
                                    >
                                        <Accordion
                                            disableGutters
                                            elevation={0}
                                            expanded={isExpanded}
                                            onChange={handleChange(panelId)}
                                            sx={{
                                                '&:before': {display: 'none'},
                                                bgcolor: 'transparent',
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={isExpanded ? <RemoveCircleOutlineIcon color="primary"/> :
                                                    <AddCircleOutlineIcon sx={{color: 'text.primary'}}/>}
                                                aria-controls={`${panelId}a-content`}
                                                id={`${panelId}a-header`}
                                                sx={{
                                                    py: 1.5,
                                                    px: 3,
                                                    '& .MuiAccordionSummary-content': {mr: 2},
                                                }}
                                            >
                                                <Typography variant="h6" component="p"
                                                            sx={{fontWeight: 500, color: 'text.primary'}}>
                                                    {faq.question}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{px: 3, pb: 3, pt: 0}}>
                                                <Typography color="text.primary" sx={{
                                                    '& a': {
                                                        color: 'primary.main',
                                                        textDecoration: 'none',
                                                        '&:hover': {
                                                            textDecoration: 'underline',
                                                        }
                                                    }
                                                }}>
                                                    {faq.answer}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Paper>
                                </motion.div>
                            );
                        })}
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};