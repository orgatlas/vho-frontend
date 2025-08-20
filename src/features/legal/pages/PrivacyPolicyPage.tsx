import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const PrivacyPolicyPage: React.FC = () => {
    return (
        <Box>
            <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
                <Typography variant="h2" component="h1" textAlign="center" fontWeight="bold" gutterBottom>
                    Privacy Policy
                </Typography>

                <Typography variant="body1" paragraph>
                    Effective Date: 19/8/2025
                    Virtual Home Open (“VHO”, “we”, “our”, “us”) respects your privacy. This policy explains what information we collect, how we use it, and your rights.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    1. Data We Collect
                </Typography>
                <Typography variant="body1" paragraph>
                    - Account Information: name, email.
                    - Payment Information: processed securely via third parties; we do not store card details.
                    - Property Content: listing details, images, modifications.
                    - Analytics Data: usage statistics, cookies, and tracking info.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    2. How We Use Your Data
                </Typography>
                <Typography variant="body1" paragraph>
                    - To provide and improve our services.
                    - To communicate with you regarding service updates or support.
                    - For marketing/demo purposes unless you opt out by emailing <b>support@virtualhomeopen.com</b>.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    3. Third-Party Processing
                </Typography>
                <Typography variant="body1" paragraph>
                    Third party providers and services may process your data.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    4. Data Sharing
                </Typography>
                <Typography variant="body1" paragraph>
                    We do not sell your personal data. We may disclose data as required by law or to protect legal rights.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    5. Data Retention & Deletion
                </Typography>
                <Typography variant="body1" paragraph>
                    Data is retained as long as needed to provide the service. You can request deletion of your account and data by emailing <b>support@virtualhomeopen.com</b>.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    6. Cookies & Tracking
                </Typography>
                <Typography variant="body1" paragraph>
                    We use cookies and tracking to improve analytics and platform functionality.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    7. International Compliance
                </Typography>
                <Typography variant="body1" paragraph>
                    We comply with the Australian Privacy Act and provide baseline compliance with GDPR (EU) and CCPA (California, USA) for global users.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    8. Your Rights
                </Typography>
                <Typography variant="body1" paragraph>
                    You can access, correct, delete your data, or opt-out of marketing communications by contacting <b>support@virtualhomeopen.com</b>.
                </Typography>
            </Container>
        </Box>
    );
};