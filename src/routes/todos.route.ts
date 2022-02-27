import { Router } from 'express';

import { createNewTodo } from '../controllers/todos/create-new-todo';
import { deleteTodo } from '../controllers/todos/delete-todo';
import { getTodos } from '../controllers/todos/get-todos';
import { updateTodo } from '../controllers/todos/update-todo';

import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.post('/create', [validateJWT], createNewTodo);

router.put('/update/:todoId', [validateJWT], updateTodo);

router.delete('/delete/:todoId', [validateJWT], deleteTodo);

router.get('/get', [validateJWT], getTodos);

module.exports = router;
