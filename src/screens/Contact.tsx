import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { HeroSection } from '../components/ui';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <Box>
      <HeroSection
        title="Contact Us"
        subtitle="Get in touch with our team to discuss your project requirements or any questions you may have."
        overline="CONTACT"
      />
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid2 container spacing={6}>
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Typography variant="h4" gutterBottom>
              Get In Touch
            </Typography>
            <Typography variant="body1" paragraph>
              We'd love to hear from you! Fill out the form and our team will
              get back to you as soon as possible.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2" paragraph>
                Email: info@start.com
              </Typography>
              <Typography variant="body2" paragraph>
                Phone: +1 (555) 123-4567
              </Typography>
              <Typography variant="body2" paragraph>
                Address: 123 Business Street, Suite 100, City, State, ZIP
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Business Hours
              </Typography>
              <Typography variant="body2" paragraph>
                Monday - Friday: 9:00 AM - 5:00 PM
              </Typography>
              <Typography variant="body2" paragraph>
                Saturday - Sunday: Closed
              </Typography>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 7 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Send us a message
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid2 container spacing={3}>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Grid2>
                </Grid2>
              </form>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Contact;
