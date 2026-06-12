import api from './api';

export const bannerService = {
  getAll: (params) => api.get('/banners', { params }),
  create: (data) => api.post('/banners', data),
  update: (id, data) => api.patch(`/banners/${id}`, data),
  delete: (id) => api.delete(`/banners/${id}`),
};