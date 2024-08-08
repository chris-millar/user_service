import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

const fetchUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

export const useUserQuery = (id) => {
  return useQuery({ queryFn: () => fetchUser(id) });
};