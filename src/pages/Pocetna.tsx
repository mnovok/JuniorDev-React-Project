import React from 'react';
import '../styles/home.css';
import ContactForm from '../components/ContactForm';

const Pocetna: React.FC = () => {
  return (
    <div className='home'>
        <div className="backgroundImage">
            <div className='homeWrapper'>
                <img src='srceJadrana.png' height={150} width={150} alt="Background" className='logoImage'></img>
                <h1>Srce Jadrana</h1>
                <h3>Za zajednicu, za ljude, za srce.</h3>
            </div>
        </div>

        <h2>Što je naš cilj?</h2>
        <div className='aboutWrapper'>
            <div className="aboutText">
                <p>
                Cilj projekta je omogućiti korisnicima lakši pristup informacijama o volontiranju, volonterima i udruženjima. 
                Kroz intuitivni dizajn i jasne sadržaje, želimo potaknuti zajednicu na sudjelovanje u volonterskim aktivnostima 
                te olakšati spajanje volontera s relevantnim organizacijama. Projekt pruža sveobuhvatan pregled trenutnih aktivnosti 
                kako bi potaknuo volonterstvo i pozitivne društvene promjene.
                </p>
            </div>
            <div className="aboutImage">
                <img src='https://plus.unsplash.com/premium_photo-1682088329107-20def6a7c2e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Slika'></img>
            </div>
        </div>

        <h2>Kontakt</h2>
        <div className="formWrapper">
            <div className="form">
                <ContactForm/>
            </div>
            <div className="formText">
                <p>Stranicu izradila Marija Novokmet</p>
                <p>studentica 1. godine diplomskog sveučilišnog studija Računarstva na FESB-u</p>
            </div>
        </div>

        </div>
  );
};

export default Pocetna;
