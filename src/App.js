import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Lekarze from './Lekarze';
import Kontakt from './Kontakt';
import UmowSie from './UmowSie';
import OpisProjektu from './OpisProjektu';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/lekarze" element={<Lekarze/>} />
        <Route path="/kontakt" element={<Kontakt/>} />
        <Route path="/umow" element={<UmowSie/>} />
        <Route path="/opis-projektu" element={<OpisProjektu/>} />
      */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;