import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Logo from 'src/assets/Clover Logo.svg';

export const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{ py: 6, backgroundColor: '#2a2d34', color: 'white' }}>
            <Container maxWidth="lg">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <img src={Logo} alt="Virtual Home Open Logo" style={{ height: 40, marginRight: 16 }} />
                                <Typography variant="h5" component="h2" fontWeight="bold">
                                    Virtual Home Open
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                                AI-powered video creation for real estate.
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <Typography variant="h6" gutterBottom>Links</Typography>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>About Us</Link>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Contact</Link>
                            <Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Careers</Link>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <Typography variant="h6" gutterBottom>Legal</Typography>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Terms of Service</Link>
                            <Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</Link>
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                            <Typography variant="h6" gutterBottom>Follow Us</Typography>
                            <motion.div whileHover={{ scale: 1.2 }} style={{display: 'inline-block'}}><IconButton aria-label="Facebook" color="inherit" href="#"><Facebook /></IconButton></motion.div>
                            <motion.div whileHover={{ scale: 1.2 }} style={{display: 'inline-block'}}><IconButton aria-label="Twitter" color="inherit" href="#"><Twitter /></IconButton></motion.div>
                            <motion.div whileHover={{ scale: 1.2 }} style={{display: 'inline-block'}}><IconButton aria-label="LinkedIn" color="inherit" href="#"><LinkedIn /></IconButton></motion.div>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={4} mt={4} borderTop={1} borderColor="rgba(255, 255, 255, 0.2)">
                        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                            © {new Date().getFullYear()} OrgAtlas. All rights reserved.
                        </Typography>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};