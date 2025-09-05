import './location.scss';

export default function Location({ location, loading }) {

    if (loading) return <div>Loading location...</div>;

    if (!location || !location.ubicacion?.departamento) {
        return (
            <div className="location">
                <h2>Argentina</h2>
            </div>
        );
    }

    return (
        <div className="location">
            <h2>{location.ubicacion.departamento}</h2>
        </div>
    );
    
}



