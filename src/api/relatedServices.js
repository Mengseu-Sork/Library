import axios from '@/plugins/axios';

export const fetchAllData = () => axios.get('/data');