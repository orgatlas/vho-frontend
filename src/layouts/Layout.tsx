import React from 'react';
import {Box, Container} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';

export const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    const location = useLocation();
    const isCheckoutPage = location.pathname.startsWith('/checkout');
    const isLandingPage = location.pathname === '/';

    if (isCheckoutPage) {
        return <>{children}</>;
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default'}}>
            <Header isLandingPage={isLandingPage} />
            <Box component="main" sx={{flexGrow: 1}}>
                {isLandingPage ? (
                    children
                ) : (
                    <Container maxWidth="xl" sx={{py: 4}}>
                        {children}
                    </Container>
                )}
            </Box>
        </Box>
    );
};
