import React from 'react';
import { useState } from "react";
import Lekarz from './Komponenty/Lekarz';
import lekarz1 from '../public/pics/lekarz1.jpg';
import lekarz2 from '../public/pics/lekarz2.jpg';
import lekarz3 from '../public/pics/lekarz3.jpg';
import lekarz4 from '../public/pics/lekarz4.jpg';


function Lekarze() {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div className="under_nav">
      <div className="header-section">
        <h1>Nasi lekarze</h1>
        <p className="large">Specjaliści, którzy chętnie Ci pomogą</p>      
      </div>
      <div className="container_3_cols">
        <Lekarz
          src={lekarz1}
          //src={require('../public/pics/lekarz1.jpg')}
          alt="Lekarz Tomasz Nowak ortopeda"
          description="Tomasz Nowak - ortopeda"      

        />
        <Lekarz
          src={lekarz2}
          alt="Lekarz Piotr Wójcik pediatra"
          description="Piotr Wójcik - pediatra"      

        />
        <Lekarz
          src={lekarz3}
          alt="Lekarz Marta Mazur dermatolog"
          description="Marta Mazur - dermatolog"      

        />
        <Lekarz
        src={lekarz4}
        alt="Lekarz Katarzyna Wiśniewska neurolog"
        description="Katarzyna Wiśniewska - neurolog"
        />
      </div>
    </div>
  );
}

export default Lekarze;