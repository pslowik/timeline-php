import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faPaperPlane, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
<FontAwesomeIcon icon={faMapLocationDot} />
function Kontakt({ children }) {
  return (
      <div className="under_nav home">
        <div className="box">
          <h2>Skontaktuj się z nami</h2>
          <div className="contact-details">
            <p title="Zadzwoń do nas!" 
               aria-label="Kliknij i zadzwoń do nas!">
               <FontAwesomeIcon icon={faPhone} />  +48 123 456 789</p>
            <p>
              <FontAwesomeIcon icon={faPaperPlane} />
            <a
                href="mailto:kontakt@klinika.pl"
                target="_blank"
                rel="noopener noreferrer"
                title="Wyślij do nas maila!"
                aria-label="Kliknij i wyślij do nas maila!"
              >
                kontakt@klinika.pl
              </a>
            </p>            
            <p>
              <FontAwesomeIcon icon={faMapLocationDot} />
              <a 
                href="https://www.google.com/maps?q=ul.+Główna+1,+00-000+Warszawa" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Znajdź nas na mapie!"
                aria-label="Kliknij nawiguj do nas w mapach google!"
              >
                ul. Główna 1, 00-000 Warszawa
              </a>
            </p>
          </div>
        </div>
      </div>
  );
}

export default Kontakt;
