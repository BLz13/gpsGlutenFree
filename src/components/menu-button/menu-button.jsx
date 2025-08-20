import './menu-button.css';

import MenuIcon from '../../assets/menuIcon.svg?react';

export default function MenuButton({ toggleMenu, menuState }) {


  const buttonClass = menuState ? 'open' : 'closed';

  const handleClick = () => {
    toggleMenu(!menuState);
  };

  return (
    <>
      <button className="menu-button-container" onClick={handleClick} onTouchStart={handleClick}>
        <MenuIcon className={`menu-button ${buttonClass}`} />
      </button>
    </>
  );
}
