import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
  Modal,
  Backdrop,
  Fade,
  CssBaseline
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectionsCarOffIcon from '@mui/icons-material/TaxiAlert';

import data from '/data.json';
import Progressbar from './Progressbar';
import Signature from './Signature';
import picture from './assets/new.png';
import picture2 from './assets/new2.png';

function App() {
  const [selectedSkipId, setSelectedSkipId] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [animationAngle, setAnimationAngle] = useState(0);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedSkipId === null) return;
    const interval = setInterval(() => {
      setAnimationAngle((prev) => (prev + 0.05) % (2 * Math.PI));
    }, 16);
    return () => clearInterval(interval);
  }, [selectedSkipId]);

  const handleSelect = (skip) => {
    setSelectedSkipId(skip.id);
    setSelectedSkip(skip);
    console.log('Selected Skip:', skip);
  };

  return (
    <Box sx={{ backgroundColor: "#0b1b3c", minHeight: "100vh", width: "100vw", overflowX: "hidden", paddingBottom: "20%" }}>
      <CssBaseline />
      <Progressbar />

      {/* Title */}
      <Box sx={{ pt: 3 }}>
        <Typography variant='h3' sx={{ textAlign: "center", fontWeight: "bold", px: '10%', color: "white" }}>
          Choose Your Skip Size
        </Typography>
        <Typography variant='subtitle1' sx={{ pt: 1, textAlign: "center", px: '10%', color: "white" }}>
          Select the skip size that best suits your needs
        </Typography>
        <br /><br />

        {/* Skip Cards */}
        <Grid container spacing={4} sx={{ px: '10%', transition: "all 0.5s ease-in-out" }}>
          {data.map((skip, index) => {
            const isSelected = skip.id === selectedSkipId;
            const isHovered = hoveredCard === index && !selectedSkipId;

            let shadowX = 0;
            let shadowY = 0;

            if (isSelected) {
              const radius = 10;
              shadowX = Math.cos(animationAngle) * radius;
              shadowY = Math.sin(animationAngle) * radius;
            } else if (isHovered) {
              shadowX = mousePos.x / 10 - mousePos.width / 20;
              shadowY = mousePos.y / 10 - mousePos.height / 20;
            }

            return (
              <Grid item size={{ xs: 12, sm: 6, md: 4 }}  key={index}>
                <Box
                  sx={{ position: 'relative' }}
                  onMouseMove={(e) => {
                    if (selectedSkipId) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    setHoveredCard(index);
                    setMousePos({ x, y, width: rect.width, height: rect.height });
                  }}
                  onMouseLeave={() => {
                    if (selectedSkipId) return;
                    setHoveredCard(null);
                    setMousePos({ x: 0, y: 0, width: 0, height: 0 });
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      transition: 'box-shadow 0.2s ease',
                      boxShadow: isSelected || isHovered
                        ? `${shadowX}px ${shadowY}px 25px rgba(90, 100, 255, 0.6)`
                        : (theme) => theme.shadows[1],
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <Box sx={{ position: 'relative', pt: 2 }}>
                      <CardMedia
                        component="img"
                        image={skip.size <= 16 ? picture : skip.size >= 20 ? picture2 : null}
                        alt={`${skip.size} Yards`}
                        sx={{ width: '80%', margin: '0 auto', height: "100%" }}
                      />

                      {!skip.allowed_on_road && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: '#f0f0f0',
                            px: 1,
                            py: 0.5,
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            fontSize: 12,
                          }}
                        >
                          <DirectionsCarOffIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 500, color: 'text.secondary' }}>
                            Off-Road
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {skip.size} Yards Skip
                      </Typography>

                      <Button
                        fullWidth
                        variant={isSelected ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => handleSelect(skip)}
                      >
                        {isSelected ? 'Selected' : 'Select This Skip'}
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Floating Pill */}
      {selectedSkip && (
        <Card>
          <Box
            sx={{
              position: 'fixed',
              bottom: { xs: 20, sm: 20, md: 60 },
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1300,
              backgroundColor: '#f5f5f5',
              borderRadius: '50px',
              px: 3,
              py: 1.5,
              boxShadow: 3,
              minWidth: '320px',
              width: { xs: '90%', sm: 'auto' },
            }}
          >
            <Grid container spacing={2} alignItems="center" sx={{ justifyContent: { xs: 'center', sm: 'center' } }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '1rem', sm: '1rem', md: '1.1rem' } }}>
                    <Box component="span" sx={{ color: '#007bff' }}>
                      {selectedSkip.size} Yards Skip
                    </Box>{' '}
                    -{' '}
                    <Box component="span" sx={{ fontWeight: 1000, fontSize: "22px" }}>
                      £{selectedSkip.price_before_vat}
                    </Box>{' '}
                    <Box component="span" sx={{ fontSize: "12px" }}>
                      / {selectedSkip.hire_period_days} day hire
                    </Box>
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                  <Button
                    variant="text"
                    endIcon={<ArrowForwardIcon />}
                    disabled={!selectedSkip}
                    onClick={() => setOpen(true)}
                    sx={{
                      color: selectedSkip ? '#007bff' : '#aaa',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Continue
                  </Button>

                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{ backdrop: { timeout: 500 } }}
                  >
                    <Fade in={open}>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          bgcolor: 'white',
                          boxShadow: 24,
                          borderRadius: 4,
                          outline: 'none',
                          maxWidth: 600,
                        }}
                      >
                        <Signature />
                      </Box>
                    </Fade>
                  </Modal>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      )}
    </Box>
  );
}

export default App;
