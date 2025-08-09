import React from 'react';
import {Box, Typography, Container} from '@mui/material';

export const VideoGeneratedPage: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{my: 4, textAlign: 'center'}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Video Has Been Submitted for Creation
                </Typography>
                <Typography variant="body1">
                    You will receive an email shortly with a link to your video.
                </Typography>
            </Box>
        </Container>
    );
};