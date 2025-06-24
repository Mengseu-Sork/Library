import api from '../assets/axios/axios';

export const fetchLibrarians = async () => {
  return await api.get("/librarians");
};

export const createLibrarian = async (librarian) => {
  return await api.post("/librarians", librarian);
};

export const updateLibrarian = async (id, librarian) => {
  return await api.put(`/librarians/${id}`, librarian);
};

export const deleteLibrarian = async (id) => {
  return await api.delete(`/librarians/${id}`);
};
