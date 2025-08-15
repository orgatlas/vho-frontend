import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
    Divider,
    CircularProgress,
    Modal,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Property, Image as ImageType, Agent, Video, Company } from "src/types";
import {
    Bed,
    Bathtub,
    TimeToLeave,
    Home,
    LocationOn,
    PriceChange,
    Person,
    Close,
    Image,
    SquareFoot,
    ArrowForwardIos,
    ArrowBackIos
} from '@mui/icons-material';
import { SectionHeader } from "src/theme/components/SectionHeader";
import { getImageList, removeImage, uploadImage, getVideoDetails, updatePropertyDetails } from "src/services/api";
import { toast } from "react-toastify";
import { AgentsEditor } from "src/features/property/components/AgentsEditor";
import { CompanyEditor } from "src/features/property/components/CompanyEditor";
import { alpha, useTheme } from "@mui/material/styles";

const FieldLabel: React.FC<{ icon: React.ReactElement; label: string; tooltip: string }> = ({ icon, label, tooltip }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {React.cloneElement(icon, { sx: { mr: 1, fontSize: '0.875rem', color: 'text.primary' } })}
        <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>{label}</Typography>
    </Box>
);

export const PropertyDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [isDescriptionFocussed, setIsDescriptionFocussed] = useState<boolean>(false);
    const [video, setVideo] = useState<Video | null>(location.state?.video || null);
    const [images, setImages] = useState<ImageType[]>(video?.property.images || []);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleAgentsChange = (updatedAgents: Agent[]) => {
        setVideo(prevVideo => prevVideo ? { ...prevVideo, property: { ...prevVideo.property, agents: updatedAgents } } : null);
    };

    const handleCompanyChange = (updatedCompany: Company) => {
        setVideo(prevVideo => prevVideo ? { ...prevVideo, property: { ...prevVideo.property, company: updatedCompany } } : null);
    };

    useEffect(() => {
        if (video?.id) {
            getVideoDetails(video.id).then((refreshedVideo) => {
                if (refreshedVideo.locked) {
                    navigate('/video-generated');
                }
                setVideo(refreshedVideo);
            });
        }

        const fetchImages = async () => {
            if (video?.id) {
                try {
                    const imageList = await getImageList(video.id);
                    setImages(imageList);
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            }
        };

        fetchImages();
    }, [video?.id, navigate]);

    const onDrop = async (acceptedFiles: File[]) => {
        if (!video?.id) {
            toast.error("Cannot upload image until property has been created");
            return;
        }

        for (const file of acceptedFiles) {
            try {
                const response = await uploadImage(video.id, file);
                if (response.warnings && response.warnings.length > 0) {
                    toast.warn(response.warnings.join('\n'));
                }
                const newImage: ImageType = {
                    id: response.id,
                    file: response.file_url,
                    description: '',
                    preview: URL.createObjectURL(file)
                };
                setImages(prevImages => [...prevImages, newImage]);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setVideo(prevVideo => {
            if (!prevVideo) return null;
            return {
                ...prevVideo,
                property: {
                    ...prevVideo.property,
                    [name]: value,
                },
            };
        });
    };

    const handleRemoveImage = async (index: number) => {
        if (!video?.id) {
            toast.error("Cannot remove image until property has been created");
            return;
        }

        const imageToRemove = images[index];
        if (!imageToRemove) return;

        try {
            await removeImage(video.id, imageToRemove.id);
            toast.success("Image removed.");
            setImages(images.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error removing image:', error);
        }
    }

    const handleContinue = async () => {
        if (!video?.id || !video.property) return;
        setLoading(true);
        try {
            const updatedVideo = await updatePropertyDetails(video.id, video.property);
            setVideo(updatedVideo);
            navigate('/checkout', { state: { videoId: video.id } });
        } catch (error) {
            console.error("Failed to update property details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const handleCloseLightbox = () => setLightboxOpen(false);

    const handlePrevImage = () => setLightboxIndex((prevIndex) => (prevIndex + images.length - 1) % images.length);

    const handleNextImage = () => setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length);

    if (!video || !video.property) {
        return <Container><CircularProgress /></Container>;
    }

    return (
        <Container maxWidth={false} disableGutters>
            <Box sx={{ my: 4, pb: 12 }}>
                <Typography variant="h4" component="h1" gutterBottom>Let's craft your video</Typography>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 3 }}>
                            <SectionHeader icon={<Home color="primary" />} title="Property Details" tooltip="Enter the core details of the property." />
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ mb: 2 }}>
                                <FieldLabel icon={<LocationOn />} label="Property Address" tooltip="Enter the full property address." />
                                <TextField fullWidth placeholder="E.g. 123 Example St, Sydney NSW 2000" name="address" value={video.property.address} onChange={handleInputChange} />
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FieldLabel icon={<Bed />} label="Beds" tooltip="Number of bedrooms." />
                                    <TextField fullWidth placeholder="E.g. 3" name="bedrooms" value={video.property.bedrooms} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <FieldLabel icon={<Bathtub />} label="Baths" tooltip="Number of bathrooms." />
                                    <TextField fullWidth placeholder="E.g. 2" name="bathrooms" value={video.property.bathrooms} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <FieldLabel icon={<TimeToLeave />} label="Cars" tooltip="Number of car spaces." />
                                    <TextField fullWidth placeholder="E.g. 1" name="car_spaces" value={video.property.car_spaces} onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 2 }}>
                                <FieldLabel icon={<SquareFoot />} label="Property Area" tooltip="Total property area in square meters." />
                                <TextField fullWidth placeholder="E.g. 500 sqm" name="property_area" value={video.property.property_area} onChange={handleInputChange} />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <FieldLabel icon={<Home />} label="Description" tooltip="Listing description of the properties features." />
                                <textarea
                                    name="description"
                                    value={video.property.description}
                                    onChange={handleInputChange}
                                    style={{
                                        background: alpha(theme.palette.secondary.main, 0.1),
                                        borderRadius: 10,
                                        border: isDescriptionFocussed ? `2px solid ${theme.palette.primary.main}` : 'none',
                                        boxShadow: 'none',
                                        minWidth: '100%',
                                        maxWidth: '100%',
                                        outline: 'none',
                                        resize: 'none',
                                        minHeight: '200px',
                                        maxHeight: '100%',
                                        padding: isDescriptionFocussed ? '8px' : '10px',
                                        fontWeight: 400,
                                        overflowY: 'auto',
                                        fontSize: 15,
                                        fontFamily: ['"inter"', 'sans-serif'].join(','),
                                        color: '#373e40',
                                    }}
                                    onFocus={() => setIsDescriptionFocussed(true)}
                                    onBlur={() => setIsDescriptionFocussed(false)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <SectionHeader icon={<PriceChange color="primary" />} title="Pricing" tooltip="Provide agent and pricing information." />
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ mb: 2 }}>
                                <FieldLabel icon={<PriceChange />} label="Asking Price" tooltip="The asking price for the property." />
                                <TextField fullWidth placeholder="E.g. $1,000,000" name="price" value={video.property.price} onChange={handleInputChange} />
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 3 }}>
                            <SectionHeader icon={<Person color="primary" />} title="Agents" tooltip="Manage the agents for this property." />
                            <Divider sx={{ mb: 2 }} />
                            <AgentsEditor videoId={video.id} agents={video.property.agents} onAgentsChange={handleAgentsChange} />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <CompanyEditor videoId={video.id} company={video.property.company} onCompanyChange={handleCompanyChange} />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box>
                            <SectionHeader icon={<Image color="primary" />} title="Image Uploader" tooltip="Upload images for your video. Drag and drop or click to select." />
                            <Divider sx={{ mb: 2 }} />
                            <Box {...getRootProps()} sx={{ p: 4, border: '2px dashed', borderColor: 'primary.main', borderRadius: 2, textAlign: 'center', background: (theme) => theme.palette.action.hover, cursor: 'pointer' }}>
                                <input {...getInputProps()} />
                                <Image sx={{ fontSize: 48, color: 'primary.main' }} />
                                <Typography>Drag & Drop Property Images Here, or Click to Select</Typography>
                            </Box>
                            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                                {images.map((image, index) => (
                                    <Box key={index} sx={{ mr: 2, mb: 2, position: 'relative', cursor: 'pointer' }} onClick={() => handleOpenLightbox(index)}>
                                        <img src={image.preview} alt={`property image ${index}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />
                                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleRemoveImage(index) }} sx={{ position: 'absolute', top: -5, right: -5, background: 'white', '&:hover': { background: 'white' } }}>
                                            <Close fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Modal open={lightboxOpen} onClose={handleCloseLightbox} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', outline: 'none' }}>
                    <img src={images[lightboxIndex]?.preview} alt="lightbox" style={{ maxHeight: '80vh', maxWidth: '80vw' }} />
                    <IconButton onClick={handleCloseLightbox} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <Close />
                    </IconButton>
                    <IconButton onClick={handlePrevImage} sx={{ position: 'absolute', top: '50%', left: 8, color: 'white', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton onClick={handleNextImage} sx={{ position: 'absolute', top: '50%', right: 8, color: 'white', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <ArrowForwardIos />
                    </IconButton>
                </Box>
            </Modal>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, zIndex: 1100 }} elevation={3}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'right' }}>
                        <Button variant="contained" color="primary" onClick={handleContinue} size="large" disabled={loading}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
                        </Button>
                    </Box>
                </Container>
            </Paper>
        </Container>
    );
};