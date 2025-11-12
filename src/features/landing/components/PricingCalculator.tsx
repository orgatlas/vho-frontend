import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Container,
    Grid, Link,
} from '@mui/material';
import {SectionHeader} from 'src/theme/components/SectionHeader';

export const PricingCalculator: React.FC = () => {
    const pricing = [
        {
            title: 'Virtual Staging',
            description:
                'Transform empty rooms into beautifully furnished spaces using our SmartDesigner technology.',
            price: '$95 per listing',
            features: [
                'Up to 20 images per listing',
                'Ready in minutes!',
                'Smart Interior Designer',
                'Money Back Guarantee',
            ],
        },
        {
            title: 'Virtual Property Tour',
            description:
                'Bring listings to life with cinematic, sales focussed property tours.',
            price: '$149 per listing',
            features: [
                'Static Image to Dynamic Video',
                'Professional Sales Script',
                'Voice Over',
                'Background Music',
                'Widescreen',
                'HD Video',
                'Custom Branding',
                'Money Back Guarantee',
            ],
        },
        {
            title: 'Virtual Staged Property Tour',
            description:
                'Combine virtual staging with our property tours to showcase fully furnished spaces in motion. The ultimate listing experience.',
            price: '$199 per listing',
            features: [
                'Includes full staging',
                'Smooth cinematic transitions',
                'Perfect for premium listings',
                'Money Back Guarantee',
            ],
        },
    ];

    return (
        <Container maxWidth="lg" sx={{py: {xs: 10, md: 14}}} id="pricing">
            <SectionHeader
                title="Simple, Transparent Pricing"
                subtitle="Pay per listing. No subscriptions or hidden fees."
            />

            <Grid container spacing={4} mt={4}>
                {pricing.map((item) => (
                    <Grid item xs={12} md={4} key={item.title}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: '16px',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderColor: 'grey.300',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                                    borderColor: 'primary.main',
                                },
                            }}
                        >
                            <CardContent sx={{flexGrow: 1, p: {xs: 3, md: 4}}}>
                                <Typography variant="h6" fontWeight={700} gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                    sx={{mb: 3}}
                                >
                                    {item.description}
                                </Typography>

                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                    sx={{mb: 2, color: 'primary.main'}}
                                >
                                    {item.price}
                                </Typography>

                                <Box component="ul" sx={{pl: 2, mb: 3}}>
                                    {item.features.map((f) => (
                                        <Typography
                                            key={f}
                                            component="li"
                                            variant="body2"
                                            color="text.primary"
                                            sx={{mb: 0.5}}
                                        >
                                            {f}
                                        </Typography>
                                    ))}
                                </Box>


                                <Link href="/#" color="inherit" sx={{textDecoration: 'none', '&:hover': {textDecoration: 'underline'}}}>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            mt: 'auto',
                                            borderRadius: '10px',
                                            textTransform: 'none',
                                            py: 1.2,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Get Started
                                    </Button>
                                </Link>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};