import axios from './axios.js';

export const getDepartamentos = () => axios.get('/departamento')