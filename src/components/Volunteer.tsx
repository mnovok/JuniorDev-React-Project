import React, { useState } from 'react';
import axios from 'axios';
import '../styles/volunteer.css';
import { RiDeleteBinLine } from "react-icons/ri";

interface VolunteerProps {
    id: string;
    name: string;
    contact: string;
    city: string;
    occupation: string[];
    image: string;
    onUpdateVolunteer: () => void;
}

const Volunteer: React.FC<VolunteerProps> = ({id, name, contact, city, occupation, image, onUpdateVolunteer}) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="volunteer">
            <div className="volunteerImageContainer">
                <img src={image} alt={name} className="volunteerImage" onClick={toggleModal} />
                <h3 className="volunteerName">{name}</h3>
            </div>
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <div className="modalContent">
                    <h3>{name}</h3>
                    <img src={image} alt={name} className="modalImage" />
                    <p><strong>Kontakt:</strong> {contact}</p>
                    <p><strong>Grad:</strong> {city}</p>
                    <p><strong>Uloge:</strong> {occupation.join(', ')}</p>
                    <button onClick={toggleModal} className="closeModal">Zatvori</button>
                </div>
            </div>
        </div>
    );
}

export default Volunteer;
