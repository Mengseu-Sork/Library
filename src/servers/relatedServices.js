import axios from '../assets/axios/axios';

export const fetchAllData = () => axios.get('/data');