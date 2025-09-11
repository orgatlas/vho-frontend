import React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
    title: string;
    subtitle: string;
    color?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, color = "text.primary" }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
            <Typography
                component="h2"
                textAlign="center"
                fontWeight="bold"
                color={color}
                gutterBottom
                sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // smaller on mobile
                    lineHeight: 1.2,
                }}
            >
                {title}
            </Typography>
            <Typography
                textAlign="center"
                color={color}
                sx={{
                    mb: 6,
                    opacity: 0.8,
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }, // responsive sizes
                }}
            >
                {subtitle}
            </Typography>
        </motion.div>
    );
};