import { Request, Response } from 'express';
import Todo from '../../models/todo.model';

export const getTodos = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  try {
    const todos = await Todo.findAll({
      attributes: ['title', 'description'],
      where: { userId },
    });

    return res.status(200).json({ ok: true, error: null, msg: '', todos });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, error: error, msg: "Couldn't get todos." });
  }
};
