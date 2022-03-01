import { Request, Response, NextFunction } from 'express';

import { sharpImage } from '../helpers/sharp-image';

export const sharpTodoImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [file]: any = req.files;

  const newName = sharpImage(file);

  req.body.imageName = newName;

  next();
};
