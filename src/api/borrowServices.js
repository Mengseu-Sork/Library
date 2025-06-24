import axios from '@/plugins/axios';

export const fetchBorrows = () => axios.get('/borrows');

export const createBorrow = (borrow) => axios.post('/borrows', borrow);

export const updateBorrow = (id, borrow) => axios.put(`/borrows/${id}`, borrow);

export const deleteBorrow = (id) => axios.delete(`/borrows/${id}`);
