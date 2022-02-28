import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import fs from 'fs';

import { imagesPath } from '../utils/app-strings';

export const sharpImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [file]: any = req.files;

  const { filename, originalname } = file;
  const newName = `${originalname.split('.')[0]}_${filename}`;

  await sharp(file.path)
    .resize(512, 512, { fit: 'fill' })
    .toFile(`${imagesPath}/${newName}`)
    .then((data) => {
      console.log('THE IMAGE IS = ', data);
    });

  fs.unlinkSync(file.path);

  req.body.imageName = newName;

  next();
};
