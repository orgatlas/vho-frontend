import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from 'src/theme/components/SectionHeader';

const stats = [
  { value: '32%', label: 'of homes sell faster with video marketing' },
  { value: '73%', label: 'of homeowners prefer agents who use video marketing' },
  { value: '4X', label: 'more enquiries than image-only listings' },
  { value: '54%', label: 'of buyers want to watch a video before visiting' },
];

export const StatsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <SectionHeader title="The Facts" subtitle="How Virtual Home Open can make you stand out" color="text.primary" />
        <Grid container spacing={4} justifyContent="center" ref={ref}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: '12px',
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    // aspectRatio: '1 / 1', /* Makes the stat square */
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'text.primary' }}>
                    {stat.label}
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