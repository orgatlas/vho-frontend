import React, {useEffect} from 'react';
import {Box, useTheme, useMediaQuery} from '@mui/material';
import {HeroSection} from '../components/HeroSection';
import {StatsSection} from '../components/StatsSection';
import {HowItWorksSection} from '../components/HowItWorksSection';
import {FaqSection} from 'src/features/landing/components/FaqSection';
import {Footer} from '../components/Footer';
import {Pricing} from '../components/Pricing';
import {Testimonials} from '../components/Testimonials';
import {marketingViewHomepage} from "src/marketing/marketing_api";
import VirtualStagingDemo from "src/features/landing/components/VirtualStagingDemo";
import {SocialComingSoon} from "src/features/landing/components/SocialComingSoon";
import VirtualTourDemo from "src/features/landing/components/VirtualTourDemo";
import VirtualTourGallery from "src/features/landing/components/VirtualTourGallery";
import {CallToAction} from "../components/CallToAction";

export const LandingPage: React.FC = () => {
    const theme = useTheme();

    useEffect(() => {
        if (process.env.REACT_APP_MARKETING === 'on') {
            marketingViewHomepage()
        }
    }, []);

    return (
        <Box>
            <HeroSection/>
            <VirtualStagingDemo/>
            <VirtualTourDemo/>
            <VirtualTourGallery/>
            <SocialComingSoon/>
            <HowItWorksSection/>
            <StatsSection/>
            <Testimonials/>
            <FaqSection/>
            <Pricing/>
            <CallToAction/>
            <Footer/>
        </Box>
    );
};
