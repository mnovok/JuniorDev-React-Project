import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/activity.css';

interface Participant {
  id: string;
  name: string;
}

interface ActivityFormData {
    name: string;
    date: string;
    description: string;
    organizer: string;
    location: string;
    time: string;
    image: string;
    participants: Participant[];
    isAdmin: boolean;
}
  
  interface AddActivityFormProps {
    onClose: () => void;
    onSubmit: (formData: ActivityFormData) => void;
}

const AddActivity = ({ onClose, onSubmit }: AddActivityFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    organizer: '',
    location: '',
    time: '',
    image: '',
    participants: [],
    isAdmin: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
    onClose();
  };

  return (
    <div className="popupOverlay">
          <span className="closed" onClick={onClose}>&times;</span>
    <div className="popup">
      <div className="popupContent">
        <h2>Dodavanje nove aktivnosti</h2>
        <div className="formWrapperPopup">
            <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ime" required />
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Opis" required/>
            <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} placeholder="Organizator" required/>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Lokacija" required/>
            <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="Datum (7.5.2024.)" required/>
            <input type="text" name="time" value={formData.time} onChange={handleChange} placeholder="Vrijeme (10:00-14:00)" required/>
            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="URL fotografije" />
            <div><button type="submit">Dodaj</button></div>
            </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddActivity;
