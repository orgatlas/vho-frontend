import React, {useEffect, useState} from 'react';
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
import {useAuth} from 'src/contexts/AuthContext';
import {useTheme} from "@mui/material/styles";
import {
    Apartment,
    HelpOutline,
    Logout,
    MonetizationOnOutlined,
    QuestionAnswerOutlined,
    Support
} from "@mui/icons-material";
import Logo from 'src/assets/images/logo.png';
import {motion} from "framer-motion";

export const Header: React.FC<{ isLandingPage?: boolean }> = ({isLandingPage}) => {
    const {user, isAuthenticated, logout} = useAuth();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [scrolled, setScrolled] = useState(!isLandingPage);

    useEffect(() => {
        if (!isLandingPage) {
            setScrolled(true);
            return;
        }

        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll, {passive: true});
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLandingPage]);


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

    const isTransparent = !scrolled && isLandingPage;
    const textColor = theme.palette.text.primary;

    const toolbarVariants = {
        hidden: {},
        visible: {transition: {staggerChildren: 0.1, delayChildren: 0.1}}
    };
    const itemVariants = {
        hidden: {y: -20, opacity: 0},
        visible: {y: 0, opacity: 1, transition: {type: 'spring', stiffness: 120}}
    };

    return (
        <AppBar
            position={isTransparent ? 'absolute' : 'sticky'}
            sx={{
                boxShadow: 'none',
                backdropFilter: 'blur(10px)',
                backgroundColor: isTransparent ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 1)',
                borderRadius: isTransparent ? '12px' : 0,
                top: isTransparent ? '2rem' : 0,
                left: isTransparent ? '2rem' : 0,
                right: isTransparent ? '2rem' : 0,
                width: 'auto',
                transition: 'all 0.2s ease-in-out',
                zIndex: theme.zIndex.appBar,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar component={motion.div} variants={toolbarVariants} initial="hidden" animate="visible"
                         disableGutters>
                    <motion.div variants={itemVariants}>
                        <Box sx={{padding: isTransparent ? theme.spacing(0.5, 1) : 0}}>
                            <Link to="/" style={{
                                textDecoration: 'none',
                                color: textColor,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <img src={Logo} alt="Virtual Home Open Logo"
                                     style={{height: 40, marginRight: isTransparent ? 0 : 16}}/>
                            </Link>
                        </Box>
                    </motion.div>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'center'}}>
                        <motion.div variants={itemVariants}>
                            <Box sx={{
                                padding: isTransparent ? theme.spacing(0.5) : 0,
                                gap: isTransparent ? 0.5 : 0,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Button component="a" href="/#howitworks"
                                        sx={{
                                            color: textColor,
                                            mx: isTransparent ? 1 : 1,
                                        }}>How It Works</Button>
                                <Button component="a" href="/#pricing"
                                        sx={{
                                            color: textColor,
                                            mx: isTransparent ? 1 : 1,
                                        }}>Pricing</Button>
                                <Button component="a" href="/#faq"
                                        sx={{
                                            color: textColor,
                                            mx: isTransparent ? 1 : 1,
                                        }}>FAQ</Button>
                            </Box>
                        </motion.div>
                    </Box>

                    <motion.div variants={itemVariants}>
                        {isAuthenticated ? (
                            <>
                                <Box sx={{padding: isTransparent ? theme.spacing(0.5) : 0}}>
                                    <IconButton onClick={handleMenu} sx={{p: 0.5}}>
                                        <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                                            {user?.first_name?.[0]?.toUpperCase() || 'U'}{user?.last_name?.[0]?.toUpperCase() || ''}
                                        </Avatar>
                                    </IconButton>
                                </Box>
                                <Popover
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
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
                                    <Divider/>
                                    <List sx={{p: 1}}>
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/listings" onClick={handleClose}>
                                                <ListItemIcon>
                                                    <Apartment fontSize="small"/>
                                                </ListItemIcon>
                                                <ListItemText primary="Properties"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/support" onClick={handleClose}>
                                                <ListItemIcon>
                                                    <Support fontSize="small"/>
                                                </ListItemIcon>
                                                <ListItemText primary="Support"/>
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                    <Divider/>
                                    <Box sx={{p: 1}}>
                                        <Button fullWidth variant="text" onClick={handleLogout}
                                                sx={{color: theme.palette.error.main}}>
                                            <Logout sx={{mr: 1}}/>
                                            Logout
                                        </Button>
                                    </Box>
                                </Popover>
                            </>
                        ) : (
                            <Box sx={{
                                padding: isTransparent ? theme.spacing(0.5, 0.5, 0.5, 2) : 0,
                                gap: isTransparent ? 1 : 0,
                                display: 'flex',
                                alignItems: 'center'
                            }}>

                                <Button variant="text" component={Link} to="/login"
                                        sx={{
                                            color: textColor,
                                            mr: isTransparent ? 0 : 1,
                                            backgroundColor: isTransparent ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0)',
                                        }}>Sign In</Button>
                                <Button variant="contained" component={Link} to="/#examples">Demo</Button>
                            </Box>
                        )}
                    </motion.div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};



