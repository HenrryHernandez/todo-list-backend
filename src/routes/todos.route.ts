import { Router } from 'express';

import { createNewTodo } from '../controllers/todos/create-new-todo';

import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.post('/create', [validateJWT, validateFields], createNewTodo);

module.exports = router;
