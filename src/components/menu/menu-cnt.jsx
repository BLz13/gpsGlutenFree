import "./menu-cnt.scss";

import MenuButton from './home-btn/home-btn';
import MenuItems from "./menu-items/menu-items";
import { useState } from 'react';

export default function Menu() {

  const [menuState, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(prevState => !prevState);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const menuClass = menuState ? "open" : "closed";

  return (
    <>
      <nav className={`menu-container ${menuClass}`}>
        <MenuButton toggleMenu={toggleMenu} menuState={menuState} />
        <ul className={`menu ${menuClass}`}>
          <MenuItems />
        </ul>
        <div  onClick={closeMenu} onTouchEnd={closeMenu} className="menu-backdrop"></div>
      </nav>
    </>
  )

};
