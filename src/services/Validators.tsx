export const emailValidator = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const isValid = regex.test(email);

  return isValid;
};

export const passwordValidator = (password: string) => {
  // const regex =
  //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#~])[A-Za-z\d@$!%?&#~]{8,}$/;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&#~])[A-Za-z\d@$!%?&#~]{8,}$/;

  const isValid = regex.test(password);

  return isValid;
};
