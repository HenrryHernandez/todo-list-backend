import { Request, Response } from 'express';

import Image from '../../models/image.model';
import Todo from '../../models/todo.model';

export const getTodos = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  try {
    const todos: any = await Todo.findAll({
      attributes: ['id', 'title', 'description'],
      where: { userId },
    });

    await Promise.all(
      todos.map(async (todo: any) => {
        todo.dataValues.images = await getTodoImages(todo.id);
      })
    );

    return res.status(200).json({ ok: true, error: null, msg: '', todos });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      ok: false,
      error: error,
      msg: "Couldn't get todos.",
      todos: null,
    });
  }
};

const getTodoImages = async (todoId: number) => {
  try {
    const images: any = await Image.findAll({
      attributes: ['imageName'],
      where: { todoId },
    });

    const todoImages = images.map((image: any) => {
      return image.imageName;
    });

    return todoImages;
  } catch (error) {
    console.log(error);

    return [];
  }
};
