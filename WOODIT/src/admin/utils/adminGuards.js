export const isAdminUser = (user) => {
  return user?.user_metadata?.role === 'admin';
};