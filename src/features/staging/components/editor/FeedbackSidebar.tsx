import React from 'react';
import {
    Paper,
    Stack,
    Typography,
    Button,
    Box,
    CircularProgress,
} from '@mui/material';
import {Image, Send} from '@mui/icons-material';
import { ChangeCardData } from 'src/types';
import { ChangeCard, cardTypes } from './ChangeCard';

interface FeedbackSidebarProps {
    cards: ChangeCardData[];
    isSubmitting: boolean;
    onAddCard: (type: ChangeCardData['type']) => void;
    onUpdateCard: (card: ChangeCardData) => void;
    onDeleteCard: (id: string) => void;
    onSubmit: () => void;
}

export const FeedbackSidebar: React.FC<FeedbackSidebarProps> = ({
    cards,
    isSubmitting,
    onAddCard,
    onUpdateCard,
    onDeleteCard,
    onSubmit,
}) => {
    return (
        <Paper elevation={3} sx={{ p: 2, backgroundColor: 'background.default', height: '100%' }}>
            <Stack spacing={2} sx={{ height: '100%' }}>
                <Typography variant="h5" color={'text.primary'}>Edit</Typography>
                <Typography variant="body2" color="text.primary">
                    Add, remove, or change items in the image.
                </Typography>

                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {Object.keys(cardTypes).map((type) => (
                        <Button
                            key={type}
                            variant="outlined"
                            size="small"
                            startIcon={cardTypes[type as keyof typeof cardTypes].icon}
                            onClick={() => onAddCard(type as ChangeCardData['type'])}
                            sx={{ borderColor: cardTypes[type as keyof typeof cardTypes].color, color: cardTypes[type as keyof typeof cardTypes].color }}
                        >
                            {type}
                        </Button>
                    ))}
                </Stack>

                <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                    {cards.length > 0 ? (
                        cards.map((card) => (
                            <ChangeCard
                                key={card.id}
                                card={card}
                                onChange={onUpdateCard}
                                onDelete={onDeleteCard}
                            />
                        ))
                    ) : (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography color="text.secondary">No change requests yet.</Typography>
                        </Box>
                    )}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : <Image />}
                    onClick={onSubmit}
                    disabled={cards.length === 0 || isSubmitting}
                    fullWidth
                >
                    {isSubmitting ? 'Submitting...' : 'Confirm Changes'}
                </Button>
            </Stack>
        </Paper>
    );
}
