import { Router } from 'express';

import { createNewTodo } from '../controllers/todos/create-new-todo';
import { updateTodo } from '../controllers/todos/update-todo';

import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.post('/create', [validateJWT], createNewTodo);

router.put('/update/:todoId', [validateJWT], updateTodo);

module.exports = router;
