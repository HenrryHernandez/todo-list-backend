import fs from 'fs';

import { imagesPath } from '../utils/app-strings';

export const deleteImage = (imageName: string) => {
  try {
    fs.unlinkSync(`${imagesPath}/${imageName}`);
  } catch (error) {
    console.log(error);
  }
};
