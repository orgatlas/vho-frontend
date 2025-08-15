import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const supportedCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];

interface CurrencySelectorProps {
    selectedCurrency: string;
    onCurrencyChange: (currency: string) => void;
    sx?: object;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ selectedCurrency, onCurrencyChange, sx }) => {
    return (
        <FormControl sx={{ minWidth: 120, ...sx }}>
            <Select
                labelId="currency-select-label"
                id="currency-select"
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as string)}
            >
                {supportedCurrencies.map(currency => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
