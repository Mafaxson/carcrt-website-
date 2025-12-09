// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper function to get full API endpoint
export const getApiUrl = (path: string) => {
  return `${API_URL}${path}`;
};

// Helper function for image URLs
export const getImageUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};
