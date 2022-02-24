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

export const userExistsById = async (id: number) => {
  const user: any = await User.findOne({
    attributes: ['id'],
    where: { id },
  });

  if (!user) {
    throw new Error(`Username with id ${id} does not exist`);
  }
};

export const validPassword = (password: string) => {
  const validPassword = password.match(
    /^(?=.*[0-9])(?=.*[!@#$%^.&*])[a-zA-Z0-9!@#$%^.&*]{8,16}$/
  );

  if (!validPassword) {
    throw new Error('Password not valid');
  }

  return true;
};

export const validPasswordToUpdate = (password: string | null) => {
  if (!password) return true;

  return validPassword(password);
};

export const validUsernameToUpdate = (username: string | null) => {
  if (!username) return true;

  if (username.length < 6)
    throw new Error('The username should be at least 6 characters long');

  return userExists(username);
};
