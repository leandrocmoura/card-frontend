import axios from 'axios';

const API_URL = 'https://localhost:7047/api/Card'; 

export const getCards = async (filter = '') => {
    const response = await axios.get(`${API_URL}?filter=${filter}`);
    return response.data;
};

export const createCard = async (cardData) => {
    const response = await axios.post(API_URL, cardData);
    return response.data;
};

export const deleteCard = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateCard = async (id, cardData) => {
    const response = await axios.put(`${API_URL}/${id}`, cardData);
    return response.data;
};
