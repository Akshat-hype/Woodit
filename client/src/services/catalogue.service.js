import api from './api';

export const catalogueService = {
  get: () => api.get('/catalogue'),

  getAllAdmin: () => api.get('/catalogue/admin/all'),

  upload: (formData) =>
    api.post('/catalogue', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  delete: (id) => api.delete(`/catalogue/${id}`),
};