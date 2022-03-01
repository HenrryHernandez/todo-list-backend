import fs from 'fs';
import sharp from 'sharp';

import { imagesPath } from '../utils/app-strings';

export const sharpImage = async (file: any) => {
  const { filename, originalname } = file;
  const newName = `${originalname.split('.')[0]}_${filename}`;

  await sharp(file.path)
    .resize(512, 512, { fit: 'fill' })
    .toFile(`${imagesPath}/${newName}`)
    .then((data) => {
      console.log('THE IMAGE IS = ', data);
    });

  fs.unlinkSync(file.path);

  return newName;
};
