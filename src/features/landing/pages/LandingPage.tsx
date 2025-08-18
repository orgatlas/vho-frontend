import React from 'react';
import { Box } from '@mui/material';
import { HeroSection } from '../components/HeroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { DemoSection } from '../components/DemoSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { PricingCalculator } from '../components/PricingCalculator';

export const LandingPage: React.FC = () => {
    return (
        <Box>
            <HeroSection />
            <PricingCalculator />
            <HowItWorksSection />
            <DemoSection />
            <FaqSection />
            <Footer />
        </Box>
    );
};
