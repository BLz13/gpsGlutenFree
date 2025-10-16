import "./menu-cnt.scss";

import MenuItems from "./menu-items/menu-items";
import { useUIState } from "../../hooks/context/useUIState";

export default function Menu() {
   
  const { menuState, closeMenu } = useUIState();

  const handleBackdropAction = () => {
    closeMenu();
  };

  const menuClass = menuState ? "open" : "closed";

  return (
    <>

      <nav className={`menu-container ${menuClass}`}>

        <ul className={`menu ${menuClass}`}>
          <MenuItems />
        </ul>

        <div onPointerDown={handleBackdropAction} className="menu-backdrop"></div>

      </nav>

    </>
  )

};
