import api from '../assets/axios/axios';

export const fetchBooks = async () => {
  return await api.get("/books");
};

export const createBooks = async (books) => {
  return await api.post("/books", books);
};

export const updateBooks = async (id, books) => {
  return await api.put(`/Books/${id}`, books);
};

export const deleteBooks = async (id) => {
  return await api.delete(`/books/${id}`);
};
