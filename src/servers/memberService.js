import api from '../assets/axios/axios';

export const fetchMembers = async () => {
  return await api.get("/members");
};

export const createMember = async (member) => {
  return await api.post("/members", member);
};

export const updateMember = async (id, member) => {
  return await api.put(`/members/${id}`, member);
};

export const deleteMember = async (id) => {
  return await api.delete(`/members/${id}`);
};
