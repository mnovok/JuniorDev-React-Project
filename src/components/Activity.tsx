import React, { useState } from 'react';
import axios from 'axios';
import '../styles/activity.css';
import { RiDeleteBinLine } from "react-icons/ri";

interface Participant {
    id: string;
    name: string;
}

interface ActivityProps {
    id: string;
    name: string;
    date: string;
    description: string;
    organizer: string;
    location: string;
    time: string;
    image: string;
    participants: Participant[];
    isAdmin: boolean;
    onDeleteParticipant: () => void;
}

const Activity: React.FC<ActivityProps> = ({id, name, date, description, organizer, location, time, image, participants, isAdmin, onDeleteParticipant}) => {
    const [showForm, setShowForm] = useState(false);
    const [participantName, setParticipantName] = useState('');

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newParticipant: Participant = {
                id: String(Math.random()),
                name: participantName,
            };
            
            const updatedParticipants = [...participants, newParticipant];
    
            await axios.patch(`http://localhost:3001/activities/${id}`, { participants: updatedParticipants })
            .then(res => {
                axios.get(`http://localhost:3001/activities/`)
                // window.location.reload();
                onDeleteParticipant();
            });
            alert('Uspješno prijavljeni!');
            setParticipantName('');
            setShowForm(false);
        } catch (error) {
            console.error('Pogreška prilikom slanja podataka:', error);
        }
    };
    
    const handleDeleteParticipant = async (participantId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite izbrisati označenog suidonika?");
        if (!confirmed) {
            return; 
        }
        try {
            const filteredParticipants = participants.filter(participant => participant.id !== participantId);
            await axios.patch(`http://localhost:3001/activities/${id}`, { participants: filteredParticipants });
            onDeleteParticipant();
            alert('Sudionik uspješno izbrisan!');
        } catch (error) {
            console.error('Pogreška prilikom brisanja sudionika:', error);
        }
    };

    const handleDeleteActivity = async (activityId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite izbrisati ovu aktivnost?");
        if (!confirmed) {
            return; 
        }
        try {
            await axios.delete(`http://localhost:3001/activities/${id}`);
            onDeleteParticipant();
            alert('Aktivnost uspješno izbrisana!');
        } catch (error) {
            console.error('Pogreška prilikom brisanja aktivnosti:', error);
        }
    };

    return (
        <div className="activity">
             <div className="deleteActivityContainer">
                {isAdmin && (
                    <RiDeleteBinLine onClick={() => handleDeleteActivity(id)} className="deleteIcon deleteActivity" />
                )}
            </div>
            <div className="imageContainer"> 
                <img src={image} alt="Activity Image" className="activityImage" />
            </div>
            <h3 id="activityName">{name}</h3>
            <p><strong>Datum:</strong> {date}</p>
            <div className="details">
                <p><strong>Opis:</strong> {description}</p>
                <p><strong>Organizator:</strong> {organizer}</p>
                <p><strong>Lokacija:</strong> {location}</p>
                <p><strong>Vrijeme:</strong> {time}</p>
                <p><strong>Sudionici:</strong></p>
                <ol>
                    {participants.map(participant => (
                        <li key={participant.id}>
                            {participant.name}
                            {isAdmin && (
                                <RiDeleteBinLine onClick={() => handleDeleteParticipant(participant.id)} className="deleteIcon" />
                            )}
                        </li>
                    ))}
                </ol>

                {!showForm && (
                    <button onClick={() => setShowForm(true)}>Prijavi se</button>
                )}
                {showForm && (
                    <form onSubmit={handleFormSubmit} className="popup-form">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Ime i prezime"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                        />
                        <button type="submit" className='confirmBtn'>Potvrdi</button>
                    </form>
                )}
            </div>
        </div>
    );
  };
  
  export default Activity;
