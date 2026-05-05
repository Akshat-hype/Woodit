import api from './api';

export const mediaService = {
  upload: (file, folder = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return api.post('/media/upload', formData);
  },
};
