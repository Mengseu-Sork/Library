import axios from '@/plugins/axios';

export const fetchLibrarians = async () => {
  return await axios.get("/librarians");
};

export const createLibrarian = async (librarian) => {
  return await axios.post("/librarians", librarian);
};

export const updateLibrarian = async (id, librarian) => {
  return await axios.put(`/librarians/${id}`, librarian);
};

export const deleteLibrarian = async (id) => {
  return await axios.delete(`/librarians/${id}`);
};
