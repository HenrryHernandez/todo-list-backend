import { Request, Response, NextFunction } from 'express';

export const validateUserAuthorizedToAccessInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, id } = req.params;

  if (+userId !== +id) {
    return res.status(401).json({
      ok: false,
      error: null,
      msg: 'User not authorized to access the information.',
    });
  }

  next();
};
