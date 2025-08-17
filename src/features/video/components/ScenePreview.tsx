import React, {useEffect, useRef, useState} from 'react';
import {Box, Typography} from '@mui/material';
import ReactPlayer from 'react-player';
import {Scene} from 'src/types';
import {VideoControls} from './VideoControls';

interface ScenePreviewProps {
    scene: Scene | null;
}

export const ScenePreview: React.FC<ScenePreviewProps> = ({scene}) => {
    const playerRef = useRef<ReactPlayer>(null);
    const playerWrapperRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [volume, setVolume] = useState(1);
    const [controlsWidth, setControlsWidth] = useState<number | undefined>(undefined);

    const handlePlayPause = () => setPlaying(!playing);
    const handleSeek = (value: number) => {
        setPlayed(value);
        playerRef.current?.seekTo(value);
    };
    const handleVolumeChange = (value: number) => setVolume(value);

    const updateWidth = () => {
        if (playerWrapperRef.current) {
            const videoElement = playerWrapperRef.current.querySelector('video');
            if (videoElement) {
                setControlsWidth(videoElement.clientWidth);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                backgroundColor:'black'
            }}
        >
            {scene ? (
                <>
                    <Box sx={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={playerWrapperRef}>
                        <ReactPlayer
                            ref={playerRef}
                            key={scene.id}
                            url={process.env.REACT_APP_BASE_URL + scene.file}
                            playing={playing}
                            volume={volume}
                            width="100%"
                            height="100%"
                            progressInterval={100}
                            onProgress={({ played }) => setPlayed(played)}
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            onReady={updateWidth}
                        />
                    </Box>

                    <Box sx={{ width: controlsWidth, margin: '0 auto' }}>
                        <VideoControls
                            playing={playing}
                            played={played}
                            volume={volume}
                            onPlayPause={handlePlayPause}
                            onSeek={handleSeek}
                            onVolumeChange={handleVolumeChange}
                        />
                    </Box>
                </>
            ) : (
                <Typography sx={{ color: 'white', textAlign: 'center' }}>
                    Select a scene to preview
                </Typography>
            )}
        </Box>
    );
};