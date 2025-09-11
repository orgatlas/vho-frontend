import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import {HeroSection} from '../components/HeroSection';
import {HowItWorksSection} from '../components/HowItWorksSection';
import {DemoSection} from '../components/DemoSection';
import {FaqSection} from 'src/features/landing/components/FaqSection';
import {Footer} from '../components/Footer';
import {PricingCalculator} from '../components/PricingCalculator';
import {marketingViewHomepage} from "src/marketing/marketing_api";

export const LandingPage: React.FC = () => {
    useEffect(() => {
        if (process.env.REACT_APP_MARKETING === 'on') {
            marketingViewHomepage()
        }
    }, []);

    return (
        <Box>
            <HeroSection/>
            <DemoSection/>
            <HowItWorksSection/>
            <PricingCalculator/>
            <FaqSection/>
            <Footer/>
        </Box>
    );
};
