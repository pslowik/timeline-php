import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
      <div className="under_nav home">
        <div className="box-small">
          <div>
            <h2>Witaj na stronie kliniki lekarzy</h2>
            <p className="large">Tu znajdziesz informacje na temat naszych <br/> usług i specjalistów.</p>
            <Link to="/lekarze">
            <button className="under_1" aria-label="Kliknij i przejdź do lekrzy">Poznaj nas!</button>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Home;