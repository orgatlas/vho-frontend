import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, CircularProgress } from '@mui/material';

interface ContactFormProps {
    onSend: (details: { firstName: string; lastName: string; email: string; message: string }) => void;
    loading: boolean;
}

const FieldLabel: React.FC<{ icon: React.ReactElement; label: string; tooltip?: string }> = ({ icon, label }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {React.cloneElement(icon, {
            sx: {
                mr: 1,
                fontSize: '0.875rem',
                color: 'text.primary',
            },
        })}
        <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            {label}
        </Typography>
    </Box>
);


export const ContactForm: React.FC<ContactFormProps> = ({ onSend, loading }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSend({ firstName, lastName, email, message });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        required
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="email"
                        placeholder="Your Email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        multiline
                        placeholder="How can we help you?"
                        rows={6}
                        fullWidth
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" size="large" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Send Message'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
