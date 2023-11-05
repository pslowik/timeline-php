import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Login from './Komponenty/Login';
import Register from './Komponenty/Register';
import Admin from './Admin';
import ProtectedRoute from './Komponenty/ProtectedRoute';
import { AuthContext } from './context/AuthContext';

function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    axios.post('http://localhost/timeline-php/php/check-session.php',
      {},
      { withCredentials: true }
    )
      .then(response => {
        //console.log('Response:', response);
        if (response.data.isAuthenticated) {
          console.log('check sesion response.data:', response.data.isAuthenticated);
          setUser(response.data.user);
        }
      })
      .catch(error => {
        console.error('Error checking session:', error);
      });
  }, [setUser]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<ProtectedRoute/>} >
          <Route path='/admin' element={<Admin/>}/>
        </Route>
        {/*<Route path='/register' element={<ProtectedRoute/>}>
          <Route path='/register' element={<Register/>}/>
          //other protected routes can go here 
        </Route>
      */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;