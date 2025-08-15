import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Box, Typography, Paper } from '@mui/material';
import { Scene } from 'src/types';

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
                        <Typography variant="h6" gutterBottom sx={{ px: 1 }}>
                            Scenes
                        </Typography>
                        {scenes.map((scene, index) => (
                            <Draggable key={scene.id} draggableId={scene.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <Paper
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => onSelectScene(scene)}
                                        sx={{
                                            p: 1,
                                            mb: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '2px solid',
                                            borderColor: selectedScene?.id === scene.id ? 'primary.main' : 'transparent',
                                            backgroundColor: snapshot.isDragging ? 'action.hover' : 'background.paper',
                                            cursor: 'pointer',
                                        }}
                                        elevation={2}
                                    >
                                        <Box
                                            component="img"
                                            src={scene.preview_url} // Assuming scene has a preview_url
                                            alt={`Scene ${index + 1}`}
                                            sx={{ width: 80, height: 45, borderRadius: 1, objectFit: 'cover', mr: 2 }}
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