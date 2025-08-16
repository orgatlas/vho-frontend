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
import {Link, useLocation} from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import {useTheme} from "@mui/material/styles";
import {Apartment, Logout, Settings} from "@mui/icons-material";

export const Layout: React.FC<{children: React.ReactNode, contained?: boolean}> = ({children, contained = true}) => {
    const location = useLocation();
    const isCheckoutPage = location.pathname === '/checkout';
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

    if (isCheckoutPage) {
        return <>{children}</>;
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                            Virtual Home Open
                        </Link>
                    </Typography>
                    {
                        isAuthenticated ? (
                            <>
                                <IconButton onClick={handleMenu} sx={{p: 0}}>
                                    <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                                        {user?.first_name?.[0]?.toUpperCase() || 'U'}
                                    </Avatar>
                                </IconButton>
                                <Popover
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
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
                                            <ListItemButton component={Link} to="/user" onClick={handleClose}>
                                                <ListItemIcon>
                                                    <Settings fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Settings" />
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
                            <>
                                <Button variant={'outlined'} sx={{color:theme.palette.text.secondary}} component={Link} to="/login">Sign In</Button>
                                <Button variant={'outlined'} sx={{color:theme.palette.text.secondary}} component={Link} to="/register">Register</Button>
                            </>
                        )
                    }
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{flexGrow: 1, overflowY: 'auto'}}>
                {contained ? (
                    <Container maxWidth="xl" sx={{py: 4}}>
                        {children}
                    </Container>
                ) : (
                    children
                )}
            </Box>
        </Box>
    );
};
