import { Router } from 'express';

import { createNewTodo } from '../controllers/todos/create-new-todo';
import { deleteTodo } from '../controllers/todos/delete-todo';
import { getTodos } from '../controllers/todos/get-todos';
import { updateTodo } from '../controllers/todos/update-todo';

import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateUserAuthorizedToAccessTodoInfo } from '../middlewares/validate-user-allowed-to-access-info';

const router = Router();

router.post('/create', [validateJWT], createNewTodo);

router.put(
  '/update/:todoId',
  [validateJWT, validateUserAuthorizedToAccessTodoInfo, validateFields],
  updateTodo
);

router.delete(
  '/delete/:todoId',
  [validateJWT, validateUserAuthorizedToAccessTodoInfo, validateFields],
  deleteTodo
);

router.get('/get', [validateJWT], getTodos);

module.exports = router;
