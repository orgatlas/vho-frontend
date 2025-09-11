
import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Toolbar,
    Typography
} from '@mui/material';
import {Link} from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import {useTheme} from "@mui/material/styles";
import {Apartment, Logout, Support} from "@mui/icons-material";
import Logo from 'src/assets/images/logo.png';

export const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    return (
        <AppBar position="sticky" sx={{
            boxShadow: 'none',
            bgcolor: 'transparent',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${theme.palette.divider}`
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" style={{textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center'}}>
                        <img src={Logo} alt="Virtual Home Open Logo" style={{ height: 40, marginRight: 16 }} />
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        <Button component="a" href="/#howitworks" sx={{ color: theme.palette.text.primary, mx: 1 }}>How It Works</Button>
                        <Button component="a" href="/#pricing" sx={{ color: theme.palette.text.primary, mx: 1 }}>Pricing</Button>
                        <Button component="a" href="/#faq" sx={{ color: theme.palette.text.primary, mx: 1 }}>FAQ</Button>
                    </Box>

                    {isAuthenticated ? (
                        <>
                            <IconButton onClick={handleMenu} sx={{p: 0}}>
                                <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                                    {user?.first_name?.[0]?.toUpperCase() || 'U'}{user?.last_name?.[0]?.toUpperCase() || ''}
                                </Avatar>
                            </IconButton>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                PaperProps={{
                                    sx: {
                                        mt: 1.5,
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                        borderRadius: '10px',
                                        boxShadow: theme.shadows[3],
                                        border: `1px solid ${theme.palette.divider}`
                                    }
                                }}
                            >
                                <Box sx={{p: 2}}>
                                    <Typography variant="h6">{user?.first_name} {user?.last_name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                                </Box>
                                <Divider />
                                <List sx={{p:1}}>
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/listings" onClick={handleClose}>
                                            <ListItemIcon>
                                                <Apartment fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Properties" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/support" onClick={handleClose}>
                                            <ListItemIcon>
                                                <Support fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Support" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                                <Divider />
                                <Box sx={{p: 1}}>
                                    <Button fullWidth variant="text" onClick={handleLogout} sx={{color: theme.palette.error.main}}>
                                        <Logout sx={{mr: 1}}/>
                                        Logout
                                    </Button>
                                </Box>
                            </Popover>
                        </>
                    ) : (
                        <Box>
                            <Button variant="text" component={Link} to="/login" sx={{color: theme.palette.text.primary, mr: 1}}>Sign In</Button>
                            <Button variant="contained" component={Link} to="/register">Get Started</Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
