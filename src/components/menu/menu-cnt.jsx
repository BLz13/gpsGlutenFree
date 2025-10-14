import "./menu-cnt.scss";

import MenuItems from "./menu-items/menu-items";
import { useUIState } from "../../hooks/context/useUIState";

export default function Menu() {
   
  const uiStates = useUIState();

  const closeMenu = () => {
    uiStates.menuState = false;
  };

  const menuClass = uiStates.menuState ? "open" : "closed";

  return (
    <>

      <nav className={`menu-container ${menuClass}`}>

        <ul className={`menu ${menuClass}`}>
          <MenuItems />
        </ul>

        <div  onClick={closeMenu} onTouchEnd={closeMenu} className="menu-backdrop"></div>

      </nav>

    </>
  )

};
