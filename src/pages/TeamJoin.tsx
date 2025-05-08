import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';

import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import { submitTeamJoinApplication } from '../services/teamJoin';

const TeamJoin: React.FC = () => {
  const { getRequiredContent } = useLocalizedContent('screens', 'teamJoin');
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
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // Get translations using the new hook pattern
  const translations = {
    title: getRequiredContent<string>('title'),
    description: getRequiredContent<string>('description'),
    whyWorkWithUs: {
      title: getRequiredContent<string>('whyWorkWithUs.title'),
      reasons: getRequiredContent<string[]>('whyWorkWithUs.reasons'),
    },
    currentOpenings: {
      title: getRequiredContent<string>('currentOpenings.title'),
      positions: getRequiredContent<string[]>('currentOpenings.positions'),
    },
    form: {
      title: getRequiredContent<string>('form.title'),
      fullName: getRequiredContent<string>('form.fullName'),
      email: getRequiredContent<string>('form.email'),
      phone: getRequiredContent<string>('form.phone'),
      position: getRequiredContent<string>('form.position'),
      github: getRequiredContent<string>('form.github'),
      linkedin: getRequiredContent<string>('form.linkedin'),
      uploadCV: getRequiredContent<string>('form.uploadCV'),
      changeCV: getRequiredContent<string>('form.changeCV'),
      selectedFile: getRequiredContent<string>('form.selectedFile'),
      fileHelper: getRequiredContent<string>('form.fileHelper'),
      message: getRequiredContent<string>('form.message'),
      submit: getRequiredContent<string>('form.submit'),
      submitting: getRequiredContent<string>('form.submitting'),
      successMessage: getRequiredContent<string>('form.successMessage'),
      errorMessage: getRequiredContent<string>('form.errorMessage'),
    },
    positions: getRequiredContent<string[]>('positions'),
  };

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
    setSubmitLoading(true);

    try {
      const response = await submitTeamJoinApplication(formData, file);

      setSubmitStatus({
        success: true,
        message: response.message || translations.form.successMessage,
      });

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
        error instanceof Error ? error.message : translations.form.errorMessage;
      setSubmitStatus({
        success: false,
        message: errorMessage,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <BaseLayout>
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" gutterBottom>
              {translations.title}
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              {translations.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                {translations.whyWorkWithUs.title}
              </Typography>
              {translations.whyWorkWithUs.reasons.map(
                (reason: string, index: number) => (
                  <Typography
                    key={index}
                    variant="body2"
                    component="p"
                    sx={{ mb: 2 }}
                  >
                    • {reason}
                  </Typography>
                )
              )}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                {translations.currentOpenings.title}
              </Typography>
              {translations.currentOpenings.positions.map(
                (position: string, index: number) => (
                  <Typography
                    key={index}
                    variant="body2"
                    component="p"
                    sx={{ mb: 2 }}
                  >
                    • {position}
                  </Typography>
                )
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                {translations.form.title}
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
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label={translations.form.fullName}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label={translations.form.email}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label={translations.form.phone}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel id="position-label">
                        {translations.form.position}
                      </InputLabel>
                      <Select
                        labelId="position-label"
                        name="position"
                        value={formData.position}
                        label={translations.form.position}
                        onChange={handleSelectChange}
                      >
                        {translations.positions.map((pos) => (
                          <MenuItem key={pos} value={pos}>
                            {pos}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label={translations.form.github}
                      name="githubLink"
                      value={formData.githubLink}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label={translations.form.linkedin}
                      name="linkedinLink"
                      value={formData.linkedinLink}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
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
                        {file
                          ? translations.form.changeCV
                          : translations.form.uploadCV}
                      </Button>
                      {fileName && (
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {translations.form.selectedFile}: {fileName}
                        </Typography>
                      )}
                      <FormHelperText>
                        {translations.form.fileHelper}
                      </FormHelperText>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label={translations.form.message}
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={submitLoading}
                    >
                      {submitLoading
                        ? translations.form.submitting
                        : translations.form.submit}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </BaseLayout>
  );
};

export default TeamJoin;
