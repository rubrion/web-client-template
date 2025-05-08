import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useLocalizedContent from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import { gridSizes } from '../theme/themeUtils';

interface ContactInfo {
  title: string;
  email: string;
  phone: string;
  address: string;
}

interface BusinessHours {
  title: string;
  weekdays: string;
  weekends: string;
}

interface FormTranslations {
  title: string;
  name: string;
  email: string;
  subject: string;
  customSubject: string;
  message: string;
  attachFile: string;
  fileSize: string;
  fileSizeError: string;
  submit: string;
  success: string;
}

interface SubjectOptions {
  partner: string;
  services: string;
  other: string;
}

const Contact: React.FC = () => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getRequiredContent } = useLocalizedContent('screens', 'contact');

  const contactData = {
    pageTitle: getRequiredContent<string>('pageTitle'),
    pageDescription: getRequiredContent<string>('pageDescription'),
    contactInfo: getRequiredContent<ContactInfo>('contactInfo'),
    businessHours: getRequiredContent<BusinessHours>('businessHours'),
    form: getRequiredContent<FormTranslations>('form'),
    subjects: getRequiredContent<SubjectOptions>('subjects'),
  };

  const SUBJECT_OPTIONS = {
    PARTNER: contactData.subjects.partner,
    SERVICES: contactData.subjects.services,
    OTHER: contactData.subjects.other,
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    customSubject: '',
    message: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const preselectedSubject = params.get('subject');

    if (preselectedSubject === 'partner') {
      setFormData((prev) => ({
        ...prev,
        subject: SUBJECT_OPTIONS.PARTNER,
        customSubject: '',
      }));
    } else if (preselectedSubject === 'services') {
      setFormData((prev) => ({
        ...prev,
        subject: SUBJECT_OPTIONS.SERVICES,
        customSubject: '',
      }));
    }
  }, [location.search, SUBJECT_OPTIONS.PARTNER, SUBJECT_OPTIONS.SERVICES]);

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
      customSubject: value === SUBJECT_OPTIONS.OTHER ? prev.customSubject : '',
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const errorMessage = contactData.form.fileSizeError;
      if (file.size > 5 * 1024 * 1024) {
        setFileError(errorMessage);
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

    const finalSubject =
      formData.subject === SUBJECT_OPTIONS.OTHER
        ? formData.customSubject
        : formData.subject;

    console.log('Form submitted:', {
      ...formData,
      finalSubject,
      attachment: selectedFile,
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      customSubject: '',
      message: '',
    });
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    alert(contactData.form.success);
  };

  return (
    <BaseLayout>
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={6}>
          <Grid size={gridSizes.halfWidth}>
            <Typography variant="h3" gutterBottom>
              {contactData.pageTitle}
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              {contactData.pageDescription}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                {contactData.contactInfo.title}
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                {contactData.contactInfo.email}
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                {contactData.contactInfo.phone}
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                {contactData.contactInfo.address}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                {contactData.businessHours.title}
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                {contactData.businessHours.weekdays}
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                {contactData.businessHours.weekends}
              </Typography>
            </Box>
          </Grid>

          <Grid size={gridSizes.halfWidth}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                {contactData.form.title}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={gridSizes.halfWidth}>
                    <TextField
                      fullWidth
                      label={contactData.form.name}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid size={gridSizes.halfWidth}>
                    <TextField
                      fullWidth
                      label={contactData.form.email}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid size={gridSizes.fullWidth}>
                    <FormControl fullWidth required>
                      <InputLabel id="subject-label">
                        {contactData.form.subject}
                      </InputLabel>
                      <Select
                        labelId="subject-label"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        label={contactData.form.subject}
                        onChange={handleSubjectChange}
                      >
                        <MenuItem value={SUBJECT_OPTIONS.PARTNER}>
                          {SUBJECT_OPTIONS.PARTNER}
                        </MenuItem>
                        <MenuItem value={SUBJECT_OPTIONS.SERVICES}>
                          {SUBJECT_OPTIONS.SERVICES}
                        </MenuItem>
                        <MenuItem value={SUBJECT_OPTIONS.OTHER}>
                          {SUBJECT_OPTIONS.OTHER}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {formData.subject === SUBJECT_OPTIONS.OTHER && (
                    <Grid size={gridSizes.fullWidth}>
                      <TextField
                        fullWidth
                        label={contactData.form.customSubject}
                        name="customSubject"
                        value={formData.customSubject}
                        onChange={handleChange}
                        required={formData.subject === SUBJECT_OPTIONS.OTHER}
                      />
                    </Grid>
                  )}

                  <Grid size={gridSizes.fullWidth}>
                    <TextField
                      fullWidth
                      label={contactData.form.message}
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid size={gridSizes.fullWidth}>
                    <Box sx={{ mb: 2 }}>
                      <Button variant="outlined" component="label" fullWidth>
                        {selectedFile
                          ? selectedFile.name
                          : contactData.form.attachFile}
                        <input
                          ref={fileInputRef}
                          type="file"
                          hidden
                          onChange={handleFileChange}
                        />
                      </Button>
                      {fileError && (
                        <Typography
                          color="error"
                          variant="caption"
                          sx={{ mt: 1 }}
                        >
                          {fileError}
                        </Typography>
                      )}
                      {selectedFile && (
                        <Typography
                          variant="caption"
                          sx={{ display: 'block', mt: 1 }}
                        >
                          {contactData.form.fileSize.replace(
                            '{{size}}',
                            (selectedFile.size / (1024 * 1024)).toFixed(2)
                          )}
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  <Grid size={gridSizes.fullWidth}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      {contactData.form.submit}
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

export default Contact;
