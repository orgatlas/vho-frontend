import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Container,
    LinearProgress,
    Paper,
    Typography,
} from '@mui/material';
import { stagingProgress } from 'src/services/api';
import { toast } from 'react-toastify';

export const StagingProgressPage: React.FC = () => {
    const navigate = useNavigate();
    const { stagingPackageId } = useParams<{ stagingPackageId: string }>();

    const [progress, setProgress] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [completed, setCompleted] = useState<number>(0);
    const [inProgress, setInProgress] = useState<number>(0);
    const [failed, setFailed] = useState<number>(0);
    const [waiting, setWaiting] = useState<number>(0);

    useEffect(() => {
        if (!stagingPackageId) return;

        let cancelled = false;

        const pollProgress = async () => {
            while (!cancelled) {
                try {
                    const data = await stagingProgress(stagingPackageId);
                    if (cancelled) return;

                    setProgress(data.percentage_completed);
                    setTotal(data.total);
                    setCompleted(data.completed);
                    setInProgress(data.in_progress);
                    setFailed(data.failed);
                    setWaiting(data.waiting);

                    if (data.percentage_completed >= 100) {
                        navigate(`/staging/gallery/${stagingPackageId}`);
                        return;
                    }
                } catch (error) {
                    console.error('Error fetching staging progress:', error);
                    toast.error('Error checking progress. Please try again.');
                }

                // Poll every 3 seconds
                await new Promise(res => setTimeout(res, 15000));
            }
        };

        pollProgress();

        return () => {
            cancelled = true;
        };
    }, [stagingPackageId, navigate]);

    return (
        <Container maxWidth="sm">
            <Paper
                elevation={4}
                sx={{
                    p: 6,
                    mt: 10,
                    borderRadius: 4,
                    textAlign: 'center',
                    background: 'linear-gradient(to bottom right, #fdfdfd, #f8f9fa)',
                }}
            >
                <Typography variant="h4" color="text.primary" gutterBottom fontWeight="600">
                    Designing in Progress
                </Typography>

                <Typography variant="h6" color="text.primary" sx={{ mb: 4 }}>
                    Our designer is working on your staging package
                </Typography>

                <Box sx={{ position: 'relative', width: '100%', mb: 3 }}>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 16,
                            borderRadius: 8,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 8,
                                background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                            },
                        }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontWeight: 600,
                            color: 'white',
                        }}
                    >
                        {Math.round(progress)}%
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.primary" sx={{ mb: 4 }}>
                    {completed} completed • {inProgress} in progress • {waiting} waiting • {failed} failed
                </Typography>

                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mt: 6, fontStyle: 'italic' }}
                >
                    It is safe to leave this page, we’ll email you when the designer has finished.
                </Typography>
            </Paper>
        </Container>
    );
};