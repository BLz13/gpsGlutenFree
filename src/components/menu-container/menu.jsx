import "./menu.css";

import Logo from "../../assets/logo.svg?react";
import { menubar } from "../../assets/menuData";

export default function Menu({ menuState }) {

  const menuClass = menuState ? "menu open" : "menu closed";

  return (
    <>
      <nav className={menuClass}>
        <ul>    
            {menubar.map((item) => (
              item.id === "home" ? (
                <li key={item.id} className="logo-container">
                  GPS <br /> Gluten Free
                  <Logo className="logo-menu" />
                </li>
              ) : (
                <li key={item.id}>
                    <a href={item.link}>
                        {item.id}
                    </a>
                </li>
              )
            ))}
        </ul>
      </nav>
    </>
  )

};
