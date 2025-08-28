import React, {useState, useRef, useEffect} from 'react';
import {
    Card,
    Typography,
    Box,
    CardContent,
    CardMedia,
    useTheme,
    CardActions,
    IconButton,
    Menu,
    MenuItem, CircularProgress, Tooltip
} from '@mui/material';
import { Video } from 'src/types';
import {VideocamOutlined, Download, Edit, Share, PlayArrow, Pause, Visibility} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    EmailIcon
} from "react-share";

interface VideoCardProps {
    video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(error => console.error("Video play failed:", error));
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);


    const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleShareClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        navigate(`/video/${video.id}/edit`);
    };

    const handleView = () => {
        navigate(`/video/${video.id}/view`);
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(`${video.file}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', video.property.address || 'video.mp4');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the video:', error);
        }
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const shareUrl = `${window.location.origin}/video/${video.id}`;

    return (
        <Card sx={{
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[4],
            },
            borderRadius: '10px',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
        }}>
            <Box
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{ position: 'relative' }}
            >
                {video.file ? (
                    <>
                        <CardMedia
                            ref={videoRef}
                            component="video"
                            sx={{
                                height: 180,
                                objectFit: 'cover',
                            }}
                            src={`${video.file}`}
                            loop
                            muted
                            playsInline
                        />
                        {isHovered && (
                            <IconButton
                                onClick={handlePlayPause}
                                sx={{
                                    position: 'absolute',
                                    top: '90px',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                }}
                            >
                                {isPlaying ? <Pause /> : <PlayArrow />}
                            </IconButton>
                        )}
                    </>
                ) : (
                    <CardMedia
                        sx={{
                            height: 180,
                            backgroundColor: theme.palette.secondary.light,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: theme.palette.secondary.main
                        }}
                    >
                        <VideocamOutlined sx={{fontSize: 60}}/>
                    </CardMedia>
                )}
                <CardContent>
                    <Typography variant="h6" component="div" noWrap>
                        {video.title || video.property.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Created: {new Date(video.created).toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Box>
            {video.locked ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 1 }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2" color="text.secondary">Creating</Typography>
                </Box>
            ) : (
                <CardActions sx={{ justifyContent: 'flex-end', paddingTop: 0 }}>
                    <Tooltip title="View">
                        <IconButton onClick={handleView} aria-label="view">
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                        <IconButton onClick={handleDownload} aria-label="download">
                            <Download />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton onClick={handleEdit} aria-label="edit">
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                        <IconButton onClick={handleShareClick} aria-label="share">
                            <Share />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleShareClose}
                    >
                        <MenuItem onClick={handleShareClose}>
                            <FacebookShareButton url={shareUrl} quote={video.title || ''}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <FacebookIcon size={32} round />
                                    <Typography>Facebook</Typography>
                                </Box>
                            </FacebookShareButton>
                        </MenuItem>
                        <MenuItem onClick={handleShareClose}>
                            <TwitterShareButton url={shareUrl} title={video.title || ''}>
                                 <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <TwitterIcon size={32} round />
                                    <Typography>Twitter</Typography>
                                </Box>
                            </TwitterShareButton>
                        </MenuItem>
                        <MenuItem onClick={handleShareClose}>
                            <EmailShareButton url={shareUrl} subject={video.title || ''} body="Check out this video:">
                                 <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <EmailIcon size={32} round />
                                     <Typography>Email</Typography>
                                 </Box>
                            </EmailShareButton>
                        </MenuItem>
                    </Menu>
                </CardActions>
            )}
        </Card>
    );
};