import React, {useState, useEffect} from 'react';
import {Box, Slider, Typography, CircularProgress, Card, CardContent, Grid, Container} from '@mui/material';
import {getPricing} from 'src/services/api';
import {CurrencySelector} from 'src/components/CurrencySelector';
import {PriceDisplay} from 'src/components/PriceDisplay';
import {useDebounce} from 'src/hooks/useDebounce';
import {SectionHeader} from 'src/theme/components/SectionHeader';
import {AttachMoney} from '@mui/icons-material';

const localeCurrencyMap: { [key: string]: string } = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-CA': 'CAD',
    'en-AU': 'AUD',
    'ja-JP': 'JPY',
    'de-DE': 'EUR',
    'fr-FR': 'EUR',
    'es-ES': 'EUR',
    'it-IT': 'EUR',
    'nl-NL': 'EUR',
    'pt-PT': 'EUR',
};

const getDefaultCurrency = (): string => {
    if (typeof navigator === 'undefined') return 'AUD';
    const locale = navigator.language;

    if (locale in localeCurrencyMap) {
        return localeCurrencyMap[locale];
    }

    if (
        locale.startsWith('en-') ||
        locale.startsWith('de-') ||
        locale.startsWith('fr-') ||
        locale.startsWith('es-') ||
        locale.startsWith('it-') ||
        locale.startsWith('nl-') ||
        locale.startsWith('pt-')
    ) {
        return 'EUR';
    }

    return 'AUD';
};


export const PricingCalculator: React.FC = () => {
    const [scenes, setScenes] = useState<number>(5);
    const [price, setPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currency, setCurrency] = useState<string>('AUD');
    const debouncedScenes = useDebounce(scenes, 500);

    useEffect(() => {
        setCurrency(getDefaultCurrency());
    }, []);

    useEffect(() => {
        setLoading(true);
        getPricing(debouncedScenes).then((result) => {
            setPrice(result.price)
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setPrice(null);
        });
    }, [debouncedScenes, currency]);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setScenes(newValue as number);
    };

    return (
        <Container maxWidth="md" sx={{py: {xs: 4, md: 8}}}>
            <Card elevation={3} sx={{p: 3, backgroundColor: 'background.paper'}}>
                <CardContent>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                        <AttachMoney color={"text.secondary"}/>
                        <Typography variant="h6" sx={{ml: 1}}>
                            Pricing Calculator
                        </Typography>
                    </Box>
                    <Grid container spacing={2} alignItems="center" sx={{mt: 2}}>
                        <Grid item xs={12} md={9}>
                            <Typography gutterBottom>{scenes} Listing Images</Typography>
                            <Slider
                                value={scenes}
                                onChange={handleSliderChange}
                                aria-labelledby="scenes-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={20}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CurrencySelector selectedCurrency={currency} onCurrencyChange={setCurrency}/>
                        </Grid>
                    </Grid>
                    <Box sx={{mt: 4, textAlign: 'center'}}>
                        <Typography variant="h6" gutterBottom>Starting from</Typography>
                        {loading ? (
                            <CircularProgress/>
                        ) : (
                            price !== null ? (
                                <Typography variant="h4" component="div" color="primary.dark" sx={{fontWeight: 'bold'}}>
                                    <PriceDisplay cost={price} currency={currency}/>
                                </Typography>
                            ) : (
                                <Typography variant="h6">No packages available.</Typography>
                            )
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};