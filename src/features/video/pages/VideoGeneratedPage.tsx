import React, {useState} from 'react';
import {Box, Typography, Container, TextField, Button, Paper} from '@mui/material';
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";

export const VideoGeneratedPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme()
    const [url, setUrl] = useState('');

    const handleUrlSubmit = () => {
        if (!url.trim() || !url.includes('.')) {
            toast.error("Please enter a valid property listing URL.");
            return;
        }
        navigate('/extracting-details', {state: {url}});
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{my: 4, textAlign: 'center'}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your video is being created!
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{mb: 6}}>
                    It is safe to leave this page. You will receive an email when your video is ready.
                </Typography>

                <Paper sx={{p: 4, mt: 6}} elevation={3}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Ready for Your Next Video?
                    </Typography>
                    <Typography color="text.secondary" sx={{mb: 3}}>
                        Enter another property URL.
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                            fullWidth
                            placeholder="Enter property URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            sx={{mr: 2, background: theme.palette.background.default}}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUrlSubmit}
                            size="large"
                            sx={{
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                minWidth: 120,
                            }}
                        >
                            Get Started
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};