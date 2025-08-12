import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Box, Button, Container, Grid, IconButton, Paper, TextField, Typography, Divider, CircularProgress, Modal,

} from '@mui/material';
import {useDropzone} from 'react-dropzone';
import {PropertyDetails, Image as ImageType, Agent, Video, Company} from "src/types";
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
import {SectionHeader} from "src/components/SectionHeader";
import {getImageList, removeImage, uploadImage, getVideoDetails} from "src/services/api";
import {toast} from "react-toastify";
import {AgentsEditor} from "src/components/AgentsEditor";
import {CompanyEditor} from "src/components/CompanyEditor";

const FieldLabel: React.FC<{ icon: React.ReactElement; label: string; tooltip: string }> = ({icon, label, tooltip}) => (
    <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
        {React.cloneElement(icon, {
            sx: {
                mr: 1,
                fontSize: '0.875rem',
                color: 'text.primary',
            },
        })}
        <Typography variant="body2" sx={{fontWeight: 'medium', color: 'text.primary'}}>
            {label}
        </Typography>
        {/*<Tooltip title={tooltip}>*/}
        {/*    <IconButton size="small" sx={{ ml: 0.5 }}>*/}
        {/*        <HelpOutline fontSize="small" sx={{ color: 'text.primary' }} />*/}
        {/*    </IconButton>*/}
        {/*</Tooltip>*/}
    </Box>
);


export const PropertyDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>(() => {
        const initialDetails = location.state?.propertyDetails || {};
        return {
            id: initialDetails.id,
            address: initialDetails.address || '',
            bedrooms: initialDetails.beds || '',
            bathrooms: initialDetails.bathrooms || '',
            carSpaces: initialDetails.car_spaces || '',
            propertyArea: initialDetails.area || '',
            price: initialDetails.price || '',
            company: initialDetails.company,
            video: initialDetails.video,
            agents: initialDetails.agents || [],
        };
    });
    const [images, setImages] = useState<ImageType[]>([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const [loading, setLoading] = useState(false);

    const handleAgentsChange = (updatedAgents: Agent[]) => {
        setPropertyDetails(prevDetails => ({
            ...prevDetails,
            agents: updatedAgents,
        }));
    };

    const handleCompanyChange = (updatedCompany: Company) => {
        setPropertyDetails(prevDetails => ({
            ...prevDetails,
            company: updatedCompany,
        }));
    };

    useEffect(() => {
        if (propertyDetails.video?.id) {
            getVideoDetails(propertyDetails.video.id).then((video) => {
                if (video.locked) {
                    navigate('/video-generated');
                }
                setPropertyDetails(prevDetails => ({
                    ...prevDetails,
                    video: video,
                }));
            });
        }

        const fetchImages = async () => {
            if (propertyDetails.video?.id) {
                try {
                    const imageList = await getImageList(propertyDetails.video.id);
                    setImages(imageList);
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            }
        };

        fetchImages();
    }, [propertyDetails.video?.id, navigate]);

    const onDrop = async (acceptedFiles: File[]) => {
        if (!propertyDetails.video?.id) {
            toast.error("Cannot upload image until property has been created");
            return;
        }

        for (const file of acceptedFiles) {
            try {
                const response = await uploadImage(propertyDetails.video.id, file);
                if (response.warnings && response.warnings.length > 0) {
                    toast.warn(response.warnings.join('\n'));
                }
                const newImage: ImageType = {
                    id: response.id,
                    file: response.file_url,
                    description: '', // You might want to add a way to edit this
                    preview: URL.createObjectURL(file)
                };
                setImages(prevImages => [...prevImages, newImage]);
            } catch (error) {
                console.error('Error uploading image:', error);
                // Toast error is handled by the api service
            }
        }
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPropertyDetails({...propertyDetails, [e.target.name]: e.target.value});
    };

    const handleRemoveImage = async (index: number) => {
        if (!propertyDetails.video?.id) {
            toast.error("Cannot remove image until property has been created");
            return;
        }

        const imageToRemove = images[index];
        if (!imageToRemove) return;

        try {
            const response = await removeImage(propertyDetails.video.id, imageToRemove.id);
            toast.success(response.message);
            setImages(images.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error removing image:', error);
        }
    }

    const handleCreateVideo = () => {
        setLoading(true);
        navigate('/checkout', {state: {videoId: propertyDetails.video?.id, images, agents: propertyDetails.agents}});
        setLoading(false);
    };

    const handleOpenLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const handleCloseLightbox = () => {
        setLightboxOpen(false);
    };

    const handlePrevImage = () => {
        setLightboxIndex((prevIndex) => (prevIndex + images.length - 1) % images.length);
    };

    const handleNextImage = () => {
        setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length);
    };


    return (
        <Container maxWidth={false} disableGutters>
            <Box sx={{my: 4, pb: 12}}> {/* Add padding to bottom to avoid content being hidden by the sticky footer */}
                <Typography variant="h4" component="h1" gutterBottom>
                    Let's craft your video
                </Typography>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{mb: 3}}>
                            <SectionHeader icon={<Home color="primary"/>} title="Property Details"
                                           tooltip="Enter the core details of the property."/>
                            <Divider sx={{mb: 2}}/>
                            <Box sx={{mb: 2}}>
                                <FieldLabel icon={<LocationOn/>} label="Property Address"
                                            tooltip="Enter the full property address."/>
                                <TextField fullWidth placeholder="E.g. 123 Example St, Sydney NSW 2000" name="address"
                                           value={propertyDetails.address} onChange={handleInputChange}/>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FieldLabel icon={<Bed/>} label="Beds" tooltip="Number of bedrooms."/>
                                    <TextField fullWidth placeholder="E.g. 3" name="bedrooms"
                                               value={propertyDetails.bedrooms} onChange={handleInputChange}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <FieldLabel icon={<Bathtub/>} label="Baths" tooltip="Number of bathrooms."/>
                                    <TextField fullWidth placeholder="E.g. 2" name="bathrooms"
                                               value={propertyDetails.bathrooms} onChange={handleInputChange}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <FieldLabel icon={<TimeToLeave/>} label="Cars" tooltip="Number of car spaces."/>
                                    <TextField fullWidth placeholder="E.g. 1" name="carSpaces"
                                               value={propertyDetails.carSpaces} onChange={handleInputChange}/>
                                </Grid>
                            </Grid>
                            <Box sx={{mt: 2}}>
                                <FieldLabel icon={<SquareFoot/>} label="Property Area"
                                            tooltip="Total property area in square meters."/>
                                <TextField fullWidth placeholder="E.g. 500 sqm" name="propertyArea"
                                           value={propertyDetails.propertyArea} onChange={handleInputChange}/>
                            </Box>
                        </Box>
                        <Box sx={{mb: 3}}>
                            <SectionHeader icon={<PriceChange color="primary"/>} title="Pricing"
                                           tooltip="Provide agent and pricing information."/>
                            <Divider sx={{mb: 2}}/>
                            <Box sx={{mb: 2}}>
                                <FieldLabel icon={<PriceChange/>} label="Asking Price"
                                            tooltip="The asking price for the property."/>
                                <TextField fullWidth placeholder="E.g. $1,000,000" name="price"
                                           value={propertyDetails.price} onChange={handleInputChange}/>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{mb: 3}}>
                            <SectionHeader icon={<Person color="primary"/>} title="Agents"
                                           tooltip="Manage the agents for this property."/>
                            <Divider sx={{mb: 2}}/>
                            <AgentsEditor propertyId={propertyDetails.id || propertyDetails.video?.id} agents={propertyDetails.agents}
                                          onAgentsChange={handleAgentsChange}/>
                        </Box>

                        <Box sx={{mb: 3}}>
                            <CompanyEditor propertyId={propertyDetails.id || propertyDetails.video?.id} company={propertyDetails.company}
                                          onCompanyChange={handleCompanyChange}/>
                        </Box>

                    </Grid>

                    <Grid item xs={12} md={4}>


                        <Box>
                            <SectionHeader icon={<Image color="primary"/>} title="Image Uploader"
                                           tooltip="Upload images for your video. Drag and drop or click to select."/>
                            <Divider sx={{mb: 2}}/>
                            <Box {...getRootProps()} sx={{
                                p: 4,
                                border: '2px dashed',
                                borderColor: 'primary.main',
                                borderRadius: 2,
                                textAlign: 'center',
                                background: (theme) => theme.palette.action.hover,
                                cursor: 'pointer'
                            }}>
                                <input {...getInputProps()} />
                                <Image sx={{fontSize: 48, color: 'primary.main'}}/>
                                <Typography>Drag & Drop Property Images Here, or Click to Select</Typography>
                            </Box>
                            <Box sx={{mt: 2, display: 'flex', flexWrap: 'wrap'}}>
                                {images.map((image, index) => (
                                    <Box key={index} sx={{mr: 2, mb: 2, position: 'relative', cursor: 'pointer'}}
                                         onClick={() => handleOpenLightbox(index)}>
                                        <img src={image.preview} alt={`property image ${index}`}
                                             style={{width: 100, height: 100, objectFit: 'cover', borderRadius: 8}}/>
                                        <IconButton size="small" onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveImage(index)
                                        }} sx={{
                                            position: 'absolute',
                                            top: -5,
                                            right: -5,
                                            background: 'white',
                                            '&:hover': {background: 'white'}
                                        }}>
                                            <Close fontSize="small"/>
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
            <Modal
                open={lightboxOpen}
                onClose={handleCloseLightbox}
                sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
                <Box sx={{position: 'relative', outline: 'none'}}>
                    <img src={images[lightboxIndex]?.preview} alt="lightbox"
                         style={{maxHeight: '80vh', maxWidth: '80vw'}}/>
                    <IconButton onClick={handleCloseLightbox} sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <Close/>
                    </IconButton>
                    <IconButton onClick={handlePrevImage} sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 8,
                        color: 'white',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <ArrowBackIos/>
                    </IconButton>
                    <IconButton onClick={handleNextImage} sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 8,
                        color: 'white',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <ArrowForwardIos/>
                    </IconButton>
                </Box>
            </Modal>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, zIndex: 1100}} elevation={3}>
                <Container maxWidth="lg">
                    <Box sx={{textAlign: 'right'}}>
                        <Button variant="contained" color="primary" onClick={handleCreateVideo} size="large"
                                disabled={loading}>
                            {loading ? <CircularProgress size={24} color="inherit"/> : 'Create Video'}
                        </Button>
                    </Box>
                </Container>
            </Paper>
        </Container>
    );
};
