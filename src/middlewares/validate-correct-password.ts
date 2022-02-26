import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user.model';

export const validateCorrectPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const user: any = await User.findOne({
    attributes: ['password'],
    where: { username },
  });

  const isValidPassword = bcryptjs.compareSync(password, user.password);

  if (!isValidPassword)
    return res
      .status(401)
      .json({ ok: false, error: null, msg: 'Incorrect password.' });

  next();
};
