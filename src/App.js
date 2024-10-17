import React, { useState, useEffect } from 'react';
import CardList from './components/CardList';
import CardModal from './components/CardModal';
import { CircularProgress } from '@mui/material';
import './App.css'; 
import { getCards } from './services/cardService';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCards = async () => {
        setLoading(true);
        const cardsFromApi = await getCards();
        setCards(cardsFromApi);
        setLoading(false);
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleOpenModal = (card = null) => {
        setEditingCard(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCard(null);
    };

    const handleSave = async () => {
        setLoading(true);
        await fetchCards();
        handleCloseModal();
    };

    return (
        <div id="scroll-1">
            <div className="container">
                {loading ? (
                  <div className="loading-container">  <CircularProgress />
                  </div>
                ) : (
                    <CardList 
                        onEdit={handleOpenModal} 
                        cards={cards} 
                        onFetch={fetchCards} 
                    />
                )}
                <CardModal 
                    open={isModalOpen} 
                    onClose={handleCloseModal} 
                    card={editingCard} 
                    onSave={handleSave} 
                    loading={loading} 
                />
            </div>
            {loading && <div className="overlay" />}
        </div>
    );
}

export default App;
