import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CardComponent = ({ card, onDelete, onEdit }) => {
    return (
        <div className="card">
            <div className="card-image-container">
                <img 
                    src={`data:image/png;base64,${card.photoBase64}`} 
                    alt="Card" 
                    className="card-image" 
                />
            </div>
            <h3>{card.title}</h3>
            <div className="card-actions">
                <IconButton onClick={() => onEdit(card)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(card.id)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CardComponent;
