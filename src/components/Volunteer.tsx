import React, { useState } from 'react';
import axios from 'axios';
import '../styles/volunteer.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

interface VolunteerProps {
    id: string;
    name: string;
    contact: string;
    city: string;
    occupation: string[];
    image: string;
    isAdmin: boolean;
    onUpdateVolunteer: () => void;
}

const Volunteer: React.FC<VolunteerProps> = ({id, name, contact, city, occupation, image, isAdmin, onUpdateVolunteer}) => {
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [editedValues, setEditedValues] = useState({
        name: name,
        contact: contact,
        city: city,
        occupation: occupation,
        image: image
    });

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleDeleteVolunteer = async (volunteerId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite izbrisati ovoga volontera?");
        if (!confirmed) {
            return; 
        }
        try {
            await axios.delete(`http://localhost:3001/volunteers/${volunteerId}`);
            onUpdateVolunteer();
            alert('Volonter uspješno izbrisana!');
        } catch (error) {
            console.error('Pogreška prilikom brisanja volontera:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleEditVolunteer = async (volunteerId: string) => {
        toggleModal();
        try {
            // await axios.delete(`http://localhost:3001/volunteers/${volunteerId}`);
            onUpdateVolunteer();
            alert('Volonter uspješno izbrisana!');
        } catch (error) {
            console.error('Pogreška prilikom brisanja volontera:', error);
        }
    };

    return (
        <div className="volunteer">
            {isAdmin && (
            <div className="deleteEditContainer">
                <FaRegEdit className="editIcon" onClick={() => handleEditVolunteer(id)}/>
                <RiDeleteBinLine onClick={() => handleDeleteVolunteer(id)} className="deleteIcon deleteVolunteer" />
            </div>
            )}
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
