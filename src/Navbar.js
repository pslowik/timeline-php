import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../public/altlekarz-logo4.svg';

function Navbar() {
  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">
          <a href="/"><img src={logo} alt="Logo AltLekarz" /></a>
        </div>
        <div className="links-container">
          <ul>
            <li aria-label="Home"><NavLink to="/" active="active" className="navlink">Home</NavLink></li>
            <li aria-label="Lekarze"><NavLink to="/lekarze" active="active" className="navlink">Lekarze</NavLink></li>
            <li aria-label="Umów się"><NavLink to="/umow" active="active" className="navlink">Umów się</NavLink></li>
            <li aria-label="Kontakt"><NavLink to="/kontakt" active="active" className="navlink">Kontakt</NavLink></li>
            <li aria-label="Opis projektu"><NavLink to="/opis-projektu" active="active" className="navlink">Opis projektu</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;