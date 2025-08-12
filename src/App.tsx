import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {theme} from './components/theme/theme';
import {LandingPage} from './pages/LandingPage';
import {PropertyDetailsPage} from './pages/PropertyDetailsPage';
import {CheckoutPage} from './pages/CheckoutPage';
import {PremiumFeaturesPage} from './pages/PremiumFeaturesPage';
import {GeneratingVideoPage} from './pages/GeneratingVideoPage';
import {LoadingPage} from './pages/LoadingPage';
import {VideoGeneratedPage} from './pages/VideoGeneratedPage';
import {Layout} from './layouts/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UserPage from './pages/UserPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<LandingPage/>}/>
                            <Route path="/property-details" element={<PropertyDetailsPage/>}/>
                            <Route path="/checkout" element={<CheckoutPage/>}/>
                            <Route path="/premium-features" element={<PremiumFeaturesPage/>}/>
                            <Route path="/generating-video" element={<GeneratingVideoPage/>}/>
                            <Route path="/loading" element={<LoadingPage/>}/>
                            <Route path="/video-generated" element={<VideoGeneratedPage/>}/>
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                            <Route path="/user" element={<UserPage />} />
                        </Routes>
                    </Layout>
                </AuthProvider>
            </Router>
            <ToastContainer />
        </ThemeProvider>
    );
}

export default App;