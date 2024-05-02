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
    cities: string[];
    occupations: string[];
}

const Volunteer: React.FC<VolunteerProps> = ({id, name, contact, city, occupation, image, isAdmin, onUpdateVolunteer, cities, occupations}) => {
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
        setIsEditing(false);
    };

    const handleDeleteVolunteer = async (volunteerId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite izbrisati ovoga volontera?");
        if (!confirmed) {
            return; 
        }
        try {
            await axios.delete(`http://localhost:3001/volunteers/${volunteerId}`);
            onUpdateVolunteer();
            alert('Volonter uspješno izbrisan!');
        } catch (error) {
            console.error('Pogreška prilikom brisanja volontera:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        if (checked) {
            setEditedValues(prevState => ({
                ...prevState,
                [name]: [...prevState[name as keyof typeof editedValues], value],
            }));
        } else {
            setEditedValues(prevState => ({
                ...prevState,
                [name]: (prevState[name as keyof typeof editedValues] as string[]).filter((val: string) => val !== value),
            }));
        }
    };

    const handleEditVolunteer = async () => {
        toggleModal();
        setIsEditing(true);
    };

    const handleSaveEditing = (volunteerId: string) => {
        axios.patch(`http://localhost:3001/volunteers/${volunteerId}`, editedValues)
            .then(() => {
                onUpdateVolunteer();})
            .catch(error => {
                console.error("Error updating volunteer:", error);
            });
        setIsEditing(false);
    }
        
    return (
        <div className="volunteer">
            {isAdmin && (
            <div className="deleteEditContainer">
                <FaRegEdit className="editIcon" onClick={handleEditVolunteer}/>
                <RiDeleteBinLine onClick={() => handleDeleteVolunteer(id)} className="deleteIcon deleteVolunteer" />
            </div>
            )}
            <div className="volunteerImageContainer">
                <img src={image} alt={name} className="volunteerImage" onClick={toggleModal} />
                <h3 className="volunteerName">{name}</h3>
            </div>
            <div className={`modal ${showModal ? 'show' : ''}`}>
            <div className="modalContent">
            <span className="close" onClick={toggleModal}>&times;</span>
            {isEditing ? (
                <>
                    <div className="inputWrapper">
                        <label>Ime:</label>
                        <input name='name' value={editedValues.name} onChange={handleInputChange}></input>
                    </div>
                    <div className="inputWrapper">
                        <label>URL fotografije:</label>
                        <input name='image' value={editedValues.image} onChange={handleInputChange}></input>
                    </div>
                    <div className="inputWrapper">
                        <label>Kontakt:</label>
                        <input name='contact' value={editedValues.contact} onChange={handleInputChange}></input>
                    </div>
                    <div className="inputWrapper">
                        <label>Grad:</label>
                        <select name='city' value={editedValues.city} onChange={handleInputChange}>
                            <option value="">Odaberi grad</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <label>Uloge:</label>
                        <div className="checkboxWrapper">
                            {occupations.map((occupation) => (
                                <label key={occupation}>
                                    <input
                                        type="checkbox"
                                        name="occupation"
                                        value={occupation}
                                        checked={editedValues.occupation.includes(occupation)}
                                        onChange={handleCheckboxChange}
                                        required
                                    />
                                    {occupation}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button className='saveBtn' onClick={() => handleSaveEditing(id)}>Spremi</button>
                    </div>
                </>
            ) : (
                <>
                    <h3>{name}</h3>
                    <img src={image} alt={name} className="modalImage" />
                    <p><strong>Kontakt:</strong> {contact}</p>
                    <p><strong>Grad:</strong> {city}</p>
                    <p><strong>Uloge:</strong> {occupation.join(', ')}</p>
                </>
            )}
            </div>
        </div>
        </div>
    );
}

export default Volunteer;
