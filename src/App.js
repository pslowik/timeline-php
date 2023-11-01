import React, {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Login from './Komponenty/Login';
import Register from './Komponenty/Register';
import ProtectedRoute from './Komponenty/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
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