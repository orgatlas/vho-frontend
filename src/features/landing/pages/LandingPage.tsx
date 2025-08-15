import React from 'react';
import { Box } from '@mui/material';
import { HeroSection } from '../components/HeroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { DemoSection } from '../components/DemoSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
    return (
        <Box>
            <HeroSection />
            <HowItWorksSection />
            <DemoSection />
            <FaqSection />
            <Footer />
        </Box>
    );
};