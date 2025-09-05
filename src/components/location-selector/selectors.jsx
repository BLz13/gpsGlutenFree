import './selector.scss'

import CitiesSelector from './cities/cities'
import MunicipalitiesSelector from './municipalities/municipalities'
import ProvincesSelector from './provinces/provinces'
import { useState } from 'react'

export default function LocationSelectors() {    

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  console.log(selectedProvince, selectedMunicipality, selectedCity);

    return (
        <div className="location-selector-cnt">            
            <ProvincesSelector
                onSelect={setSelectedProvince}
            />
            <MunicipalitiesSelector
                province={selectedProvince}
                onSelect={setSelectedMunicipality}
            />
            <CitiesSelector
                municipality={selectedMunicipality}
                onSelect={setSelectedCity}
            />
        </div>
    );

}
