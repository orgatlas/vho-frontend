import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Property } from 'src/types';

interface PropertyCardProps {
    property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">{property.address}</Typography>
            <Typography>Beds: {property.bedrooms}, Baths: {property.bathrooms}, Cars: {property.car_spaces}</Typography>
        </Paper>
    );
};