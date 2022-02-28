import { Request, Response, NextFunction } from 'express';

import Image from '../models/image.model';

import { accessDiniedImagePath } from '../utils/app-strings';

export const validateCanGetImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { imageName } = req.params;
  const { todo_id } = req.headers;

  const image: any = await Image.findOne({
    attributes: ['todoId'],
    where: { imageName },
  });

  if (!image || image.todoId != todo_id) {
    return res.sendFile(accessDiniedImagePath);
  }

  next();
};
