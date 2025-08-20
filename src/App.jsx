import './App.css'

import Map from './components/map'
import Menu from './components/menu-container/menu'
import MenuButton from './components/menu-button/menu-button'
import { useState } from 'react';

function App() {


  const [menuState, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(prevState => !prevState);
  };

    return(
      <>
        <MenuButton toggleMenu={toggleMenu} menuState={menuState} />
        <Menu menuState={menuState} />
        <Map />
      </>
    )

}

export default App
