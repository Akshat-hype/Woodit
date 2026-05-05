import api from './api';

export const catalogueService = {
  get: () => api.get('/catalogue'),
  getAllAdmin: () => api.get('/catalogue/admin/all'),
  upload: (data) => api.post('/catalogue', data),
  delete: (id) => api.delete(`/catalogue/${id}`),
};
