import React, {useState, useEffect} from 'react';
import {
    Box,
    Button,
    TextField,
    IconButton,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Grid
} from '@mui/material';
import {useDropzone} from 'react-dropzone';
import {Agent} from 'src/types';
import {createAgent, updateAgent, deleteAgent} from 'src/services/api';
import {toast} from 'react-toastify';
import {Delete, Edit, Person, Email, Phone, AddAPhoto} from '@mui/icons-material';
import {CircularProgress} from '@mui/material';

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

interface AgentsEditorProps {
    propertyId: number;
    agents: Agent[] | undefined;
    onAgentsChange: (agents: Agent[]) => void;
}

export const AgentsEditor: React.FC<AgentsEditorProps> = ({propertyId, agents, onAgentsChange}) => {
    // Form state
    const [newAgent, setNewAgent] = useState<Partial<Agent>>({});
    const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
    const [loading, setLoading] = useState(false);

    // Picture state is separate so add/edit don't clobber each other accidentally
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    // Controls whether the add form is visible (user clicked add)
    const [userClickedAddAgent, setUserClickedAddAgent] = useState(false);

    // Derived: show the add form if user clicked add; otherwise show button
    // (If you want to auto-show form when there are zero agents, you could init userClickedAddAgent = agents.length === 0)
    useEffect(() => {
        if (agents.length === 0) {
            // show the add form when there are no agents (optional UX)
            setUserClickedAddAgent(true);
        }
    }, [agents.length]);

    // Dropzone for profile picture
    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                setProfilePicture(acceptedFiles[0]);
            }
        },
        multiple: false,
        accept: {'image/*': []},
    });

    // Manage preview URL and revoke on change
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    useEffect(() => {
        if (!profilePicture) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(profilePicture);
        setPreviewUrl(url);
        return () => {
            URL.revokeObjectURL(url);
            setPreviewUrl(null);
        };
    }, [profilePicture]);

    // Add agent
    const handleAddAgent = async () => {
        if (!propertyId) {
            toast.error('Cannot add agent until property has been created');
            return;
        }
        setLoading(true);
        try {
            const createdAgent = await createAgent(propertyId, newAgent as Agent, profilePicture || undefined);
            onAgentsChange([...agents, createdAgent]);
            setNewAgent({});
            setProfilePicture(null);
            setUserClickedAddAgent(false);
            toast.success('Agent added successfully');
        } catch (error) {
            console.error('Error adding agent:', error);
            toast.error('Failed to add agent');
        } finally {
            setLoading(false);
        }
    };

    // Update agent
    const handleUpdateAgent = async () => {
        if (!propertyId || !editingAgent) return;
        setLoading(true);
        try {
            const updatedAgent = await updateAgent(
                propertyId,
                editingAgent.id,
                editingAgent,
                profilePicture || undefined
            );
            onAgentsChange(agents.map((a) => (a.id === updatedAgent.id ? updatedAgent : a)));
            setEditingAgent(null);
            setProfilePicture(null);
            toast.success('Agent updated successfully');
        } catch (error) {
            console.error('Error updating agent:', error);
            toast.error('Failed to update agent');
        } finally {
            setLoading(false);
        }
    };

    // Delete agent
    const handleDeleteAgent = async (agentId: number) => {
        if (!propertyId) return;
        setLoading(true);
        try {
            await deleteAgent(propertyId, agentId);
            onAgentsChange(agents.filter((a) => a.id !== agentId));
            toast.success('Agent deleted successfully');
        } catch (error) {
            console.error('Error deleting agent:', error);
            toast.error('Failed to delete agent');
        } finally {
            setLoading(false);
        }
    };

    // Helper to patch editingAgent (partial updates)
    const setEditingAgentPartial = (patch: Partial<Agent>) => {
        if (!editingAgent) return;
        setEditingAgent({...editingAgent, ...patch});
    };

    // Render form used for both add & edit
    const renderAgentForm = (
        agent: Partial<Agent>,
        setAgent: (agent: Partial<Agent>) => void,
        onSave: () => void,
        title: string
    ) => {
        // Prefer the uploaded preview URL, else fallback to agent.profile_picture
        const imageUrl = previewUrl || getFullImageUrl((agent as any).profile_picture);

        return (
            <Box sx={{my: 2, p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>

                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3}}>
                    <Box {...getRootProps()} sx={{cursor: 'pointer', position: 'relative'}}>
                        <input {...getInputProps()} />
                        <Avatar src={imageUrl} sx={{width: 100, height: 100, mb: 1}}/>
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
                            aria-label="upload picture"
                        >
                            <AddAPhoto/>
                        </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Upload Profile Picture
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FieldLabel icon={<Person/>} label="First Name"/>
                        <TextField
                            fullWidth
                            placeholder="E.g. John"
                            value={agent.first_name || ''}
                            onChange={(e) => setAgent({...agent, first_name: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FieldLabel icon={<Person/>} label="Last Name"/>
                        <TextField
                            fullWidth
                            placeholder="E.g. Doe"
                            value={agent.last_name || ''}
                            onChange={(e) => setAgent({...agent, last_name: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FieldLabel icon={<Email/>} label="Email"/>
                        <TextField
                            fullWidth
                            placeholder="E.g. john.doe@example.com"
                            value={agent.email || ''}
                            onChange={(e) => setAgent({...agent, email: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FieldLabel icon={<Phone/>} label="Phone"/>
                        <TextField
                            fullWidth
                            placeholder="E.g. +1 555 123 4567"
                            value={agent.phone || ''}
                            onChange={(e) => setAgent({...agent, phone: e.target.value})}
                        />
                    </Grid>
                </Grid>

                <Box sx={{display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3}}>
                    <Button
                        variant="outlined"
                        disabled={loading}
                        onClick={() => {
                            // cancel behavior: close form & reset picture
                            setProfilePicture(null);
                            if (editingAgent) {
                                setEditingAgent(null);
                            } else {
                                setUserClickedAddAgent(false);
                                setNewAgent({});
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={onSave} variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={24}/> : 'Save'}
                    </Button>
                </Box>
            </Box>
        );
    };

    // Main render
    return (
        <Box>
            {/* Agents list */}
            {agents.length > 0 ? (
                <List>
                    {agents.map((agent) => (
                        <ListItem key={agent.id} secondaryAction={
                            <Box>
                                <IconButton
                                    aria-label="edit agent"
                                    disabled={loading}
                                    onClick={() => {
                                        setEditingAgent(agent);
                                        setProfilePicture(null); // clear uploaded picture so avatar shows existing one
                                    }}
                                >
                                    <Edit/>
                                </IconButton>
                                <IconButton
                                    aria-label="delete agent"
                                    disabled={loading}
                                    onClick={() => handleDeleteAgent(agent.id)}
                                >
                                    <Delete/>
                                </IconButton>
                            </Box>
                        }>
                            <ListItemAvatar>
                                <Avatar src={getFullImageUrl((agent as any).profile_picture)}/>
                            </ListItemAvatar>
                            <ListItemText primary={`${agent.first_name || ''} ${agent.last_name || ''}`}
                                          secondary={agent.email}/>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Box sx={{py: 1, textAlign: 'center'}}>
                    <Typography variant="body1" color="text.secondary">
                        No agents added yet.
                    </Typography>
                </Box>
            )}


            {/* Add / Edit Form or Add Button */}
            {editingAgent ? (
                renderAgentForm(editingAgent, setEditingAgentPartial, handleUpdateAgent, 'Edit Agent')
            ) : userClickedAddAgent ? (
                renderAgentForm(newAgent, setNewAgent, handleAddAgent, 'Add New Agent')
            ) : (
                <Box sx={{textAlign: 'right'}}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setUserClickedAddAgent(true);
                            setNewAgent({});
                            setProfilePicture(null);
                        }}
                        sx={{mt: 2}}
                    >
                        Add New Agent
                    </Button>
                </Box>
            )}
        </Box>
    );
};