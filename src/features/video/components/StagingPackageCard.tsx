import React, { useEffect, useState } from 'react';
import { Card, Typography, Box, CardContent, CardMedia, IconButton, useTheme, CircularProgress } from '@mui/material';
import { StagingPackage, StagedImage } from 'src/types';
import { Apartment, ChevronLeft, ChevronRight, Photo } from "@mui/icons-material";
import { getStagedImages } from "src/services/api";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import LoadingWheel from "src/theme/loading";

interface StagingPackageCardProps {
    stagingPackage: StagingPackage;
}

export const StagingPackageCard: React.FC<StagingPackageCardProps> = ({ stagingPackage }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<StagedImage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!stagingPackage.id) return;
        setLoading(true);

        const fetchImages = async () => {
            try {
                const stagedImages = await getStagedImages(stagingPackage.id);
                const completedImages = stagedImages.filter(img => img.status === 'Complete' && img.staged_image);
                setImages(completedImages);
            } catch (error) {
                toast.error('Failed to load staged images.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [stagingPackage.id]);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (images?.length || 1));
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (images?.length || 1)) % (images?.length || 1));
    };

    const handleCardClick = () => {
        navigate('/staging/gallery/'+stagingPackage.id);
    };

    return (
        <Card
            onClick={handleCardClick}
            sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4],
                },
                borderRadius: '10px',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: 'none'
            }}
        >
            <Box sx={{ position: 'relative', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading ? (
                    <LoadingWheel color={'white'} />
                ) : images && images.length > 0 ? (
                    <>
                        <CardMedia
                            component="img"
                            sx={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                            }}
                            image={`${images[currentIndex].staged_image!.file}`}
                        />
                        {images.length > 1 && (
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
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
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
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
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
                                    {images.map((_, index) => (
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
                    </>
                ) : (
                    <Apartment sx={{ fontSize: 60, color: theme.palette.secondary.main }} />
                )}
            </Box>

            <CardContent>
                <Typography variant="h6" component="div" noWrap>
                    Virtual Staging
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 1, gap: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">
                        Created: {new Date(stagingPackage.created).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Photo sx={{ mr: 0.5, fontSize: 20 }} />
                    <Typography variant="body2">{images.length} Images</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};