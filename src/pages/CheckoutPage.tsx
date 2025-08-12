import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import {getPackages, processPayment, getVideoDetails} from 'src/services/api';
import {Package} from "src/types";
import {CheckCircle} from "@mui/icons-material";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import {SectionHeader} from "src/components/SectionHeader";
import {CreditCard} from "@mui/icons-material";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const StripeInput = React.forwardRef<any, { component: React.ElementType; [key: string]: unknown }>(
    function StripeInput(props, ref) {
        const {component: Component, ...other} = props;
        const elementRef = React.useRef<any>();

        React.useImperativeHandle(ref, () => ({
            focus: () => elementRef.current.focus(),
        }));

        return (
            <Component
                onReady={(element: any) => {
                    elementRef.current = element;
                }}
                {...other}
            />
        );
    },
);


const CheckoutForm: React.FC<{ plan: Package, videoId: string, images: File[], agents: Agent[] }> = ({
                                                                                                         plan,
                                                                                                         videoId,
                                                                                                         images,
                                                                                                         agents
                                                                                                     }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [showReferralCode, setShowReferralCode] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [confirmationStep, setConfirmationStep] = useState(false);
    const [costBreakdown, setCostBreakdown] = useState<any>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            return;
        }

        setLoading(true);
        setPaymentError(null);

        try {
            const response = await processPayment(
                videoId,
                plan.id,
                firstName,
                lastName,
                email,
                referralCode
            );

            if (response.client_secret) {
                setClientSecret(response.client_secret);
                setCostBreakdown(response.cost_breakdown);
                setConfirmationStep(true);
            } else {
                setPaymentSuccess(true);
                const nextPath = plan.name.toLowerCase() === 'premium' ? '/premium-features' : '/generating-video';
                navigate(nextPath, {state: {videoId, images, agents}});
            }
        } catch (error: any) {
            setPaymentError(error.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmPayment = async () => {
        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setLoading(true);
        setPaymentError(null);

        try {
            const cardElement = elements.getElement(CardElement);
            if (cardElement) {
                const {error} = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: `${firstName} ${lastName}`,
                            email: email,
                        },
                    },
                });

                if (error) {
                    setPaymentError(error.message || 'An unexpected error occurred.');
                } else {
                    setPaymentSuccess(true);
                    const nextPath = plan.name.toLowerCase() === 'premium' ? '/premium-features' : '/generating-video';
                    navigate(nextPath, {state: {videoId, images, agents}});
                }
            }
        } catch (error: any) {
            setPaymentError(error.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (paymentSuccess) {
        return (
            <Box>
                <Typography variant="h6" color="primary">Payment Successful!</Typography>
                <Typography>Your video is being generated. You will receive an email shortly.</Typography>
            </Box>
        );
    }

    if (confirmationStep) {
        return (
            <Box>
                <SectionHeader icon={<CreditCard color="primary"/>} title="Confirm Payment"/>
                <Divider sx={{my: 2}}/>
                <Typography variant="h6">Order Summary</Typography>
                <Typography>Full Name: {firstName} {lastName}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Package: {plan.name}</Typography>
                {(costBreakdown && costBreakdown.discount === 0) &&(
                    <Box>
                        <Typography variant="h6">Total: ${costBreakdown.total_cost}</Typography>
                    </Box>
                )}
                {(costBreakdown && costBreakdown.discount > 0) &&(
                    <Box>
                        <Typography>Discount: ${costBreakdown.discount}</Typography>
                        <Typography variant="h6">Total: ${costBreakdown.total_cost}</Typography>
                    </Box>
                )}
                <Divider sx={{my: 2}}/>
                <TextField
                    fullWidth
                    sx={{mb: 2}}
                    InputProps={{
                        inputComponent: StripeInput,
                        inputProps: {
                            component: CardElement,
                            options: {
                                hidePostalCode: true,
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }
                        },
                    }}
                />
                {paymentError && (
                    <Typography color="error" sx={{mb: 2}}>{paymentError}</Typography>
                )}
                <Button onClick={handleConfirmPayment} variant="contained" color="primary" disabled={loading} fullWidth
                        size="large">
                    {loading ? <CircularProgress size={24} color="inherit"/> : 'Confirm Payment'}
                </Button>
            </Box>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <SectionHeader icon={<CreditCard color="primary"/>} title="Payment Information"
                           tooltip="Enter your payment details below."/>
            <Divider sx={{my: 2}}/>

            <Box sx={{display: 'flex', gap: 2, mb: 2}}>
                <TextField
                    fullWidth
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </Box>

            <TextField
                fullWidth
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                sx={{mb: 2}}
                required
            />

            {showReferralCode ? (
                <TextField
                    fullWidth
                    placeholder="Referral Code (Optional)"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    sx={{mb: 2}}
                />
            ) : (
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{cursor: 'pointer', mb: 2, textAlign: 'right'}}
                    onClick={() => setShowReferralCode(true)}
                >
                    Have a referral code?
                </Typography>
            )}

            {clientSecret && (
                <TextField
                    fullWidth
                    sx={{mb: 2}}
                    InputProps={{
                        inputComponent: StripeInput,
                        inputProps: {
                            component: CardElement,
                            options: {
                                hidePostalCode: true,
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }
                        },
                    }}
                />
            )}

            {paymentError && (
                <Typography color="error" sx={{mb: 2}}>{paymentError}</Typography>
            )}

            <Button type="submit" variant="contained" color="primary" disabled={loading || !!emailError} fullWidth
                    size="large">
                {loading ? <CircularProgress size={24} color="inherit"/> : `Continue with ${plan.name} Package`}
            </Button>
        </form>
    );
};

export const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<Package | null>(null);
    const {videoId, images, agents} = location.state as { videoId: string, images: File[], agents: Agent[] };
    const navigate = useNavigate()

    useEffect(() => {
        if (videoId) {
            getVideoDetails(videoId).then(video => {
                if (video.locked) {
                    navigate('/video-generated');
                } else if (video.package) {
                    if (video.package.is_premium) {
                        navigate('/premium-features', {state: {videoId, images}});
                    } else {
                        navigate('/');
                    }
                } else {
                    getPackages(videoId).then(setPackages);
                }
            });
        }
    }, [videoId, navigate, images]);

    return (
        <Box sx={{width: '100vw', p: 5}}>
            <Typography variant="h4" gutterBottom>Select your creation kit</Typography>

            <Grid container alignItems="top">
                {/* Left Panel - Plans */}
                <Grid item xs={12} md={selectedPlan ? 7 : 12} sx={{pr: 5}}>
                    <Grid container spacing={3}>
                        {packages.map((plan) => (
                            <Grid item xs={12} sm={4} key={plan.id}>
                                <Card
                                    onClick={() => setSelectedPlan(plan)}
                                    variant={'outlined'}
                                    sx={{
                                        cursor: 'pointer',
                                        background: 'white',
                                        border: selectedPlan?.id === plan.id ? '2px solid' : '1px solid',
                                        borderColor: selectedPlan?.id === plan.id ? 'primary.main' : 'grey.300',
                                        boxShadow: selectedPlan?.id === plan.id ? 3 : 0,
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {boxShadow: 3},
                                    }}
                                >
                                    <CardHeader
                                        title={plan.name}
                                        action={plan.name.toLowerCase() === 'premium' &&
                                            <Chip label="Most Popular" color="primary"/>}
                                    />
                                    <CardContent>
                                        <Typography variant="h4" sx={{mb: 2}}>${plan.price}</Typography>
                                        <List dense>
                                            {plan.features.map((feature) => (
                                                <ListItem key={feature} disableGutters>
                                                    <ListItemIcon sx={{minWidth: 24}}>
                                                        <CheckCircle fontSize="small" color="primary"/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={feature}/>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Right Panel - Summary */}
                {selectedPlan && (
                    <Grid item xs={12} md={5} sx={{bgcolor: 'grey.50', p: 5}}>
                        <Box sx={{position: 'sticky', top: 20}}>
                            <Typography variant="h5" gutterBottom>Order Summary</Typography>
                            <Divider sx={{my: 2}}/>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm plan={selectedPlan} videoId={videoId} images={images} agents={agents}/>
                            </Elements>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};