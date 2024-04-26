import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/activity.css';
import Activity from '../components/Activity';

const Aktivnosti: React.FC = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/activities')
      .then(response => {
        setActivities(response.data);
        console.log(activities)
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
      });
  }, []);

  return (
    <div className='activityWrapper'>
      <h3>Prati i prijavi se na buduće aktivnosti</h3>

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
          />
        ))}
      </div>
    </div>
  );
};

export default Aktivnosti;
