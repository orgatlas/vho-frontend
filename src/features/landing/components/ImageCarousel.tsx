import React, {useEffect, useRef, useState} from "react";
import {Box, Button, MobileStepper} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import img1 from 'src/assets/images/demo/1.jpg';
import img2 from 'src/assets/images/demo/2.jpg';
import img3 from 'src/assets/images/demo/3.jpg';
import img4 from 'src/assets/images/demo/4.jpg';
import img5 from 'src/assets/images/demo/5.jpg';
import img6 from 'src/assets/images/demo/6.jpg';

const images = [
    {label: 'Exterior', imgPath: img1},
    {label: 'Kitchen', imgPath: img2},
    {label: 'Living Room', imgPath: img3},
    {label: 'Bedroom', imgPath: img4},
    {label: 'Bathroom', imgPath: img5},
    {label: 'Garden', imgPath: img6},
];


export const ImageCarousel: React.FC = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
    };

    return (
        <Box sx={{flexGrow: 1, borderRadius: '12px', overflow: 'hidden', position: 'relative'}}>
            <Box
                component="img"
                sx={{
                    height: 450,
                    display: 'block',
                    width: '100%',
                    objectFit: 'cover',
                }}
                src={images[activeStep].imgPath}
                alt={images[activeStep].label}
            />
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{bgcolor: 'transparent', borderTop: `1px solid ${theme.palette.divider}`}}
                nextButton={
                    <Button size="small" onClick={handleNext}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                        Back
                    </Button>
                }
            />
        </Box>
    );
};