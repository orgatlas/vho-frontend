import React from 'react';
import { Box, Typography } from '@mui/material';
import { Scene } from 'src/types';

interface ScenePreviewProps {
    scene: Scene | null;
}

export const ScenePreview: React.FC<ScenePreviewProps> = ({ scene }) => {
    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', overflow: 'hidden' }}>
            {scene ? (
                <video
                    key={scene.id} // Use key to force re-render when scene changes
                    src={scene.video_url} // Assuming scene has a video_url
                    controls
                    autoPlay
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <Typography sx={{ color: 'white' }}>
                    Select a scene to preview
                </Typography>
            )}
        </Box>
    );
};