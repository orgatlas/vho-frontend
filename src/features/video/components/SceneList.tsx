import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Box, Typography, Paper } from '@mui/material';
import { Scene } from 'src/types';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SceneListProps {
    scenes: Scene[];
    selectedScene: Scene | null;
    onSelectScene: (scene: Scene) => void;
    onReorderScenes: (scenes: Scene[]) => void;
}

export const SceneList: React.FC<SceneListProps> = ({ scenes, selectedScene, onSelectScene, onReorderScenes }) => {

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        const reorderedScenes = Array.from(scenes);
        const [removed] = reorderedScenes.splice(source.index, 1);
        reorderedScenes.splice(destination.index, 0, removed);

        onReorderScenes(reorderedScenes);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="scenes">
                {(provided) => (
                    <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ p: 1, height: '100%', overflowY: 'auto' }}>
                        {scenes.map((scene, index) => (
                            <Draggable key={scene.id} draggableId={scene.id.toString()} index={index}>
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
                                            src={process.env.REACT_APP_BASE_URL + scene.image.file}
                                            sx={{ width: 160, height: 90, borderRadius: 1, objectFit: 'cover', mr: 2 }}
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
    );
};