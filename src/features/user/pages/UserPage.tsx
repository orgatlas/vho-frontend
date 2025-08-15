import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useAuth } from 'src/contexts/AuthContext';

const UserPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Typography>Loading user data...</Typography>;
  }

  if (!user) {
    return <Typography>Please log in to view this page.</Typography>;
  }

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
          User Profile
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          {/* Add more user details here as needed */}
        </Box>
      </Box>
    </Container>
  );
};

export default UserPage;