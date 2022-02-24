import bcryptjs from 'bcryptjs';

export const getEncryptedPassword = (password: string) => {
  const salt = bcryptjs.genSaltSync();
  const encryptedPassword = bcryptjs.hashSync(password, salt);

  return encryptedPassword;
};
