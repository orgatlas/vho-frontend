import React, {useRef, useState, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {
    Box, Button, Container, Grid, IconButton, Paper, Typography, Divider, CircularProgress,
    List, ListItem, ListItemText, ListItemSecondaryAction, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import {getMusicTracks, getVoiceTracks, getVideoDetails, setLogoPosition, setMusicTrack, setVoiceTrack} from 'src/services/api';
import {MusicTrack, Voice, Video} from "src/types";
import {toast} from 'react-toastify';
import {
    RecordVoiceOver, Image, MusicNote, PlayArrow, Pause, Close, BrandingWatermark
} from '@mui/icons-material';
import {SectionHeader} from "src/features/property/components/SectionHeader";

export const PremiumFeaturesPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {videoId} = useParams<{ videoId: string }>();
    const [voice, setVoice] = useState(''); // For audio player src
    const [availableMusicTracks, setAvailableMusicTracks] = useState<MusicTrack[]>([]);
    const [music, setMusic] = useState(''); // For audio player src
    const [showAllMusicTracks, setShowAllMusicTracks] = useState(false);
    const [availableVoiceTracks, setAvailableVoiceTracks] = useState<Voice[]>([]);
    const [showAllVoiceTracks, setShowAllVoiceTracks] = useState(false);
    const [logoPlacement, setLogoPlacement] = useState('bottom_right');
    const [playing, setPlaying] = useState<string | null>(null);
    const [audioProgress, setAudioProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [selectedMusicId, setSelectedMusicId] = useState<number | null>(null);
    const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!videoId) return;
                setLoading(true);

                const [videoData, musicTracks, voiceTracks] = await Promise.all([
                    getVideoDetails(videoId),
                    getMusicTracks(),
                    getVoiceTracks()
                ]);


                if (videoData.locked) {
                    navigate('/video-generated');
                    return;
                }

                // Set logo position
                setLogoPlacement(videoData.logo_position || 'bottom_right')


                // Set available tracks
                setAvailableMusicTracks(musicTracks);
                setAvailableVoiceTracks(voiceTracks);

                // Set initial selected music
                let initialMusicId: number | null = null;
                if (videoData.background_music) {
                    initialMusicId = videoData.background_music.id;
                    console.log('setting music')
                    console.log(initialMusicId);
                }
                setSelectedMusicId(initialMusicId);
                if (initialMusicId) {
                    const initialMusicTrack = musicTracks.find(t => t.id === initialMusicId);
                    if (initialMusicTrack) {
                        setMusic(initialMusicTrack.src); // For audio player
                    }
                }

                // Set initial selected voice
                let initialVoiceId: string | null = null;
                if (videoData.voice) {
                    initialVoiceId = videoData.voice.id;
                    console.log('setting voice')
                    console.log(initialVoiceId);
                }
                setSelectedVoiceId(initialVoiceId);
                if (initialVoiceId) {
                    const initialVoiceTrack = voiceTracks.find(t => t.id === initialVoiceId);
                    if (initialVoiceTrack) {
                        setVoice(initialVoiceTrack.src); // For audio player
                    }
                }

            } catch (error) {
                console.error("Error fetching initial data:", error);
                toast.error("Failed to load video details or tracks.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

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
    }, [videoId, navigate]); // Dependencies

    const handleCreateVideo = () => {
        navigate(`/generating-video/${videoId}`);
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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

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
                                {(() => {
                                    let tracksToDisplay = availableVoiceTracks;
                                    if (!showAllVoiceTracks) {
                                        const selectedTrack = availableVoiceTracks.find(track => track.id === selectedVoiceId);
                                        if (selectedTrack && availableVoiceTracks.findIndex(track => track.id === selectedVoiceId) >= 4) {
                                            const otherTracks = availableVoiceTracks.filter(track => track.id !== selectedVoiceId);
                                            tracksToDisplay = [selectedTrack, ...otherTracks].slice(0, 4);
                                        } else {
                                            tracksToDisplay = availableVoiceTracks.slice(0, 4);
                                        }
                                    }
                                    return tracksToDisplay.map(track => {
                                        const isSelected = selectedVoiceId === track.id;

                                        return (
                                            <ListItem
                                                key={track.src}
                                                button
                                                disabled={actionLoading}
                                                selected={isSelected}
                                                onClick={async () => {
                                                    setVoice(track.src); // For audio player
                                                    setSelectedVoiceId(track.id); // For selection highlight
                                                    try {
                                                        setActionLoading(true);
                                                        await setVoiceTrack(videoId, track.id); // API call with ID
                                                        toast.success(`Voice set to ${track.name}`);
                                                    } catch (error) {
                                                        console.error("Error setting voice track:", error);
                                                        toast.error("Failed to set voice track.");
                                                    } finally {
                                                        setActionLoading(false);
                                                    }
                                                }}
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
                                                        sx={{position: 'relative', zIndex: 2}}
                                                    >
                                                        {playing === track.src ? <Pause/> : <PlayArrow/>}
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                    });
                                })()}

                                {availableVoiceTracks.length > 5 && (
                                    <ListItem button onClick={() => setShowAllVoiceTracks(!showAllVoiceTracks)}>
                                        <ListItemText
                                            primary={showAllVoiceTracks ? 'Show Less' : 'Show More'}
                                            sx={{textAlign: 'center'}}
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
                                {(() => {
                                    let tracksToDisplay = availableMusicTracks;
                                    if (!showAllMusicTracks) {
                                        const selectedTrack = availableMusicTracks.find(track => track.id === selectedMusicId);
                                        if (selectedTrack && availableMusicTracks.findIndex(track => track.id === selectedMusicId) >= 4) {
                                            const otherTracks = availableMusicTracks.filter(track => track.id !== selectedMusicId);
                                            tracksToDisplay = [selectedTrack, ...otherTracks].slice(0, 4);
                                        } else {
                                            tracksToDisplay = availableMusicTracks.slice(0, 4);
                                        }
                                    }
                                    return tracksToDisplay.map(track => {
                                        const isSelected = selectedMusicId === track.id;

                                        return (
                                            <ListItem
                                                key={track.src}
                                                button
                                                disabled={actionLoading}
                                                selected={isSelected}
                                                onClick={async () => {
                                                    setMusic(track.src); // For audio player
                                                    setSelectedMusicId(track.id); // For selection highlight
                                                    try {
                                                        setActionLoading(true);
                                                        await setMusicTrack(videoId, track.id); // API call with ID
                                                        toast.success(`Music set to ${track.name}`);
                                                    } catch (error) {
                                                        console.error("Error setting music track:", error);
                                                        toast.error("Failed to set music track.");
                                                    } finally {
                                                        setActionLoading(false);
                                                    }
                                                }}
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
                                                        sx={{position: 'relative', zIndex: 2}}
                                                    >
                                                        {playing === track.src ? <Pause/> : <PlayArrow/>}
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                    });
                                })()}

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
                        <Box>
                            <SectionHeader icon={<BrandingWatermark color="primary"/>} title="Company Logo Placement"
                                           tooltip="Choose where your logo will appear in the video."/>
                            <Divider sx={{mb: 2}}/>
                            <FormControl fullWidth>
                                <Select
                                    value={logoPlacement}
                                    disabled={actionLoading}
                                    onChange={async (e) => {
                                        const newPlacement = e.target.value as string;
                                        setLogoPlacement(newPlacement);
                                        if (videoId) {
                                            try {
                                                setActionLoading(true);
                                                await setLogoPosition(videoId, newPlacement);
                                                toast.success('Logo position updated successfully!');
                                            } catch (error) {
                                                console.error('Error setting logo position:', error);
                                                toast.error('Failed to update logo position.');
                                            } finally {
                                                setActionLoading(false);
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value={'top_left'}>Top Left</MenuItem>
                                    <MenuItem value={'top_right'}>Top Right</MenuItem>
                                    <MenuItem value={'bottom_left'}>Bottom Left</MenuItem>
                                    <MenuItem value={'bottom_right'}>Bottom Right</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                <audio ref={audioRef}/>
            </Box>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, zIndex: 1100}} elevation={3}>
                <Container maxWidth="lg">
                    <Box sx={{textAlign: 'right'}}>
                        <Button variant="contained" color="primary" onClick={handleCreateVideo} size="large" disabled={actionLoading}>
                            {actionLoading ? <CircularProgress size={24} color="inherit"/> : 'Create Video'}
                        </Button>
                    </Box>
                </Container>
            </Paper>
        </Container>
    );
};