import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios'

export const useImportMutation = (options) => {
  return useMutation({
    ...options,
    mutationFn: async ({ file }) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/api/imports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
      });

      return response.data;
    }
  })
}

const fetchImport = async (id) => {
  const response = await axios.get(`/api/imports/${id}`);
  return response.data;
};

export const useImportQuery = (id) => {
  return useQuery({
    queryFn: () => fetchImport(id),
    queryKey: ['import', id],
  });
};

const fetchImports = async (page, pageSize, filters) => {
  const params = {
    page: page,
    page_limit: pageSize,
    ...(filters["filenameFilter"] && { filename: filters["filenameFilter"] }),
    ...(filters["minPerformedAtFilter"] && { "performed_at[gte]": filters["minPerformedAtFilter"].toISODate() }),
    ...(filters["maxPerformedAtFilter"] && { "performed_at[lte]": filters["maxPerformedAtFilter"].toISODate() }),
    ...(filters["statusFilter"] && { status: filters["statusFilter"] })
  };
  const response = await axios.get('/api/imports', { params: params });

  const imports = response.data.data;
  const paging = response.data.metadata.paging;

  return {
    imports,
    pageInfo: {
      totalImports: paging.count
    },
  };
};

export const useImportsQuery = ({ page, pageSize, filters }) => {
  const actualPage = page + 1
  return useQuery({
    queryKey: ['imports', actualPage, pageSize, filters],
    queryFn: () => fetchImports(actualPage, pageSize, filters),
    keepPreviousData: true,
  });
};