import React from 'react';
import {
    Box,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {
    ChangeCircle,
    Close,
    NoteAdd,
    OpenWith,
    RemoveCircle,
    ArrowForward,
    Add as AddIcon,
    Remove as RemoveIcon,
} from '@mui/icons-material';
import { ChangeCardData } from 'src/types';

export const cardTypes = {
    Change: {
        icon: <ChangeCircle color="primary" />,
        color: 'primary.main',
        fields: ['What to change', 'Change to'],
    },
    Move: {
        icon: <OpenWith color="secondary" />,
        color: 'secondary.main',
        fields: ['What to move', 'Move to'],
    },
    Add: {
        icon: <NoteAdd color="success" />,
        color: 'success.main',
        fields: ['What to add', 'Optional details: Style / Color / Size'],
    },
    Remove: {
        icon: <RemoveCircle color="error" />,
        color: 'error.main',
        fields: ['What to remove'],
    },
};

type ChangeCardProps = {
    card: ChangeCardData;
    onChange: (card: ChangeCardData) => void;
    onDelete: (id: string) => void;
};

export const ChangeCard: React.FC<ChangeCardProps> = ({ card, onChange, onDelete }) => {
    const cardInfo = cardTypes[card.type];

    const commonProps = {
        variant: 'outlined',
        size: 'small',
        sx: { flex: 1, minWidth: '120px' },
    } as const;

    const field1 = (
        <TextField
            {...commonProps}
            placeholder={cardInfo.fields[0]}
            value={card.field1}
            onChange={(e) => onChange({ ...card, field1: e.target.value })}
            autoFocus
        />
    );

    const field2 = cardInfo.fields[1] ? (
        <TextField
            {...commonProps}
            placeholder={cardInfo.fields[1]}
            value={card.field2 || ''}
            onChange={(e) => onChange({ ...card, field2: e.target.value })}
        />
    ) : null;

    const renderContent = () => {
        switch (card.type) {
            case 'Change':
            case 'Move':
                return (
                    <Stack direction="row" spacing={1} alignItems="center">
                        {field1}
                        <ArrowForward sx={{ color: 'text.primary' }} />
                        {field2}
                    </Stack>
                );
            case 'Add':
                return (
                    <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <AddIcon sx={{ color: 'text.primary' }} />
                            {field1}
                        </Stack>
                        {field2}
                    </Stack>
                );
            case 'Remove':
                return (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <RemoveIcon sx={{ color: 'text.primary' }} />
                        {field1}
                    </Stack>
                );
            default:
                return null;
        }
    };

    return (
        <Paper
            sx={{
                p: 1.5,
                mb: 2,
                borderLeft: `3px solid ${cardInfo.color}`,
                backgroundColor: 'rgba(0,0,0,0.02)',
            }}
            variant="outlined"
        >
            <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {cardInfo.icon}
                        <Typography variant="subtitle1" color={'text.primary'} fontWeight={600}>
                            {card.type}
                        </Typography>
                    </Stack>
                    <IconButton size="small" onClick={() => onDelete(card.id)} sx={{'&:hover': {color: 'error.main'}}}>
                        <Close fontSize="small" />
                    </IconButton>
                </Stack>
                {renderContent()}
            </Stack>
        </Paper>
    );
};
