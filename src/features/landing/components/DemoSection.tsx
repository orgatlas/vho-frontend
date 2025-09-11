import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Container, Grid, Paper, MobileStepper, Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import {SectionHeader} from "src/theme/components/SectionHeader";
import {ImageCarousel} from "./ImageCarousel";
import {VideoPlayer} from "./VideoPlayer";

export const DemoSection: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }} ref={ref}>
            <Container maxWidth="lg">
                <SectionHeader
                    title="From Static to Dynamic"
                    subtitle="See how we transform your property photos into a captivating video tour."
                />
                <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                            <Typography variant="h5" textAlign="center" sx={{ mb: 2, fontWeight: 'bold' }}>Before</Typography>
                            <Paper elevation={0} variant={'outlined'} sx={{ borderRadius: '12px' }}><ImageCarousel /></Paper>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                            <Typography variant="h5" textAlign="center" sx={{ mb: 2, fontWeight: 'bold' }}>After</Typography>
                            <Paper elevation={4} sx={{ height: 500, borderRadius: '12px', boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }}><VideoPlayer inView={isInView} /></Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
