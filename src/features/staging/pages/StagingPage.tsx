import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { getStagingPackage, runStaging } from 'src/services/api';
import { toast } from 'react-toastify';

export const StagingPage: React.FC = () => {
    const navigate = useNavigate();
    const { propertyId } = useParams<{ propertyId: string }>();

    useEffect(() => {
        if (!propertyId) return;

        (async () => {
            try {
                const stagingPackage = await getStagingPackage(propertyId);

                if (stagingPackage.locked) {
                    navigate(`/staging-progress/${stagingPackage.id}`);
                    return;
                }

                const response = await runStaging(stagingPackage.id);

                if (response.success) {
                    console.log(`Staging request successfully submitted: ${stagingPackage.id}`);
                    navigate(`/staging-progress/${stagingPackage.id}`);
                } else {
                    toast.error(`Failed to submit staging: ${response.message}`);
                }
            } catch (error) {
                console.error('Error processing staging:', error);
                toast.error('An unexpected error occurred. Please try again.');
            }
        })();
    }, [propertyId, navigate]);

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 8, textAlign: 'center' }}>
                <CircularProgress size={60} sx={{ mb: 3 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                    Sending images to Smart Designer
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ mb: 6 }}>
                    Please wait, do not close this page
                </Typography>
            </Box>
        </Container>
    );
};