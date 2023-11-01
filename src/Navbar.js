import React from 'react';
import { NavLink } from 'react-router-dom';
//import logo from '../public/logo.svg';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        <div style={styles.logo}>
          {/*dodac pozniej logo*/}
        </div>
        <div style={styles.title}>
        <NavLink to="/" activestyle={styles.title} style={styles.homeLink}>Timeline PHP</NavLink>
        </div>
        <div style={styles.loginContainer}>
          <NavLink to="/login" activestyle={styles.activeLink} style={styles.loginLink}>Log in</NavLink>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: '#109193',
    color: '#fff',
    padding: '10px 0',
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
  },
  navbarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    margin: 'auto',
  },
  logo: {
    flex: 1,
  },
  logoImage: {
    height: '40px',
    width: 'auto',
  },
  title: {
    flex: 2,
    textAlign: 'center',
    fontSize: '24px',
  },
  loginContainer: {
    flex: 1,
    textAlign: 'right',
  },
  loginLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 20px',
    border: '1px solid #fff',
    borderRadius: '5px',
  },
  homeLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 20px',
  },
  activeLink: {
    backgroundColor: '#008CBA',
    borderColor: '#008CBA',
  }
};

export default Navbar;
