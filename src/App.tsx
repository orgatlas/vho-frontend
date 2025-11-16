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
import ResetPasswordPage from 'src/features/auth/pages/ResetPasswordPage';
import UserPage from 'src/features/user/pages/UserPage';
import {AuthProvider} from './contexts/AuthContext';
import PropertyPage from 'src/features/property/pages/PropertyPage';
import {UserListingsPage} from 'src/features/property/pages/UserListingsPage';
import {PropertyManagementPage} from 'src/features/property/pages/PropertyManagementPage';
import {VideoViewPage} from 'src/features/video/pages/VideoViewPage';
import {VideoEditorPage} from 'src/features/video/pages/VideoEditorPage';
import {StagingPage} from 'src/features/staging/pages/StagingPage';
import {StagingProgressPage} from 'src/features/staging/pages/StagingProgressPage';
import { GalleryPage } from 'src/features/staging/pages/GalleryPage';
import {SupportPage} from 'src/features/support/pages/SupportPage';
import {TermsOfServicePage} from 'src/features/legal/pages/TermsOfServicePage';
import {AcceptableUsePolicyPage} from 'src/features/legal/pages/AcceptableUsePage';
import {PrivacyPolicyPage} from 'src/features/legal/pages/PrivacyPolicyPage';
import {HowToUpload} from 'src/features/howto/pages/Upload';
import PixelRouteChange from "src/marketing/pixel_route_change";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <AuthProvider>
                    <PixelRouteChange/>
                    <Routes>
                        {/* Landing page with full-width layout */}
                        <Route path="/" element={<Layout><LandingPage/></Layout>}/>

                        {/* All other pages with contained layout */}
                        <Route path="/property-details/:propertyId" element={<Layout><PropertyDetailsPage/></Layout>}/>
                        <Route path="/checkout/:propertyId" element={<Layout><CheckoutPage/></Layout>}/>
                        <Route path="/video/settings/:videoId" element={<Layout><PremiumFeaturesPage/></Layout>}/>
                        <Route path="/generating-video/:videoId" element={<Layout><GeneratingVideoPage/></Layout>}/>
                        <Route path="/video-generated" element={<Layout><VideoGeneratedPage/></Layout>}/>
                        <Route path="/staging/:propertyId" element={<Layout><StagingPage/></Layout>}/>
                        <Route path="/staging-progress/:stagingPackageId" element={<Layout><StagingProgressPage/></Layout>}/>
                        <Route path="/staging/gallery/:stagingPackageId" element={<Layout><GalleryPage/></Layout>}/>
                        <Route path="/register" element={<Layout><RegisterPage/></Layout>}/>
                        <Route path="/login" element={<Layout><LoginPage/></Layout>}/>
                        <Route path="/forgot-password" element={<Layout><ForgotPasswordPage/></Layout>}/>
                        <Route path="/password/reset" element={<Layout><ResetPasswordPage/></Layout>}/>
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
                        <Route path="/howto/share-video" element={<Layout><HowToUpload/></Layout>}/>
                        <Route path="/acceptable-use" element={<Layout><AcceptableUsePolicyPage/></Layout>}/>
                        <Route path="/privacy" element={<Layout><PrivacyPolicyPage/></Layout>}/>
                    </Routes>
                </AuthProvider>
            </Router>
            <ToastContainer/>
        </ThemeProvider>
    );
}

export default App;
