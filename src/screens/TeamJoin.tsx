import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';

import { Navbar } from '../components/ui';
import { submitTeamJoinApplication } from '../services/teamJoin';
import { gridSizes } from '../theme/themeUtils';

const positions = [
  'Developer',
  'Designer',
  'Product Manager',
  'Marketing Specialist',
  'Customer Support',
  'Other',
];

const TeamJoin: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    githubLink: '',
    linkedinLink: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await submitTeamJoinApplication(formData, file);

      setSubmitStatus({
        success: true,
        message: response.message || 'Application submitted successfully!',
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        githubLink: '',
        linkedinLink: '',
        message: '',
      });
      setFile(null);
      setFileName('');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'There was an error submitting your application. Please try again.';
      setSubmitStatus({
        success: false,
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid2 container spacing={6}>
          <Grid2 size={gridSizes.halfWidth}>
            <Typography variant="h3" gutterBottom>
              Join Our Team
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              We're always looking for talented individuals to join our team.
              Fill out the form and upload your CV to apply.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Why Work With Us
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                • Collaborative and innovative work environment
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                • Competitive salary and benefits
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                • Opportunities for professional growth
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                • Work with cutting-edge technologies
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Current Openings
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                • Frontend Developers (React, TypeScript)
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                • UI/UX Designers
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                • Project Managers
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                • Marketing Specialists
              </Typography>
            </Box>
          </Grid2>

          <Grid2 size={gridSizes.halfWidth}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Application Form
              </Typography>

              {submitStatus.message && (
                <Box
                  sx={{
                    p: 2,
                    mb: 3,
                    backgroundColor: submitStatus.success
                      ? 'rgba(116, 198, 157, 0.1)'
                      : 'rgba(255, 99, 71, 0.1)',
                    borderRadius: 1,
                    border: `1px solid ${submitStatus.success ? 'rgba(116, 198, 157, 0.5)' : 'rgba(255, 99, 71, 0.5)'}`,
                  }}
                >
                  <Typography
                    variant="body2"
                    color={submitStatus.success ? 'primary' : 'error'}
                  >
                    {submitStatus.message}
                  </Typography>
                </Box>
              )}

              <form onSubmit={handleSubmit}>
                <Grid2 container spacing={3}>
                  <Grid2 size={gridSizes.halfWidth}>
                    <TextField
                      fullWidth
                      label="Full Name"
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
                  <Grid2 size={gridSizes.halfWidth}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid2>

                  <Grid2 size={gridSizes.halfWidth}>
                    <FormControl fullWidth required>
                      <InputLabel id="position-label">Position</InputLabel>
                      <Select
                        labelId="position-label"
                        name="position"
                        value={formData.position}
                        label="Position"
                        onChange={handleSelectChange}
                      >
                        {positions.map((pos) => (
                          <MenuItem key={pos} value={pos}>
                            {pos}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>

                  <Grid2 size={gridSizes.halfWidth}>
                    <TextField
                      fullWidth
                      label="GitHub Profile"
                      name="githubLink"
                      value={formData.githubLink}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                    />
                  </Grid2>

                  <Grid2 size={gridSizes.halfWidth}>
                    <TextField
                      fullWidth
                      label="LinkedIn Profile"
                      name="linkedinLink"
                      value={formData.linkedinLink}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </Grid2>

                  <Grid2 size={gridSizes.fullWidth}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={triggerFileInput}
                        sx={{ mb: 1 }}
                      >
                        {file ? 'Change CV File' : 'Upload CV'}
                      </Button>
                      {fileName && (
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          Selected file: {fileName}
                        </Typography>
                      )}
                      <FormHelperText>
                        Accept PDF, DOC, or DOCX files (max 5MB)
                      </FormHelperText>
                    </Box>
                  </Grid2>

                  <Grid2 size={gridSizes.fullWidth}>
                    <TextField
                      fullWidth
                      label="Why do you want to join our team?"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>

                  <Grid2 size={gridSizes.fullWidth}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
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

export default TeamJoin;
