import React from "react";

const OpisProjektu = () => {
  return (
    <div className="tlo-opis">
      <div className="box-opis">
        <div className="box-opis-content">
          <h2>Projekt AiTSI - Strona kliniki</h2>
          <div className="opis-details">
            <p><b>O projekcie: </b></p>
            <p>Przygotowując stronę, stworzyłem template dla React, chciałem opracować
            rozwiąznie możliwie przyszłościowe, pozwalające na szybkie rozbudowywanie.
            Aby nie wykorzystywać ciężkiego CRA - Create React App wykorzystałem 
            tylko webpacka, który w skrócie przyspiesza i "pakuje" wszystko w jeden plik 
            i babel w celu transpilowania kodu JSX na ogólny zrozumiały dla starszych 
            przeglądarek. <br/>Z dodatkowych komponentów, których użyłem warto wspomnieć o Router,
            które wykorzystuje w menu, aby nie musiec przeładowywać strony za każdą zmianą 
            zakładki, Navlink i Link, które służą jako hiperłącze. Wszystko pochodzi z 
            react-router-dom. Źródłem ikon jest FontAwesomeIcon. Kalendarzem jest 
            zaimpolementowane rozwiązanie z zasobów react DatePicker. Wszystkie 
            zależności wymagane do powyższych elementów zostały zainstalowane 
            i dodane do pliku package.json przy pomocy yarn. </p>
            <p>Jako główne komponenty stworzyłem zakladki widoczne w menu jak
            i pomocnicze: Pasek nawigacyjny i stopka oraz Lekarz użyty w zakładce 
            lekarze i Notify o różnym typie sukces i error (można dodac w scss wiecej) 
            w zakładce Umów się.</p>
            <p><b>Dodatkowo: </b></p>
            <ul>
            <li>Pasek nawigacyjny ma zastosowane style dla responsywności. 
            Wszystkie zakładki są dostosowane dla responsywności, metody użyte 
            zależą od prezentowanych elementów i co zakładka przedstawia. Głównie 
            zależało mi na skalowaniu i widoczności zawartości.</li>
            <li>Zakładka Lekarze ma zastosowany styl prezentujący informacje dla każdego 
            lekarza po najechaniu na zdjęcie. Najwięcej styli dla responsywności.</li> 
            <li>Zakładka Umów się zawiera formularz z dynamiczną walidacją istotnych pól. 
            Zaimplementowane zostało powiadomienie.
            Tutaj jest również proste ustawienie <b>ciasteczka</b> z mailem użytkownika</li>
            <li>Zakładka kontakt ma przygotowane linki przenoszące do skrzynki mailowej
            i do google maps.</li>
            </ul>
            
            <p><b>O zrealizowanych wymaganiach: </b></p>
            <ul>
            <li>Wymaganie dotyczące poprawności stron spełniłem, korzystając z HTML5 
            uzywając go w kodzie JSX biblioteki <b>React</b>. Strony przeszły test walidatora.</li>
            <li>Wymaganie dotyczące nietrywialnego formatowania zaaplikowałem poprzez 
            wykorzystanie reguł <b>SCSS</b>. Zapewniłem poprawność tych reguł poprzez walidację.</li>
            <li>Strona jest kompatybilna z wszystkimi najnowszymi przeglądarkami.</li>
            <li>Wymaganie dotyczące dostępności dla niepełnosprawnych pokrywają się z 
            zasadami projektowania intuicyjnych stron dla każdego. Spełniłem to dbając 
            o to, żeby strona internetowa była czytelna i łatwa do nawigacji dla osób 
            z różnymi rodzajami niepełnosprawności. Obrazki mają teksty alternatywne. 
            Wszystkie elementy do wprowadzenia danych i przyciski mają zastosowane aria-label 
            które wykorzystuje oprogramowanie do czytania niewidomym ekranu 
            np. Wybrana data wizyty w kalendarzu. Zastosowałem odstępy między elementami 
            <br/>i zaplanowałem ich rozmieszczenie i kolorystykę w celach dotępności 
            jak <br/>i wizualnych. Na koniec wspomnę, stylując stronę brałem uwagę również 
            jej responsywność.</li>
            <li>Wymaganie dotyczące wykorzystania co najmniej jednej wybranej 
            technologii spośród przedstawionych na wykładzie spełniłem, wykorzystując 
            skrypty po stronie klienta. Dorzuciłem też ciasteczko.</li>
            <li>Wymaganie dotyczące dobrego systemu nawigacji spełniłem, zapewniając 
            spójny i wygodny system nawigacji.</li>
            <li>Wymaganie dotyczące strony opisującej - spełnione.</li>
            <li>Uniknąłem nieczytelnych zestawień kolorów, mikroskopijnych 
            fontów <br/>oraz irytujących migających obrazków.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpisProjektu;