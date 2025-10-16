import './top-bar.scss';

import Location from './location/location';
import LocationSelectors from './location-selector/selectors';
import Menu from '../menu/menu-cnt';
import MenuButton from './menu-btn/menu-btn';
import { useUIState } from '../../hooks/context/useUIState';

export default function TopBar() {

    const { toggleMenu, toggleLocation, closeLocation, locationState } = useUIState();

    const handleTouchLocation = () => {
        toggleLocation();
    }

    const handleTouchMenu = () => {
        if (!locationState) {closeLocation(); }
        toggleMenu();
    }

    return (

        <header className="top-bar">

            <Location onTouch={handleTouchLocation} />
            
            <LocationSelectors />

            <MenuButton onTouch={handleTouchMenu} />

            <Menu />

        </header>

    );
}