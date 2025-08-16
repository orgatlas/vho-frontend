import React from 'react';
import {Card, Typography, Box, CardContent, CardMedia, CardActions, Button, useTheme} from '@mui/material';
import { Property } from 'src/types';
import {Apartment, BathtubOutlined, BedOutlined, DirectionsCarOutlined} from "@mui/icons-material";

interface PropertyCardProps {
    property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const theme = useTheme();

    return (
        <Card sx={{
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[4],
            },
            borderRadius: '10px',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: 'none'
        }}>
            <CardMedia
                sx={{
                    height: 180,
                    backgroundColor: theme.palette.secondary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.secondary.main
                }}
            >
                <Apartment sx={{fontSize: 60}}/>
            </CardMedia>
            <CardContent>
                <Typography variant="h6" component="div" noWrap>
                    {property.address}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 1, gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BedOutlined sx={{ mr: 0.5, fontSize: 20 }} />
                        <Typography variant="body2">{property.bedrooms}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BathtubOutlined sx={{ mr: 0.5, fontSize: 20 }} />
                        <Typography variant="body2">{property.bathrooms}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DirectionsCarOutlined sx={{ mr: 0.5, fontSize: 20 }} />
                        <Typography variant="body2">{property.car_spaces}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};