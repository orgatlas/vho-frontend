import React from 'react';
import { Paper, Card, CardMedia, Box, Typography } from '@mui/material';
import { StagedImage } from 'src/types';

interface ImagePreviewProps {
    image: StagedImage | null;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
    return (
        <Paper elevation={3} sx={{ p: 2, backgroundColor: 'background.default', height: '100%' }}>
            {image && image.staged_image ? (
                <Card sx={{backgroundColor: 'background.default', height: '100%'}}>
                    <CardMedia
                        component="img"
                        image={image.staged_image.file}
                        alt="Staged"
                        sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </Card>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography variant="h6" color="text.secondary">Image not found.</Typography>
                </Box>
            )}
        </Paper>
    );
};
