import { Request, Response } from 'express';

import Todo from '../../models/todo.model';

export const createNewTodo = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const { title = '', description = '' } = req.body;

  try {
    const todo: any = await Todo.create({ userId, title, description });

    return res.status(200).json({
      ok: true,
      msg: 'Todo created successfully.',
      todo: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        images: [],
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      ok: false,
      msg: "Todo couldn't be created.",
      todo: null,
    });
  }
};
