import React, {useState} from 'react';
import {Card, Typography, Box, CardContent, CardMedia, IconButton, useTheme} from '@mui/material';
import { Property } from 'src/types';
import {
    Apartment,
    BathtubOutlined,
    BedOutlined,
    ChevronLeft,
    ChevronRight,
    DirectionsCarOutlined
} from "@mui/icons-material";

interface PropertyCardProps {
    property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const hasImages = property.images && property.images.length > 0;

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (property.images?.length || 1));
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (property.images?.length || 1)) % (property.images?.length || 1));
    };

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
            {hasImages ? (
                <Box sx={{ position: 'relative', height: 180 }}>
                    <CardMedia
                        component="img"
                        sx={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }}
                        image={`${process.env.REACT_APP_BASE_URL}${property.images![currentIndex].file}`}
                        alt={property.address}
                    />
                    {property.images!.length > 1 && (
                        <>
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: 8,
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                }}
                            >
                                <ChevronLeft />
                            </IconButton>
                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 8,
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                }}
                            >
                                <ChevronRight />
                            </IconButton>
                            <Box sx={{
                                position: 'absolute',
                                bottom: 8,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                gap: 0.5,
                            }}>
                                {property.images!.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                                        }}
                                    />
                                ))}
                            </Box>
                        </>
                    )}
                </Box>
            ) : (
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
            )}
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