import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Box,
    Typography,
    CircularProgress,
    Button,
    Paper,
    SelectChangeEvent,
    useTheme
} from '@mui/material';
import { getPropertyList } from 'src/services/api';
import { Property } from 'src/types';
import { PropertyCard } from '../components/PropertyCard';
import { FilterSortToolbar } from 'src/components/FilterSortToolbar';
import { toast } from 'react-toastify';
import { useDebounce } from 'src/hooks/useDebounce';
import {Add, Apartment} from "@mui/icons-material";

export const UserListingsPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // New state for filtering and sorting
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [resultsPerPage, setResultsPerPage] = useState(12);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const fetchProperties = useCallback(async (
        pageNum: number,
        search: string,
        sortBy: string,
        order: 'asc' | 'desc',
        limit: number,
        append: boolean = false
    ) => {
        setIsLoading(true);
        try {

            const { properties: newProperties, total } = await getPropertyList(pageNum, limit, search, sortBy, order);

            setProperties(prev => append ? [...prev, ...newProperties] : newProperties);
            setHasMore(pageNum * limit < total);

        } catch (error) {
            toast.error("Failed to fetch properties.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        setPage(1);
        fetchProperties(1, debouncedSearchQuery, sortOption, sortOrder, resultsPerPage, false);
    }, [debouncedSearchQuery, sortOption, sortOrder, resultsPerPage, fetchProperties]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProperties(nextPage, debouncedSearchQuery, sortOption, sortOrder, resultsPerPage, true);
    };

    const handleCardClick = (propertyId: number) => {
        navigate(`/listings/${propertyId}/manage`);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortOption(event.target.value);
    };

    const handleSortOrderChange = (event: SelectChangeEvent<'asc' | 'desc'>) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };

    const handleResultsPerPageChange = (event: SelectChangeEvent<unknown>) => {
        setResultsPerPage(event.target.value as number);
    };

    const handleCreateNew = () => {
        navigate('/listings/manage');
    };

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    My Properties
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleCreateNew}>
                    Create New Property
                </Button>
            </Box>

            <Paper sx={{
                mb: 3,
                borderRadius: '10px',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: 'none',
                backgroundColor: theme.palette.background.default,
            }} >
                <FilterSortToolbar
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    sortOption={sortOption}
                    onSortChange={handleSortChange}
                    sortOrder={sortOrder}
                    onSortOrderChange={handleSortOrderChange}
                    resultsPerPage={resultsPerPage}
                    onResultsPerPageChange={handleResultsPerPageChange}
                />
            </Paper>

            {isLoading && properties.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : !isLoading && properties.length === 0 ? (
                <Paper sx={{
                    textAlign: 'center',
                    p: 4,
                    mt: 4,
                    borderRadius: '10px',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none',
                    backgroundColor: theme.palette.background.default,
                }}>
                    <Apartment sx={{ fontSize: 60, color: theme.palette.secondary.light }} />
                    <Typography variant="h5" component="p" gutterBottom sx={{mt: 2}}>
                        No properties found.
                    </Typography>
                    <Typography color="text.secondary" sx={{mb: 3}}>
                        Get started by creating your first property listing.
                    </Typography>
                    <Button variant="contained" onClick={handleCreateNew}>
                        Create Property
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {properties.map(property => (
                        <Grid item key={property.id} xs={12} sm={6} md={4}>
                            <Box onClick={() => handleCardClick(property.id)} sx={{cursor: 'pointer'}}>
                               <PropertyCard property={property} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {hasMore && !isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Button variant="contained" onClick={handleLoadMore} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : 'Load More'}
                    </Button>
                </Box>
            )}
        </Container>
    );
};