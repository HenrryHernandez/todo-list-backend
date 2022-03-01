import { Request, Response } from 'express';

import { deleteImageFromDisc } from '../../helpers/delete-image-from-disc';

import User from '../../models/user.model';

export const uploadProfilePicture = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { profilePicture } = req.body;

  try {
    await User.update({ profilePicture }, { where: { id } });

    return res.status(200).json({ ok: true, msg: '', profilePicture });
  } catch (error) {
    console.log(error);

    deleteImageFromDisc(profilePicture);

    return res
      .status(400)
      .json({ ok: false, msg: "Image couldn't be uploaded." });
  }
};
