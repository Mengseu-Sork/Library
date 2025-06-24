import axios from '@/plugins/axios';

export const fetchMembers = async () => {
  return await axios.get("/members");
};

export const createMember = async (member) => {
  return await axios.post("/members", member);
};

export const updateMember = async (id, member) => {
  return await axios.put(`/members/${id}`, member);
};

export const deleteMember = async (id) => {
  return await axios.delete(`/members/${id}`);
};
