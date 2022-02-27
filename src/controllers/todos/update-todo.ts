import { Request, Response } from 'express';

import Todo from '../../models/todo.model';

export const updateTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { ...data } = req.body;

  try {
    await Todo.update(data, { where: { id: todoId } });

    return res
      .status(200)
      .json({ ok: true, error: null, msg: 'Todo updated successfully.' });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, error: error, msg: "Todo couldn't be updated." });
  }
};
