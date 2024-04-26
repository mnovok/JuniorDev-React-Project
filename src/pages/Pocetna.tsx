import React from 'react';
import '../styles/home.css';
import ContactForm from '../components/ContactForm';

const Pocetna: React.FC = () => {
  return (
    <>
        <div className="backgroundImage">
            <div className='homeWrapper'>
                <img src='srceJadrana.png' height={150} width={150} alt="Background"></img>
                <h1>Srce Jadrana</h1>
                <h3>Za zajednicu, za ljude, za srce.</h3>
            </div>
        </div>

        <h2>Što je naš cilj?</h2>
        <div className='aboutWrapper'>
            <div className="aboutText">
                <p>
                   Cilj projekta je omogućiti korisnicima jednostavan pristup informacijama o volonterskim aktivnostima, 
                   popisima volontera i volonterskih udruga. Kroz intuitivan dizajn i pregledan sadržaj, želi se potaknuti zajednicu 
                   na sudjelovanje u volonterskim akcijama te olakšati povezivanje volontera s organizacijama koje im odgovaraju. 
                   Projekt pruža sveobuhvatan pregled trenutnih aktivnosti, doprinoseći promicanju volonterstva i pozitivnih 
                   društvenih promjena.
                </p>
            </div>
            <div className="aboutImage">
                <img src='https://plus.unsplash.com/premium_photo-1682088329107-20def6a7c2e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Slika'></img>
            </div>
        </div>

        <h2>Kontakt</h2>
        <div className="formWrapper">
            <ContactForm/>
        </div>

        </>
  );
};

export default Pocetna;
