import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

const fetchUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

export const useUserQuery = (id) => {
  return useQuery({ queryFn: () => fetchUser(id) });
};

const fetchUsers = async (page, pageSize, filters) => {
  const params = {
    page: page,
    page_limit: pageSize,
    ...(filters["professionFilter"] && { profession: filters["professionFilter"] })
  };
  const response = await axios.get('/api/users', { params: params });

  const users = response.data.data;
  const paging = response.data.metadata.paging;

  return {
    users,
    pageInfo: {
      totalUsers: paging.count
    },
  };
};

export const useUsersQuery = ({ page, pageSize, filters }) => {
  const actualPage = page + 1
  return useQuery({
    queryKey: ['users', actualPage, pageSize, filters],
    queryFn: () => fetchUsers(actualPage, pageSize, filters),
    keepPreviousData: true,
  });
};