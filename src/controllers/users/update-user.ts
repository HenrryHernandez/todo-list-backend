import { Request, Response } from 'express';

import { getEncryptedPassword } from '../../helpers/encryptions';

import User from '../../models/user.model';

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { id, createdAt, updatedAt, ...data } = req.body;

  if (data.password) data.password = getEncryptedPassword(data.password);

  try {
    await User.update(data, { where: { id: userId } });

    return res
      .status(200)
      .json({ ok: true, msg: 'User updated successfully.' });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, msg: "User couldn't be updated." });
  }
};
