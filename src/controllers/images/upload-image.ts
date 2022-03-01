import { Request, Response } from 'express';

import { deleteImageFromDisc } from '../../helpers/delete-image-from-disc';

import Image from '../../models/image.model';

export const uploadImage = async (req: Request, res: Response) => {
  const { id, createdAt, updatedAt, ...data } = req.body;

  try {
    const { imageName }: any = await Image.create(data);

    return res.status(200).json({ ok: true, msg: '', imageName });
  } catch (error) {
    console.log(error);

    deleteImageFromDisc(data.imageName);

    return res
      .status(400)
      .json({ ok: false, msg: "Image couldn't be uploaded." });
  }
};
