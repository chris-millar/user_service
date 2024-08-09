import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

const fetchUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

export const useUserQuery = (id) => {
  return useQuery({ queryFn: () => fetchUser(id) });
};

const fetchUsers = async (page, pageSize) => {
  const response = await axios.get('/api/users', {
    params: {
      page: page,
      page_limit: pageSize,
    },
  });

  const users = response.data.data;
  const paging = response.data.metadata.paging;

  return {
    users,
    pageInfo: {
      totalUsers: paging.count
    },
  };
};

export const useUsersQuery = ({ page, pageSize }) => {
  const actualPage = page + 1
  return useQuery({
    queryKey: ['users', actualPage, pageSize],
    queryFn: () => fetchUsers(actualPage, pageSize),
    keepPreviousData: true,
  });
};