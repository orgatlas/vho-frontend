import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import Features from "../components/Features";
import GalleryComparison from "../components/GalleryComparison";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import ROICalculator from "../components/ROICalculator";
import CaseStudies from "../components/CaseStudies";
import Pricing from "../components/Pricing";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import FAQSection from "../components/FaqSection"
import {marketingViewHomepage} from "src/marketing/marketing_api";
import {Box} from '@mui/material';

export default function LandingPage() {
    useEffect(() => {
        if (process.env.REACT_APP_MARKETING === 'on') {
            marketingViewHomepage()
        }
    }, []);

    return (
        <Box>
            <Hero/>
            <ProblemSolution/>
            <BeforeAfterSlider/>
            <Features/>
            <GalleryComparison/>
            <Stats/>
            {/*<Testimonials/>*/}
            {/*<ROICalculator/>*/}
            {/*<CaseStudies/>*/}
            {/*<Pricing/>*/}
            {/*<FAQSection/>*/}
            <FinalCTA/>
            <Footer/>
            {/*<StickyCTA/>*/}
        </Box>
    );
}