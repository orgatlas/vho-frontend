import React, {useEffect, useRef} from "react";
import {Box} from "@mui/material";

interface VideoPlayerProps {
    inView: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ inView }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (inView) {
                videoRef.current.play().catch(error => console.error("Video play failed:", error));
            } else {
                videoRef.current.pause();
            }
        }
    }, [inView]);

    return (
        <Box sx={{width: '100%', height: '100%', backgroundColor: 'black', borderRadius: '12px', overflow: 'hidden'}}>
            <video
                ref={videoRef}
                src={'https://virtualhomeopen.sgp1.cdn.digitaloceanspaces.com/static/demo.mp4'}
                width="100%"
                height="100%"
                controls
                loop
                playsInline
                style={{objectFit: 'cover'}}
            />
        </Box>
    );
};
