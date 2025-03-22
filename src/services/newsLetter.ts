import axiosInstance from './axiosInstance';

export const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await axiosInstance.post('/newsletter/subscribe', { email });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};