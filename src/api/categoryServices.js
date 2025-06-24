import axios from '@/plugins/axios';

export const fetchCategories = async () => {
  return await axios.get("/categories");
};

export const createCategories = async (categories) => {
  return await axios.post("/categories", categories);
};

export const updateCategories = async (id, categories) => {
  return await axios.put(`/categories/${id}`, categories);
};

export const deleteCategories = async (id) => {
  return await axios.delete(`/categories/${id}`);
};
