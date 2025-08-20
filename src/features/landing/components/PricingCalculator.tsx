import React, {useState, useEffect} from 'react';
import {
    Box,
    Slider,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Grid,
    Container,
    Chip,
    Menu,
    MenuItem
} from '@mui/material';
import {getPricing} from 'src/services/api';
import {PriceDisplay} from 'src/components/PriceDisplay';
import {useDebounce} from 'src/hooks/useDebounce';
import {AttachMoney} from '@mui/icons-material';
import {motion} from "framer-motion";

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

const supportedCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];

export const PricingCalculator: React.FC = () => {
    const [scenes, setScenes] = useState<number>(5);
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

    const fireCurrencyChange = (value: string) => {
        setCurrency(value);
        setCurrencyAnchor(null);
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <Container maxWidth="md" sx={{py: {xs: 4, md: 8}}} id={'pricing'}>
            <motion.div initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.5}}
                        variants={itemVariants}>
                <Typography variant="h3" component="h2" textAlign="center" fontWeight="bold" gutterBottom>
                    Pricing
                </Typography>
                <Typography variant="h6" textAlign="center" color="text.primary" sx={{mb: 6}}>
                    Transparent Per Video Pricing
                </Typography>
            </motion.div>
            <Card elevation={3} sx={{p: 3, backgroundColor: 'background.paper'}}>
                <CardContent>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', mb: 4}}>
                        <Typography variant={'h5'} gutterBottom>{scenes} Listing Images</Typography>

                        <Chip
                            label={currency}
                            color="primary"
                            variant="outlined"
                            onClick={(e) => setCurrencyAnchor(e.currentTarget)}
                            sx={{cursor: 'pointer'}}
                        />
                        <Menu
                            anchorEl={currencyAnchor}
                            open={currencyMenuOpen}
                            onClose={() => setCurrencyAnchor(null)}
                        >
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
                    />

                    <Box sx={{mt: 4, textAlign: 'center'}}>
                        <Typography variant="h6" gutterBottom>Starting from</Typography>
                        {loading ? (
                            <CircularProgress/>
                        ) : (
                            price !== null ? (
                                <Typography variant="h4" component="div" color="primary"
                                            sx={{fontWeight: 'bold'}}>
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
