import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import { HeroSection } from '../components/HeroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { DemoSection } from '../components/DemoSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { PricingCalculator } from '../components/PricingCalculator';
import {marketingViewHomepage} from "src/services/api";

export const LandingPage: React.FC = () => {
    useEffect(() => {
        marketingViewHomepage()
    }, []);

    return (
        <Box>
            <HeroSection />
            <HowItWorksSection />
            <DemoSection />
            <PricingCalculator />
            <FaqSection />
            <Footer />
        </Box>
    );
};
