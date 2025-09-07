import './location.scss';

import { useEffect, useState } from 'react';

export default function Location({ location, toggleLocationFilter, locationFilterState }) {

    const [ubicacion, setUbicacion] = useState(location);
    
    useEffect(() => {
        setUbicacion(location);
        console.log('Rendering Location with location:', location);
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
                        {`${ubicacion.departamento.nombre}, ${ubicacion.municipio.nombre},`}
                    </h2>
                    <h3 className='secondary-location'>
                        {`${ubicacion.provincia.nombre}, Argentina`}
                    </h3>
                </>
            )}
        </div>
    );
}
