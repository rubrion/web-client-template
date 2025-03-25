import {
  Box,
  Button,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar } from '../components/ui';
import { gridSizes } from '../theme/themeUtils';

// Subject options for dropdown
const SUBJECT_OPTIONS = {
  PARTNER: 'Become a Partner',
  SERVICES: 'Contract Services',
  OTHER: 'Other'
};

const Contact: React.FC = () => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    customSubject: '',
    message: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Handle pre-selection based on navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const preselectedSubject = params.get('subject');

    if (preselectedSubject === 'partner') {
      setFormData(prev => ({ ...prev, subject: SUBJECT_OPTIONS.PARTNER, customSubject: '' }));
    } else if (preselectedSubject === 'services') {
      setFormData(prev => ({ ...prev, subject: SUBJECT_OPTIONS.SERVICES, customSubject: '' }));
    }
  }, [location]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      subject: value,
      // Reset customSubject when a predefined option is selected
      customSubject: value === SUBJECT_OPTIONS.OTHER ? prev.customSubject : ''
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size exceeds 5MB limit');
        setSelectedFile(null);
        e.target.value = '';
      } else {
        setSelectedFile(file);
        setFileError(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine final subject value
    const finalSubject = formData.subject === SUBJECT_OPTIONS.OTHER
      ? formData.customSubject
      : formData.subject;

    // In a real application, you would send the form data and file to a server
    console.log('Form submitted:', {
      ...formData,
      finalSubject,
      attachment: selectedFile
    });

    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', customSubject: '', message: '' });
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid2 container spacing={6}>
          <Grid2 size={gridSizes.halfWidth}>
            <Typography variant="h3" gutterBottom>
              Get In Touch
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              We'd love to hear from you! Fill out the form and our team will
              get back to you as soon as possible.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                Email: info@start.com
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                Phone: +1 (555) 123-4567
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                Address: 123 Business Street, Suite 100, City, State, ZIP
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Business Hours
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                Monday - Friday: 9:00 AM - 5:00 PM
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                Saturday - Sunday: Closed
              </Typography>
            </Box>
          </Grid2>

          <Grid2 size={gridSizes.halfWidth}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Send us a message
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid2 container spacing={3}>
                  <Grid2 size={gridSizes.halfWidth}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>
                  <Grid2 size={gridSizes.halfWidth}>
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
                  <Grid2 size={gridSizes.fullWidth}>
                    <FormControl fullWidth required>
                      <InputLabel id="subject-label">Subject</InputLabel>
                      <Select
                        labelId="subject-label"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        label="Subject"
                        onChange={handleSubjectChange}
                      >
                        <MenuItem value={SUBJECT_OPTIONS.PARTNER}>Become a Partner</MenuItem>
                        <MenuItem value={SUBJECT_OPTIONS.SERVICES}>Contract Services</MenuItem>
                        <MenuItem value={SUBJECT_OPTIONS.OTHER}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>

                  {formData.subject === SUBJECT_OPTIONS.OTHER && (
                    <Grid2 size={gridSizes.fullWidth}>
                      <TextField
                        fullWidth
                        label="Custom Subject"
                        name="customSubject"
                        value={formData.customSubject}
                        onChange={handleChange}
                        required={formData.subject === SUBJECT_OPTIONS.OTHER}
                      />
                    </Grid2>
                  )}

                  <Grid2 size={gridSizes.fullWidth}>
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

                  <Grid2 size={gridSizes.fullWidth}>
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                      >
                        {selectedFile ? selectedFile.name : "Attach File (5MB max)"}
                        <input
                          ref={fileInputRef}
                          type="file"
                          hidden
                          onChange={handleFileChange}
                        />
                      </Button>
                      {fileError && (
                        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                          {fileError}
                        </Typography>
                      )}
                      {selectedFile && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                          File size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                      )}
                    </Box>
                  </Grid2>

                  <Grid2 size={gridSizes.fullWidth}>
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
