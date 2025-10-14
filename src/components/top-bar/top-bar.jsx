import './top-bar.scss';

import Location from './location/location';
import MenuButton from './menu-btn/menu-btn';
import { useUIState } from '../../hooks/context/useUIState';

export default function TopBar() {

    const uiState = useUIState();

    return (

        <>

            <Location />

            <MenuButton />

        </>

    );
}