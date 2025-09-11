import React, {useState, useEffect} from 'react';
import {
    Box,
    Slider,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Container,
    Chip,
    Menu,
    MenuItem
} from '@mui/material';
import {getPricing} from 'src/services/api';
import {PriceDisplay} from 'src/components/PriceDisplay';
import {useDebounce} from 'src/hooks/useDebounce';
import {SectionHeader} from "src/theme/components/SectionHeader";

const localeCurrencyMap: { [key: string]: string } = {
    'en-US': 'USD', 'en-GB': 'GBP', 'en-CA': 'CAD', 'en-AU': 'AUD', 'ja-JP': 'JPY',
    'de-DE': 'EUR', 'fr-FR': 'EUR', 'es-ES': 'EUR', 'it-IT': 'EUR', 'nl-NL': 'EUR', 'pt-PT': 'EUR',
};

const getDefaultCurrency = (): string => {
    if (typeof navigator === 'undefined') return 'AUD';
    const locale = navigator.language;
    if (locale in localeCurrencyMap) return localeCurrencyMap[locale];
    if (locale.startsWith('en-') || ['de-', 'fr-', 'es-', 'it-', 'nl-', 'pt-'].some(p => locale.startsWith(p))) return 'EUR';
    return 'AUD';
};

const supportedCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];

export const PricingCalculator: React.FC = () => {
    const [scenes, setScenes] = useState<number>(10);
    const [price, setPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currency, setCurrency] = useState<string>('AUD');
    const debouncedScenes = useDebounce(scenes, 500);

    const [currencyAnchor, setCurrencyAnchor] = useState<null | HTMLElement>(null);
    const currencyMenuOpen = Boolean(currencyAnchor);

    useEffect(() => {
        setCurrency(getDefaultCurrency());
    }, []);

    useEffect(() => {
        setLoading(true);
        getPricing(debouncedScenes).then((result) => {
            setPrice(result.price);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setPrice(null);
        });
    }, [debouncedScenes, currency]);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setScenes(newValue as number);
    };

    const fireCurrencyChange = (value: string) => {
        setCurrency(value);
        setCurrencyAnchor(null);
    };

    return (
        <Container maxWidth="md" sx={{py: {xs: 8, md: 12}}} id={'pricing'}>
            <SectionHeader
                title="Simple, Transparent Pricing"
                subtitle="No subscriptions. Pay per video. The price is based on the number of images in your listing."
            />
            <Card variant={'outlined'} sx={{p: {xs: 2, md: 4}, mt: 4, borderRadius: '12px', borderColor: 'grey.300', bgcolor: 'background.default'}}>
                <CardContent>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                        <Typography variant={'h5'} fontWeight={'bold'}>{scenes} Images</Typography>
                        <Chip
                            label={currency}
                            onClick={(e) => setCurrencyAnchor(e.currentTarget)}
                            sx={{cursor: 'pointer', fontWeight: 'bold'}}
                        />
                        <Menu anchorEl={currencyAnchor} open={currencyMenuOpen} onClose={() => setCurrencyAnchor(null)}>
                            {supportedCurrencies.map((c) => (
                                <MenuItem key={c} onClick={() => fireCurrencyChange(c)}>{c}</MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Slider
                        value={scenes}
                        onChange={handleSliderChange}
                        aria-labelledby="scenes-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={20}
                        sx={{mt: 2}}
                    />

                    <Box sx={{mt: 4, textAlign: 'center'}}>
                        <Typography variant="h6" color={'text.primary'} gutterBottom>Starting from</Typography>
                        {loading ? (
                            <CircularProgress/>
                        ) : (
                            price !== null ? (
                                <Typography variant="h2" component="div" color="primary" sx={{fontWeight: 'bold'}}>
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
