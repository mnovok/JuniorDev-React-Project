import React, { useState } from 'react';
import axios from 'axios';
import '../styles/associations.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

interface AssociationProps {
    id: string;
    name: string;
    address: string;
    city: string;
    status: string[];
    isAdmin: boolean;
    onUpdateAssociation: () => void;
    cities: string[];
}

const Association: React.FC<AssociationProps> = ({id, name, address, city, status, isAdmin, onUpdateAssociation, cities}) => {
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [editedValues, setEditedValues] = useState({
        name: name,
        address: address,
        city: city,
        status: status,
    });

    return (
        <div className="association">
            <h3>{name}</h3>
            <p><strong>Adresa:</strong> {address}</p>
            <p><strong>Grad:</strong> {city}</p>
        </div>
    );
};

export default Association;