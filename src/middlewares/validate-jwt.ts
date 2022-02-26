import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('tiktoken');

  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request.',
    });
  }

  try {
    const { uid: userId }: any = jwt.verify(
      token,
      process.env.PRIVATE_KEY + ''
    );

    const user: any = await User.findOne({
      attributes: ['id'],
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        msg: 'User not found.',
      });
    }

    req.params.id = userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Not valid token.',
    });
  }
};
