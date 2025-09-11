import { Box, Typography, Container } from '@mui/material';
import { keyframes } from '@emotion/react';
import { SectionHeader } from 'src/theme/components/SectionHeader';
import { motion } from 'framer-motion';
import agencyLogo from 'src/assets/images/company_logos/agency.png';
import belleLogo from 'src/assets/images/company_logos/belle.png';
import century21Logo from 'src/assets/images/company_logos/century21.png';
import coldwellLogo from 'src/assets/images/company_logos/coldwell.png';
import duetLogo from 'src/assets/images/company_logos/duet.png';
import ljhookerLogo from 'src/assets/images/company_logos/ljhooker.png';
import rayWhiteLogo from 'src/assets/images/company_logos/raywhite.png';
import redoakLogo from 'src/assets/images/company_logos/redoak.png';
import remaxLogo from 'src/assets/images/company_logos/remax.png';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;


const logos = [
  agencyLogo,
  belleLogo,
  century21Logo,
  coldwellLogo,
  duetLogo,
  ljhookerLogo,
  rayWhiteLogo,
  redoakLogo,
  remaxLogo,
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const TrustSection: React.FC = () => {
  return (
    <Box sx={{
      py: { xs: 4, md: 6 },
      overflow: 'hidden',
    }}>
      <Container maxWidth="lg">
        <SectionHeader
            title="Join the ranks of successful real estate professionals."
            // subtitle="Join the ranks of successful real estate professionals."
            color="text.primary"
        />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
          <Box sx={{
            whiteSpace: 'nowrap',
            display: 'inline-block',
            animation: `${scroll} 30s linear infinite`,
            '&:hover': {
              animationPlayState: 'paused',
            },
            mt: 4, // Margin top for spacing from header
          }}>
            {logos.concat(logos).map((logo, index) => (
              <motion.div key={index} variants={itemVariants} style={{ display: 'inline-block' }}>
                <Box
                  component="img"
                  src={logo}
                  alt={`Company Logo ${index}`}
                  sx={{
                    height: 30,
                    mx: 3,
                    verticalAlign: 'middle',
                    filter: 'grayscale(100%) opacity(0.7)',
                    transition: 'filter 0.3s ease-in-out',
                    '&:hover': {
                      filter: 'grayscale(0%) opacity(1)',
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
