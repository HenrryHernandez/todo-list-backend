import { Request, Response } from 'express';

import Todo from '../../models/todo.model';

export const updateTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { title, description } = req.body;

  try {
    await Todo.update({ title, description }, { where: { id: todoId } });

    return res
      .status(200)
      .json({ ok: true, msg: 'Todo updated successfully.' });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, msg: "Todo couldn't be updated." });
  }
};
