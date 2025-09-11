import React from 'react';
import { Box } from '@mui/material';

interface VideoPlayerProps {
  videoUrl: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onPlay, onPause, onEnded }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'black', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}>
      <video
        src={videoUrl}
        width="100%"
        height="100%"
        controls
        playsInline
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        style={{ display: 'block', objectFit: 'cover' }}
      />
    </Box>
  );
};
