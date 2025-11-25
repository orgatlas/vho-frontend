import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CircularProgress,
    Paper,
    Switch,
    FormControlLabel,
    Button,
    Stack
} from '@mui/material';
import { getStagedImages } from 'src/services/api';
import { StagedImage } from 'src/types';
import { toast } from 'react-toastify';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useTheme } from '@mui/material/styles';
import { Download, Edit } from '@mui/icons-material';
import JSZip from 'jszip';

export const GalleryPage: React.FC = () => {
    const { stagingPackageId } = useParams<{ stagingPackageId: string }>();
    const navigate = useNavigate();
    const [images, setImages] = useState<StagedImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<StagedImage | null>(null);
    const [loading, setLoading] = useState(true);
    const [showCompare, setShowCompare] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloadingAll, setIsDownloadingAll] = useState(false);
    const theme = useTheme();
    const leftSideRef = useRef<HTMLDivElement>(null);
    const [leftSideHeight, setLeftSideHeight] = useState<number | string>('auto');

    useLayoutEffect(() => {
        const updateHeight = () => {
            if (leftSideRef.current) {
                setLeftSideHeight(leftSideRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', updateHeight);
        updateHeight();

        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    useEffect(() => {
        if (!stagingPackageId) return;

        const fetchImages = async () => {
            try {
                const stagedImages = await getStagedImages(stagingPackageId);
                const completedImages = stagedImages.filter(img => img.status === 'Complete' && img.staged_image);
                setImages(completedImages);
                if (completedImages.length > 0) {
                    setSelectedImage(completedImages[0]);
                }
            } catch (error) {
                toast.error('Failed to load staged images.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [stagingPackageId]);

    const handleDownload = async () => {
        if (!selectedImage || !selectedImage.staged_image) {
            toast.error('No image selected.');
            return;
        }

        setIsDownloading(true);

        try {
            // Fetch the image with CORS mode
            const response = await fetch(selectedImage.staged_image.file, { mode: 'cors' });
            if (!response.ok) throw new Error('Failed to fetch image');

            // Convert to blob
            const blob = await response.blob();

            // Create object URL
            const url = window.URL.createObjectURL(blob);

            // Generate safe filename
            const title = selectedImage?.staged_image?.property?.title?.replace(/[^a-z0-9_\-]/gi, '_') || 'unknown-title';
            const location = selectedImage?.staged_image?.location_name?.replace(/[^a-z0-9_\-]/gi, '_') || 'unknown-location';
            const fileName = `${title}-${location}.jpg`;

            // Create temporary link and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Revoke object URL to free memory
            window.URL.revokeObjectURL(url);

            toast.success('Download started!');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download image. Check CORS or file URL.');
        } finally {
            setIsDownloading(false);
        }
    };


    const handleDownloadAll = async () => {
        if (images.length === 0) return;

        setIsDownloadingAll(true);
        toast.info('Preparing your download...');

        try {
            const zip = new JSZip();
            const imagePromises = images.map(async (image) => {
                if (image.staged_image) {
                    const response = await fetch(image.staged_image.file);
                    const blob = await response.blob();

                    // Properly clean up filename
                    let fileName = image.staged_image.file.split('/').pop() || `staged-image-${image.id}.jpg`;
                    fileName = fileName.split('?')[0];

                    zip.file(fileName, blob);
                }
            });

            await Promise.all(imagePromises);

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const url = window.URL.createObjectURL(zipBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `staged-images-${stagingPackageId}.zip`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
            toast.success('Download started!');
        } catch (error) {
            toast.error('Failed to create zip file for download.');
            console.error(error);
        } finally {
            setIsDownloadingAll(false);
        }
    };

    const handleEdit = () => {
        if (selectedImage && stagingPackageId) {
            navigate(`/staging/${stagingPackageId}/editor/${selectedImage.id}`);
        }
    };

    if (loading) {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading staged images...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl">

            <Grid container spacing={4} sx={{alignItems: 'flex-start'}}>
                <Grid item xs={12} md={8}>
                    <Stack spacing={2} ref={leftSideRef}>
                        <Paper elevation={3} sx={{ p: 2, backgroundColor: theme.palette.background.default, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={showCompare}
                                            onChange={(e) => setShowCompare(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Compare"
                                    labelPlacement="end"
                                    sx={{ color: theme.palette.text.primary }}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" startIcon={isDownloading ? <CircularProgress size={24} /> : <Download />} onClick={handleDownload} disabled={!selectedImage || isDownloading}>
                                    {isDownloading ? 'Downloading...' : 'Download'}
                                </Button>
                                <Button variant="outlined" startIcon={<Download />} onClick={handleDownloadAll} disabled={isDownloadingAll}>
                                    {isDownloadingAll ? <CircularProgress size={24} /> : 'Download All'}
                                </Button>
                                <Button variant="outlined" startIcon={<Edit />} onClick={handleEdit} disabled={!selectedImage}>
                                    Edit
                                </Button>
                            </Stack>
                        </Paper>
                        <Paper
                            elevation={3}
                            sx={{
                                position: 'relative',
                                backgroundColor: theme.palette.background.default,
                                aspectRatio: '16 / 9',
                                width: '100%',
                            }}
                        >
                            {selectedImage && selectedImage.staged_image ? (
                                <>
                                    {showCompare ? (
                                        <BeforeAfterSlider
                                            before={selectedImage.original_image.file}
                                            after={selectedImage.staged_image!.file}
                                        />
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            image={selectedImage.staged_image!.file}
                                            alt="Staged"
                                            sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    )}
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', aspectRatio: '16 / 9' }}>
                                    <Typography variant="h6" color="text.secondary">
                                        {images.length > 0 ? 'Select an image to view' : 'No completed images to display.'}
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Stack>
                </Grid>

                {/* Gallery Thumbnail Section */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ height: { md: leftSideHeight }, overflowY: 'auto', p: 2, backgroundColor: theme.palette.background.default }}>
                        <Grid container spacing={2}>
                            {images.map((image) => (
                                <Grid item xs={6} key={image.id}>
                                    <Card
                                        onClick={() => setSelectedImage(image)}
                                        sx={{
                                            cursor: 'pointer',
                                            border: selectedImage?.id === image.id ? `2px solid ${theme.palette.primary.main}` : 'none',
                                            transition: 'border 0.3s',
                                            backgroundColor: theme.palette.background.default,
                                            height: '100%'
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={image.staged_image!.file}
                                            alt={`Staged image ${image.id}`}
                                            sx={{ objectFit: 'cover', aspectRatio: '16/9', height: '100%' }}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
