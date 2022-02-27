import { Request, Response } from 'express';

import User from '../../models/user.model';
import { generateJWT } from '../../helpers/generate-jwt';

export const login = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const user: any = await User.findOne({
      attributes: ['id', 'name', 'lastname1', 'username', 'profilePicture'],
      where: { username },
    });

    const token = await generateJWT(user.id);

    return res.status(200).json({
      ok: true,
      error: null,
      msg: 'Successful login.',
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      ok: false,
      error: error,
      msg: 'Something was wrong while logging in.',
      user: null,
      token: null,
    });
  }
};
