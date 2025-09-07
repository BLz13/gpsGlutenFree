import './location.scss';

import { useEffect, useState } from 'react';

export default function Location({ location, toggleLocationFilter, locationFilterState }) {

    const [ubicacion, setUbicacion] = useState(location);
    
    useEffect(() => {
        setUbicacion(location);
    }, [location]);

    const handleClick = () => {
        toggleLocationFilter(!locationFilterState);
    };

    return (
        <div className="location" onClick={handleClick} onTouchEnd={handleClick}>
            {!ubicacion ? (
                <h2 className='main-location'>Argentina</h2>
            ) : (
                <>
                    <h2 className='main-location'>
                        {`${ubicacion.departamento.nombre}`}
                    </h2>
                    <h3 className='secondary-location'>
                        {`${ubicacion.municipio.nombre}, ${ubicacion.provincia.nombre}`}
                    </h3>
                </>
            )}
        </div>
    );
}
