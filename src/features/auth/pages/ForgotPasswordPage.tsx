import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPasswordRequest } from 'src/services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await resetPasswordRequest(email);
      toast.success('Password reset link sent to your email!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send password reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <Box display="flex" justifyContent="space-between">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Remember your password? Sign In
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;