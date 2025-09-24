import './location.scss';

import { useEffect, useState } from 'react';

export default function Location({ ubicacion, toggleLocationFilter, locationFilterState }) {

    const [arrowClass, setArrowClass] = useState('arrow-down');
    
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
