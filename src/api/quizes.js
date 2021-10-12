import axios from 'axios';

export const list = () => fetch(`${process.env.VUE_API_URL}/quizes`).then((res) => res.json()).then((data) => data);
export const listResults = () => fetch(`${process.env.VUE_API_URL}/results`).then((res) => res.json()).then((data) => data);
export const create = (data) => axios.post(`${process.env.VUE_API_URL}/quizes`, data);
