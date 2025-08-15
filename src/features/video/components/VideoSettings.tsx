import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { Video, Voice, MusicTrack } from 'src/types';
import { getVoiceTracks, getMusicTracks, setVoiceTrack, setMusicTrack } from 'src/services/api';
import { toast } from 'react-toastify';

interface VideoSettingsProps {
    video: Video | null;
}

export const VideoSettings: React.FC<VideoSettingsProps> = ({ video }) => {
    const [voices, setVoices] = useState<Voice[]>([]);
    const [musicTracks, setMusicTracks] = useState<MusicTrack[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVoice, setSelectedVoice] = useState<string>('');
    const [selectedMusic, setSelectedMusic] = useState<string>('');

    useEffect(() => {
        const fetchOptions = async () => {
            setIsLoading(true);
            try {
                const [voiceList, musicList] = await Promise.all([
                    getVoiceTracks(),
                    getMusicTracks(),
                ]);
                setVoices(voiceList);
                setMusicTracks(musicList);
                if (video) {
                    setSelectedVoice(video.voice_id || '');
                    setSelectedMusic(video.music_id || '');
                }
            } catch (error) {
                toast.error("Failed to load video settings options.");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOptions();
    }, [video]);

    const handleVoiceChange = async (event: any) => {
        const voiceId = event.target.value;
        setSelectedVoice(voiceId);
        if (video?.id) {
            try {
                await setVoiceTrack(video.id, voiceId);
                toast.success("Narrator voice updated.");
            } catch (error) {
                console.error("Failed to set voice track", error);
            }
        }
    };

    const handleMusicChange = async (event: any) => {
        const musicId = event.target.value;
        setSelectedMusic(musicId);
        if (video?.id) {
            try {
                await setMusicTrack(video.id, musicId);
                toast.success("Background music updated.");
            } catch (error) {
                console.error("Failed to set music track", error);
            }
        }
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Video Settings</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="voice-select-label">Narrator Voice</InputLabel>
                <Select
                    labelId="voice-select-label"
                    value={selectedVoice}
                    label="Narrator Voice"
                    onChange={handleVoiceChange}
                >
                    {voices.map((voice) => (
                        <MenuItem key={voice.id} value={voice.id}>
                            {voice.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="music-select-label">Background Music</InputLabel>
                <Select
                    labelId="music-select-label"
                    value={selectedMusic}
                    label="Background Music"
                    onChange={handleMusicChange}
                >
                    {musicTracks.map((track) => (
                        <MenuItem key={track.id} value={track.id}>
                            {track.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};