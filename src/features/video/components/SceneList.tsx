import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { Scene } from 'src/types';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SceneListProps {
    scenes: Scene[];
    selectedScene: Scene | null;
    onSelectScene: (scene: Scene) => void;
    onReorderScenes: (scenes: Scene[]) => void;
    isReordering: boolean;
}

export const SceneList: React.FC<SceneListProps> = ({ scenes, selectedScene, onSelectScene, onReorderScenes, isReordering }) => {

    const [orderedScenes, setOrderedScenes] = useState<Scene[]>(() => [...scenes].sort((a, b) => a.order - b.order));

    useEffect(() => {
        const propIds = scenes.map(s => s.id).sort().join(',');
        const stateIds = orderedScenes.map(s => s.id).sort().join(',');

        if (propIds !== stateIds) {
            setOrderedScenes([...scenes].sort((a, b) => a.order - b.order));
        }
    }, [scenes, orderedScenes]);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        const reordered = Array.from(orderedScenes);
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);

        setOrderedScenes(reordered);
        onReorderScenes(reordered);
    };

    return (
        <Box sx={{ position: 'relative', height: '100%' }}>
            {isReordering && (
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1 }}>
                    <CircularProgress />
                </Box>
            )}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="scenes">
                    {(provided) => (
                        <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ p: 1, height: '100%', overflowY: 'auto' }}>
                            {orderedScenes.map((scene, index) => (
                                <Draggable key={scene.id} draggableId={scene.id.toString()} index={index} isDragDisabled={isReordering}>
                                    {(provided, snapshot) => (
                                        <Paper
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            onClick={() => onSelectScene(scene)}
                                            sx={{
                                                p: 1,
                                                mb: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderColor: selectedScene?.id === scene.id ? 'primary.main' : 'transparent',
                                                backgroundColor: 'background.paper',
                                                opacity:  snapshot.isDragging ? 0.7 : 1,
                                                cursor: 'pointer',
                                            }}
                                            elevation={2}
                                        >
                                            <Box {...provided.dragHandleProps} sx={{ display: 'flex', alignItems: 'center', pr: 1, cursor: 'grab' }}>
                                                <DragIndicatorIcon sx={{ color: 'text.secondary' }} />
                                            </Box>
                                            <Box
                                                component="img"
                                                src={scene.image.file}
                                                sx={{ width: { xs: 100, md: 160 }, height: { xs: 56, md: 90 }, borderRadius: 1, objectFit: 'cover', mr: 2 }}
                                            />
                                            <Typography variant="subtitle1">{`Scene ${index + 1}`}</Typography>
                                        </Paper>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};
