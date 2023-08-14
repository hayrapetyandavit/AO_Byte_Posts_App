export const isValidateInput = (fieldName: string, value: string): boolean => {
  const validationRegExp: { [key: string]: RegExp } = {
    name: /^[A-Za-z]{3,20}$/,
    email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/gi,
    password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  };

  if (validationRegExp[fieldName].test(value)) {
    return true;
  }

  return false;
};
