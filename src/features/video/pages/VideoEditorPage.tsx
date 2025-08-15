import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper, CircularProgress } from '@mui/material';
import {
    PanelGroup,
    Panel,
    PanelResizeHandle,
} from 'react-resizable-panels';
import { SceneList } from 'src/features/video/components/SceneList';
import { VideoSettings } from 'src/features/video/components/VideoSettings';
import { ScenePreview } from 'src/features/video/components/ScenePreview';
import { SceneSettings } from 'src/features/video/components/SceneSettings';
import { Video, Scene } from 'src/types';
import { getVideoDetails, getSceneList, saveVideo, updateScene } from 'src/services/api';
import { toast } from 'react-toastify';

export const VideoEditorPage: React.FC = () => {
    const { videoId } = useParams<{ videoId: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | null>(null);
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!videoId) {
            toast.error("Video ID is missing.");
            navigate('/');
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const videoDetails = await getVideoDetails(videoId);
                const sceneList = await getSceneList(videoId);
                setVideo(videoDetails);
                setScenes(sceneList);
                if (sceneList.length > 0) {
                    setSelectedScene(sceneList[0]);
                }
            } catch (error) {
                toast.error("Failed to fetch video data.");
                console.error("Failed to fetch video data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [videoId, navigate]);

    const handleReorderScenes = async (reorderedScenes: Scene[]) => {
        // Optimistically update the UI
        setScenes(reorderedScenes);

        try {
            // Create an array of promises for the API calls
            const updatePromises = reorderedScenes.map((scene, index) =>
                updateScene(scene.id, { order: index + 1 })
            );
            // Wait for all API calls to complete
            await Promise.all(updatePromises);
            toast.success("Scene order saved!");
        } catch (error) {
            console.error("Failed to update scene order", error);
            // Revert the state if the API call fails
            // (You might want to refetch the original list here)
            toast.error("Could not save new scene order.");
        }
    };

    const handleSave = async () => {
        if (!videoId) return;
        setIsSaving(true);
        try {
            await saveVideo(videoId);
            toast.success("Video saved successfully!");
            navigate(`/listings/${video?.property_id}/manage`);
        } catch (error) {
            console.error("Failed to save video", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth={false} disableGutters sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" component="h1">
                    {video?.address || 'Video Editor'}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <CircularProgress size={24} /> : 'Save & Generate'}
                </Button>
            </Paper>

            <Box sx={{ flex: 1 }}>
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={25} minSize={20}>
                        <PanelGroup direction="vertical">
                            <Panel defaultSize={65} minSize={40}>
                                <SceneList scenes={scenes} selectedScene={selectedScene} onSelectScene={setSelectedScene} onReorderScenes={handleReorderScenes} />
                            </Panel>
                            <PanelResizeHandle />
                            <Panel defaultSize={35} minSize={20}>
                                <VideoSettings video={video} />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                    <PanelResizeHandle />
                    <Panel defaultSize={75} minSize={50}>
                        <PanelGroup direction="vertical">
                            <Panel defaultSize={60} minSize={40}>
                                <ScenePreview scene={selectedScene} />
                            </Panel>
                            <PanelResizeHandle />
                            <Panel defaultSize={40} minSize={20}>
                                <SceneSettings scene={selectedScene} />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </Box>
        </Container>
    );
};