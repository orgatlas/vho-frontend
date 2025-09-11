import React from 'react';
import {Autocomplete, useLoadScript} from '@react-google-maps/api';
import {TextField, SxProps, Theme} from '@mui/material';

interface AddressAutocompleteProps {
    onAddressSelect: (address: string) => void;
    fullWidth?: boolean;
    sx?: SxProps<Theme>;
    placeholder?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({onAddressSelect, fullWidth, sx, placeholder}) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY || '',
        libraries: ['places'],
    });

    const [autocomplete, setAutocomplete] = React.useState<google.maps.places.Autocomplete | null>(null);

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
        setAutocomplete(autocomplete);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            onAddressSelect(place.formatted_address || '');
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    if (!isLoaded) {
        return <TextField fullWidth={fullWidth} placeholder="Loading..." disabled sx={sx}/>;
    }

    return (
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
        >
            <TextField
                fullWidth={fullWidth}
                placeholder={placeholder || "Enter Your Property Address To Begin"}
                variant="standard"
                sx={{
                    ...sx,
                }}
                InputProps={{
                    disableUnderline: true,
                }}
            />
        </Autocomplete>
    );
};

export default AddressAutocomplete;