import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Typography, CircularProgress, Button, Paper } from '@mui/material';
import { getPropertyList } from 'src/services/api';
import { Property } from 'src/types';
import { PropertyCard } from '../components/PropertyCard';
import { FilterSortToolbar } from 'src/components/FilterSortToolbar';
import { toast } from 'react-toastify';

export const UserListingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    // Add state for filters and sorting later

    const fetchProperties = useCallback(async (pageNum: number) => {
        setIsLoading(true);
        try {
            const { properties: newProperties, total } = await getPropertyList({ page: pageNum, limit: 12 });
            setProperties(prev => pageNum === 1 ? newProperties : [...prev, ...newProperties]);
            setHasMore(properties.length + newProperties.length < total);
        } catch (error) {
            toast.error("Failed to fetch properties.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [properties.length]);

    useEffect(() => {
        fetchProperties(1);
    }, [fetchProperties]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProperties(nextPage);
    };

    const handleCardClick = (propertyId: string) => {
        navigate(`/listings/${propertyId}/manage`);
    };

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Properties
            </Typography>
            <Paper sx={{ mb: 3 }} elevation={2}>
                <FilterSortToolbar />
            </Paper>
            <Grid container spacing={3}>
                {properties.map(property => (
                    <Grid item key={property.id} xs={12} sm={6} md={4}>
                        <Box onClick={() => handleCardClick(property.id)} sx={{cursor: 'pointer'}}>
                           <PropertyCard property={property} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {hasMore && !isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Button variant="contained" onClick={handleLoadMore}>Load More</Button>
                </Box>
            )}
            {!hasMore && !isLoading && properties.length === 0 && (
                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Typography>No properties found.</Typography>
                </Box>
            )}
        </Container>
    );
};
