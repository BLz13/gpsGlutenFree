import './user-ui.scss';

import Location from './location/location';
import LocationSelectors from './location-selector/selectors';
import Menu from '../menu/menu-cnt';
import MenuButton from './menu-btn/menu-btn';

export default function UserUI() {


    return (
        <div className="user-ui">

            <header>

                <Location />
                
                <LocationSelectors />

                <MenuButton />

            </header>

            <aside>
                
                <Menu />

            </aside>

        </div>
    );
}