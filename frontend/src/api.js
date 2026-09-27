import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mern-weather-app-sr4g.onrender.com'
});

export default API;