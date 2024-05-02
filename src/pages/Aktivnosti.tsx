import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/activity.css';
import Activity from '../components/Activity';
import { useUserRole } from '../components/UserRoleContext';
import AddActivity from '../components/AddActivity';

interface Participant {
  id: string;
  name: string;
}

interface ActivityFormData {
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
}

const Aktivnosti: React.FC = () => {
  const [activities, setActivities] = useState<ActivityFormData[]>([]);
  const { role } = useUserRole();
  const [showAddActivityPopup, setShowAddActivityPopup] = useState(false);

  const handleAddButton = () => {
    setShowAddActivityPopup(true); 
  };

  const handleSubmitActivity = (formData: ActivityFormData) => {
    axios.post(`http://localhost:3001/activities/`, formData)
      .then(response => {
        console.log('Activity added successfully:', response.data);
        fetchActivities();
      })
      .catch(error => {
        console.error('Error adding activity:', error);
      });
  };

  const fetchActivities = () => {
    axios.get('http://localhost:3001/activities')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
      });
  };

  const handleDeleteParticipant = () => {
    fetchActivities();
  };

  useEffect(() => {
    fetchActivities(); //inicijalni dohvat podataka
  }, []);

  const generateRandomId = (length: number): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomId = '';
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomId;
  };

  return (
    <div className='activityWrapper'>
      <h3>Prati i prijavi se na buduće aktivnosti</h3>

      {role === 'admin' && (
        <button className='addActivityBtn' onClick={handleAddButton}>Dodaj aktivnost</button>
      )}

      {showAddActivityPopup && <AddActivity id={generateRandomId(4)} onClose={() => setShowAddActivityPopup(false)} onSubmit={handleSubmitActivity} />}    

      <div className="activities">
        {activities.map(activity => (
          <Activity
            key={activity.id}
            id={activity.id}
            name={activity.name}
            date={activity.date}
            description={activity.description}
            organizer={activity.organizer}
            location={activity.location}
            time={activity.time}
            image={activity.image}
            participants={activity.participants}
            isAdmin={role === 'admin'}
            onDeleteParticipant={handleDeleteParticipant}
          />
        ))}
      </div>
    </div>
  );
};

export default Aktivnosti;
