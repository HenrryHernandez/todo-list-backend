import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth/login';

import { userExistsByUsername } from '../helpers/custom-validators';

import { validateCorrectPassword } from '../middlewares/validate-correct-password';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post(
  '/login',
  [
    check('username', 'Username required.').not().isEmpty(),
    check('username').custom(userExistsByUsername),

    check('password', 'Password required.').not().isEmpty(),

    validateFields,

    validateCorrectPassword,
  ],
  login
);

module.exports = router;
