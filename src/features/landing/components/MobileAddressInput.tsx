import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button} from '@mui/material';
import {toast} from 'react-toastify';
import AddressAutocomplete from "src/features/landing/components/AddressAutocomplete";

interface MobileAddressInputProps {
    onAddressSelect: (address: string) => void;
}

export const MobileAddressInput: React.FC<MobileAddressInputProps> = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');

    const handleCreateVideo = () => {
        if (!address.trim()) {
            toast.error("Please enter a valid address.");
            return;
        }
        navigate('/extracting-details', {state: {address}});
    };

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            p: 2,
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
        }}>
            <Box sx={{flexGrow: 1}}>
                <AddressAutocomplete
                    onAddressSelect={setAddress}
                    fullWidth
                    placeholder="Enter an address..."
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCreateVideo}
                sx={{
                    borderRadius: 50,
                    whiteSpace: 'nowrap',
                    py: 1.5,
                    px: 4,
                    fontSize: '12px',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    }
                }}
            >
                Create Video
            </Button>
        </Box>
    );
};