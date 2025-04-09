export const validatePassword = (password: string): boolean => {
  if (!password) {
    return false;
  }

  if (password.length < 6 || password.length > 20) {
    return false;
  }

  return true;
};
