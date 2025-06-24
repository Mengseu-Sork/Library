import api from '../assets/axios/axios';

export const fetchCategories = async () => {
  return await api.get("/categories");
};

export const createCategories = async (categories) => {
  return await api.post("/categories", categories);
};

export const updateCategories = async (id, categories) => {
  return await api.put(`/categories/${id}`, categories);
};

export const deleteCategories = async (id) => {
  return await api.delete(`/categories/${id}`);
};
