import User from '../models/user.model';

export const userExists = async (username: string) => {
  const user: any = await User.findOne({
    attributes: ['id'],
    where: { username },
  });

  if (user) {
    throw new Error('Username already exists');
  }
};

export const validPassword = (password: string) => {
  const validPassword = password.match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
  );

  if (!validPassword) {
    throw new Error('Password not valid');
  }

  return true;
};
