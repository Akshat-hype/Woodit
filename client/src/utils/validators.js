export const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isRequired = (value) => value !== null && value !== undefined && value.toString().trim() !== '';