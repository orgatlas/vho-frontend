import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
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
import {getProperty, getPropertyMedia} from 'src/services/api';
import {Property, Video, StagingPackage} from 'src/types';
import {VideoCard} from '../../video/components/VideoCard';
import {FilterSortToolbar} from 'src/components/FilterSortToolbar';
import {toast} from 'react-toastify';
import {useDebounce} from 'src/hooks/useDebounce';
import {Add, BathtubOutlined, BedOutlined, DirectionsCarOutlined, VideocamOutlined} from "@mui/icons-material";
import {StagingPackageCard} from "src/features/video/components/StagingPackageCard";

export const PropertyManagementPage: React.FC = () => {
    const {propertyId} = useParams<{ propertyId: string }>();
    const navigate = useNavigate();
    const theme = useTheme();
    const [property, setProperty] = useState<Property | null>(null);
    const [media, setMedia] = useState<(Video|StagingPackage)[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMediaLoading, setIsMediaLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // New state for filtering and sorting
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('created');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [resultsPerPage, setResultsPerPage] = useState(12);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (!propertyId) {
            toast.error("Property ID missing!");
            navigate('/listings');
            return;
        }
        const fetchPropertyDetails = async () => {
            setIsLoading(true);
            try {
                const propDetails = await getProperty(propertyId);
                setProperty(propDetails);
            } catch (error) {
                toast.error("Failed to fetch property details.");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPropertyDetails();
    }, [propertyId, navigate]);

    const fetchMedia = useCallback(async (
        pageNum: number,
        search: string,
        sortBy: string,
        order: 'asc' | 'desc',
        limit: number,
        append: boolean = false
    ) => {
        setIsMediaLoading(true);
        try {

            const {media: newMedia, total} = await getPropertyMedia(propertyId!, pageNum, limit, search, sortBy, order);

            setMedia(prev => append ? [...prev, ...newMedia] : newMedia);
            setHasMore(pageNum * limit < total);

        } catch (error) {
            toast.error("Failed to fetch videos.");
            console.error(error);
        } finally {
            setIsMediaLoading(false);
        }
    }, [propertyId]);


    useEffect(() => {
        if (propertyId) {
            setPage(1);
            fetchMedia(1, debouncedSearchQuery, sortOption, sortOrder, resultsPerPage, false);
        }
    }, [propertyId, debouncedSearchQuery, sortOption, sortOrder, resultsPerPage, fetchMedia]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMedia(nextPage, debouncedSearchQuery, sortOption, sortOrder, resultsPerPage, true);
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

    const handleAddMedia = () => {
        navigate(`/checkout/${propertyId}`);
    };

    if (isLoading) {
        return <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}><CircularProgress/></Box>;
    }

    return (
        <Container maxWidth="lg" sx={{my: 4}}>
            {property && (
                <Paper sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: '10px',
                    boxShadow: 'none',
                    backgroundColor: theme.palette.background.default,
                }}>
                    <Typography variant="h4" component="h1" color={'text.primary'} gutterBottom>{property.address}</Typography>
                    <Typography variant="h5" color="primary"
                                gutterBottom>{property.price}</Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', color: 'text.primary', mt: 1, gap: 2, flexWrap: 'wrap'}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <BedOutlined sx={{mr: 1}}/>
                            <Typography variant="body1">{property.bedrooms} Beds</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <BathtubOutlined sx={{mr: 1}}/>
                            <Typography variant="body1">{property.bathrooms} Baths</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <DirectionsCarOutlined sx={{mr: 1}}/>
                            <Typography variant="body1">{property.car_spaces} Cars</Typography>
                        </Box>
                    </Box>
                </Paper>
            )}

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Typography variant="h5" component="h2">Media</Typography>
                <Button variant="contained" startIcon={<Add/>} onClick={handleAddMedia}>
                    Create
                </Button>
            </Box>

            {/*<Paper sx={{*/}
            {/*    mb: 3,*/}
            {/*    borderRadius: '10px',*/}
            {/*    boxShadow: 'none',*/}
            {/*    backgroundColor: theme.palette.background.default,*/}
            {/*}}>*/}
            {/*    <FilterSortToolbar*/}
            {/*        searchQuery={searchQuery}*/}
            {/*        onSearchChange={handleSearchChange}*/}
            {/*        sortOption={sortOption}*/}
            {/*        onSortChange={handleSortChange}*/}
            {/*        sortOrder={sortOrder}*/}
            {/*        onSortOrderChange={handleSortOrderChange}*/}
            {/*        resultsPerPage={resultsPerPage}*/}
            {/*        onResultsPerPageChange={handleResultsPerPageChange}*/}
            {/*    />*/}
            {/*</Paper>*/}

            {isMediaLoading && media.length === 0 ? (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <CircularProgress/>
                </Box>
            ) : !isMediaLoading && media.length === 0 ? (
                <Paper sx={{
                    textAlign: 'center',
                    p: 4,
                    mt: 4,
                    borderRadius: '10px',
                    boxShadow: 'none',
                    backgroundColor: theme.palette.background.default,
                }}>
                    <VideocamOutlined sx={{fontSize: 60, color: theme.palette.secondary.light}}/>
                    <Typography variant="h5" component="p" gutterBottom sx={{mt: 2}}>
                        No media found for this property.
                    </Typography>
                    <Button variant="contained" onClick={handleAddMedia()}>
                        Start now
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {media.map(item => (
                        <Grid item key={item.id} xs={12} sm={6} md={4}>
                            {'duration' in item ? ( /* Duration is unique to a video item */
                                <VideoCard video={item} />
                            ) : (
                                <StagingPackageCard stagingPackage={item} />
                            )}
                        </Grid>
                    ))}
                </Grid>
            )}

            {hasMore && !isMediaLoading && (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <Button variant="contained" onClick={handleLoadMore} disabled={isMediaLoading}>
                        {isMediaLoading ? <CircularProgress size={24}/> : 'Load More'}
                    </Button>
                </Box>
            )}
        </Container>
    );
};
