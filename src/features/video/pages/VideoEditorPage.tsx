import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Box, Container, CircularProgress, useMediaQuery} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import {
    PanelGroup,
    Panel,
} from 'react-resizable-panels';
import {Video, Scene, Voice, MusicTrack} from 'src/types';
import {
    getVideoDetails,
    getSceneList,
    saveVideo,
    updateSceneOrder,
    getVoiceTracks,
    getMusicTracks,
    setVoiceTrack,
    setMusicTrack
} from 'src/services/api';
import {toast} from 'react-toastify';
import {VideoEditorHeader} from '../components/editor/VideoEditorHeader';
import {LeftPanel} from '../components/editor/LeftPanel';
import {RightPanel} from '../components/editor/RightPanel';
import ResizeHandle from "src/features/video/components/ResizeHandle";

export const VideoEditorPage: React.FC = () => {
    const {videoId} = useParams<{ videoId: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | null>(null);
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isReordering, setIsReordering] = useState(false);
    const [isUpdatingTrack, setIsUpdatingTrack] = useState(false);
    const [rightPanelView, setRightPanelView] = useState<'preview' | 'voices' | 'music'>('preview');
    const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
    const [availableMusic, setAvailableMusic] = useState<MusicTrack[]>([]);
    const theme = useTheme();

    useEffect(() => {
        if (!videoId) {
            toast.error("Video ID is missing.");
            navigate('/');
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [videoDetails, sceneList, voiceList, musicList] = await Promise.all([
                    getVideoDetails(videoId),
                    getSceneList(videoId),
                    getVoiceTracks(),
                    getMusicTracks(),
                ]);
                setVideo(videoDetails);
                if (videoDetails.locked) {
                    toast.error("Please wait for the changes to apply before re-editing the video.");
                    navigate('/listings/'+videoDetails.property.id+'/manage');
                    return;
                }
                setScenes(sceneList);
                setAvailableVoices(voiceList);
                setAvailableMusic(musicList);
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
        setScenes(reorderedScenes);
        setIsReordering(true);
        try {
            const updatePromises = reorderedScenes.map((scene, index) =>
                updateSceneOrder(scene.id, index + 1)
            );
            await Promise.all(updatePromises);
        } catch (error) {
            console.error("Failed to update scene order", error);
            toast.error("Could not save new scene order.");
        } finally {
            setIsReordering(false);
        }
    };

    const handleScriptUpdate = async () => {
        if (!videoId) return;
        try {
            const sceneList = await getSceneList(videoId);
            setScenes(sceneList);
            if (selectedScene) {
                const updatedSelectedScene = sceneList.find(s => s.id === selectedScene.id);
                if (updatedSelectedScene) {
                    setSelectedScene(updatedSelectedScene);
                } else {
                    setSelectedScene(sceneList.length > 0 ? sceneList[0] : null);
                }
            }
        } catch (error) {
            toast.error("Failed to refresh script data.");
            console.error("Failed to refresh scene data after script update", error);
        }
    };

    const handleSave = async () => {
        if (!videoId) return;
        setIsSaving(true);
        try {
            await saveVideo(videoId);
            toast.success("Video saved successfully!");
            navigate(`/listings/${video?.property.id}/manage`);
        } catch (error) {
            console.error("Failed to save video", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSelectVoice = async (voiceId: string) => {
        if (!video?.id) return;
        setIsUpdatingTrack(true);
        try {
            await setVoiceTrack(video.id, voiceId);
            const selectedVoice = availableVoices.find(v => v.id === voiceId);
            if (selectedVoice) {
                setVideo(prev => prev ? {...prev, voice: selectedVoice} : null);
            }
            toast.success("Narrator voice updated.");
        } catch (error) {
            console.error("Failed to set voice track", error);
            toast.error("Failed to update voice.");
        } finally {
            setIsUpdatingTrack(false);
        }
    };

    const handleSelectMusic = async (musicId: number) => {
        if (!video?.id) return;
        setIsUpdatingTrack(true);
        try {
            await setMusicTrack(video.id, musicId);
            const selectedMusic = availableMusic.find(m => m.id === musicId);
            if (selectedMusic) {
                setVideo(prev => prev ? {...prev, background_music: selectedMusic} : null);
            }
            toast.success("Background music updated.");
        } catch (error) {
            console.error("Failed to set music track", error);
            toast.error("Failed to update music.");
        } finally {
            setIsUpdatingTrack(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Container maxWidth={false} disableGutters sx={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <VideoEditorHeader video={video} onSave={handleSave} isSaving={isSaving} onBack={() => navigate(-1)}/>

            <Box sx={{flex: 1}}>
                <PanelGroup direction={isMobile ? 'vertical' : 'horizontal'}>
                    <Panel defaultSize={40} minSize={20}>
                        <LeftPanel
                            scenes={scenes}
                            selectedScene={selectedScene}
                            onSelectScene={setSelectedScene}
                            onReorderScenes={handleReorderScenes}
                            video={video}
                            voices={availableVoices}
                            musicTracks={availableMusic}
                            onEditVoice={() => setRightPanelView('voices')}
                            onEditMusic={() => setRightPanelView('music')}
                            isReordering={isReordering}
                        />
                    </Panel>
                    <ResizeHandle orientation="vertical" />
                    <Panel defaultSize={60} minSize={30}>
                        <RightPanel
                            view={rightPanelView}
                            scene={selectedScene}
                            video={video}
                            onClose={() => setRightPanelView('preview')}
                            availableVoices={availableVoices}
                            availableMusic={availableMusic}
                            onSelectVoice={handleSelectVoice}
                            onSelectMusic={handleSelectMusic}
                            onScriptUpdate={handleScriptUpdate}
                            isUpdatingTrack={isUpdatingTrack}
                        />
                    </Panel>
                </PanelGroup>
            </Box>
        </Container>
    );
};