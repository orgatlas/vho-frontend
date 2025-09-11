import React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={itemVariants}>
            <Typography variant="h2" component="h2" textAlign="center" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h5" textAlign="center" color="text.secondary" sx={{ mb: 6, opacity: 0.8 }}>
                {subtitle}
            </Typography>
        </motion.div>
    );
};