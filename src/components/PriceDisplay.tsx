import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { convertCurrency } from 'src/services/api';

interface PriceDisplayProps {
    cost: number;
    currency: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ cost, currency }) => {
    const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchConvertedPrice = async () => {
            if (!cost) {
                setConvertedPrice(0);
                return;
            }
            // // Assume base currency of AUD
            // if (currency === 'AUD') {
            //     setConvertedPrice(cost);
            //     return;
            // }
            //
            setLoading(true);
            try {
                const price = await convertCurrency(cost, currency);
                if (isMounted) {
                    setConvertedPrice(price);
                }
            } catch (error) {
                console.error('Failed to convert currency', error);
                if (isMounted) {
                    setConvertedPrice(cost); // Fallback to original cost
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchConvertedPrice();

        return () => {
            isMounted = false;
        };
    }, [cost, currency]);

    if (loading) {
        return <CircularProgress size={20} />;
    }

    if (convertedPrice === null) {
        return null;
    }

    // const formattedPrice = new Intl.NumberFormat(navigator.language, {
    //     style: 'currency',
    //     currency: currency,
    //     currencyDisplay: 'code',
    // }).format(convertedPrice);

    const formatPriceWithCode = (amount: number, currency: string) => {
        // Format just the symbol + number
        const symbolAndAmount = new Intl.NumberFormat(navigator.language, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'narrowSymbol',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);

        // Return symbol+amount plus a small code suffix
        return `${symbolAndAmount} ${currency.toUpperCase()}`;
    };

    const formattedPrice = formatPriceWithCode(convertedPrice, currency);

    return (
        <Typography component="span" variant="inherit">
            {formattedPrice}
        </Typography>
    );
};
