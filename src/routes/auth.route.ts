import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth/login';

import { userExistsByUsername } from '../helpers/custom-validators';

import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post(
  '/login',
  [
    check('username', 'Username required.').not().isEmpty(),
    check('username').custom(userExistsByUsername),

    check('password', 'Password required.').not().isEmpty(),

    validateFields,
  ],
  login
);

module.exports = router;
