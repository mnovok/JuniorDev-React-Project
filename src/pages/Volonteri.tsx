import React, { useState, useEffect } from 'react';
import '../styles/volunteer.css';
import axios from 'axios';
import { useUserRole } from '../components/UserRoleContext';
import Volunteer from '../components/Volunteer';

interface VolunteerData {
  id: string;
  name: string;
  contact: string;
  city: string;
  occupation: string[];
  image: string;
}

const Volonteri: React.FC = () => {
  const [volunteers, setVolunteers] = useState<VolunteerData[]>([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState<VolunteerData[]>([]);
  const { role } = useUserRole();
  const [cities, setCities] = useState<string[]>([]);
  const [occupations, setOccupations] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedOccupations, setSelectedOccupations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchVolunteers = () => {
    axios.get('http://localhost:3001/volunteers')
      .then(response => {
        setVolunteers(response.data);
        setFilteredVolunteers(response.data)
      })
      .catch(error => {
        console.error('Error fetching volunteers:', error);
      });
  };

  const handleUpdateVolunteers = () => {
    fetchVolunteers();
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleOccupationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const occupation = event.target.value;
    setSelectedOccupations(prevOccupations => {
      if (prevOccupations.includes(occupation)) {
        return prevOccupations.filter(item => item !== occupation);
      } else {
        return [...prevOccupations, occupation];
      }
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const resetFilters = () => {
    setSelectedCity('');
    setSelectedOccupations([]);
    setSearchQuery('');
  };

  useEffect(() => {
    axios.get('http://localhost:3001/cities/')
    .then(res => {
      setCities(res.data.map((city: { name: string }) => city.name));
    })
    axios.get('http://localhost:3001/occupations')
    .then(res => {
      setOccupations(res.data.map((occupation: { name: string }) => occupation.name));
    })
    fetchVolunteers();
  }, []);

  useEffect(() => {
    let filtered = volunteers;

    if (selectedCity) {
      filtered = filtered.filter(volunteer => volunteer.city === selectedCity);
    }
    if (selectedOccupations.length > 0) {
      filtered = filtered.filter(volunteer => volunteer.occupation.some(occupation => selectedOccupations.includes(occupation)));
    }
    if (searchQuery) {
      filtered = filtered.filter(volunteer => volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredVolunteers(filtered);
  }, [selectedCity, selectedOccupations, searchQuery, volunteers]);

  return (
    <div className="main">
      <h3 id='title'>Popis volontera županije</h3>
      <input type="text" id="search" value={searchQuery} onChange={handleSearchChange} placeholder='Traži...'/>
      <div className='volunteerWrapper'>
        <div className="filterWrapper">
          <h4>Filter</h4>
          <select value={selectedCity} onChange={handleCityChange}>
            <option value="">Odaberi grad</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <h4>Uloge</h4>
          {occupations.map(occupation => (
            <label key={occupation}>
              <input
                type="checkbox"
                value={occupation}
                checked={selectedOccupations.includes(occupation)}
                onChange={handleOccupationChange}
              />
              {occupation}
            </label>
          ))}
          <button onClick={resetFilters}>Bez filtera</button>
        </div>
        <div className="volunteerContainer">
          {filteredVolunteers.map(volunteer => (
            <Volunteer
              key={volunteer.id}
              name={volunteer.name}
              contact={volunteer.contact}
              city={volunteer.city}
              occupation={volunteer.occupation}
              image={volunteer.image}
              onUpdateVolunteer={handleUpdateVolunteers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Volonteri;
