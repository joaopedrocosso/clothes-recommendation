import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const fetchFromApi = async (endpoint: string, formData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// GEMINI API CALLS
export const getClothes = (formData: any) => fetchFromApi('clothes', formData);

// Weather API Call
export const getWeather = (formData: any) => fetchFromApi('weather', formData);
