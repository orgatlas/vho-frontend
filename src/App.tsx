import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {theme} from 'src/theme/theme';
import {LandingPage} from 'src/features/landing/pages/LandingPage';
import {PropertyDetailsPage} from 'src/features/property/pages/PropertyDetailsPage';
import {CheckoutPage} from 'src/features/checkout/pages/CheckoutPage';
import {PremiumFeaturesPage} from 'src/features/checkout/pages/PremiumFeaturesPage';
import {GeneratingVideoPage} from 'src/features/video/pages/GeneratingVideoPage';
import {ExtractingDetailsPage} from 'src/features/property/pages/ExtractingDetailsPage';
import {VideoGeneratedPage} from 'src/features/video/pages/VideoGeneratedPage';
import {Layout} from './layouts/Layout';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from 'src/features/auth/pages/RegisterPage';
import LoginPage from 'src/features/auth/pages/LoginPage';
import ForgotPasswordPage from 'src/features/auth/pages/ForgotPasswordPage';
import UserPage from 'src/features/user/pages/UserPage';
import {AuthProvider} from './contexts/AuthContext';
import PropertyPage from 'src/features/property/pages/PropertyPage';
import {UserListingsPage} from 'src/features/property/pages/UserListingsPage';
import {PropertyManagementPage} from 'src/features/property/pages/PropertyManagementPage';
import {VideoViewPage} from 'src/features/video/pages/VideoViewPage';
import {VideoEditorPage} from 'src/features/video/pages/VideoEditorPage';
import {SupportPage} from 'src/features/support/pages/SupportPage';
import {TermsOfServicePage} from 'src/features/legal/pages/TermsOfServicePage';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <AuthProvider>
                    <Routes>
                        {/* Landing page with full-width layout */}
                        <Route path="/" element={<Layout contained={false}><LandingPage/></Layout>}/>

                        {/* All other pages with contained layout */}
                        <Route path="/property-details" element={<Layout><PropertyDetailsPage/></Layout>}/>
                        <Route path="/checkout" element={<Layout><CheckoutPage/></Layout>}/>
                        <Route path="/premium-features" element={<Layout><PremiumFeaturesPage/></Layout>}/>
                        <Route path="/generating-video" element={<Layout><GeneratingVideoPage/></Layout>}/>
                        <Route path="/video-generated" element={<Layout><VideoGeneratedPage/></Layout>}/>
                        <Route path="/register" element={<Layout><RegisterPage/></Layout>}/>
                        <Route path="/login" element={<Layout><LoginPage/></Layout>}/>
                        <Route path="/forgot-password" element={<Layout><ForgotPasswordPage/></Layout>}/>
                        <Route path="/user" element={<Layout><UserPage/></Layout>}/>
                        <Route path="/property/:propertyId" element={<Layout><PropertyPage/></Layout>}/>
                        <Route path="/listings" element={<Layout><UserListingsPage/></Layout>}/>
                        <Route path="/listings/:propertyId/manage"
                               element={<Layout><PropertyManagementPage/></Layout>}/>
                        <Route path="/video/:videoId/view" element={<Layout><VideoViewPage/></Layout>}/>
                        <Route path="/video/:videoId/edit" element={<VideoEditorPage/>}/>
                        <Route path="/extracting-details" element={<Layout><ExtractingDetailsPage/></Layout>}/>
                        <Route path="/support" element={<Layout><SupportPage/></Layout>}/>
                        <Route path="/terms-of-service" element={<Layout><TermsOfServicePage/></Layout>}/>
                    </Routes>
                </AuthProvider>
            </Router>
            <ToastContainer/>
        </ThemeProvider>
    );
}

export default App;
