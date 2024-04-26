import React, { useState } from 'react';
import axios from 'axios';
import '../styles/form.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: any) => {
    setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/messages', formData);
      alert('Message submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ime i prezime:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
       Poruka:
        <textarea name="message" value={formData.message} onChange={handleChange} />
      </label>
      <button type="submit">Pošalji</button>
    </form>
  );
};

export default ContactForm;
