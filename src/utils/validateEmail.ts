const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
};

export default validateEmail;
