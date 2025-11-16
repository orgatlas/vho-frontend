import React from 'react';
import {Box, Typography, IconButton, Paper, Stack, Chip} from '@mui/material';
import {Edit} from '@mui/icons-material';
import {Video} from 'src/types';
import {useTheme} from "@mui/material/styles";

interface VideoSettingsProps {
    video: Video | null;
    onEditVoice: () => void;
    onEditMusic: () => void;
}

export const VideoSettings: React.FC<VideoSettingsProps> = ({video, onEditVoice, onEditMusic}) => {
    const selectedVoice = video?.voice;
    const selectedMusic = video?.background_music;
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
                              label={selectedMusic && selectedMusic.name ? selectedMusic.name : 'Not Selected'}/>
                    </Box>
                    <IconButton onClick={onEditMusic}>
                        <Edit sx={{color: 'white'}}/>
                    </IconButton>
                </Paper>
            </Stack>
        </Box>
    );
};
