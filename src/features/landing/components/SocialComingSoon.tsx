import React, {useState} from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    TextField,
    Paper,
    InputAdornment,
    useTheme,
    alpha,
    CircularProgress
} from '@mui/material';
import {motion, AnimatePresence} from 'framer-motion';
import {Mail, User, CheckCircle2, Heart, MessageCircle, Share2, Sparkles, Zap} from 'lucide-react';
import {socialSignup} from 'src/services/api';
import {toast} from 'react-toastify';

// --- ASSETS ---
// Reusing the social image generated earlier for consistency
const PHONE_IMAGE = "https://sgp1.digitaloceanspaces.com/virtualhomeopen/static/homepage/socials/social.mov";

// --- FLOATING ICON COMPONENT ---
interface FloatingIconProps {
    icon: React.ElementType;
    delay: number;
    x: number;
    y: number;
    color: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({icon: Icon, delay, x, y, color}) => (
    <motion.div
        initial={{opacity: 0, scale: 0}}
        animate={{
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
            x: [0, 5, 0]
        }}
        transition={{
            opacity: {duration: 0.5, delay},
            scale: {duration: 0.5, delay},
            y: {duration: 3, repeat: Infinity, ease: "easeInOut", delay},
            x: {duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5}
        }}
        style={{
            position: 'absolute',
            top: y,
            left: x,
            background: 'white',
            padding: '10px',
            borderRadius: '50%',
            width: 50,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            color: color,
            zIndex: 2
        }}
    >
        <Icon size={20} fill={color === '#ff5757' ? color : 'none'}/>
    </motion.div>
);

// --- MAIN COMPONENT ---
export const SocialComingSoon = () => {
    const theme = useTheme();
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({name: '', email: ''});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            toast.error("Please fill in all fields");
            return;
        }

        setFormState('submitting');

        try {
            await socialSignup(formData.name, formData.email);
            setFormState('success');
        } catch (error) {
            console.error("Signup error:", error);
            // Error handling is already done in api.tsx interceptor mostly, but we reset state
            setFormState('idle');
        }
    };

    // Custom Input Style
    const inputStyle = {
        '& .MuiFilledInput-root': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderColor: 'rgba(255,255,255,0.3)',
            },
            '&.Mui-focused': {
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderColor: theme.palette.secondary.light,
                boxShadow: `0 0 0 4px ${alpha(theme.palette.secondary.light, 0.2)}` // Glowing focus ring
            },
            '&:before, &:after': {
                display: 'none', // Remove default underline
            },
        },
        '& .MuiInputAdornment-root': {
            color: 'rgba(255,255,255,0.6)',
            marginTop: '0 !important', // Fix alignment
        },
        '& input': {
            paddingTop: '16px',
            paddingBottom: '16px',
        }
    };

    return (
        <Box id="social-content" sx={{
            position: 'relative',
            py: 12,
            bgcolor: theme.palette.background.paper,
            overflow: 'hidden',
            color: 'white'
        }}>
            {/* Background Gradients */}
            <Box sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 600,
                height: 600,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.4)} 0%, transparent 70%)`,
                pointerEvents: 'none'
            }}/>
            <Box sx={{
                position: 'absolute',
                bottom: -100,
                left: -100,
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${theme.palette.primary.dark} 0%, transparent 70%)`,
                pointerEvents: 'none'
            }}/>

            <Container maxWidth="lg" sx={{position: 'relative', zIndex: 10}}>
                <Grid container spacing={8} alignItems="center">

                    {/* LEFT: COPY & FORM */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{opacity: 0, x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.8}}
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: 0.2}}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '6px 16px',
                                    borderRadius: '50px',
                                    marginBottom: '24px',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <Sparkles size={16} color={theme.palette.secondary.light}/>
                                <Typography variant="subtitle2" fontWeight={700} color={theme.palette.secondary.light}>
                                    COMING SOON
                                </Typography>
                            </motion.div>

                            <Typography variant="h2" sx={{fontWeight: 800, mb: 2, lineHeight: 1.1}}>
                                Go Viral with <br/>
                                <span style={{color: theme.palette.secondary.light}}>Social Content.</span>
                            </Typography>

                            <Typography variant="body1"
                                        sx={{color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', mb: 4, maxWidth: 480}}>
                                Stop spending hours editing video. Our new tool turns your listing photos into engaging,
                                trend-aware reels for your socials instantly. Coming Soon...
                            </Typography>

                            {/* The "Golden Ticket" Offer */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: '24px',
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    mb: 4,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    minHeight: 350, // Fix height to prevent layout jump
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
                                    <Box sx={{
                                        p: 1.5,
                                        borderRadius: '12px',
                                        background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.main} 100%)`,
                                        color: theme.palette.primary.dark,
                                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.6)}`
                                    }}>
                                        <Zap size={24} fill={theme.palette.primary.dark}/>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight={800} lineHeight={1}>
                                            First Reel Free
                                        </Typography>
                                        <Typography variant="caption" sx={{opacity: 0.8, letterSpacing: 0.5}}>
                                            EXCLUSIVE LAUNCH OFFER
                                        </Typography>
                                    </Box>
                                </Box>

                                <AnimatePresence mode="wait">
                                    {formState === 'success' ? (
                                        <motion.div
                                            key="success"
                                            initial={{opacity: 0, scale: 0.9}}
                                            animate={{opacity: 1, scale: 1}}
                                            exit={{opacity: 0, scale: 0.9}}
                                            style={{textAlign: 'center', padding: '20px'}}
                                        >
                                            <CheckCircle2 size={56} color={theme.palette.secondary.light}
                                                          style={{marginBottom: 16, margin: '0 auto'}}/>
                                            <Typography variant="h5" fontWeight={700} color="white" gutterBottom>
                                                You're on the list!
                                            </Typography>
                                            <Typography variant="body1" sx={{opacity: 0.8}}>
                                                Keep an eye on your inbox. We'll send you information on how to redeem your free video when 'Social Content' is ready.
                                            </Typography>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            onSubmit={handleSubmit}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Your Name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                        variant="filled"
                                                        sx={inputStyle}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <User size={20}/>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Email Address"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                        variant="filled"
                                                        sx={inputStyle}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Mail size={20}/>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        fullWidth
                                                        component={motion.button}
                                                        whileHover={{scale: 1.02}}
                                                        whileTap={{scale: 0.98}}
                                                        type="submit"
                                                        variant="contained"
                                                        disabled={formState === 'submitting'}
                                                        sx={{
                                                            background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.main} 100%)`,
                                                            color: theme.palette.primary.dark,
                                                            fontWeight: 800,
                                                            py: 2,
                                                            fontSize: '1rem',
                                                            borderRadius: '16px',
                                                            textTransform: 'none',
                                                            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                                                            border: '1px solid rgba(255,255,255,0.3)',
                                                            transition: 'all 0.3s ease',
                                                            '&:disabled': {
                                                                background: `rgba(255,255,255,0.1)`,
                                                                color: 'rgba(255,255,255,0.5)',
                                                                boxShadow: 'none'
                                                            },
                                                            '&:hover': {
                                                                background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.main} 80%)`,
                                                                boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.6)}`
                                                            }
                                                        }}
                                                    >
                                                        {formState === 'submitting' ? (
                                                            <CircularProgress size={24} color="inherit"/>
                                                        ) : (
                                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                                <Zap size={20} fill={theme.palette.primary.dark}/>
                                                                Claim My Free Video
                                                            </Box>
                                                        )}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            <Typography variant="caption"
                                                        sx={{
                                                            display: 'block',
                                                            mt: 2.5,
                                                            textAlign: 'center',
                                                            opacity: 0.5
                                                        }}>
                                                Limited to the first 100 signups.
                                            </Typography>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* RIGHT: VISUALS */}
                    <Grid item xs={12} md={6} sx={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                        <motion.div
                            initial={{opacity: 0, scale: 0.8, rotate: 5}}
                            whileInView={{opacity: 1, scale: 1, rotate: 0}}
                            viewport={{once: true}}
                            transition={{type: "spring", stiffness: 50, delay: 0.2}}
                            style={{position: 'relative'}}
                        >
                            {/* Decorative Rings */}
                            <Box sx={{
                                position: 'absolute',
                                inset: -20,
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '40px',
                                transform: 'rotate(-5deg)'
                            }}/>
                            <Box sx={{
                                position: 'absolute',
                                inset: -40,
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '50px',
                                transform: 'rotate(5deg)'
                            }}/>

                            {/* Phone Container */}
                            <Box
                                sx={{
                                    width: 300,
                                    height: 533,
                                    bgcolor: 'black',
                                    borderRadius: '40px',
                                    border: '8px solid #2d2d2d',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    boxShadow: `0 30px 60px ${alpha(theme.palette.primary.dark, 0.8)}`
                                }}
                            >
                                <img
                                    src={PHONE_IMAGE}
                                    alt="Social Media Preview"
                                    style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9}}
                                />

                            </Box>

                            {/* Floating Social Icons */}
                            <FloatingIcon icon={Heart} delay={0.5} x={-30} y={100} color="#ff5757"/>
                            <FloatingIcon icon={MessageCircle} delay={0.8} x={280} y={150} color="#3b82f6"/>
                            <FloatingIcon icon={Share2} delay={1.1} x={-20} y={450} color={theme.palette.primary.main}/>


                        </motion.div>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};