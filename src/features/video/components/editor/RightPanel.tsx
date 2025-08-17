import React from 'react';
import {PanelGroup, Panel} from 'react-resizable-panels';
import {ScenePreview} from 'src/features/video/components/ScenePreview';
import {SceneSettings} from 'src/features/video/components/SceneSettings';
import {Scene, Video, Voice, MusicTrack} from 'src/types';
import {TrackSelectionPanel} from './TrackSelectionPanel';
import {ScriptEditor} from "src/features/video/components/ScriptEditor";
import {Box, Typography} from "@mui/material";
import ResizeHandle from "src/features/video/components/ResizeHandle";

interface RightPanelProps {
    view: 'preview' | 'voices' | 'music';
    scene: Scene | null;
    video: Video | null;
    onClose: () => void;
    availableVoices: Voice[];
    availableMusic: MusicTrack[];
    onSelectVoice: (voiceId: string) => void;
    onSelectMusic: (musicId: number) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
                                                          view,
                                                          scene,
                                                          video,
                                                          onClose,
                                                          availableVoices,
                                                          availableMusic,
                                                          onSelectVoice,
                                                          onSelectMusic,
                                                      }) => {
    if (view === 'voices') {
        return (
            <TrackSelectionPanel
                title="Select Narrator Voice"
                tracks={availableVoices}
                selectedId={video?.voice!.id || null}
                onSelect={(id) => onSelectVoice(id as string)}
                onClose={onClose}
            />
        );
    }

    if (view === 'music') {
        return (
            <TrackSelectionPanel
                title="Select Background Music"
                tracks={availableMusic}
                selectedId={video?.background_music!.id || null}
                onSelect={(id) => onSelectMusic(id as number)}
                onClose={onClose}
            />
        );
    }

    // Default is 'preview'
    return (
        <PanelGroup direction="vertical">
            <Panel defaultSize={60} minSize={40}>
                <ScenePreview scene={scene}/>
            </Panel>
            <ResizeHandle orientation="horizontal" />
            <Panel defaultSize={40} minSize={20}>
                {/*<SceneSettings scene={scene} />*/}
                {scene ? <ScriptEditor scene={scene}/> : <Typography>Select a scene to view its settings.</Typography>}
            </Panel>
        </PanelGroup>
    );
};