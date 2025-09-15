import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import { Close,TextFields, Movie } from '@mui/icons-material';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { Scene } from 'src/types';
import { ScriptEditor } from './ScriptEditor';
import { AnimationSettings } from './AnimationSettings';
import ResizeHandle from "src/features/video/components/ResizeHandle";

interface SceneSettingsProps {
    scene: Scene | null;
}

const SettingsTile: React.FC<{ icon: React.ReactElement; title: string; onClick: () => void; }> = ({ icon, title, onClick }) => (
    <Paper
        onClick={onClick}
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            height: 120,
            '&:hover': {
                backgroundColor: 'action.hover'
            }
        }}
        elevation={2}
    >
        {icon}
        <Typography variant="subtitle1" sx={{ mt: 1 }}>{title}</Typography>
    </Paper>
);

export const SceneSettings: React.FC<SceneSettingsProps> = ({ scene }) => {
    const [editingMode, setEditingMode] = useState<'script' | 'animation' | null>(null);

    useEffect(() => {
        // Close the editor if the scene changes
        setEditingMode(null);
    }, [scene]);

    if (!scene) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography>Select a scene to view its settings.</Typography>
            </Box>
        );
    }

    const renderEditor = () => {
        switch (editingMode) {
            case 'script':
                return <ScriptEditor scene={scene} />;
            case 'animation':
                return <AnimationSettings scene={scene} />;
            default:
                return null;
        }
    };

    return (
        <PanelGroup direction="horizontal">
            <Panel defaultSize={editingMode ? 50 : 100} minSize={30}>
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <SettingsTile icon={<TextFields fontSize="large" />} title="Script" onClick={() => setEditingMode('script')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <SettingsTile icon={<Movie fontSize="large" />} title="Animation" onClick={() => setEditingMode('animation')} />
                        </Grid>
                    </Grid>
                </Box>
            </Panel>
            {editingMode && (
                <>
                    <ResizeHandle orientation="vertical" />
                    <Panel defaultSize={50} minSize={30}>
                        <Box sx={{ position: 'relative', height: '100%', p: 2, overflowY: 'auto' }}>
                            <IconButton
                                onClick={() => setEditingMode(null)}
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                            >
                                <Close />
                            </IconButton>
                            {renderEditor()}
                        </Box>
                    </Panel>
                </>
            )}
        </PanelGroup>
    );
};