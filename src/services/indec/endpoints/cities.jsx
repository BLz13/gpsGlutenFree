import { INDEC_API_ADDRESS as apiAdrs } from '../api';

export const fetchCitiesByMunicipality = async ( municipality ) => {

  if (!municipality) return [];

  try {

    const response = await fetch(`${apiAdrs}localidades?municipio=${municipality}&max=1000&orden=id`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.localidades.map(city => ({
      id: city.id,
      name: city.nombre
    }));
    
  } 
  
  catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
  
};