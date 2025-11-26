import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { SectionHeader } from "../../../theme/components/SectionHeader";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
    {
        quote: "VirtualHomeOpen has completely changed the way I market my listings. What used to take me hours now takes minutes, and my sellers love the professional videos. I’ve noticed a real boost in engagement online, and it’s helping me win more listings because I can show clients I’m ahead of the competition.",
        name: "Sarah, Licensed Agent",
    },
    {
        quote: "I started offering VirtualHomeOpen videos as an add-on to my photography packages, and it’s been a great upsell. My clients get more value, and I stand out from other photographers in my area. It’s quick, easy, and makes me look like I have a full video production team.",
        name: "David, Real Estate Photographer",
    },
    {
        quote: "I decided to sell my home myself and was worried about standing out online. Virtual Home Open made it easy. I uploaded my photos and I had a professional video tour that looked like it came from an agent. Buyers took my listing more seriously, and I got way more inquiries than with photos alone.",
        name: "Emily, Homeowner",
    },
];

export const Testimonials: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY * 0.3); // adjust 0.3 for more/less parallax intensity
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <Box
            sx={{
                py: 8,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: 'url(https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)', // ✅ background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'scroll', // allow dynamic positioning
                backgroundPosition: `center ${-offset}px`, // ✅ parallax scroll
                transition: 'background-position 0.1s linear',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center" ref={ref}>
                    {testimonials.map((testimonial, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                variants={cardVariants}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        borderRadius: '12px',
                                        bgcolor: 'white',
                                        border: '1px solid',
                                        borderColor: 'grey.200',
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ fontStyle: 'italic', mb: 2, color: 'text.primary' }}
                                    >
                                        “{testimonial.quote}”
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 600, color: 'primary.main' }}
                                    >
                                        - {testimonial.name}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};