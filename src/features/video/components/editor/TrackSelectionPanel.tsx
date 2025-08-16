import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Divider } from '@mui/material';
import { PlayArrow, Pause, Close } from '@mui/icons-material';
import { Voice, MusicTrack } from 'src/types';

interface TrackSelectionPanelProps {
    tracks: (Voice | MusicTrack)[];
    onSelect: (id: string | number) => void;
    onClose: () => void;
    selectedId: string | number | null;
    title: string;
}

export const TrackSelectionPanel: React.FC<TrackSelectionPanelProps> = ({ tracks, onSelect, onClose, selectedId, title }) => {
    const [playing, setPlaying] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioProgress, setAudioProgress] = useState(0);

    const togglePlay = (src: string) => {
        if (playing === src) {
            audioRef.current?.pause();
        } else {
            if (audioRef.current) {
                audioRef.current.src = src;
                audioRef.current.play();
                setPlaying(src);
            }
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            if (audio.duration > 0) {
                setAudioProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        const resetState = () => {
            setPlaying(null);
            setAudioProgress(0);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', resetState);
        audio.addEventListener('pause', resetState);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', resetState);
            audio.removeEventListener('pause', resetState);
        };
    }, []);

    return (
        <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">{title}</Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ overflowY: 'auto', flex: 1 }}>
                {tracks.map(track => {
                    const isSelected = selectedId === track.id;
                    const trackName = 'name' in track ? track.name : track.title;

                    return (
                        <ListItem
                            key={track.id}
                            button
                            selected={isSelected}
                            onClick={() => onSelect(track.id)}
                            sx={{
                                backgroundColor: isSelected ? 'primary.light' : 'transparent',
                                '&:hover': {
                                    backgroundColor: isSelected ? 'primary.dark' : 'action.hover',
                                },
                            }}
                        >
                            <ListItemText primary={trackName} />
                            <ListItemSecondaryAction>
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <CircularProgress
                                        variant="determinate"
                                        value={playing === track.src ? audioProgress : 0}
                                        size={40}
                                        thickness={2}
                                        sx={{
                                            color: 'primary.main',
                                            position: 'absolute',
                                        }}
                                    />
                                    <IconButton onClick={(e) => { e.stopPropagation(); togglePlay(track.src); }}>
                                        {playing === track.src ? <Pause /> : <PlayArrow />}
                                    </IconButton>
                                </Box>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <audio ref={audioRef} />
        </Box>
    );
};
