import { Request, Response } from 'express';

export const createNewUser = async (req: Request, res: Response) => {
  const { ...data } = req.body;
  console.log(data);

  return res.json({ msg: 'test' });
};
