import React, {useState} from 'react';
import {Box, CircularProgress, Container, Typography} from '@mui/material';
import FAQSection from 'src/features/landing/components/FaqSection';
import {ContactForm} from '../components/ContactForm';
import {submitContactForm} from "src/services/api";
import {toast} from "react-toastify";
import {PriceDisplay} from "@/components/PriceDisplay";

export const SupportPage: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSend = async (details: { firstName: string; lastName: string; email: string; message: string }) => {
        setLoading(true);
        const response = await submitContactForm(details.firstName, details.lastName, details.email, details.message);
        if (response.success) {
            toast.success('Support request sent!');
            setIsSubmitted(true);
        }
        setLoading(false);
    };

    return (
        <Box>
            <Container maxWidth="md" sx={{py: {xs: 4, md: 8}}}>
                <Typography variant="h2" component="h1" textAlign="center" fontWeight="bold" gutterBottom>
                    Support
                </Typography>
                {isSubmitted ? (
                    <Box sx={{textAlign: 'center', py: 4}}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Thank you!
                        </Typography>
                        <Typography variant="body1">
                            Your message has been sent. We'll get back to you shortly.
                        </Typography>
                    </Box>
                ) : (
                    <ContactForm onSend={handleSend} loading={loading} />
                )}

            </Container>
            <FAQSection/>
        </Box>
    );
};