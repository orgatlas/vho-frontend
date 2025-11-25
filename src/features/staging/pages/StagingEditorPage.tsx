import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Grid,
    CircularProgress,
    Stack,
    CardMedia,
    Paper,
    Switch,
    FormControlLabel,
    Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getStagedImage, editStagedImage } from 'src/services/api';
import { StagedImage, ChangeCardData } from 'src/types';
import { FeedbackSidebar } from '../components/editor/FeedbackSidebar';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useTheme } from '@mui/material/styles';
import { Download } from '@mui/icons-material';


export const StagingEditorPage: React.FC = () => {
    const { stagingPackageId, stagedImageId } = useParams<{ stagingPackageId: string; stagedImageId: string }>();
    const navigate = useNavigate();

    const [image, setImage] = useState<StagedImage | null>(null);
    const [cards, setCards] = useState<ChangeCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showCompare, setShowCompare] = useState(false);
    const theme = useTheme();

    const fetchImage = useCallback(async () => {
        if (!stagedImageId) return;
        setLoading(true);
        try {
            const stagedImage = await getStagedImage(stagedImageId);
            setImage(stagedImage);
        } catch (error) {
            toast.error('Failed to load staged image.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [stagedImageId]);

    useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    const addCard = (type: ChangeCardData['type']) => {
        const newCard: ChangeCardData = {
            id: crypto.randomUUID(),
            type,
            field1: '',
            field2: '',
        };
        setCards([...cards, newCard]);
    };

    const updateCard = (updatedCard: ChangeCardData) => {
        setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
    };

    const deleteCard = (id: string) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    const resetCards = () => {
        setCards([])
    };

    const handleSubmit = async () => {
        if (cards.length === 0) {
            toast.info('Please add at least one change request.');
            return;
        }

        setIsSubmitting(true);

        const prompt = cards
            .map((card) => {
                let part = `${card.type} ${card.field1}`;
                if (card.type === 'Change' && card.field2) {
                    part += ` to ${card.field2}`;
                } else if (card.type === 'Move' && card.field2) {
                    part += ` to ${card.field2}`;
                } else if (card.type === 'Add' && card.field2) {
                    part += ` with details: ${card.field2}`;
                }
                return part;
            })
            .join('. ');

        const fullPrompt = `${prompt}.`;

        try {
            if (!stagedImageId) throw new Error("Staged image ID is missing");
            const newStagedImage = await editStagedImage(stagedImageId, fullPrompt);
            resetCards()
            navigate(`/staging/${stagingPackageId}/editor/${newStagedImage.id}`);
        } catch (error) {
            toast.error('Failed to edit your image, please try again later.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate(`/staging/gallery/${stagingPackageId}`);
    };

    const handleDownload = async () => {
        if (!image || !image.staged_image) {
            toast.error('No image available to download.');
            return;
        }

        setIsDownloading(true);

        try {
            const response = await fetch(image.staged_image.file, { mode: 'cors' });
            if (!response.ok) throw new Error('Failed to fetch image');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const title = image?.staged_image?.property?.title?.replace(/[^a-z0-9_\\-]/gi, '_') || 'unknown-title';
            const location = image?.staged_image?.location_name?.replace(/[^a-z0-9_\\-]/gi, '_') || 'unknown-location';
            const fileName = `${title}-${location}.jpg`;

            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success('Download started!');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download image. Check CORS or file URL.');
        } finally {
            setIsDownloading(false);
        }
    };

    if (loading) {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading Editor...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Stack spacing={2}>
                        <Paper elevation={3} sx={{ p: 2, backgroundColor: theme.palette.background.default, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Button variant="outlined" onClick={handleBack}>
                                    Back
                                </Button>
                            </Stack>
                            <Stack direction="row" spacing={2}>
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
                                <Button variant="outlined" startIcon={isDownloading ? <CircularProgress size={24} /> : <Download />} onClick={handleDownload} disabled={!image?.staged_image || isDownloading}>
                                    {isDownloading ? 'Downloading...' : 'Download'}
                                </Button>
                            </Stack>
                        </Paper>

                        {/* UPDATED CODE BELOW */}
                        <Paper
                            elevation={3}
                            sx={{
                                position: 'relative',
                                backgroundColor: theme.palette.background.default,
                                aspectRatio: '16 / 9',
                                width: '100%',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Overlay — dims UI but keeps image fully colored */}
                            {isSubmitting && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: 'rgba(0,0,0,0.35)',
                                        zIndex: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#fff',
                                    }}
                                >
                                    <CircularProgress color="inherit" />
                                    <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                                        Applying Changes. Please Wait.
                                    </Typography>
                                </Box>
                            )}

                            {/* Image Section (NOT GREYSCALED ANYMORE) */}
                            {image && image.original_image && image.staged_image ? (
                                <>
                                    {showCompare ? (
                                        <BeforeAfterSlider
                                            before={image.original_image.file}
                                            after={image.staged_image.file}
                                        />
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            image={image.staged_image.file}
                                            alt="Staged"
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    )}
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography variant="h6" color="text.secondary">
                                        Image not available.
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FeedbackSidebar
                        cards={cards}
                        isSubmitting={isSubmitting}
                        onAddCard={addCard}
                        onUpdateCard={updateCard}
                        onDeleteCard={deleteCard}
                        onSubmit={handleSubmit}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};