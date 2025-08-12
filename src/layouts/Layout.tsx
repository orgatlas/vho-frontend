
import React from 'react';
import {AppBar, Box, Button, Container, Toolbar, Typography, Menu, MenuItem} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';

export const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    const location = useLocation();
    const isCheckoutPage = location.pathname === '/checkout';
    const { user, isAuthenticated, logout } = useAuth();

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
                            Clover
                        </Link>
                    </Typography>
                    <Button color="inherit" component={Link} to="/checkout">Pricing</Button>
                    {
                        isAuthenticated ? (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={handleMenu}
                                >
                                    {user?.first_name || 'User'}
                                </Button>
                                <Menu
                                    sx={{color:'black'}}
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem component={Link} to="/user" onClick={handleClose}>Settings</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button variant={'outlined'} component={Link} to="/login">Sign In</Button>
                                <Button variant={'outlined'} component={Link} to="/register">Register</Button>
                            </>
                        )
                    }
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{flexGrow: 1, overflowY: 'auto'}}>
                <Container maxWidth="xl" sx={{py: 4}}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
};
