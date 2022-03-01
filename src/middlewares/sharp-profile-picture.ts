import { Request, Response, NextFunction } from 'express';

import { sharpImage } from '../helpers/sharp-image';

export const sharpProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [file]: any = req.files;

  const newName = await sharpImage(file);

  req.body.profilePicture = newName;

  next();
};
