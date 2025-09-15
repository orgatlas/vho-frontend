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
    Divider,
    SelectChangeEvent,
    useTheme
} from '@mui/material';
import {getProperty, getVideoList} from 'src/services/api';
import {Property, Video} from 'src/types';
import {VideoCard} from '../../video/components/VideoCard';
import {FilterSortToolbar} from 'src/components/FilterSortToolbar';
import {toast} from 'react-toastify';
import {useDebounce} from 'src/hooks/useDebounce';
import {Add, BathtubOutlined, BedOutlined, DirectionsCarOutlined, VideocamOutlined} from "@mui/icons-material";

export const PropertyManagementPage: React.FC = () => {
    const {propertyId} = useParams<{ propertyId: string }>();
    const navigate = useNavigate();
    const theme = useTheme();
    const [property, setProperty] = useState<Property | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVideosLoading, setIsVideosLoading] = useState(false);
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

    const fetchVideos = useCallback(async (
        pageNum: number,
        search: string,
        sortBy: string,
        order: 'asc' | 'desc',
        limit: number,
        append: boolean = false
    ) => {
        setIsVideosLoading(true);
        try {

            const {videos: newVideos, total} = await getVideoList(propertyId!, pageNum, limit, search, sortBy, order);

            setVideos(prev => append ? [...prev, ...newVideos] : newVideos);
            setHasMore(pageNum * limit < total);

        } catch (error) {
            toast.error("Failed to fetch videos.");
            console.error(error);
        } finally {
            setIsVideosLoading(false);
        }
    }, [propertyId]);


    useEffect(() => {
        if (propertyId) {
            setPage(1);
            fetchVideos(1, debouncedSearchQuery, sortOption, sortOrder, resultsPerPage, false);
        }
    }, [propertyId, debouncedSearchQuery, sortOption, sortOrder, resultsPerPage, fetchVideos]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchVideos(nextPage, debouncedSearchQuery, sortOption, sortOrder, resultsPerPage, true);
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

    const handleGenerateVideo = () => {
        navigate(`/property/${propertyId}/video-editor`);
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
                <Typography variant="h5" component="h2">Videos</Typography>
                {/*<Button variant="contained" startIcon={<Add/>} onClick={handleGenerateVideo}>*/}
                {/*    Generate New Video*/}
                {/*</Button>*/}
            </Box>

            <Paper sx={{
                mb: 3,
                borderRadius: '10px',
                boxShadow: 'none',
                backgroundColor: theme.palette.background.default,
            }}>
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

            {isVideosLoading && videos.length === 0 ? (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <CircularProgress/>
                </Box>
            ) : !isVideosLoading && videos.length === 0 ? (
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
                        No videos found for this property.
                    </Typography>
                    <Typography color="text.primary" sx={{mb: 3}}>
                        Get started by making your first video.
                    </Typography>
                    <Button variant="contained" onClick={handleGenerateVideo}>
                        Create Video
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {videos.map(video => (
                        <Grid item key={video.id} xs={12} sm={6} md={4}>
                            <VideoCard video={video}/>
                        </Grid>
                    ))}
                </Grid>
            )}

            {hasMore && !isVideosLoading && (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <Button variant="contained" onClick={handleLoadMore} disabled={isVideosLoading}>
                        {isVideosLoading ? <CircularProgress size={24}/> : 'Load More'}
                    </Button>
                </Box>
            )}
        </Container>
    );
};
