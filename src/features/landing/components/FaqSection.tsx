import React from 'react';
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {SectionHeader} from "src/theme/components/SectionHeader";
import {useTheme} from "@mui/material/styles";

const faqs = [
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
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const FaqSection: React.FC = () => {
    const theme = useTheme();
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: theme.palette.secondary.light }} id={'faq'}>
            <Container maxWidth="md">
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Here are some of the most common questions we get."
                />
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
                    <Box sx={{ mt: 4 }}>
                        {faqs.map((faq, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Accordion
                                    variant={'outlined'}
                                    sx={{
                                        mb: 2,
                                        borderRadius: '12px',
                                        borderColor: 'grey.300',
                                        bgcolor: 'background.default',
                                        '&:before': {
                                            display: 'none',
                                        },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls={`panel${index}a-content`}
                                        id={`panel${index}a-header`}
                                        sx={{ '& .MuiAccordionSummary-content': { mr: 2} }}
                                    >
                                        <Typography variant="h6" fontWeight={'bold'}>{faq.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="text.secondary">
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </motion.div>
                        ))}
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};