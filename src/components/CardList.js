import React, { useState } from 'react';
import { deleteCard } from '../services/cardService';
import CardComponent from './CardComponent';
import { Button } from '@mui/material';

const CardList = ({ cards, onEdit, onFetch }) => {
    const [filter, setFilter] = useState('');

    const handleDelete = async (id) => {
        await deleteCard(id);
        onFetch();
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Buscar..." 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
            />
            <div className="card-list">
                {cards
                    .filter(card => card.title.includes(filter)) 
                    .map(card => (
                        <CardComponent 
                            key={card.id} 
                            card={card} 
                            onDelete={handleDelete} 
                            onEdit={onEdit} 
                        />
                    ))}
            </div>
            <div className="button-container">
                <Button 
                    variant="contained" 
                    onClick={() => onEdit(null)} 
                >
                    Novo Card
                </Button>
            </div>
        </div>
    );
};

export default CardList;
