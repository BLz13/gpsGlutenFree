import './location.scss';

import { useEffect, useState } from 'react';

import Chevron from '../../assets/svg/chevron-down.svg?react';

export default function Location({ location, toggleLocationFilter, locationFilterState }) {

    const [ubicacion, setUbicacion] = useState(location);
    const [arrowClass, setArrowClass] = useState('arrow-down');
    
    useEffect(() => {
        setUbicacion(location);
    }, [location]);

    useEffect(() => {
        setArrowClass(`arrow-down${locationFilterState ? ' open' : ''}`);
    }, [locationFilterState]);

    const handleClick = () => {
        toggleLocationFilter(!locationFilterState);
    };

    return (
        <div className="location" onClick={handleClick} onTouchEnd={handleClick}>
            {!ubicacion ? (
                <div>
                    <h2 className='main-location'>Argentina</h2>
                </div>
            ) : (
                <div>
                    <h2 className='main-location'>
                        {`${ubicacion.departamento.nombre}`}
                    </h2>
                    <h3 className='secondary-location'>
                        {`${ubicacion.municipio.nombre}, ${ubicacion.provincia.nombre}`}
                    </h3>
                </div>
            )}
            <Chevron className={arrowClass} />
        </div>
    );
}
