import React from 'react';
import {Autocomplete, useLoadScript} from '@react-google-maps/api';
import {TextField, Box} from '@mui/material';

interface AddressAutocompleteProps {
    onAddressSelect: (address: string) => void;
    fullWidth?: boolean;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({onAddressSelect, fullWidth}) => {
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
        return <TextField fullWidth placeholder="Loading..." disabled/>;
    }

    return (
        <Box sx={{ flex: 1 }}>
            <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
            >
                <TextField
                    fullWidth
                    placeholder="Enter a location"
                    sx={{background: 'white'}}
                />
            </Autocomplete>
        </Box>
    );
};

export default AddressAutocomplete;