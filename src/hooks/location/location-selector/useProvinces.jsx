import { useEffect, useState } from 'react';

import { fetchProvinces } from '../../../services/indec/endpoints/provinces';

export const useProvinces = () => {
    
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getProvinces = async () => {

      try {
        const provincesData = await fetchProvinces();
        setProvinces(provincesData || []); // Ensure we always set an array
      } 
      
      catch (error) {
        console.error('Error loading provinces:', error);
        setProvinces([]); // Set empty array on error
      } 
      
      finally {
        setLoading(false);
      }

    };

    getProvinces();

  }, []);

  return { provinces, loading };
};