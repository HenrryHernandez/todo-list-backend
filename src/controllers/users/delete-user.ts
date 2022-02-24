import { Request, Response } from 'express';

import User from '../../models/user.model';

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await User.destroy({ where: { id } });

    return res
      .status(200)
      .json({ ok: true, error: null, msg: 'User deleted successfully' });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, error: error, msg: "User couldn't be deleted" });
  }
};