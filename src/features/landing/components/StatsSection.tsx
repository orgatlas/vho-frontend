import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion, useInView, useSpring, useMotionValue, animate } from 'framer-motion';
import { TrendingUp, Users, Clock, Share2, Eye, DollarSign, Zap, MessageCircle } from 'lucide-react';

// --- THEME ---
const THEME = {
  light: '#c2f2ed',
  normal: '#33998f',
  dark: '#02645b',
  text_dark: '#373e40',
  text_light: '#f2f2f2',
  paper: '#373e40'
};

// --- DATA ---
const STATS = [
  {
    id: 'inquiry',
    value: 403,
    suffix: '%',
    label: "Increase in Inquiries",
    subtext: "Video vs. Image-only listings",
    icon: MessageCircle,
    colSpan: { xs: 12, md: 6 }, // Hero Card
    color: THEME.normal,
    delay: 0
  },
  {
    id: 'social',
    value: 1200,
    suffix: '%',
    label: "More Social Shares",
    subtext: "Video content virality",
    icon: Share2,
    colSpan: { xs: 12, md: 6 },
    color: '#8b5cf6', // Violet
    delay: 0.1
  },
  {
    id: 'price',
    value: 23,
    prefix: 'Up to +',
    suffix: '%',
    label: "Higher Sale Price",
    subtext: "For professionally staged homes",
    icon: TrendingUp,
    colSpan: { xs: 12, sm: 6, md: 4 },
    color: '#10b981', // Emerald
    delay: 0.2
  },
  {
    id: 'time',
    value: 73,
    prefix: '-',
    suffix: '%',
    label: "Time on Market",
    subtext: "Faster sales cycle",
    icon: Clock,
    colSpan: { xs: 12, sm: 6, md: 4 },
    color: '#f59e0b', // Amber
    delay: 0.3
  },
  {
    id: 'views',
    value: 87,
    prefix: '+',
    suffix: '%',
    label: "Listing Views",
    subtext: "Listings with Virtual Tours",
    icon: Eye,
    colSpan: { xs: 12, sm: 6, md: 4 },
    color: '#3b82f6', // Blue
    delay: 0.4
  },
  {
    id: 'savings',
    value: 90,
    suffix: '%',
    label: "Cost Savings",
    subtext: "vs. Physical Staging ($5k+)",
    icon: DollarSign,
    colSpan: { xs: 12, md: 8 }, // Wide card
    color: THEME.dark,
    delay: 0.5
  },
  {
    id: 'retention',
    value: 95,
    suffix: '%',
    label: "Message Retention",
    subtext: "Video viewers remember more",
    icon: Zap,
    colSpan: { xs: 12, md: 4 },
    color: '#ec4899', // Pink
    delay: 0.6
  }
];

// --- ANIMATED COUNTER COMPONENT ---
const Counter = ({ from, to, prefix = '', suffix = '' }) => {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !inView) return;

    const controls = animate(from, to, {
      duration: 2.5,
      ease: "circOut",
      onUpdate(value) {
        node.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
      }
    });

    return () => controls.stop();
  }, [from, to, inView, prefix, suffix]);

  return <span ref={nodeRef} />;
};

// --- STAT CARD COMPONENT ---
const StatCard = ({ stat }) => {
  return (
      <Grid item xs={stat.colSpan.xs} sm={stat.colSpan.sm} md={stat.colSpan.md}>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: stat.delay }}
            whileHover={{ y: -8 }}
        >
          <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                minHeight: 200,
                borderRadius: '24px',
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: `0 20px 40px -10px ${stat.color}20`,
                  borderColor: `${stat.color}40`
                }
              }}
          >
            {/* Background Decorative Gradient Blob */}
            <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }}
            />

            {/* Icon Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: '12px',
                bgcolor: `${stat.color}10`,
                color: stat.color
              }}>
                <stat.icon size={24} />
              </Box>
              {/* Optional: Add a small trend arrow here if desired */}
            </Box>

            {/* The Numbers */}
            <Box>
              <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: THEME.text_dark,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1,
                    mb: 1,
                    letterSpacing: '-0.02em'
                  }}
              >
                <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </Typography>

              <Typography variant="h6" fontWeight={700} sx={{ color: '#475569', lineHeight: 1.2 }}>
                {stat.label}
              </Typography>

              <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1, fontWeight: 500 }}>
                {stat.subtext}
              </Typography>
            </Box>

          </Paper>
        </motion.div>
      </Grid>
  );
};

// --- MAIN COMPONENT ---
export const StatsSection = () => {
  return (
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 700, mx: 'auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
              <Typography variant="overline" sx={{ color: THEME.normal, fontWeight: 800, letterSpacing: 1.5 }}>
                THE NUMBERS
              </Typography>
              <Typography variant="h2" sx={{ color: THEME.text_dark, fontWeight: 800, mb: 2 }}>
                Real Estate is a <br/>
                <span style={{ color: THEME.normal }}>Numbers Game.</span>
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1.1rem' }}>
                We don't just make listings look good; we make them perform. See the impact of professional digital assets on your bottom line.
              </Typography>
            </motion.div>
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={3}>
            {STATS.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
            ))}
          </Grid>

        </Container>
      </Box>
  );
};