import axios from 'axios';

export const list = () => fetch('/quizes').then((res) => res.json()).then((data) => data);
export const create = (data) => axios.post('/quizes', data);
