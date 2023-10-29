import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Notify from './Komponenty/Notify';

const Umow = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pesel, setPesel] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState("");
  const [showNotify, setShowNotify] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    pesel: '',
    doctor: '',
    date: '',
    time: '',
    message: ''
  });
  const hours = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

const handleFormSubmit = (e) => {
  e.preventDefault();

  // walidacja pól formularza
  let formErrors = {};
  if (name.trim() === '') {
    formErrors.name = 'Podaj imię i nazwisko';
  }
  if (email.trim() === '') {
    formErrors.email = 'Podaj Twój mail';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    formErrors.email = 'Popraw e-mail, np. nazwa@gmail.com';
  }
  if (phone.trim() === '') {
    formErrors.phone = 'Podaj Twój numer telefonu';
  }  else if (!/^\d{9}$/.test(phone)) {
    formErrors.phone = 'Podaj poprawny numer telefonu: 9 cyfr bez +48';
  }
  if (pesel.trim() === '') {
    formErrors.pesel = 'Podaj swój numer PESEL';
  }  else if (!/^\d{11}$/.test(pesel)) {
    formErrors.pesel = 'PESEL składa się z 11 cyfr';
  } 

  // ustawienie stanu z błędami walidacji
  setErrors(formErrors);
  // jeśli nie ma błędów, można wysłać formularz
  if (Object.keys(formErrors).length === 0) {      
    // Tworzenie ciasteczka z adresem e-mail
    document.cookie = `email=${email}`;

    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(formGroup => {
      formGroup.classList.remove('error');
    });

    // Wyświetlanie powiadomienia
    setNotify("Zapisano pomyślnie! i... Ciacho z mailem też");
    setSuccess("success")
    setShowNotify(true);

    setName("");
    setEmail("");
    setPhone("");
    setPesel("");
    setDoctor("");
    setTime("");
    setMessage("");

    setTimeout(() => {
      setNotify("");
      setShowNotify(false);
    }, 5000);
  } else {
    // usunięcie klasy error z wszystkich inputów
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(formGroup => {
      formGroup.classList.remove('error');
    });

    // dodanie klasy error tylko tym inputom, które zawierają błędy
    Object.keys(formErrors).forEach(inputName => {
      const input = document.querySelector(`input[name="${inputName}"]`);
      if (input) {
        input.closest('.form-group').classList.add('error');
      }
    });

    setNotify("Popraw błędy!");
    setSuccess("error")
    setShowNotify(true);
  }
};
 

  return (
    <div className="under_nav form-background">
      <div className="form-container">
        <h2>Umów się ze specjalistą</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Imię i nazwisko</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              aria-label="Wpisz imię i nazwisko"
              onChange={(e) => setName(e.target.value)}
            />
            {/*errors.name && <div className="error">{errors.name}</div>*/}
          </div>
          <div className="correctInput"> {errors.name && <div className="tinyError">{errors.name}</div>} </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              aria-label="Wpisz email, ze znakiem @ "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="correctInput"> {errors.email && <div className="tinyError">{errors.email}</div>} </div>
          <div className="form-group">
            <label htmlFor="phone">Numer telefonu</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              aria-label="Wpisz telefon, czyli 9 cyfr"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="correctInput"> {errors.phone && <div className="tinyError">{errors.phone}</div>} </div>
          <div className="form-group">
            <label htmlFor="pesel">PESEL</label>
            <input
              type="text"
              id="pesel"
              name="pesel"
              value={pesel}
              aria-label="Wpisz Pesel, czyli 11 cyfr "
              onChange={(e) => setPesel(e.target.value)}
            />
          </div>
          <div className="correctInput"> {errors.pesel && <div className="tinyError">{errors.pesel}</div>} </div>
          <div className="form-group">
            <label htmlFor="doctor">Lekarz</label>
            <select
              id="doctor"
              name="doctor"
              value={doctor}
              aria-label="Tutaj wybierzesz lekarza"
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="" aria-label="Nie wybrano lekarza, pozostaw tak, jesli chcesz wysłac wiadomość">Wybierz lekarza</option>
              <option value="Tomasz Nowak - ortopeda" aria-label="Kliknij i wybierz Tomasz Nowak - ortopeda">
                Tomasz Nowak - ortopeda
              </option>
              <option value="Piotr Wójcik - pediatra" aria-label="Kliknij i wybierz Piotr Wójcik - pediatrav">
                Piotr Wójcik - pediatra
              </option>
              <option value="Marta Mazur - dermatolog" aria-label="Kliknij i wybierz Marta Mazur - dermatolog">
                Marta Mazur - dermatolog
              </option>
              <option value="Katarzyna Wiśniewska - neurolog" aria-label="Kliknij i wybierz Katarzyna Wiśniewska - neurolog">
                Katarzyna Wiśniewska - neurolog
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Data wizyty</label>
            <DatePicker aria-label={`Wybrana data wizyty: ${date}`} className="datepicker" selected={date} onChange={(date) => setDate(date)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Godzina wizyty</label>
            <select className="form-control label-hour" id="time" value={time} 
              aria-label="Kliknij i wybierz godzinę wizyty"
              onChange={(e) => setTime(e.target.value)}>
              {hours.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group, form-group-textarea">
            <label htmlFor="message">Co chcesz przekazać lekarzowi?</label>
            <textarea className="form-control" id="message" rows="3" value={message} 
              aria-label="Tutaj wprowadź co chcesz przekazać lekarzowi"
              onChange={(e) => setMessage(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" 
            aria-label="Kliknij i zarezerwuj wizytę"
            onClick={handleFormSubmit}>
            Zarezerwuj wizytę
          </button>
          {showNotify && <Notify type={success} message={notify} />}
        </form>
      </div>
    </div>  
  );
}

export default Umow;




