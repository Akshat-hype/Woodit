import api from './api';

export const categoryService = {
  getAll: () => api.get('/categories'),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
  updateBanner: (id, banner_url) => api.patch(`/categories/${id}/banner`, { banner_url }),
};
