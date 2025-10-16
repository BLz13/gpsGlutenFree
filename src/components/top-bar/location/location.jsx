import './location.scss';

import { useEffect, useState } from 'react';

import Chevron from '../../../assets/svg/chevron-down.svg?react';
import { useCurrentLocation } from '../../../hooks/context/useCurrentLocation';
import { useUIState } from '../../../hooks/context/useUIState';

export default function Location() {

    const location = useCurrentLocation();

    const { locationState, toggleLocation } = useUIState();    

    const [arrowClass, setArrowClass] = useState('arrow-down');

    const [locationRenderObject, setLocationRenderObject] = useState(<div></div>);

    useEffect(() => {
        setArrowClass(`arrow-down${locationState ? ' open' : ''}`);
    }, [locationState]);

    useEffect(() => {
        setLocationRenderObject( location.departamento === undefined ? (
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

    const handleLocationAction = () => {
        toggleLocation();
    };

    

    return (
        <div className="location" onClick={handleLocationAction} onTouchEnd={handleLocationAction}>
            <div>
                {locationRenderObject}
            </div>
            <Chevron className={arrowClass} />
        </div>
    );
}
