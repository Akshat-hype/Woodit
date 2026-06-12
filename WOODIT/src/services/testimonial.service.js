import api from './api';

export const testimonialService = {
  getAll: () => api.get('/testimonials'),
  getAllAdmin: () => api.get('/testimonials/admin/all'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.patch(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};