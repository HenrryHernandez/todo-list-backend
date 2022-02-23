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
      msg: 'There is no token in the request',
    });
  }

  try {
    const { uid }: any = jwt.verify(
      token,
      process.env.PRIVATE_KEY?.toString ?? ''
    );

    const user: any = await User.findOne({
      attributes: ['id'],
      where: { id: uid },
    });

    if (!user) {
      return res.status(401).json({
        msg: 'User not found',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};
