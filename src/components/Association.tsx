import React, { useState } from 'react';
import axios from 'axios';
import '../styles/associations.css';
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface AssociationProps {
    id: string;
    name: string;
    address: string;
    city: string;
    status: string;
    isAdmin: boolean;
    onUpdateAssociation: (associationId: string, newStatus: string) => void;
    cities: string[];
}

const Association: React.FC<AssociationProps> = ({id, name, address, city, status, isAdmin, onUpdateAssociation}) => {

    const handleAcceptAssociation = async (associationId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite odobriti ovu udrugu?");
        if (confirmed) {
            onUpdateAssociation(associationId, 'approved');
        }
    };

    const handlRejectAssociation = async (associationId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite odbiti ovu udrugu?");
        if (!confirmed) {
            return; 
        }
        try {
            await axios.delete(`http://localhost:3001/associations/${associationId}`);
            onUpdateAssociation(associationId, 'pending');
            alert('Udruga odbijena!');
        } catch (error) {
            console.error('Pogreška prilikom odbijanja udruge:', error);
        }
    };
    
    return (
        <div className="association">
            {isAdmin && status === 'pending' && (
                <div className='approvalButtonsWrapper'>
                    <IoIosCheckmarkCircleOutline className='approvalBtn accept' onClick={() => handleAcceptAssociation(id)}/>
                    <MdOutlineCancel className='approvalBtn cancel' onClick={() => handlRejectAssociation(id)}/> 
                </div>
            )}
            <h3>{name}</h3>
            <p><strong>Adresa:</strong> {address}</p>
            <p><strong>Grad:</strong> {city}</p>
        </div>
    );
};

export default Association;