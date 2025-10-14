import './location.scss';

import { useEffect, useState } from 'react';

import Chevron from '../../../assets/svg/chevron-down.svg?react';
import LocationSelectors from './location-selector/selectors';
import { useCurrentLocation } from '../../../hooks/context/useCurrentLocation';

export default function Location() {

    const location = useCurrentLocation();

    const [arrowClass, setArrowClass] = useState('arrow-down');

    const [locationRenderObject, setLocationRenderObject] = useState(<div></div>);
/*
    useEffect(() => {
        setArrowClass(`arrow-down${locationFilterState ? ' open' : ''}`);
    }, [locationFilterState]);
*/
    useEffect(() => {
        setLocationRenderObject( !location ? (
                <h2 className='main-location'>Argentina</h2>
            ) : (
                <div>
                    <h2 className='main-location'>
                        {`${location?.departamento?.nombre}`}
                    </h2>
                    <h3 className='secondary-location'>
                        {`${location?.municipio?.nombre}, ${location?.provincia?.nombre}`}
                    </h3>
                </div>
            )
        );
    }, [location]);

    const handleClick = () => {
        toggleLocationFilter(!locationFilterState);
    };

    

    return (
        <div>

            <div className="location" onClick={handleClick} onTouchEnd={handleClick}>
                <div>
                    {locationRenderObject}
                </div>
                <Chevron className={arrowClass} />
            </div>

            <LocationSelectors />
            
        </div>
    );
}
