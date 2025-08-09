import React, {useRef, useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Box, Button, Container, Grid, IconButton, Paper, Typography, Divider, CircularProgress,
    List, ListItem, ListItemText, ListItemSecondaryAction, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import {useDropzone} from 'react-dropzone';
import {getMusicTracks, getVoiceTracks, getPropertyDetails} from 'src/services/api';
import {PropertyDetails} from "src/types";
import {
    RecordVoiceOver, Image, MusicNote, PlayArrow, Pause, Close, BrandingWatermark
} from '@mui/icons-material';
import {SectionHeader} from "src/components/SectionHeader";

export const PremiumFeaturesPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {propertyDetails, images} = location.state as { propertyDetails: PropertyDetails, images: File[] };
    const [voice, setVoice] = useState('');
    const [availableMusicTracks, setAvailableMusicTracks] = useState([]);
    const [music, setMusic] = useState('');
    const [showAllMusicTracks, setShowAllMusicTracks] = useState(false);
    const [availableVoiceTracks, setAvailableVoiceTracks] = useState([]);
    const [showAllVoiceTracks, setShowAllVoiceTracks] = useState(false);
    const [logo, setLogo] = useState<File | null>(null);
    const [logoPlacement, setLogoPlacement] = useState('top-right');
    const [playing, setPlaying] = useState<string | null>(null);
    const [audioProgress, setAudioProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (propertyDetails.id) {
            getPropertyDetails(propertyDetails.id).then(property => {
                if (property.locked) {
                    navigate('/video-generated');
                }
            });
        }

        const fetchMusicTracks = async () => {
            try {
                const tracks = await getMusicTracks();
                setAvailableMusicTracks(tracks);
                if (tracks.length > 0) {
                    setMusic(tracks[0].src);
                }
            } catch (error) {
                console.error("Error fetching music tracks:", error);
            }
        };

        const fetchVoiceTracks = async () => {
            try {
                const voices = await getVoiceTracks();
                setAvailableVoiceTracks(voices);
                if (voices.length > 0) {
                    setVoice(voices[0].src);
                }
            } catch (error) {
                console.error("Error fetching voice tracks:", error);
            }
        };

        fetchMusicTracks();
        fetchVoiceTracks();

        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            setAudioProgress((audio.currentTime / audio.duration) * 100);
        };

        const resetProgress = () => {
            setAudioProgress(0);
            setPlaying(null);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', resetProgress);
        audio.addEventListener('pause', resetProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', resetProgress);
            audio.removeEventListener('pause', resetProgress);
        };
    }, [propertyDetails.id, navigate]);

    const onDrop = (acceptedFiles: File[]) => {
        setLogo(acceptedFiles[0]);
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop, multiple: false, accept: {'image/*': []}});

    const handleCreateVideo = () => {
        navigate('/generating-video', {state: {propertyDetails, images, voice, music, logo, logoPlacement}});
    };

    const togglePlay = (src: string) => {
        if (playing === src) {
            audioRef.current?.pause();
            setPlaying(null);
        } else {
            if (audioRef.current) {
                audioRef.current.src = src;
                audioRef.current.play();
                setPlaying(src);
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{my: 4, pb: 12}}> {/* Padding for sticky footer */}
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Your Premium Touches
                </Typography>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{mb: 3}}>
                            <SectionHeader icon={<RecordVoiceOver color="primary"/>} title="Voice Selection"
                                           tooltip="Choose a voiceover for your video."/>
                            <Divider sx={{mb: 2}}/>
                            <List>
                                {(showAllVoiceTracks ? availableVoiceTracks : availableVoiceTracks.slice(0, 4)).map(track => {
                                    const isSelected = voice === track.src;

                                    return (
                                        <ListItem
                                            key={track.src}
                                            button
                                            selected={isSelected}
                                            onClick={() => setVoice(track.src)}
                                            sx={{
                                                backgroundColor: isSelected ? 'primary.main' : 'transparent',
                                                '&:hover': {
                                                    backgroundColor: isSelected ? 'primary.dark' : 'action.hover',
                                                },
                                                color: isSelected ? 'common.white' : 'text.primary',
                                            }}
                                        >
                                            <ListItemText
                                                primary={track.name}
                                                primaryTypographyProps={{
                                                    color: isSelected ? 'inherit' : 'text.primary',
                                                }}
                                            />
                                            <ListItemSecondaryAction
                                                sx={{
                                                    position: 'absolute',
                                                    right: 16,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                }}
                                            >
                                                <CircularProgress
                                                    variant="determinate"
                                                    value={
                                                        playing === track.src && audioRef.current
                                                            ? (audioRef.current.currentTime / audioRef.current.duration) * 100
                                                            : 0
                                                    }
                                                    size={40}
                                                    thickness={2}
                                                    sx={{
                                                        color: 'primary.main',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        zIndex: 1,
                                                    }}
                                                />
                                                <IconButton
                                                    onClick={() => togglePlay(track.src)}
                                                    edge="end"
                                                    sx={{ position: 'relative', zIndex: 2 }}
                                                >
                                                    {playing === track.src ? <Pause /> : <PlayArrow />}
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}

                                {availableVoiceTracks.length > 5 && (
                                    <ListItem button onClick={() => setShowAllVoiceTracks(!showAllVoiceTracks)}>
                                        <ListItemText
                                            primary={showAllVoiceTracks ? 'Show Less' : 'Show More'}
                                            sx={{ textAlign: 'center' }}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Box>

                        <Box sx={{mb: 3}}>
                            <SectionHeader icon={<MusicNote color="primary"/>} title="Background Music"
                                           tooltip="Select a background track for your video."/>
                            <Divider sx={{mb: 2}}/>
                            <List>
                                {(showAllMusicTracks ? availableMusicTracks : availableMusicTracks.slice(0, 4)).map(track => {
                                    const isSelected = music === track.src;

                                    return (
                                        <ListItem
                                            key={track.src}
                                            button
                                            selected={isSelected}
                                            onClick={() => setMusic(track.src)}
                                            sx={{
                                                backgroundColor: isSelected ? 'primary.main' : 'transparent',
                                                '&:hover': {
                                                    backgroundColor: isSelected ? 'primary.dark' : 'action.hover',
                                                },
                                                color: isSelected ? 'common.white' : 'text.primary',
                                            }}
                                        >
                                            <ListItemText
                                                primary={track.title}
                                                primaryTypographyProps={{
                                                    color: isSelected ? 'inherit' : 'text.primary',
                                                }}
                                            />
                                            <ListItemSecondaryAction
                                                sx={{
                                                    position: 'absolute',
                                                    right: 16,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                }}
                                            >
                                                <CircularProgress
                                                    variant="determinate"
                                                    value={
                                                        playing === track.src && audioRef.current
                                                            ? (audioRef.current.currentTime / audioRef.current.duration) * 100
                                                            : 0
                                                    }
                                                    size={40}
                                                    thickness={2}
                                                    sx={{
                                                        color: 'primary.main',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        zIndex: 1,
                                                    }}
                                                />
                                                <IconButton
                                                    onClick={() => togglePlay(track.src)}
                                                    edge="end"
                                                    sx={{position: 'relative', zIndex: 2}}
                                                >
                                                    {playing === track.src ? <Pause/> : <PlayArrow/>}
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}

                                {availableMusicTracks.length > 5 && (
                                    <ListItem button onClick={() => setShowAllMusicTracks(!showAllMusicTracks)}>
                                        <ListItemText primary={showAllMusicTracks ? 'Show Less' : 'Show More'}
                                                      sx={{textAlign: 'center'}}/>
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{mb: 3}}>
                            <SectionHeader icon={<Image color="primary"/>} title="Company Logo"
                                           tooltip="Upload your company logo to be included in the video."/>
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
                                {logo ? (
                                    <img src={URL.createObjectURL(logo)} alt="logo preview"
                                         style={{maxHeight: 100, maxWidth: '100%'}}/>
                                ) : (
                                    <Box>
                                        <Image sx={{fontSize: 48, color: 'primary.main'}}/>
                                        <Typography>Drag & Drop Your Logo Here, or Click to Select</Typography>
                                    </Box>
                                )}
                            </Box>
                            {logo && (
                                <Button startIcon={<Close/>} onClick={() => setLogo(null)} sx={{mt: 1}}>Remove
                                    Logo</Button>
                            )}
                        </Box>
                        {logo && (
                            <Box>
                                <SectionHeader icon={<BrandingWatermark color="primary"/>} title="Logo Placement"
                                               tooltip="Choose where your logo will appear in the video."/>
                                <Divider sx={{mb: 2}}/>
                                <FormControl fullWidth>
                                    <Select
                                        value={logoPlacement}
                                        onChange={(e) => setLogoPlacement(e.target.value)}
                                    >
                                        <MenuItem value={'top-left'}>Top Left</MenuItem>
                                        <MenuItem value={'top-right'}>Top Right</MenuItem>
                                        <MenuItem value={'bottom-left'}>Bottom Left</MenuItem>
                                        <MenuItem value={'bottom-right'}>Bottom Right</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        )}
                    </Grid>
                </Grid>
                <audio ref={audioRef}/>
            </Box>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, zIndex: 1100}} elevation={3}>
                <Container maxWidth="lg">
                    <Box sx={{textAlign: 'right'}}>
                        <Button variant="contained" color="primary" onClick={handleCreateVideo} size="large">
                            Create Video
                        </Button>
                    </Box>
                </Container>
            </Paper>
        </Container>
    );
};