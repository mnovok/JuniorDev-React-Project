import React, { useState, useEffect} from 'react';
import '../styles/associations.css';
import { useUserRole } from '../components/UserRoleContext';
import axios from 'axios';
import Association from '../components/Association';
import AddAssociation from '../components/AddAssociation';

interface AssociationProps {
  name: string;
  address: string;
  city: string;
  status: string;
  isAdmin: boolean;
}

const Udruge: React.FC = () => {
  const [associations, setAssociations] = useState<AssociationProps[]>([]);
  const [sortedAssociations, setSortedAssociations] = useState<AssociationProps[]>([]);
  const { role } = useUserRole();
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showAddAssociationModal, setShowAddAssociationModal] = useState<Boolean>(false);

  const fetchAssociations = () => {
    axios.get('http://localhost:3001/associations')
      .then(response => {
        setAssociations(response.data);
        setSortedAssociations(response.data)
      })
      .catch(error => {
        console.error('Error fetching associations:', error);
      });
  };

  const handleUpdateAssociations = async (associationId: string, newStatus: string) => {
    try {
        await axios.patch(`http://localhost:3001/associations/${associationId}`, { status: newStatus });
        fetchAssociations(); 
    } catch (error) {
        console.error('Error updating association:', error);
    }
  };

  const sortAssociationsByCity = () => {
    const sorted = [...associations].sort((a, b) => a.city.localeCompare(b.city));
    setSortedAssociations(sorted);
  };
  
  const sortAssociationsByName = () => {
    const sorted = [...associations].sort((a, b) => a.name.localeCompare(b.name));
    setSortedAssociations(sorted);
  };
  
  const resetFilter = () => {
    setSortedAssociations(associations);
    setSelectedCity('');
  };

  const handleToggleModal = () => {
    setShowAddAssociationModal(!showAddAssociationModal);
  };

  const handleSubmitAssociation = (formData: AssociationProps) => {
    axios.post(`http://localhost:3001/associations/`, formData)
      .then(response => {
        console.log('Association added successfully:', response.data);
        fetchAssociations();
      })
      .catch(error => {
        console.error('Error adding association:', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/cities/')
    .then(res => {
      setCities(res.data.map((city: { name: string }) => city.name));
    })
    fetchAssociations();
  }, []);


  return (
    <div className='main'>
    <h3 className='title'>Popis udruga</h3>
    <button onClick={handleToggleModal}>Dodaj udrugu</button>
    {showAddAssociationModal && <AddAssociation onClose={handleToggleModal} onSubmit={handleSubmitAssociation} cities={cities}/>}
    <h4>Sortiranje</h4>
    
      <div className='sortWrapper'>
        <button onClick={sortAssociationsByCity} className='sortBtn'>Po gradu</button>
        <button onClick={sortAssociationsByName} className='sortBtn'>Po imenu</button>
        <button onClick={resetFilter} className='sortBtn'>Bez sortiranja</button>
      </div>

      <div>
      {sortedAssociations
          .filter(association => association.status.includes('approved'))
          .map(association => (
            <Association
              key={association.id}
              id={association.id}
              name={association.name}
              address={association.address}
              city={association.city}
              status={association.status}
              isAdmin={role === 'admin'}
              onUpdateAssociation={handleUpdateAssociations}
              cities={cities}
            />
          ))}
          {role === 'admin' && (
            <div className='pendingAssociations'>
              <h3 className='titleSecond'>Zahtjevi za odobrenje</h3>
              {sortedAssociations
                .filter(association => association.status.includes('pending'))
                .map(association => (
                  <Association
                    key={association.id}
                    id={association.id}
                    name={association.name}
                    address={association.address}
                    city={association.city}
                    status={association.status}
                    isAdmin={role === 'admin'}
                    onUpdateAssociation={handleUpdateAssociations}
                    cities={cities}
                  />
                ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default Udruge;
