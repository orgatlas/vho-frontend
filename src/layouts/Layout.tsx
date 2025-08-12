
import React from 'react';
import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';

export const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    const location = useLocation();
    const isCheckoutPage = location.pathname === '/checkout';

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
