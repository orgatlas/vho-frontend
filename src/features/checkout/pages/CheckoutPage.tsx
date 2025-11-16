import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import {
    getPackages,
    processPayment,
    getProperty,
    getPayment,
    getPropertyVideo
} from 'src/services/api';
import {
    marketingPurchaseComplete,
    marketingViewCheckout
} from 'src/marketing/marketing_api';
import {Package, Payment} from "src/types";
import {CheckCircle} from "@mui/icons-material";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {SectionHeader} from "src/features/property/components/SectionHeader";
import {CreditCard} from "@mui/icons-material";
import {CurrencySelector} from "src/components/CurrencySelector";
import {PriceDisplay} from "src/components/PriceDisplay";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const StripeInput = React.forwardRef<any, { component: React.ElementType; [key: string]: unknown }>((
        props, ref) => {
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


const CheckoutForm: React.FC<{
    plan: Package,
    propertyId: string,
    currency: string,
    onPackageChange?: () => void  // Add callback for when package changes
}> = ({
          plan,
          propertyId,
          currency,
          onPackageChange
      }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [paymentId, setPaymentId] = useState<number | null>(null);
    const [invoiceId, setInvoiceId] = useState<number | null>(null);
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
    const [currentPlanId, setCurrentPlanId] = useState(plan.id);

    // Reset checkout state when package changes
    useEffect(() => {
        if (plan.id !== currentPlanId) {
            setClientSecret(null);
            setConfirmationStep(false);
            setPaymentError(null);
            setPaymentSuccess(false);
            setCostBreakdown(null);
            setCurrentPlanId(plan.id);
            if (onPackageChange) {
                onPackageChange();
            }
        }
    }, [plan.id, currentPlanId, onPackageChange]);

    // Marketing
    useEffect(() => {
        if (process.env.REACT_APP_MARKETING === 'on') {
            marketingViewCheckout()
        }
    }, []);

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
                propertyId,
                plan.id,
                firstName,
                lastName,
                email,
                referralCode
            );

            setPaymentId(response.payment.id)
            setInvoiceId(response.invoice.id)

            if (response.client_secret) {
                setClientSecret(response.client_secret);
                setCostBreakdown(response.cost_breakdown);
                setConfirmationStep(true);
            } else {
                await handleCheckPaymentSuccess(response.payment.id, response.invoice.id);
            }
        } catch (error: any) {
            setPaymentError(error.message || 'An unexpected error occurred.');
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
                    await handleCheckPaymentSuccess(paymentId, invoiceId);
                }
            }
        } catch (error: any) {
            setPaymentError(error.message || 'An unexpected error occurred.');
            setLoading(false);
        }
    };

    const handleCheckPaymentSuccess = async (paymentId?: number | null, invoiceId?: number | null) => {
        let intervalId: NodeJS.Timeout; // declare before pollStatus

        const pollStatus = async () => {
            try {
                if (paymentId) {
                    const payment = await getPayment(paymentId);
                    const status = payment.status;

                    if (status === 'Paid') {
                        clearInterval(intervalId);
                        setPaymentSuccess(true);

                        if (process.env.REACT_APP_MARKETING === 'on' && invoiceId) {
                            await marketingPurchaseComplete(invoiceId);
                        }

                        let nextPath = `/`;
                        if (plan.includes_staging) {
                            nextPath = `/staging/${propertyId}`;
                        } else if (plan.includes_video) {
                            const video = await getPropertyVideo(propertyId)
                            nextPath = `/video/settings/${video.id}`;
                        }
                        navigate(nextPath);

                    } else if (status === 'Failed') {
                        clearInterval(intervalId);
                        setPaymentError('Payment failed. Please try again.');
                        setConfirmationStep(false);
                        setPaymentSuccess(false);
                    }
                }
            } catch (err) {
                console.error('Polling error:', err);
            }
        };

        intervalId = setInterval(pollStatus, 1000);
    };


    if (paymentSuccess) {
        return (
            <Box sx={{textAlign: 'center', py: 4}}>
                <CircularProgress color="primary" sx={{mb: 2}}/>
                <Typography variant="h6" color="primary">Processing Payment...</Typography>
                <Typography>Please do not close this window.</Typography>
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
                {(costBreakdown && costBreakdown.discount === 0) && (
                    <Box>
                        <Typography variant="h6" component="div">Total: <PriceDisplay cost={costBreakdown.total_cost}
                                                                                      currency={currency}/></Typography>
                    </Box>
                )}
                {(costBreakdown && costBreakdown.discount > 0) && (
                    <Box>
                        <Typography component="div">Discount: <PriceDisplay cost={costBreakdown.discount}
                                                                            currency={currency}/></Typography>
                        <Typography variant="h6" component="div">Total: <PriceDisplay cost={costBreakdown.total_cost}
                                                                                      currency={currency}/></Typography>
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

            <Box sx={{display: 'flex', gap: 2, mb: 2, flexDirection: {xs: 'column', sm: 'row'}}}>
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

const localeCurrencyMap: { [key: string]: string } = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-CA': 'CAD',
    'en-AU': 'AUD',
    'ja-JP': 'JPY',
    'de-DE': 'EUR',
    'fr-FR': 'EUR',
    'es-ES': 'EUR',
    'it-IT': 'EUR',
    'nl-NL': 'EUR',
    'pt-PT': 'EUR',
};

const getDefaultCurrency = (): string => {
    const locale = navigator.language;

    // Return the mapped currency if exists
    if (locale in localeCurrencyMap) {
        return localeCurrencyMap[locale];
    }

    // For other European locales, default to EUR
    if (
        locale.startsWith('en-') ||
        locale.startsWith('de-') ||
        locale.startsWith('fr-') ||
        locale.startsWith('es-') ||
        locale.startsWith('it-') ||
        locale.startsWith('nl-') ||
        locale.startsWith('pt-')
    ) {
        return 'EUR';
    }

    // Default fallback
    return 'AUD';
};

export const CheckoutPage: React.FC = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<Package | null>(null);
    const {propertyId} = useParams<{ propertyId: string }>();
    const navigate = useNavigate();
    const [currency, setCurrency] = useState('AUD');
    const [checkoutKey, setCheckoutKey] = useState(0); // Force re-render of checkout form

    useEffect(() => {
        setCurrency(getDefaultCurrency());
    }, []);

    useEffect(() => {
        if (propertyId) {
            getProperty(propertyId).then(property => {
                getPackages(propertyId).then(setPackages);
            });
        }
    }, [propertyId, navigate]);

    const handlePackageSelection = (plan: Package) => {
        setSelectedPlan(plan);
        setCheckoutKey(prev => prev + 1); // Force re-render to reset checkout form
    };

    const handlePackageChange = () => {
        // Additional cleanup if needed when package changes
        console.log('Package changed, checkout form reset');
    };

    return (
        <Box sx={{width: '100%', p: {xs: 2, md: 5}}}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: {xs: 'flex-start', md: 'center'},
                flexDirection: {xs: 'column', md: 'row'},
                mb: 4,
                gap: 2
            }}>
                <Typography variant="h4">Select your creation kit</Typography>
                <CurrencySelector selectedCurrency={currency} onCurrencyChange={setCurrency}/>
            </Box>

            <Grid container alignItems="flex-start">
                {/* Left Panel - Plans */}
                <Grid item xs={12} md={selectedPlan ? 7 : 12} sx={{pr: {md: 5}, mb: {xs: 4, md: 0}}}>
                    <Grid container spacing={3}>
                        {packages.map((plan) => (
                            <Grid item xs={12} sm={6} md={4} key={plan.id}>
                                <Card
                                    onClick={() => handlePackageSelection(plan)}
                                    variant={'outlined'}
                                    sx={{
                                        cursor: 'pointer',
                                        background: 'white',
                                        border: selectedPlan?.id === plan.id ? '2px solid' : '1px solid',
                                        borderColor: selectedPlan?.id === plan.id ? 'primary.main' : 'grey.300',
                                        boxShadow: selectedPlan?.id === plan.id ? 3 : 0,
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {boxShadow: 3},
                                        height: '100%'
                                    }}
                                >
                                    <CardHeader
                                        title={plan.name}
                                        action={plan.name.toLowerCase() === 'premium' &&
                                            <Chip label="Most Popular" color="primary"/>}
                                    />
                                    <CardContent>
                                        <Typography variant="h4" sx={{mb: 2}} component="div">
                                            <PriceDisplay cost={plan.price} currency={currency}/>
                                        </Typography>
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
                    <Grid item xs={12} md={5} sx={{bgcolor: 'grey.50', p: {xs: 3, md: 5}, borderRadius: 2}}>
                        <Box sx={{position: {md: 'sticky'}, top: 20}}>
                            <Typography variant="h5" gutterBottom>Order Summary</Typography>
                            <Divider sx={{my: 2}}/>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    key={checkoutKey} // Force re-render when key changes
                                    plan={selectedPlan}
                                    propertyId={propertyId}
                                    currency={currency}
                                    onPackageChange={handlePackageChange}
                                />
                            </Elements>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};