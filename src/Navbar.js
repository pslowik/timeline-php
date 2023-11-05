import React, { useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    setUser(null);
    try {
      const response = await axios.post('http://localhost/timeline-php/php/logout.php',
      {},
      {withCredentials: true}
      );
      console.log(response.data.message);
    } catch (error) {
        console.error('Error logging out:', error);
    }
  };

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
          {user ? (
            <>
              <NavLink to="/admin" activestyle={styles.activeLink} style={styles.loginLink} >
              <FontAwesomeIcon icon={faUser} style={{color: "#ffffff"}} /> {user.name}
              </NavLink>
              <button onClick={handleLogout} activestyle={styles.activeLink} style={styles.loginLink}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" activestyle={styles.activeLink} style={styles.loginLink}>Log in</NavLink>
          )}
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
    '@media (maxWidth: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      width: '95%',
    },
  },
  logo: {
    flex: 3,
  },
  logoImage: {
    height: '40px',
    width: 'auto',
    '@media (maxWidth: 868px)': {
      height: '20px',  // zmniejszenie wysokości logo na mniejszych ekranach
    },
  },
  title: {
    flex: 2,
    textAlign: 'center',
    fontSize: '24px',
    justifyContent: 'center', // centrowanie zawartości wertykalnie
    flexDirection: 'column',
    '@media (maxWidth: 868px)': {
      fontSize: '15px',  // zmniejszenie rozmiaru czcionki na mniejszych ekranach
      textAlign: 'center',

    },
  },
  loginContainer: {
    flex: 3,
    textAlign: 'right',
    '@media (maxWidth: 868px)': {
      flex: 3,  // zwiększenie flex-grow na mniejszych ekranach, aby zająć więcej miejsca
    },
  },
  loginLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 20px',
    border: '1px solid #fff',
    borderRadius: '5px',
    '@media (maxWidth: 868px)': {
      padding: '8px 16px',  // zmniejszenie paddingu na mniejszych ekranach
    },
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
