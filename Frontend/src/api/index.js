// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/music',
});

export const fetchTracks = () => API.get('/');
export const addTrack = (trackData) => API.post('/', trackData);
export const deleteTrack = (id) => API.delete(`/${id}`);
export const searchTracks = (query) =>
  API.get(`/search?query=${encodeURIComponent(query)}`);

export default API;
