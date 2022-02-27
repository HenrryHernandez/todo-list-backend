import { Request, Response, NextFunction } from 'express';

import Todo from '../models/todo.model';

export const validateUserAuthorizedToAccessUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, id } = req.params;

  if (+userId !== +id) {
    return res.status(401).json({
      ok: false,
      error: null,
      msg: 'User not authorized to access the information.',
    });
  }

  next();
};

export const validateUserAuthorizedToAccessTodoInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { todoId, id: userId } = req.params;

  const todo: any = await Todo.findOne({
    attributes: ['userId'],
    where: { id: todoId },
  });

  if (!todo || +userId !== +todo.userId) {
    return res.status(401).json({
      ok: false,
      error: null,
      msg: 'User not authorized to access the information.',
    });
  }

  next();
};
