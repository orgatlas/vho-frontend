import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const AcceptableUsePolicyPage: React.FC = () => {
    return (
        <Box>
            <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
                <Typography variant="h2" component="h1" textAlign="center" fontWeight="bold" gutterBottom>
                    Acceptable Use Policy
                </Typography>

                <Typography variant="body1" paragraph>
                    This Acceptable Use Policy ("AUP") outlines the rules for using Virtual Home Open's services. By accessing or using our services, you agree to comply with this policy. Any violation may result in suspension or termination of your access.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    1. Lawful Use
                </Typography>
                <Typography variant="body1" paragraph>
                    You may use our services only for lawful purposes and in accordance with all applicable laws and regulations. You must not engage in activities that are illegal, fraudulent, or infringe on the rights of others.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    2. Prohibited Activities
                </Typography>
                <Typography variant="body1" paragraph>
                    You agree not to:
                </Typography>
                <Typography variant="body1" paragraph>
                    • Use the service to transmit any harmful, offensive, or illegal content. <br />
                    • Interfere with or disrupt the integrity or performance of our services. <br />
                    • Attempt to gain unauthorized access to our systems or other users’ accounts. <br />
                    • Use the service to collect or store personal data of others without consent. <br />
                    • Engage in activities that could damage our reputation or the experience of other users.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    3. Enforcement
                </Typography>
                <Typography variant="body1" paragraph>
                    We reserve the right to investigate violations of this AUP and take any action we deem appropriate, including suspending or terminating accounts, reporting illegal activity to authorities, and seeking legal remedies.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    4. Reporting Violations
                </Typography>
                <Typography variant="body1" paragraph>
                    If you become aware of any violations of this AUP, please report them to support@virtualhomeopen.com.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                    5. Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    For questions regarding this Acceptable Use Policy, please contact us at support@virtualhomeopen.com.
                </Typography>
            </Container>
        </Box>
    );
};