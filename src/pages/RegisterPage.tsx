import React, {useState} from 'react';
import {TextField, Button, Box, Typography, Container} from '@mui/material';
import {useAuth} from 'src/contexts/AuthContext';
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {register, loading} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await register(firstName, lastName, email, password);
            toast.success('Registration successful! Please log in.');
            navigate('/'); // Redirect to home page after successful registration
        } catch (error: any) {
            toast.error(error.message || 'Registration failed.');
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
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        placeholder="First Name"
                        name="first_name"
                        autoFocus
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        placeholder="Last Name"
                        name="last_name"
                        autoFocus
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        placeholder="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                    <Box display="flex" justifyContent="flex-end">
                        <Link to="/login" style={{textDecoration: 'none'}}>
                            Already have an account? Sign In
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;