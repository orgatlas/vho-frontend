import React from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, VolumeOff } from '@mui/icons-material';

interface VideoControlsProps {
    playing: boolean;
    played: number;
    volume: number;
    onPlayPause: () => void;
    onSeek: (value: number) => void;
    onVolumeChange: (value: number) => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({ playing, played, volume, onPlayPause, onSeek, onVolumeChange }) => {
    return (
        <Box sx={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, backgroundColor: 'black', color: 'white' }}>
            <IconButton onClick={onPlayPause} sx={{ color: 'white' }}>
                {playing ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Slider
                value={played}
                min={0}
                max={1}
                step={0.01}
                onChange={(e, value) => onSeek(value as number)}
                sx={{ mx: 2 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{color:'white'}} onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}>
                    {volume > 0 ? <VolumeUp /> : <VolumeOff />}
                </IconButton>
                <Slider
                    value={volume}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(e, value) => onVolumeChange(value as number)}
                    sx={{ width: 100 }}
                />
            </Box>
        </Box>
    );
};