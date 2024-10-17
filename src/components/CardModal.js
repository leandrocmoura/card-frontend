import React, { useState, useEffect } from 'react';
import { createCard, updateCard } from '../services/cardService';
import { Modal, Box, Button, TextField, CircularProgress } from '@mui/material';

const CardModal = ({ open, onClose, card, onSave }) => {
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);


    useEffect(() => {
        if (card) {
            setTitle(card.title);
            setPhoto(card.photoBase64); 
        } else {
            setTitle('');
            setPhoto(null);
        }
    }, [card]);

    const handleSave = async () => {
    
        if (!title || !photo) {
            alert("Por favor, preencha o título e escolha uma foto."); 
            return;
        }

        const cardData = {
            id: card ? card.id : null,
            title,
            photoBase64: photo
        };

        setIsProcessing(true); 

        try {
            if (card) {
                await updateCard(card.id, cardData);
            } else {
                await createCard(cardData);
            }
            onSave(); 
            onClose(); 
        } catch (e) {
            alert("Ocorreu um erro. Por favor, tente novamente."); 
        } finally {
            setIsProcessing(false); 
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result.split(',')[1]); 
            };
            reader.readAsDataURL(file);
        } else {
            setPhoto(null); 
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="modal-box">
                <h2 className="modal-title">{card ? "Editar Card" : "Criar Card"}</h2>
                <label className="modal-input-label">Digite um nome para o card</label>
                <TextField
                    className="modal-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    disabled={isProcessing} 
                />
                <label className="photo-label">INCLUA UMA IMAGEM PARA APARECER NO CARD</label>
                <input
                    type="file"
                    className="file-input"
                    onChange={handlePhotoChange}
                    disabled={isProcessing} 
                />
                <Button
                    className="save-button"
                    onClick={handleSave}
                    disabled={isProcessing} 
                >
                    {isProcessing ? <CircularProgress size={24} /> : "Salvar Card"}
                </Button>
                <Button onClick={onClose} disabled={isProcessing}>Cancelar</Button>
            </Box>
        </Modal>
    );
};

export default CardModal;
