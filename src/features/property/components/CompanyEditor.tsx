import React, {useState, useEffect} from 'react';
import {
    Box,
    Button,
    TextField,
    IconButton,
    Typography,
    Avatar,
    Grid,
} from '@mui/material';
import {useDropzone} from 'react-dropzone';
import {Company} from 'src/types';
import {updateCompany} from 'src/services/api';
import {toast} from 'react-toastify';
import {Business, AddAPhoto, Phone, Email, Language, Edit} from '@mui/icons-material';
import {SectionHeader} from "src/features/property/components/SectionHeader";
import {CircularProgress} from "@mui/material";

const getFullImageUrl = (path?: string) => {
    if (!path) return '';
    return `${path}`;
};

const FieldLabel: React.FC<{ icon: React.ReactElement; label: string; tooltip?: string }> = ({icon, label}) => (
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
    </Box>
);

interface CompanyEditorProps {
    propertyId: string;
    company: Company | null;
    onCompanyChange: (company: Company) => void;
}

export const CompanyEditor: React.FC<CompanyEditorProps> = ({propertyId, company, onCompanyChange}) => {
    const [editingCompany, setEditingCompany] = useState<Partial<Company> | null>(company);
    const [logo, setLogo] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(!company);
    const [loading, setLoading] = useState(false);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                setLogo(acceptedFiles[0]);
            }
        },
        multiple: false,
        accept: {'image/*': []},
    });

    // Update editingCompany and isEditing when the company prop changes
    useEffect(() => {
        setEditingCompany(company);
        setIsEditing(!company);
    }, [company]);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    useEffect(() => {
        if (logo) {
            const url = URL.createObjectURL(logo);
            setPreviewUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        } else if (editingCompany?.logo) {
            setPreviewUrl(getFullImageUrl(editingCompany.logo));
        } else {
            setPreviewUrl(null);
        }
    }, [logo, editingCompany?.logo]);

    const handleUpdateCompany = async () => {
        if (!company?.id || !editingCompany) return;
        setLoading(true);
        try {
            const updatedCompany = await updateCompany(
                company.id,
                editingCompany as Company,
                logo || undefined
            );
            onCompanyChange(updatedCompany);
            setLogo(null);
            setIsEditing(false); // Exit editing mode after saving
            toast.success('Company updated successfully');
        } catch (error) {
            console.error('Error updating company:', error);
            toast.error('Failed to update company');
        } finally {
            setLoading(false);
        }
    };

    const setEditingCompanyPartial = (patch: Partial<Company>) => {
        setEditingCompany({...editingCompany, ...patch});
    };

    const imageUrl = previewUrl || undefined;

    return (
        <Box sx={{my: 2}}>
            <SectionHeader icon={<Business color="primary"/>} title="Company Details"
                           tooltip="Manage the company for this property."/>
            <Box sx={{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
                {isEditing ? (
                    <>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3}}>
                            <Box {...getRootProps()} sx={{cursor: 'pointer', position: 'relative'}}>
                                <input {...getInputProps()} />
                                <Avatar src={imageUrl} sx={{width: 100, height: 100, mb: 1}} variant="rounded"/>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        color: 'white',
                                        '&:hover': {backgroundColor: 'rgba(0,0,0,0.8)'},
                                    }}
                                    size="small"
                                    aria-label="upload logo"
                                >
                                    <AddAPhoto/>
                                </IconButton>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Upload Company Logo
                            </Typography>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FieldLabel icon={<Business/>} label="Company Name"/>
                                <TextField
                                    fullWidth
                                    placeholder="E.g. Virtual Home Open"
                                    value={editingCompany?.name || ''}
                                    onChange={(e) => setEditingCompanyPartial({name: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FieldLabel icon={<Phone/>} label="Phone"/>
                                <TextField
                                    fullWidth
                                    placeholder="E.g. +1 555 123 4567"
                                    value={editingCompany?.phone || ''}
                                    onChange={(e) => setEditingCompanyPartial({phone: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FieldLabel icon={<Email/>} label="Email"/>
                                <TextField
                                    fullWidth
                                    placeholder="E.g. contact@VirtualHomeOpen.com"
                                    value={editingCompany?.email || ''}
                                    onChange={(e) => setEditingCompanyPartial({email: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FieldLabel icon={<Language/>} label="Website"/>
                                <TextField
                                    fullWidth
                                    placeholder="E.g. www.VirtualHomeOpen.com"
                                    value={editingCompany?.website || ''}
                                    onChange={(e) => setEditingCompanyPartial({website: e.target.value})}
                                />
                            </Grid>

                        </Grid>

                        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 3}}>
                            <Button variant="outlined" onClick={() => setIsEditing(false)} sx={{mr: 1}}
                                    disabled={loading}>Cancel</Button>
                            <Button onClick={handleUpdateCompany} variant="contained" disabled={loading}>
                                {loading ? <CircularProgress size={24}/> : 'Save Company Details'}
                            </Button>
                        </Box>
                    </>
                ) : (
                    company ? (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Avatar src={getFullImageUrl(company.logo)} sx={{width: 60, height: 60}} variant="rounded"/>
                            <Box>
                                <Typography variant="h6">{company.name || ''}</Typography>
                                <Typography variant="body2" color="text.primary">{company.email || ''}
                                </Typography>
                                <Typography variant="body2" color="text.primary">{company.phone || ''}
                                </Typography>
                            </Box>
                            <IconButton
                                aria-label="edit agent"
                                disabled={loading}
                                onClick={() => {
                                    setIsEditing(true);
                                    setLogo(null);
                                }}
                            >
                                <Edit/>
                            </IconButton>
                        </Box>
                        // <Button variant="contained" onClick={() => {
                        //     setIsEditing(true);
                        //     setLogo(null);
                        // }} sx={{ml: 'auto'}}>Edit</Button>
                    ) : (
                        <Box sx={{textAlign: 'center', py: 2}}>
                            <Typography variant="body2" color="text.primary" sx={{mb: 2}}>No company details added
                                yet.</Typography>
                            <Button variant="contained" onClick={() => {
                                setIsEditing(true);
                                setLogo(null);
                            }} disabled={loading}>Add Company Details</Button>
                        </Box>
                    )
                )}
            </Box>
        </Box>
    );
};
