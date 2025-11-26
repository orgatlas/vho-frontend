import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { VideoPlayer } from './VideoPlayer';

// Import demo assets
import image1 from 'src/assets/images/demo/1.png';
import image2 from 'src/assets/images/demo/2.png';
import image3 from 'src/assets/images/demo/3.png';
import image4 from 'src/assets/images/demo/4.png';
import image5 from 'src/assets/images/demo/5.png';
import image6 from 'src/assets/images/demo/6.png';
import image7 from 'src/assets/images/demo/7.png';
import image8 from 'src/assets/images/demo/8.png';
import {SectionHeader} from "src/theme/components/SectionHeader";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];
const imageDurations = [
  1.5,
  1.65,
  1.6,
  1.65,
  1.7,
  1.7,
  1.65,
  1.7,
];
const cumulativeDurations = imageDurations.reduce((acc, duration, i) => {
  acc.push((acc[i - 1] || 0) + duration);
  return acc;
}, [] as number[]);
const totalDuration = cumulativeDurations[cumulativeDurations.length - 1];


const BeforeAfterSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleTimeUpdate = (currentTime: number) => {
    const loopedTime = currentTime % totalDuration;

    let imageIndex = 0;
    for (let i = 0; i < cumulativeDurations.length; i++) {
      if (loopedTime < cumulativeDurations[i]) {
        imageIndex = i;
        break;
      }
    }

    if (imageIndex !== currentImageIndex) {
      setCurrentImageIndex(imageIndex);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Box id={'beforeafter'} sx={{ padding: { xs: '2rem 1rem', md: '6rem 2rem' }, overflow: 'hidden' }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
      >


        <SectionHeader title={"Turn static photos into virtual property tours"} subtitle={""}/>

        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Before Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
              <Typography variant="h4" component="h3" sx={{ fontWeight: '600', color: 'text.primary' }}>
                Before
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                Static Property Images
              </Typography>
            </Box>
            <Paper
              elevation={3}
              sx={{
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                position: 'relative',
                borderRadius: '12px',
              }}
            >
              <img
                src={images[currentImageIndex]}
                alt={`Property image ${currentImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Paper>
          </Grid>

          {/* Arrow */}
          <Grid item xs={12} md={1} sx={{ textAlign: 'center', mt:'100px', display: { xs: 'none', md: 'block' } }}>
             <Typography variant="h1" sx={{transform: 'rotate(0deg)'}}>→</Typography>
          </Grid>

          {/* After Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
              <Typography variant="h4" component="h3" sx={{ fontWeight: '600', color: 'primary.main' }}>
                After
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                Engaging Video Tour
              </Typography>
            </Box>
            <Box sx={{ aspectRatio: '16 / 9', borderRadius: '12px', overflow: 'hidden' }}>
              <VideoPlayer
                videoUrl={'https://virtualhomeopen.sgp1.cdn.digitaloceanspaces.com/static/homepage/hero/examples.mp4'}
                onTimeUpdate={handleTimeUpdate}
              />
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default BeforeAfterSection;