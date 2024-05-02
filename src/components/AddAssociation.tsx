import { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/volunteer.css';

interface AssociationFormData {
    id: string;
    name: string;
    address: string;
    city: string;
    status: string;
    isAdmin: boolean;
}
  
interface AddAssociationFormProps {
    id: string;
    onClose: () => void;
    onSubmit: (formData: AssociationFormData) => void;
    cities: string[];
}

const AddAssociation = ({  id, onClose, onSubmit, cities }: AddAssociationFormProps) => {
  const [formData, setFormData] = useState<AssociationFormData>({
    id: id,
    name: '',
    address: '',
    city: '',
    status: 'pending',
    isAdmin: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    alert("Udruga uspješno poslana administratoru na odobrenje!");
    onClose();
  };
  
  return (
    <div className="modalAdd">
    <div className="modalContentAdd">
        <h2>Dodavanje nove udruge</h2>
        <div className="formWrapperPopupAdd">
            <span className="close" onClick={onClose}>&times;</span>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Naziv udruge" required />
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Adresa" required />

                <div>
                <select name="city" value={formData.city} onChange={handleChange} required>
                    <option value="">Odaberi grad</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                </div>

                <div><button type="submit">Dodaj</button></div>
            </form>
        </div>
    </div>
</div>
  );
};

export default AddAssociation;
