import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

// Importing images
import img1 from 'src/assets/images/demo/1.jpg';
import img2 from 'src/assets/images/demo/2.jpg';
import img3 from 'src/assets/images/demo/3.jpg';
import img4 from 'src/assets/images/demo/4.jpg';
import img5 from 'src/assets/images/demo/5.jpg';
import img6 from 'src/assets/images/demo/6.jpg';

const images = [
    { label: 'Exterior', imgPath: img1 },
    { label: 'Kitchen', imgPath: img2 },
    { label: 'Living Room', imgPath: img3 },
    { label: 'Bedroom', imgPath: img4 },
    { label: 'Bathroom', imgPath: img5 },
    { label: 'Garden', imgPath: img6 },
];

export const ImageCarousel: React.FC = () => {
    const theme = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
            {/* Previewer */}
            <Box sx={{ flexGrow: 1, position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${theme.palette.divider}` }}>
                <AnimatePresence initial={false}>
                    <motion.img
                        key={selectedIndex}
                        src={images[selectedIndex].imgPath}
                        alt={images[selectedIndex].label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    />
                </AnimatePresence>
            </Box>

            {/* Thumbnail Grid */}
            <Box sx={{ p: 1.5 }}>
                <Grid container spacing={1}>
                    {images.map((image, index) => (
                        <Grid item xs={4} key={index}>
                            <Box
                                onClick={() => handleThumbnailClick(index)}
                                sx={{
                                    position: 'relative',
                                    paddingTop: '100%', // 1:1 Aspect Ratio
                                    borderRadius: 1.5,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: '2px solid',
                                    borderColor: selectedIndex === index ? theme.palette.primary.main : 'transparent',
                                    transition: 'border-color 0.2s ease',
                                    '&:hover': {
                                        opacity: 0.9
                                    }
                                }}
                            >
                                <img
                                    src={image.imgPath}
                                    alt={image.label}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                                {selectedIndex !== index && (
                                     <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.3)', // Dim non-selected images
                                        transition: 'background-color 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.1)',
                                        }
                                     }}/>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};