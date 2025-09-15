import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography} from '@mui/material';
import {toast} from 'react-toastify';
import AddressAutocomplete from "src/features/landing/components/AddressAutocomplete";
import CloseIcon from '@mui/icons-material/Close';

export const MobileAddressInput: React.FC = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCreateVideo = () => {
        if (!address.trim()) {
            toast.error("Please enter a valid address.");
            return;
        }
        navigate('/extracting-details', {state: {address}});
    };

    const handleSelectAddress = (selectedAddress: string) => {
        if (selectedAddress) {
            setAddress(selectedAddress);
        }
        setDialogOpen(false);
    };

    return (
        <>
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
                <Box
                    sx={{
                        flexGrow: 1,
                        cursor: 'pointer',
                        p: '12px 16px',
                        bgcolor: 'grey.100',
                        borderRadius: '50px'
                    }}
                    onClick={() => setDialogOpen(true)}
                >
                    <Typography noWrap color={address ? 'text.primary' : 'text.secondary'}>
                        {address || "Enter an address..."}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateVideo}
                    disabled={!address}
                    sx={{
                        borderRadius: 50,
                        whiteSpace: 'nowrap',
                        py: 1.5,
                        px: 3,
                        fontSize: '14px',
                        fontWeight: 600,
                    }}
                >
                    Create
                </Button>
            </Box>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullScreen>
                <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'background.paper', color: 'text.secondary' }}>
                    <Typography variant="h6" component="div">Enter Property Address</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => setDialogOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <AddressAutocomplete
                        onAddressSelect={handleSelectAddress}
                        fullWidth
                        placeholder="Start typing your address..."
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};