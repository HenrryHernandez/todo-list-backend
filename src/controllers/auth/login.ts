import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../../models/user.model';
import { generateJWT } from '../../helpers/generate-jwt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: any = await User.findOne({
      attributes: [
        'id',
        'name',
        'lastname1',
        'lastname2',
        'username',
        'password',
        'profilePicture',
      ],
      where: { username },
    });

    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword)
      return res
        .status(401)
        .json({ ok: false, error: null, msg: 'Incorrect password.' });

    delete user.dataValues.password;

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
    });
  }
};
