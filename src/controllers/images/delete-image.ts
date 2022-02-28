import { Request, Response } from 'express';

import { deleteImageFromDisc } from '../../helpers/delete-image-from-disc';

import Image from '../../models/image.model';

export const deleteImage = async (req: Request, res: Response) => {
  const { imageId } = req.params;

  try {
    const imageName = await getImageName(imageId);

    await Image.destroy({ where: { id: imageId } });

    deleteImageFromDisc(imageName);

    return res.status(200).json({
      ok: true,
      error: null,
      msg: 'Image deleted successfully.',
      imageName,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ ok: false, error: null, msg: "Image couldn't be deleted." });
  }
};

const getImageName = async (id: string) => {
  try {
    const { imageName }: any = await Image.findOne({
      attributes: ['imageName'],
      where: { id },
    });

    return imageName;
  } catch (error) {
    console.log(error);

    return '';
  }
};
