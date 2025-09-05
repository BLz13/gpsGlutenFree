import { INDEC_API_ADDRESS as apiAdrs } from '../api';

export const fetchProvinces = async () => {

  try {

    const response = await fetch(`${apiAdrs}provincias?max=30&orden=id`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.provincias) {
      throw new Error('Invalid API response format');
    }

    return data.provincias.map(province => ({
      id: province.id,
      name: province.nombre
    }));

  }
  
  catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
  
};
