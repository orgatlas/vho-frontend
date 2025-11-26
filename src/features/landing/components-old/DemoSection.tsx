import React from 'react';
import {useTheme} from '@mui/material/styles';
import {Box, Container, Grid, Paper, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {SectionHeader} from "src/theme/components/SectionHeader";
import {ImageCarousel} from "./ImageCarousel";
import {VideoPlayer} from "./VideoPlayer";
import {Property} from "src/types";
import video from 'src/assets/images/demo/video.mp4';

// It's best to import slick-carousel CSS in a global file like index.tsx or App.tsx

const demoProperties: Property[] = [
    {
        id: 1,
        address: '123 Ocean Breeze, Malibu',
        bedrooms: 4,
        bathrooms: 3,
        car_spaces: 2,
        images: [{id: 1, file: '/src/assets/images/demo/1.png'}],
        user_id: 1
    },
    {
        id: 2,
        address: '456 Skyline Drive, Beverly Hills',
        bedrooms: 5,
        bathrooms: 6,
        car_spaces: 4,
        images: [{id: 2, file: '/src/assets/images/demo/2.png'}],
        user_id: 1
    },
    {
        id: 3,
        address: '789 Sunset Vista, Hollywood',
        bedrooms: 3,
        bathrooms: 4,
        car_spaces: 2,
        images: [{id: 3, file: '/src/assets/images/demo/3.png'}],
        user_id: 1
    },
    {
        id: 4,
        address: '101 Hilltop Rd, San Francisco',
        bedrooms: 4,
        bathrooms: 3,
        car_spaces: 2,
        images: [{id: 4, file: '/src/assets/images/demo/4.png'}],
        user_id: 1
    },
    {
        id: 5,
        address: '210 Desert Rose, Palm Springs',
        bedrooms: 2,
        bathrooms: 2,
        car_spaces: 1,
        images: [{id: 5, file: '/src/assets/images/demo/5.png'}],
        user_id: 1
    },
];

interface ShowcaseCardProps {
    property: Property;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({property}) => {
    const theme = useTheme();
    const imageUrl = property.images && property.images.length > 0 ? property.images[0].file : '';

    return (
        <Box sx={{
            position: 'relative',
            height: '150px',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            boxShadow: theme.shadows[2],
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[5],
            }
        }}>
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 40%)',
            }}/>
            <Typography sx={{
                position: 'relative',
                zIndex: 1,
                color: 'common.white',
                fontWeight: 500,
                fontSize: '0.9rem',
                p: 2,
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}>
                {property.address}
            </Typography>
        </Box>
    );
};

export const DemoSection: React.FC = () => {
    const theme = useTheme();

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <Box id={'demo'}
             sx={{
                 height: '100vh',
                 overflow: 'hidden',
                 py: {xs: 4, md: 6},
                 display: 'flex',
                 flexDirection: 'column'
             }}>
            <Container maxWidth="lg" sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true, amount: 0.1}}
                            transition={{duration: 0.5}}>
                    <SectionHeader
                        title="See It in Action"
                        subtitle="From static photos to a cinematic video tour. Experience the transformation."
                    />
                </motion.div>

                <Box sx={{flex: 1, minHeight: 0, mt: {xs: 1, md: 1}}}>
                    <Grid container spacing={{xs: 2, md: 3}} alignItems="stretch" sx={{height: '100%'}}>
                        <Grid item xs={12} md={8} sx={{height: {xs: '50%', md: '100%'}}}>
                            <Paper
                                sx={{height: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: theme.shadows[6]}}>
                                <VideoPlayer videoUrl={video}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{height: {xs: '50%', md: '100%'}}}>
                            <Paper
                                sx={{height: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: theme.shadows[4]}}>
                                <ImageCarousel/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{mt: {xs: 2, md: 2}, '.slick-slide > div': {p: 1.5}}}>
                    <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true, amount: 0.1}}
                                transition={{duration: 0.5, delay: 0.2}}>
                        <Slider {...sliderSettings}>
                            {demoProperties.map((property) => (
                                <Box key={property.id}>
                                    <ShowcaseCard property={property}/>
                                </Box>
                            ))}
                        </Slider>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
};