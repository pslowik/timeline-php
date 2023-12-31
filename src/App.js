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
import ChangePassword from './Komponenty/ChangePassword';


function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/check-session.php`,
      {},
      { withCredentials: true }
    )
      .then(response => {
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
        <Route path="/changepassword" element={<ChangePassword/>} />

        <Route path="/admin" element={<ProtectedRoute/>} >
          <Route path='/admin' element={<Admin key={Date.now()} />}/>
        </Route>
    
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;