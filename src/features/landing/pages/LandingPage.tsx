import React, {useEffect, Suspense, lazy} from 'react';
import {Box, useTheme, useMediaQuery} from '@mui/material';
import {HeroSection} from '../components/HeroSection';
import {marketingViewHomepage} from "src/marketing/marketing_api";
import LoadingWheel from "src/theme/loading";

// Lazy Load Components
const VirtualStagingDemo = lazy(() => import("src/features/landing/components/VirtualStagingDemo"));
const VirtualTourDemo = lazy(() => import("src/features/landing/components/VirtualTourDemo"));
const VirtualTourGallery = lazy(() => import("src/features/landing/components/VirtualTourGallery"));
const SocialComingSoon = lazy(() => import("src/features/landing/components/SocialComingSoon").then(module => ({ default: module.SocialComingSoon })));
const HowItWorksSection = lazy(() => import('../components/HowItWorksSection').then(module => ({ default: module.HowItWorksSection })));
const StatsSection = lazy(() => import('../components/StatsSection').then(module => ({ default: module.StatsSection })));
const Testimonials = lazy(() => import('../components/Testimonials').then(module => ({ default: module.Testimonials })));
const FaqSection = lazy(() => import('src/features/landing/components/FaqSection').then(module => ({ default: module.FaqSection })));
const Pricing = lazy(() => import('../components/Pricing').then(module => ({ default: module.Pricing })));
const CallToAction = lazy(() => import("../components/CallToAction").then(module => ({ default: module.CallToAction })));
const Footer = lazy(() => import('../components/Footer').then(module => ({ default: module.Footer })));

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
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <VirtualStagingDemo/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <VirtualTourDemo/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <VirtualTourGallery/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <SocialComingSoon/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <HowItWorksSection/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <StatsSection/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <Testimonials/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <FaqSection/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <Pricing/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <CallToAction/>
            </Suspense>
            <Suspense fallback={<Box py={10}><LoadingWheel/></Box>}>
                <Footer/>
            </Suspense>
        </Box>
    );
};
