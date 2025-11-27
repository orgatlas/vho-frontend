import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2, ArrowRight } from 'lucide-react';
import { Box, Typography, Paper, useTheme, alpha } from '@mui/material';
import { toast } from 'react-toastify';

interface AddressAutocompleteProps {
    onAddressSelect: (address: string) => void;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ onAddressSelect }) => {
    const theme = useTheme();

    // Custom script loading state
    const [isLoaded, setIsLoaded] = useState(false);

    // State for autocomplete
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<any[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [autocompleteService, setAutocompleteService] = useState<any>(null);

    // Load Google Maps Script Natively
    useEffect(() => {
        const loadScript = () => {
            // Check if script already exists
            if ((window as any).google && (window as any).google.maps && (window as any).google.maps.places) {
                setIsLoaded(true);
                return;
            }

            const existingScript = document.getElementById('google-maps-script');
            if (existingScript) {
                existingScript.addEventListener('load', () => setIsLoaded(true));
                return;
            }

            const script = document.createElement('script');
            script.id = 'google-maps-script';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY || ''}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => setIsLoaded(true);
            script.onerror = () => toast.error("Failed to load Google Maps");
            document.body.appendChild(script);
        };

        loadScript();
    }, []);

    // Initialize Services once API is loaded
    useEffect(() => {
        if (isLoaded && (window as any).google) {
            setAutocompleteService(new (window as any).google.maps.places.AutocompleteService());
        }
    }, [isLoaded]);

    // Handle Input Change & Fetch Predictions
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (!value.trim()) {
            setOptions([]);
            return;
        }

        if (autocompleteService) {
            autocompleteService.getPlacePredictions(
                { input: value, componentRestrictions: { country: 'au' } }, // Adjust country as needed
                (predictions: any[], status: any) => {
                    if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && predictions) {
                        setOptions(predictions);
                    } else {
                        setOptions([]);
                    }
                }
            );
        }
    };

    const handleSelect = (description: string) => {
        setInputValue(description);
        setOptions([]);
        setIsFocused(false);
        onAddressSelect(description);
    };

    const handleSubmit = () => {
        if (!inputValue.trim()) {
            toast.error("Please enter a property address");
            return;
        }
        onAddressSelect(inputValue);
    };

    if (!isLoaded) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: alpha(theme.palette.background.default, 0.5), borderRadius: '50px' }}>
                <Loader2 className="animate-spin text-slate-500" />
                <Typography variant="body2" color="text.secondary">Loading maps...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ position: 'relative', width: '100%', maxWidth: '600px', zIndex: 50 }}>
            {/* Main Input Container */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Paper
                    elevation={isFocused ? 12 : 4}
                    component={motion.div}
                    animate={{
                        boxShadow: isFocused
                            ? `0 20px 40px -10px ${alpha(theme.palette.primary.main, 0.25)}`
                            : '0 10px 30px -10px rgba(0,0,0,0.1)',
                        borderColor: isFocused ? theme.palette.primary.main : 'transparent'
                    }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: '8px',
                        borderRadius: '50px',
                        bgcolor: alpha(theme.palette.background.default, 0.95),
                        backdropFilter: 'blur(10px)',
                        border: '2px solid transparent',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'visible' // Allow glow to spill out
                    }}
                >
                    {/* Glowing Pulse Effect when idle */}
                    {!isFocused && !inputValue && (
                        <motion.div
                            animate={{ opacity: [0.5, 0.2, 0.5], scale: [1, 1.02, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                inset: -4,
                                borderRadius: '50px',
                                border: `2px solid ${theme.palette.primary.main}`,
                                pointerEvents: 'none',
                                opacity: 0.3
                            }}
                        />
                    )}

                    {/* Icon */}
                    <Box sx={{ pl: 2, pr: 1.5, color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>
                        <MapPin size={24} />
                    </Box>

                    {/* Input Field */}
                    <Box sx={{ flexGrow: 1, position: 'relative' }}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            // On blur delay allows clicking the dropdown items
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            placeholder="Enter property address..."
                            style={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                fontSize: '1.1rem',
                                color: theme.palette.text.primary,
                                padding: '12px 0',
                                fontWeight: 500
                            }}
                        />
                    </Box>

                    {/* Action Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        style={{
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '12px 24px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.4)}`
                        }}
                    >
                        <span>Create</span>
                        <ArrowRight size={18} />
                    </motion.button>
                </Paper>
            </motion.div>

            {/* Dropdown Predictions */}
            <AnimatePresence>
                {isFocused && options.length > 0 && (
                    <Paper
                        component={motion.div}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 12, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        elevation={6}
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            left: '20px',
                            right: '20px',
                            bgcolor: theme.palette.background.default,
                            borderRadius: '20px',
                            overflow: 'hidden',
                            zIndex: 100,
                        }}
                    >
                        <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0' }}>
                            {options.map((option, index) => (
                                <motion.li
                                    key={option.place_id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleSelect(option.description)}
                                    style={{
                                        padding: '12px 24px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        borderBottom: index !== options.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.action.hover, 0.05)}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <Box sx={{ p: 1,  borderRadius: '50%', color: theme.palette.primary.dark }}>
                                        <MapPin size={14} />
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                            {option.structured_formatting.main_text}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: alpha(theme.palette.text.primary, 0.6) }}>
                                            {option.structured_formatting.secondary_text}
                                        </Typography>
                                    </Box>
                                </motion.li>
                            ))}
                        </ul>
                    </Paper>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default AddressAutocomplete;
