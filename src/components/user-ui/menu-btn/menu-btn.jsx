import './menu-btn.scss';

import { useEffect, useState } from 'react';

import MenuIcon from '../../../assets/svg/menuIcon.svg?react';
import { useUIState } from '../../../hooks/context/useUIState';

export default function MenuButton() {

  const { menuState, toggleMenu, closeLocation } = useUIState();

  const [buttonClass, setButtonClass] = useState('closed');

  useEffect(() => {
    setButtonClass(menuState ? 'open' : 'closed');
  },[menuState]);

  const handleClick = () => {
    toggleMenu();
    closeLocation();
  };

  return (
    <>
      <button className={`menu-button-container ${buttonClass}`} onPointerDown={handleClick} >
        <MenuIcon className={`menu-button ${buttonClass}`} />
      </button>
    </>
  );
}
