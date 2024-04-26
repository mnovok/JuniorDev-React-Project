import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserRole } from './UserRoleContext';
import '../styles/navigation.css';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 700);
  const { role, toggleRole } = useUserRole();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={`navigationBar ${isMobileMenuOpen ? 'mobileMenuOpen' : ''}`}>
      {isMobileView && (
        <button className='mobileMenuButton' onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? 'Zatvori' : 'Izbornik'}
        </button>
      )}
      <ul className={`navigationLinks ${isMobileView ? 'mobileMenu' : ''}`}>
        <li>
          <NavLink to="/" onClick={toggleMobileMenu}>Početna</NavLink>
        </li>
        <li>
          <NavLink to="/aktivnosti" onClick={toggleMobileMenu}>Aktivnosti</NavLink>
        </li>
        <li>
          <NavLink to="/volonteri" onClick={toggleMobileMenu}>Volonteri</NavLink>
        </li>
        <li>
          <NavLink to="/udruge" onClick={toggleMobileMenu}>Udruge</NavLink>
        </li>
        <li className="adminCheckbox">
          <label>
            <input type="checkbox" checked={role === 'admin'} onChange={toggleRole} />
            <span className="adminLabel">{role === 'admin' ? 'Admin' : 'Korisnik'}</span>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
