import { Request, Response } from 'express';

import User from '../../models/user.model';

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await User.destroy({ where: { id: userId } });

    return res
      .status(200)
      .json({ ok: true, msg: 'User deleted successfully.' });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, msg: "User couldn't be deleted." });
  }
};
