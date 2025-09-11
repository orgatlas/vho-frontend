import React, {useEffect} from 'react';
import {Box, useTheme, useMediaQuery} from '@mui/material';
import {HeroSection} from '../components/HeroSection';
import {HeroSectionMobile} from '../components/HeroSectionMobile';
import {TrustSection} from '../components/TrustSection';
import {StatsSection} from '../components/StatsSection';
import {HowItWorksSection} from '../components/HowItWorksSection';
import {DemoSection} from '../components/DemoSection';
import BeforeAfterSection from '../components/BeforeAfterSection';
import {FaqSection} from 'src/features/landing/components/FaqSection';
import {Footer} from '../components/Footer';
import {PricingCalculator} from '../components/PricingCalculator';
import {Testimonials} from '../components/Testimonials';
import {marketingViewHomepage} from "src/marketing/marketing_api";
import {MobileAddressInput} from '../components/MobileAddressInput';

export const LandingPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (process.env.REACT_APP_MARKETING === 'on') {
            marketingViewHomepage()
        }
    }, []);

    return (
        <Box>
            {isMobile ? <HeroSectionMobile/> : <HeroSection/>}
            <TrustSection/>
            <Testimonials/>
            <BeforeAfterSection/>
            <HowItWorksSection/>
            <StatsSection/>
            {/*<DemoSection/>*/}
            <FaqSection/>
            <PricingCalculator/>
            <Footer/>
            {isMobile && <MobileAddressInput/>}
        </Box>
    );
};
