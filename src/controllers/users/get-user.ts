import { Request, Response } from 'express';

import { generateJWT } from '../../helpers/generate-jwt';

import User from '../../models/user.model';

export const getBasicUserInfoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user: any = await User.findOne({
      attributes: ['id', 'name', 'lastname1', 'username', 'profilePicture'],
      where: { id },
    });

    const token = await generateJWT(user.id);

    return res
      .status(200)
      .json({ ok: true, error: null, msg: '', user, token });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, error: error, msg: "Couldn't get user" });
  }
};

export const getFullUserInfoById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({
      attributes: [
        'id',
        'name',
        'lastname1',
        'lastname2',
        'username',
        'profilePicture',
      ],
      where: { id: userId },
    });

    return res.status(200).json({ ok: true, error: null, msg: '', user });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, error: error, msg: "Couldn't get user.", user: null });
  }
};
