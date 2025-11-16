import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
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
import {useDropzone} from 'react-dropzone';
import {Property, Image as ImageType, Agent, Company} from "src/types";
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
import {SectionHeader} from "src/features/property/components/SectionHeader";
import {getImageList, removeImage, uploadImage, updatePropertyDetails, getProperty} from "src/services/api";
import {toast} from "react-toastify";
import {AgentsEditor} from "src/features/property/components/AgentsEditor";
import {CompanyEditor} from "src/features/property/components/CompanyEditor";
import {alpha, useTheme} from "@mui/material/styles";
import heic2any from "heic2any";

const FieldLabel: React.FC<{ icon: React.ReactElement; label: string; tooltip: string }> = ({icon, label, tooltip}) => (
    <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
        {React.cloneElement(icon, {sx: {mr: 1, fontSize: '0.875rem', color: 'text.primary'}})}
        <Typography variant="body2" sx={{fontWeight: 'medium', color: 'text.primary'}}>{label}</Typography>
    </Box>
);

export const PropertyDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [isDescriptionFocussed, setIsDescriptionFocussed] = useState<boolean>(false);
    const {propertyId} = useParams<{ propertyId: string }>();
    const [property, setProperty] = useState<Property | null>(location.state?.property || null);
    const [images, setImages] = useState<ImageType[]>([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const MAX_FILES = 20;
    const MAX_FILE_SIZE_MB = 20;

    const handleAgentsChange = (updatedAgents: Agent[]) => {
        setProperty(prev => prev ? {...prev, agents: updatedAgents} : null);
    };

    const handleCompanyChange = (updatedCompany: Company) => {
        setProperty(prev => prev ? {...prev, company: updatedCompany} : null);
    };

    useEffect(() => {
        const loadPropertyData = async () => {
            if (!propertyId) return;

            setLoading(true);
            try {
                // Fetch property details
                const fetchedProperty = await getProperty(propertyId);
                setProperty(fetchedProperty);

                // Fetch images for this property
                const imageList = await getImageList(propertyId);
                setImages(imageList);
            } catch (error) {
                console.error('Error fetching property data:', error);
                toast.error('Failed to load property details.');
            } finally {
                setLoading(false);
            }
        };

        loadPropertyData();
    }, [propertyId]);


    const onDrop = async (acceptedFiles: File[]) => {
        if (!property?.id) {
            toast.error("Cannot upload image until property has been created");
            return;
        }

        if (images.length + acceptedFiles.length > 20) {
            toast.error("You can only upload a maximum of 20 images.");
            return;
        }

        setActionLoading(true);
        try {
            const processedFiles = await Promise.all(
                acceptedFiles.map(async (file) => {
                    // Only allow image types
                    if (!file.type.startsWith("image/") && !file.name.match(/\.(heic|HEIC)$/)) {
                        toast.error("You can only upload a maximum of 20 images.");
                        throw new Error(`${file.name} is not a supported image file`);
                    }

                    let uploadFile = file;

                    // Convert HEIC/HEIF to JPEG
                    if (file.type === "image/heic" || file.name.match(/\.(heic|HEIC)$/)) {
                        const blob = await heic2any({blob: file, toType: "image/jpeg", quality: 0.95});
                        uploadFile = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {type: "image/jpeg"});
                    }

                    // Check file size (20 MB max)
                    if (uploadFile.size > 20 * 1024 * 1024) {
                        throw new Error(`${uploadFile.name} exceeds 20 MB limit`);
                    }

                    return uploadFile;
                })
            );

            const uploadPromises = processedFiles.map(file => uploadImage(property.id, file));
            const responses = await Promise.all(uploadPromises);

            const newImages: ImageType[] = responses.map((response, index) => ({
                id: response.id,
                file: response.file_url,
                description: '',
                preview: URL.createObjectURL(processedFiles[index])
            }));

            setImages(prev => [...prev, ...newImages]);

        } catch (error: any) {
            console.error('Error uploading images:', error);
            toast.error(error.message || 'An error occurred during upload. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {"image/*": []}, maxFiles: MAX_FILES});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setProperty(prev => prev ? {...prev, [name]: value} : null);
    };

    const handleRemoveImage = async (index: number) => {
        if (!property?.id) {
            toast.error("Cannot remove image until property has been created");
            return;
        }

        const imageToRemove = images[index];
        if (!imageToRemove) return;

        setActionLoading(true);
        try {
            await removeImage(property.id, imageToRemove.id);
            toast.success("Image removed.");
            setImages(images.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error removing image:', error);
        } finally {
            setActionLoading(false);
        }
    }

    const handleContinue = async () => {
        if (!property?.id) return;

        setLoading(true);
        // Check if image count exceeds the limit
        if (images.length > 20) {
            toast.error("You can only upload a maximum of 20 images.");
            setLoading(false);
            return;
        }

        if (images.length === 0) {
            toast.error("Please upload at least one image before continuing.");
            setLoading(false);
            return;
        }

        try {
            const updatedProperty = await updatePropertyDetails(
                property.id,
                property.address,
                property.bedrooms,
                property.bathrooms,
                property.car_spaces,
                property.property_area,
                property.description,
                property.price,
            );
            navigate(`/checkout/${property.id}`);
        } catch (error) {
            toast.error("Failed to update property details. Try again later.");
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

    if (!property) {
        return <Container><CircularProgress/></Container>;
    }

    return (
        <Container maxWidth={false} disableGutters>
            <Box sx={{my: 4, pb: 12}}>
                <Typography variant="h4" component="h1" gutterBottom>Let's craft your video</Typography>
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
                                           value={property.address} onChange={handleInputChange}/>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FieldLabel icon={<Bed/>} label="Beds" tooltip="Number of bedrooms."/>
                                    <TextField fullWidth placeholder="E.g. 3" name="bedrooms"
                                               value={property.bedrooms} onChange={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FieldLabel icon={<Bathtub/>} label="Baths" tooltip="Number of bathrooms."/>
                                    <TextField fullWidth placeholder="E.g. 2" name="bathrooms"
                                               value={property.bathrooms} onChange={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FieldLabel icon={<TimeToLeave/>} label="Cars" tooltip="Number of car spaces."/>
                                    <TextField fullWidth placeholder="E.g. 1" name="car_spaces"
                                               value={property.car_spaces} onChange={handleInputChange}/>
                                </Grid>
                            </Grid>
                            <Box sx={{mt: 2}}>
                                <FieldLabel icon={<SquareFoot/>} label="Property Area"
                                            tooltip="Total property area in square meters."/>
                                <TextField fullWidth placeholder="E.g. 500 sqm" name="property_area"
                                           value={property.property_area} onChange={handleInputChange}/>
                            </Box>
                            <Box sx={{mt: 2}}>
                                <FieldLabel icon={<Home/>} label="Description"
                                            tooltip="Listing description of the properties features."/>
                                <textarea
                                    name="description"
                                    value={property.description}
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
                        <Box sx={{mb: 3}}>
                            <SectionHeader icon={<PriceChange color="primary"/>} title="Pricing"
                                           tooltip="Provide agent and pricing information."/>
                            <Divider sx={{mb: 2}}/>
                            <Box sx={{mb: 2}}>
                                <FieldLabel icon={<PriceChange/>} label="Asking Price"
                                            tooltip="The asking price for the property."/>
                                <TextField fullWidth placeholder="E.g. $1,000,000" name="price"
                                           value={property.price} onChange={handleInputChange}/>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{mb: 3}}>
                            <SectionHeader icon={<Person color="primary"/>} title="Agents"
                                           tooltip="Manage the agents for this property."/>
                            <Divider sx={{mb: 2}}/>
                            <AgentsEditor propertyId={property.id} agents={property.agents}
                                          onAgentsChange={handleAgentsChange}/>
                        </Box>
                        <Box sx={{mb: 3}}>
                            <CompanyEditor propertyId={property.id} company={property.company}
                                           onCompanyChange={handleCompanyChange}/>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box>
                            <SectionHeader icon={<Image color="primary"/>} title="Image Uploader"
                                           tooltip="Upload images for your property. Drag and drop or click to select."/>
                            <Divider sx={{mb: 2}}/>
                            <Box {...getRootProps()} sx={{
                                p: 4,
                                border: '2px dashed',
                                borderColor: 'primary.main',
                                borderRadius: 2,
                                textAlign: 'center',
                                background: (theme) => theme.palette.action.hover,
                                cursor: actionLoading ? 'not-allowed' : 'pointer'
                            }}>
                                <input {...getInputProps()} disabled={actionLoading}/>
                                {actionLoading ? (
                                    <CircularProgress/>
                                ) : (
                                    <>
                                        <Image sx={{fontSize: 48, color: 'primary.main'}}/>
                                        <Typography>Drag & Drop Property Images Here, or Click to Select</Typography>
                                    </>
                                )}
                            </Box>
                            <Box sx={{mt: 2, display: 'flex', flexWrap: 'wrap'}}>
                                {images.map((image, index) => (
                                    <Box key={index} sx={{mr: 2, mb: 2, position: 'relative', cursor: 'pointer'}}
                                         onClick={() => handleOpenLightbox(index)}>
                                        <img src={image.preview} alt={`property image ${index}`}
                                             style={{width: 100, height: 100, objectFit: 'cover', borderRadius: 8}}/>
                                        {actionLoading ? (
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: 'rgba(0,0,0,0.5)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 8
                                            }}>
                                                <CircularProgress size={24} color="inherit"/>
                                            </Box>
                                        ) : (
                                            <IconButton size="small" onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveImage(index)
                                            }} sx={{
                                                position: 'absolute',
                                                top: -5,
                                                right: -5,
                                                background: 'white',
                                                '&:hover': {background: 'white'}
                                            }} disabled={actionLoading}>
                                                <Close fontSize="small"/>
                                            </IconButton>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Modal open={lightboxOpen} onClose={handleCloseLightbox}
                   sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                        <Button variant="contained" color="primary" onClick={handleContinue} size="large"
                                disabled={loading}>
                            {loading ? <CircularProgress size={24} color="inherit"/> : 'Continue'}
                        </Button>
                    </Box>
                </Container>
            </Paper>
        </Container>
    );
};