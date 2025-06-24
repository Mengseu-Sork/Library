import axios from '@/plugins/axios';

export const fetchBooks = async () => {
  return await axios.get("/books");
};

export const createBooks = async (books) => {
  return await axios.post("/books", books);
};

export const updateBooks = async (id, books) => {
  return await axios.put(`/books/${id}`, books);
};

export const deleteBooks = async (id) => {
  return await axios.delete(`/books/${id}`);
};
