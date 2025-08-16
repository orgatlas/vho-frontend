import React from 'react';
import {PanelGroup, Panel} from 'react-resizable-panels';
import {SceneList} from 'src/features/video/components/SceneList';
import {VideoSettings} from 'src/features/video/components/VideoSettings';
import {Scene, Video, Voice, MusicTrack} from 'src/types';
import ResizeHandle from "src/features/video/components/ResizeHandle";

interface LeftPanelProps {
    scenes: Scene[];
    selectedScene: Scene | null;
    onSelectScene: (scene: Scene) => void;
    onReorderScenes: (reorderedScenes: Scene[]) => void;
    video: Video | null;
    voices: Voice[];
    musicTracks: MusicTrack[];
    onEditVoice: () => void;
    onEditMusic: () => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
                                                        scenes,
                                                        selectedScene,
                                                        onSelectScene,
                                                        onReorderScenes,
                                                        video,
                                                        voices,
                                                        musicTracks,
                                                        onEditVoice,
                                                        onEditMusic
                                                    }) => {
    return (
        <PanelGroup direction="vertical">
            <Panel defaultSize={65} minSize={40}>
                <SceneList
                    scenes={scenes}
                    selectedScene={selectedScene}
                    onSelectScene={onSelectScene}
                    onReorderScenes={onReorderScenes}
                />
            </Panel>
            <ResizeHandle orientation="horizontal"/>
            <Panel defaultSize={35} minSize={20}>
                <VideoSettings
                    video={video}
                    voices={voices}
                    musicTracks={musicTracks}
                    onEditVoice={onEditVoice}
                    onEditMusic={onEditMusic}
                />
            </Panel>
        </PanelGroup>
    );
};