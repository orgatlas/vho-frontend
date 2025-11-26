import React from 'react';
import { Box } from '@mui/material';

interface VideoPlayerProps {
  videoUrl: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (time: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onPlay, onPause, onEnded, onTimeUpdate }) => {
  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (onTimeUpdate) {
      onTimeUpdate(event.currentTarget.currentTime);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'black', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}>
      <video
        src={videoUrl}
        width="100%"
        height="100%"
        controls
        playsInline
        loop
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onTimeUpdate={handleTimeUpdate}
        style={{ display: 'block', objectFit: 'cover' }}
      />
    </Box>
  );
};