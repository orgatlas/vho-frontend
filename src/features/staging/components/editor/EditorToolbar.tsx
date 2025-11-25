import React from 'react';
import { Paper, Button, Stack, CircularProgress } from '@mui/material';
import { ArrowBack, Download } from '@mui/icons-material';

interface EditorToolbarProps {
    onBack: () => void;
    onDownload: () => void;
    isDownloading: boolean;
    imageAvailable: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ onBack, onDownload, isDownloading, imageAvailable }) => {
    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'background.default' }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={onBack}
            >
                Back to Gallery
            </Button>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={isDownloading ? <CircularProgress size={24} /> : <Download />} onClick={onDownload} disabled={!imageAvailable || isDownloading}>
                    {isDownloading ? 'Downloading...' : 'Download'}
                </Button>
            </Stack>
        </Paper>
    );
};
