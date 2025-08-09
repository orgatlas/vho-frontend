import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Box, Button, Container, Grid, IconButton, Paper, TextField, Typography, Divider, Tooltip,
    List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress, Modal,

} from '@mui/material';
import {useDropzone} from 'react-dropzone';
import {PropertyDetails, Image as ImageType} from "src/types";
import {
    Bed,
    Bathtub,
    TimeToLeave,
    Home,
    LocationOn,
    PriceChange,
    Person,
    Phone,
    Business,
    Close,
    PlayArrow,
    Pause,
    Image,
    HelpOutline,
    SquareFoot,
    ArrowForwardIos,
    ArrowBackIos
} from '@mui/icons-material';
import {SectionHeader} from "src/components/SectionHeader";
import {getImageList, removeImage, uploadImage, getPropertyDetails} from "src/services/api";
import {toast} from "react-toastify";




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
            id: initialDetails.id || '',
            address: initialDetails.address || '',
            bedrooms: initialDetails.beds || '',
            bathrooms: initialDetails.bathrooms || '',
            carSpaces: initialDetails.car_spaces || '',
            propertyArea: initialDetails.area || '',
            askingPrice: initialDetails.price || '',
            agentName: Array.isArray(initialDetails.agent_name) ? initialDetails.agent_name.join(', ') : initialDetails.agent_name || '',
            agentContact: initialDetails.agent_contact || '',
            companyName: initialDetails.company_name || '',
        };
    });
    const [images, setImages] = useState<ImageType[]>([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (propertyDetails.id) {
            getPropertyDetails(propertyDetails.id).then(property => {
                if (property.locked) {
                    navigate('/video-generated');
                }
            });
        }

        const fetchImages = async () => {
            if (propertyDetails.id) {
                try {
                    const imageList = await getImageList(propertyDetails.id);
                    setImages(imageList);
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            }
        };

        fetchImages();
    }, [propertyDetails.id, navigate]);

    const onDrop = async (acceptedFiles: File[]) => {
        if (!propertyDetails.id) {
            toast.error("Cannot upload image until property has been created");
            return;
        }

        for (const file of acceptedFiles) {
            try {
                const response = await uploadImage(propertyDetails.id, file);
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
        if (!propertyDetails.id) {
            toast.error("Cannot remove image until property has been created");
            return;
        }

        const imageToRemove = images[index];
        if (!imageToRemove) return;

        try {
            const response = await removeImage(propertyDetails.id, imageToRemove.id);
            toast.success(response.message);
            setImages(images.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error removing image:', error);
        }
    }

    const handleCreateVideo = () => {
        setLoading(true);
        navigate('/checkout', {state: {propertyDetails, images}});
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
        <Container maxWidth="lg">
            <Box sx={{my: 4, pb: 12}}> {/* Add padding to bottom to avoid content being hidden by the sticky footer */}
                <Typography variant="h4" component="h1" gutterBottom>
                    Let's craft your video
                </Typography>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
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
                            <SectionHeader icon={<PriceChange color="primary"/>} title="Agent & Pricing"
                                           tooltip="Provide agent and pricing information."/>
                            <Divider sx={{mb: 2}}/>
                            <Box sx={{mb: 2}}>
                                <FieldLabel icon={<PriceChange/>} label="Asking Price"
                                            tooltip="The asking price for the property."/>
                                <TextField fullWidth placeholder="E.g. $1,000,000" name="askingPrice"
                                           value={propertyDetails.askingPrice} onChange={handleInputChange}/>
                            </Box>
                            <Box sx={{mb: 2}}>
                                <FieldLabel icon={<Person/>} label="Agent Name"
                                            tooltip="The name of the listing agent."/>
                                <TextField fullWidth placeholder="E.g. John Smith" name="agentName"
                                           value={propertyDetails.agentName} onChange={handleInputChange}/>
                            </Box>
                            <Box sx={{mb: 2}}>
                                <FieldLabel icon={<Phone/>} label="Agent Contact"
                                            tooltip="The agent's contact number."/>
                                <TextField fullWidth placeholder="E.g. 0412 345 678" name="agentContact"
                                           value={propertyDetails.agentContact} onChange={handleInputChange}/>
                            </Box>
                            <Box>
                                <FieldLabel icon={<Business/>} label="Company Name"
                                            tooltip="The real estate agency's name."/>
                                <TextField fullWidth placeholder="E.g. Real Estate Co" name="companyName"
                                           value={propertyDetails.companyName} onChange={handleInputChange}/>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        

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
                                    <Box key={index} sx={{mr: 2, mb: 2, position: 'relative', cursor: 'pointer'}} onClick={() => handleOpenLightbox(index)}>
                                        <img src={image.preview} alt={`property image ${index}`}
                                             style={{width: 100, height: 100, objectFit: 'cover', borderRadius: 8}}/>
                                        <IconButton size="small" onClick={(e) => {e.stopPropagation(); handleRemoveImage(index)}} sx={{
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
                    <img src={images[lightboxIndex]?.preview} alt="lightbox" style={{maxHeight: '80vh', maxWidth: '80vw'}}/>
                    <IconButton onClick={handleCloseLightbox} sx={{position: 'absolute', top: 8, right: 8, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <Close />
                    </IconButton>
                    <IconButton onClick={handlePrevImage} sx={{position: 'absolute', top: '50%', left: 8, color: 'white', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton onClick={handleNextImage} sx={{position: 'absolute', top: '50%', right: 8, color: 'white', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <ArrowForwardIos />
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
