import { Request, Response } from 'express';
import fs from 'fs';

import { defaultImagePath, imagesPath } from '../../utils/app-strings';

export const getImage = async (req: Request, res: Response) => {
  const { imageName } = req.params;

  const imagePath = `${imagesPath}/${imageName}`;

  if (fs.existsSync(imagePath)) {
    return res.sendFile(imagePath);
  }

  return res.sendFile(defaultImagePath);
};
