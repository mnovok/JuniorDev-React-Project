import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserRoleProvider } from './components/UserRoleContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './App.css';

import Pocetna from './pages/Pocetna';
import Aktivnosti from './pages/Aktivnosti';
import Volonteri from './pages/Volonteri';
import Udruge from './pages/Udruge';

const App: React.FC = () => {
  return (
    <UserRoleProvider>
      <Router>
        <div className='navigationWrapper'>
          <Navigation />
          <Routes>
            <Route path="/" element={<Pocetna />} />
            <Route path="/aktivnosti" element={<Aktivnosti />} />
            <Route path="/volonteri" element={<Volonteri />} />
            <Route path="/udruge" element={<Udruge />} />
          </Routes>
        </div>
      </Router>
      <Footer/>
    </UserRoleProvider>
  );
};

export default App;
