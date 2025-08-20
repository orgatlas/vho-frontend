import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Logo from 'src/assets/images/logo.png';

export const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{ py: 6, backgroundColor: '#2a2d34', color: 'white' }}>
            <Container maxWidth="lg">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <Grid container spacing={4} justifyContent="space-between" alignItems="top">
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" alignItems="top" mb={2}>
                                <img src={Logo} alt="Virtual Home Open Logo" style={{ height: 40, marginRight: 16 }} />
                                <Typography variant="h5" component="h2" fontWeight="bold">
                                    Virtual Home Open
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                                Virtual Home Open videos for real estate.
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <Typography variant="h6" gutterBottom>Links</Typography>
                            <Link href="/#howitworks" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>How It Works</Link>
                            <Link href="/#pricing" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Pricing</Link>
                            <Link href="/login" color="inherit" display="block" sx={{ mb: 1,textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sign In</Link>
                            <Link href="/register" color="inherit" display="block" sx={{ mb: 1,textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Register</Link>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <Typography variant="h6" gutterBottom>Support</Typography>
                            <Link href="/support" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Contact</Link>
                            <Link href="/#faq" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>FAQ</Link>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <Typography variant="h6" gutterBottom>Legal</Typography>
                            <Link href="/terms-of-service" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Terms of Service</Link>
                            <Link href="/privacy" color="inherit" display="block" sx={{  mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</Link>
                            <Link href="/acceptable-use" color="inherit" display="block" sx={{  mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Acceptable Usage</Link>
                        </Grid>
                        <Grid item xs={12} sm={2} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                            <Typography variant="h6" gutterBottom>Follow Us</Typography>
                            <motion.div whileHover={{ scale: 1.2 }} style={{display: 'inline-block'}}><IconButton aria-label="Facebook" color="inherit" href="https://www.facebook.com/people/Virtual-Home-Open/61579299608563/"><Facebook /></IconButton></motion.div>
                            {/*<motion.div whileHover={{ scale: 1.2 }} style={{display: 'inline-block'}}><IconButton aria-label="Twitter" color="inherit" href="#"><Twitter /></IconButton></motion.div>*/}
                            {/*<motion.div whileHover={{ scale: 1.2 }} style={{display: 'inline-block'}}><IconButton aria-label="LinkedIn" color="inherit" href="#"><LinkedIn /></IconButton></motion.div>*/}
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