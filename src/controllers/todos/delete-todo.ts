import { Request, Response } from 'express';

import Todo from '../../models/todo.model';

export const deleteTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;

  try {
    await Todo.destroy({ where: { id: todoId } });

    return res
      .status(200)
      .json({ ok: true, msg: 'Todo deleted successfully.' });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ ok: false, msg: "Todo couldn't be deleted." });
  }
};
