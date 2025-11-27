import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Facebook } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Logo from 'src/assets/images/logo.png';
import {useTheme} from "@mui/material/styles";

export const Footer: React.FC = () => {
    const theme = useTheme();
    return (
        <Box component="footer" sx={{ py: 6, backgroundColor: theme.palette.background.paper, color: theme.palette.text.secondary }}>
            <Container maxWidth="lg">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" alignItems="center" mb={{xs: 2, sm: 0}}>
                                <img src={Logo} alt="Virtual Home Open Logo" loading="lazy" style={{ height: 40, marginRight: 16, filter: 'brightness(0) invert(1)' }} />
                                <Typography variant="h6" component="h2" fontWeight="bold">
                                    Virtual Home Open
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} sx={{textAlign: {xs: 'center', sm: 'right'}}}>
                            <Link href="/#howitworks" color="inherit" sx={{ mx: 1.5, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>How It Works</Link>
                            <Link href="/#pricing" color="inherit" sx={{ mx: 1.5, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Pricing</Link>
                            <Link href="/#faq" color="inherit" sx={{ mx: 1.5, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>FAQ</Link>
                            <Link href="/support" color="inherit" sx={{ mx: 1.5, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Support</Link>
                            <IconButton aria-label="Facebook" color="inherit" href="https://www.facebook.com/people/Virtual-Home-Open/61579299608563/"><Facebook /></IconButton>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={4} mt={4} borderTop={1} borderColor="rgba(255, 255, 255, 0.2)">
                        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                            © {new Date().getFullYear()} Virtual Home Open. All rights reserved.
                        </Typography>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};