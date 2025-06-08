import React from 'react';
import { Box, Typography, Stack, useMediaQuery } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaymentIcon from '@mui/icons-material/Payment';
import { useTheme } from '@mui/material/styles';

const steps = [
  { label: 'Postcode', icon: <LocationOnIcon /> },
  { label: 'Waste Type', icon: <CheckCircleOutlineIcon /> },
  { label: 'Skip Size', icon: <ZoomOutMapIcon /> },
  { label: 'Permit Check', icon: <EventNoteIcon /> },
  { label: 'Payment', icon: <PaymentIcon /> },
];

const currentStep = 'Skip Size';

export default function Progressbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Determine which steps should be marked complete or current
  const currentStepIndex = steps.findIndex((step) => step.label === currentStep);

  return (
    <Box
      sx={{
        overflowX: isMobile ? 'auto' : 'visible',
        display: 'flex',
        gap: 2,
        px: 2,
        py: 1.5,
        bgcolor: '#0C1A2E',
        borderRadius: 2,
        whiteSpace: 'nowrap',
        justifyContent:"center",
        
      }}
    >
      {steps.map((step, index) => {
        const isActive = index <= currentStepIndex;
        return (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              flexShrink: 0,
              color: isActive ? '#5BC0FF' : '#C9D3E3',
              fontWeight: isActive ? 600 : 400,
              fontSize: 14,
            }}
          >
            <Box
              component="span"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: isActive ? '#122B45' : '#1A2C45',
                color: isActive ? '#5BC0FF' : '#8492A6',
              }}
            >
              {step.icon}
            </Box>
            <Typography variant="body2">{step.label}</Typography>
            {index < steps.length - 1 && (
              <Box sx={{ width: 24, height: 2, bgcolor: '#223347', borderRadius: 1 }} />
            )}
          </Stack>
        );
      })}
    </Box>
  );
}