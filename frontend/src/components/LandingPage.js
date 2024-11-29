import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

const LandingPage = () => { 
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <video autoPlay muted loop style={{ position: 'absolute', width: '100%', height: '63%', objectFit: 'cover' }}>
        <source src="https://videos.pexels.com/video-files/4782135/4782135-sd_640_360_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ background: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
      <Container maxWidth="md" style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '20vh', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <Typography variant="h2" gutterBottom sx={{ color:"#EE964B", fontFamily:"cursive" }}>Welcome to Snapwanderer</Typography>
        <Typography variant="body1" paragraph sx={{ color:"#A7ABDD", fontSize:"20px", fontFamily:"cursive" }}>
          Your ultimate destination for travel inspiration, tips, and stories.
        </Typography>
        
        {/* Explore Blog Button - Dynamic Based on Login Status */}
        <Button
          component={RouterLink}
          to={isLoggedIn ? "/blogs" : "/auth"} // Redirect to /blogs if logged in, else /auth
          variant="contained"
          sx={{ margin: 1, borderRadius: 10, bgcolor: "#62B6CB", width: "200px", height: "50px", textDecoration: 'none' }}
        >
          Explore Blog
        </Button>
      </Container>

      {/* About Us Section */}
      <Container maxWidth="vw" style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', color: '#fff', height: '480px', marginTop: '100px', backgroundImage: 'url(https://i.pinimg.com/474x/86/08/e5/8608e5b56fad88ada928cf940c883d62.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ fontSize: '2.5rem', color:"#001524", fontFamily:'revert-layer' }}>About Us</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} style={{ textAlign: 'left' }}>
            <Typography variant="body2" style={{ fontSize: '1.2rem',  fontFamily:'cursive', color:"#30638E", marginBottom: '20px' }}>
              <strong>1. </strong>Snapwanderer is a platform dedicated to bringing you the best travel experiences and insights. Our mission is to inspire and empower travelers from all walks of life to explore the world and create unforgettable memories.
            </Typography>
            <Typography variant="body2" style={{ fontSize: '1.2rem', fontFamily:'cursive', color:"#30638E", marginBottom: '20px' }}>
              <strong>2. </strong>At Snapwanderer, we believe that travel is more than just visiting new places; it's about immersing yourself in different cultures, connecting with people, and embracing new perspectives. Whether you're a seasoned globetrotter or planning your first adventure, we're here to provide you with valuable resources, practical tips, and inspiring stories to make your journey extraordinary.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'left' }}>
            <Typography variant="body2" style={{ fontSize: '1.2rem', fontFamily:'cursive', color:"#30638E", marginBottom: '20px' }}>
              <strong>3. </strong>Behind Snapwanderer is a diverse team of passionate travelers, writers, photographers, and adventurers who share a common love for exploration and discovery. We're dedicated to curating engaging content, fostering a vibrant community, and promoting responsible and sustainable travel practices.
            </Typography>
            <Typography variant="body2" style={{ fontSize: '1.2rem', fontFamily:'cursive', color:"#30638E" }}>
              <strong>4. </strong>Join us in our quest to unlock the wonders of the world and embark on a journey of discovery and inspiration. Whether you're seeking off-the-beaten-path adventures or planning a luxurious getaway, Snapwanderer is your trusted companion for all your travel aspirations.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <footer style={{ background: '#333', color: '#fff', padding: '20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Container maxWidth="md">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom style={{ color:"#EE964B", fontFamily:"cursive" }}>Contact Us</Typography>
              <Typography variant="body2" paragraph style={{ color:"#A7ABDD" }}>
                Email: <a href="mailto:info@snapwanderer.com" style={{ color: '#62B6CB', textDecoration: 'none' }}>info@snapwanderer.com</a>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
