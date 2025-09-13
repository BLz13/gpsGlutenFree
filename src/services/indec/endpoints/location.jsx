import { INDEC_API_ADDRESS as apiAdrs } from '../api';

export const fetchLocation = async ({ latitude, longitude }) => {

  console.log('Fetching location for coords:', { latitude, longitude });

  try {

    const response = await fetch(`${apiAdrs}ubicacion?lat=${latitude}&lon=${longitude}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.ubicacion) {
      throw new Error('Invalid API response format');
    }

    return data.ubicacion;

  }
  
  catch (error) {
    console.error('Error fetching location:', error);
    return [];
  }
  
};
