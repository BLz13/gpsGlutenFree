import Logo from '../../../assets/svg/logo.svg?react';
import { PAGES } from "../../../utils/pages";

export default function MenuItems() {

  const pages = PAGES.map((item) => (
            item.id === "home" ? (
            <li key={item.id} className="logo-container">
                GPS <br /> Gluten Free
                <Logo className="logo-menu" />
            </li>
            ) : (
            <li key={item.id}>
                <a href={item.link}>
                    {item.id}
                    <span className="underline"></span>
                </a>
            </li>
            )
        ))

  return (
    <>  
        {pages}
    </>
  )

};
