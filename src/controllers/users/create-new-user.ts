import { Request, Response } from 'express';

import { getEncryptedPassword } from '../../helpers/encryptions';

import User from '../../models/user.model';

export const createNewUser = async (req: Request, res: Response) => {
  const { ...data } = req.body;

  data.password = getEncryptedPassword(data.password);

  try {
    await User.create(data);

    return res
      .status(200)
      .json({ ok: true, msg: 'User created successfully.' });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, msg: "User couldn't be created." });
  }
};
