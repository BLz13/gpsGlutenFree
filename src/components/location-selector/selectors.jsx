/* eslint-disable no-unused-vars */

import './selector.scss'

import CitiesSelector from './cities/cities'
import MunicipalitiesSelector from './municipalities/municipalities'
import ProvincesSelector from './provinces/provinces'
import { useState } from 'react'

export default function LocationSelectors( { locationFilterClass, closeLocationFilter } ) {    

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

    return (
        <div className={`location-selector-cnt ${locationFilterClass}`}>
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
