import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const Signature = () => {
  return (
    <Box
      sx={{
        p: 4,
        textAlign: 'center',
        borderRadius: 4,
        maxWidth: 500,
        mx: 'auto',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        color: '#fff',
      }}
    >
      {/* Animated Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '200%',
          background: 'linear-gradient(-45deg, #007bff, #ffa500, #ffffff, #007bff)',
          backgroundSize: '400% 400%',
          animation: 'gradientFloat 15s ease infinite',
          zIndex: 0,
          opacity: 0.9,
        }}
      />

      {/* Foreground Content */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color='black'>
          Redesign by Kwabena Sarkodieh
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }} color='black'>
          Can’t wait to join the team! I'm incredibly proud of what I've built.
        </Typography>

        <Box display="flex" justifyContent="center" gap={3} >
          <IconButton
            href="https://www.linkedin.com/in/kwabena-sarkodieh"
            target="_blank"
            rel="noopener"
            
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>

          <IconButton
            href="mailto:kwabsark4@gmail.com"
           
          >
            <EmailIcon fontSize="large" />
          </IconButton>

          <IconButton
            href="tel:+2330560214604"
            
          >
            <PhoneAndroidIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Add keyframes for animation */}
      <style>
        {`
          @keyframes gradientFloat {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default Signature;