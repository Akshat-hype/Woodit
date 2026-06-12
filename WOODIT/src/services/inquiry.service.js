import api from './api';

export const inquiryService = {
  create: (data) => api.post('/inquiries', data),
  getAll: (params) => api.get('/inquiries', { params }),
  getStats: () => api.get('/inquiries/stats'),
  updateStatus: (id, status) => api.patch(`/inquiries/${id}/status`, { status }),
};