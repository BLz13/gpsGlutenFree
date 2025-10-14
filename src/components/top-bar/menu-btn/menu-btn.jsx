import './menu-btn.scss';

import MenuIcon from '../../../assets/svg/menuIcon.svg?react';

export default function MenuButton({ toggleMenu, menuState, closeLocationFilter }) {


  const buttonClass = menuState ? 'open' : 'closed';

  const handleClick = () => {
    toggleMenu(!menuState);
    closeLocationFilter(false);
  };

  return (
    <>
      <button
        className={`menu-button-container ${buttonClass}`}
        onClick={handleClick}
        onTouchStart={handleClick}
      >
        <MenuIcon className={`menu-button ${buttonClass}`} />
      </button>
    </>
  );
}
