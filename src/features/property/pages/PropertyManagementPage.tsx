import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Typography, CircularProgress, Button, Paper, Divider } from '@mui/material';
import { getProperty, getVideoList } from 'src/services/api';
import { Property, Video } from 'src/types';
import { VideoCard } from '../../video/components/VideoCard';
import { FilterSortToolbar } from 'src/components/FilterSortToolbar';
import { toast } from 'react-toastify';

export const PropertyManagementPage: React.FC = () => {
    const { propertyId } = useParams<{ propertyId: string }>();
    const navigate = useNavigate();
    const [property, setProperty] = useState<Property | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVideosLoading, setIsVideosLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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

    const fetchVideos = useCallback(async (pageNum: number) => {
        if (!propertyId) return;
        setIsVideosLoading(true);
        try {
            const { videos: newVideos, total } = await getVideoList(propertyId, { page: pageNum, limit: 12 });
            setVideos(prev => pageNum === 1 ? newVideos : [...prev, ...newVideos]);
            setHasMore(videos.length + newVideos.length < total);
        } catch (error) {
            toast.error("Failed to fetch videos.");
            console.error(error);
        } finally {
            setIsVideosLoading(false);
        }
    }, [propertyId, videos.length]);

    useEffect(() => {
        if (propertyId) {
            fetchVideos(1);
        }
    }, [propertyId, fetchVideos]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchVideos(nextPage);
    };

    const handleVideoClick = (videoId: string) => {
        navigate(`/video/${videoId}/view`);
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            {property && (
                <Box mb={4}>
                    <Typography variant="h4" component="h1" gutterBottom>{property.address}</Typography>
                    <Typography variant="h6">{property.price}</Typography>
                    <Typography color="text.secondary">Beds: {property.bedrooms} | Baths: {property.bathrooms} | Cars: {property.car_spaces}</Typography>
                </Box>
            )}
            <Divider sx={{mb: 4}}/>
            <Typography variant="h5" component="h2" gutterBottom>Videos</Typography>
            <Paper sx={{ mb: 3 }} elevation={2}>
                <FilterSortToolbar />
            </Paper>
            <Grid container spacing={3}>
                {videos.map(video => (
                    <Grid item key={video.id} xs={12} sm={6} md={4}>
                        <Box onClick={() => handleVideoClick(video.id)} sx={{cursor: 'pointer'}}>
                            <VideoCard video={video} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {isVideosLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {hasMore && !isVideosLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Button variant="contained" onClick={handleLoadMore}>Load More</Button>
                </Box>
            )}
             {!hasMore && !isVideosLoading && videos.length === 0 && (
                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Typography>No videos found for this property.</Typography>
                </Box>
            )}
        </Container>
    );
};
