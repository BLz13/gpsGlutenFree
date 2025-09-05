import './home-btn.scss';

import MenuIcon from '../../../assets/svg/menuIcon.svg?react';

export default function MenuButton({ toggleMenu, menuState }) {


  const buttonClass = menuState ? 'open' : 'closed';

  const handleClick = () => {
    toggleMenu(!menuState);
  };

  return (
    <>
      <button className={`menu-button-container ${buttonClass}`} onClick={handleClick} onTouchStart={handleClick}>
        <MenuIcon className={`menu-button ${buttonClass}`} />
      </button>
    </>
  );
}
