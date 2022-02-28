import { Request, Response } from 'express';
import { deleteImage } from '../../helpers/delete-image';

import Image from '../../models/image.model';

export const uploadImage = async (req: Request, res: Response) => {
  const { ...data } = req.body;

  try {
    const { imageName }: any = await Image.create(data);

    return res.status(200).json({ ok: true, error: null, msg: '', imageName });
  } catch (error) {
    console.log(error);

    deleteImage(data.imageName);

    return res
      .status(400)
      .json({ ok: false, error: null, msg: "Image couldn't be uploaded." });
  }
};
