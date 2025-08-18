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
                    Welcome to Virtual Home Open. These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    1. Acceptance of Terms
                </Typography>
                <Typography variant="body1" paragraph>
                    By using our services, you confirm that you have read, understood, and agree to be bound by these Terms of Service, including any future modifications. If you do not agree with these Terms, you must not use our services.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    2. Description of Service
                </Typography>
                <Typography variant="body1" paragraph>
                    Virtual Home Open provides a platform for generating property video tours from real estate listings. Our services include, but are not limited to, video creation, editing tools, and hosting.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    3. User Conduct
                </Typography>
                <Typography variant="body1" paragraph>
                    You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the service. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our services.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    4. Intellectual Property
                </Typography>
                <Typography variant="body1" paragraph>
                    All content, trademarks, services marks, trade names, logos, and icons are proprietary to Virtual Home Open. Nothing contained on the website should be construed as granting any license or right to use any trademark displayed on this website without the written permission of Virtual Home Open or such third party that may own the trademarks displayed on this website.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    5. Disclaimer of Warranties
                </Typography>
                <Typography variant="body1" paragraph>
                    Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    6. Limitation of Liability
                </Typography>
                <Typography variant="body1" paragraph>
                    In no event shall Virtual Home Open, its affiliates, directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    7. Governing Law
                </Typography>
                <Typography variant="body1" paragraph>
                    These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    8. Changes to Terms
                </Typography>
                <Typography variant="body1" paragraph>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    9. Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions about these Terms, please contact us at support@virtualhomeopen.com.
                </Typography>
            </Container>
        </Box>
    );
};
