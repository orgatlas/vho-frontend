import React from 'react';
import {Box, Typography, IconButton, Paper, Stack, Chip} from '@mui/material';
import {Edit} from '@mui/icons-material';
import {Video, Voice, MusicTrack} from 'src/types';
import {useTheme} from "@mui/material/styles";

interface VideoSettingsProps {
    video: Video | null;
    voices: Voice[];
    musicTracks: MusicTrack[];
    onEditVoice: () => void;
    onEditMusic: () => void;
}

export const VideoSettings: React.FC<VideoSettingsProps> = ({video, voices, musicTracks, onEditVoice, onEditMusic}) => {
    const selectedVoice = voices.find(v => v.id === video?.voice!.id);
    const selectedMusic = musicTracks.find(m => m.id === video?.background_music!.id);
    const theme = useTheme();

    return (
        <Box sx={{p: 2}}>
            <Typography variant="h6" gutterBottom>Premium Settings</Typography>
            <Stack spacing={2}>
                <Paper variant="outlined" sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: theme.palette.background.paper
                }}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography variant="subtitle1" sx={{mr: 2}}>Narrator Voice: </Typography>
                        <Chip style={{
                            backgroundColor: theme.palette.primary.dark,
                            fontSize: '18px',
                            color: theme.palette.text.secondary
                        }}
                              label={selectedVoice ? selectedVoice.name : 'Not Selected'}/>
                    </Box>
                    <IconButton onClick={onEditVoice}>
                        <Edit sx={{color: 'white'}}/>
                    </IconButton>
                </Paper>
                <Paper variant="outlined" sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: theme.palette.background.paper
                }}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography variant="subtitle1" sx={{mr: 2}}>Background Music: </Typography>
                        <Chip style={{
                            backgroundColor: theme.palette.primary.dark,
                            fontSize: '18px',
                            color: theme.palette.text.secondary
                        }}
                              label={selectedMusic ? selectedMusic.title : 'Not Selected'}/>
                    </Box>
                    <IconButton onClick={onEditMusic}>
                        <Edit sx={{color: 'white'}}/>
                    </IconButton>
                </Paper>
            </Stack>
        </Box>
    );
};
