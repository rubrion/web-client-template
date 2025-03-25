import axiosInstance from './axiosInstance';

interface TeamJoinFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  githubLink: string;
  linkedinLink: string;
  message: string;
}

export const submitTeamJoinApplication = async (
  formData: TeamJoinFormData,
  file: File | null
) => {
  try {
    // Create form data for file upload
    const formPayload = new FormData();
    if (file) {
      formPayload.append('cv', file);
    }

    // Append other form fields
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    const response = await axiosInstance.post('/team/join', formPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error submitting team join application:', error);
    throw error;
  }
};
