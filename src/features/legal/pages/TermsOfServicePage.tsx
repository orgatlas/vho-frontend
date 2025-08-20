import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const TermsOfServicePage: React.FC = () => {
    return (
        <Box>
            <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
                <Typography variant="h2" component="h1" textAlign="center" fontWeight="bold" gutterBottom>
                    Terms of Service
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to Virtual Home Open (“VHO”, “we”, “our”, “us”). These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    1. Acceptance of Terms
                </Typography>
                <Typography variant="body1" paragraph>
                    By using our services, you confirm that you have read, understood, and agree to be bound by these Terms, the Privacy Policy, and the Acceptable Use Policy. If you do not agree, do not use our services.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    2. Eligibility
                </Typography>
                <Typography variant="body1" paragraph>
                    VHO is open to individuals and real estate agents worldwide. By using the service, you confirm you are at least 18 years old and have the legal authority to enter into these terms.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    3. Account Registration & Responsibilities
                </Typography>
                <Typography variant="body1" paragraph>
                    You must provide accurate information when creating an account and are responsible for all activity under your account. Keep your login credentials confidential.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    4. User Content & Ownership
                </Typography>
                <Typography variant="body1" paragraph>
                    You retain ownership of all content uploaded or modified on VHO, including property details, images, and videos. By uploading content, you confirm you own or have permission to use it. You grant VHO a limited license to use your content for providing the service and optionally for marketing/demo purposes. Users may opt out of marketing use by emailing <b>support@virtualhomeopen.com</b>.
                </Typography>
                <Typography variant="body1" paragraph>
                    Users on the <b>Basic Plan</b> acknowledge that the VHO logo/watermark cannot be removed from videos.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    5. Outputs
                </Typography>
                <Typography variant="body1" paragraph>
                    VHO provides voiceovers, royalty-free music, and final property videos. You have full rights to use the final video for any purpose, subject to watermark restrictions above.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    6. Payments & Refunds
                </Typography>
                <Typography variant="body1" paragraph>
                    VHO operates on a pay-per-video model. A 7-day money-back guarantee applies for dissatisfaction or technical failure, unless the user violates the Terms or uploads infringing content. Payments are processed securely via third-party providers.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    7. Third-Party Services
                </Typography>
                <Typography variant="body1" paragraph>
                    VHO uses third-party providers for processing, music, hosting, and analytics. We are not responsible for acts or omissions of these providers.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    8. Limitation of Liability
                </Typography>
                <Typography variant="body1" paragraph>
                    VHO’s liability is capped at the amount you paid for the service. We disclaim liability for indirect or consequential damages, lost sales, lost profits, or third-party claims. We do not guarantee uninterrupted or error-free service.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    9. Governing Law
                </Typography>
                <Typography variant="body1" paragraph>
                    These Terms are governed by the laws of Australia. Any disputes will be resolved in the courts of Australia.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    10. Changes to Terms
                </Typography>
                <Typography variant="body1" paragraph>
                    We may modify these Terms at any time; continued use constitutes acceptance. Material changes will be notified at our discretion.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    11. Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    For questions, contact us at <b>support@virtualhomeopen.com</b>.
                </Typography>
            </Container>
        </Box>
    );
};