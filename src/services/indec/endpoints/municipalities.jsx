import { INDEC_API_ADDRESS as apiAdrs } from '../api';

export const fetchMunicipalitiesByProvince = async (  province ) => {

  if (!province) return [];
  
  try {

    const response = await fetch(`${apiAdrs}municipios?provincia=${province}&max=1000&orden=id`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.municipios.map(municipality => ({
      id: municipality.id,
      name: municipality.nombre
    }));

  }
  
  catch (error) {
    console.error('Error fetching municipalities:', error);
    return [];
  }

};