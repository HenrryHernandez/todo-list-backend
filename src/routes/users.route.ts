import { Router } from 'express';
import { check } from 'express-validator';

import { createNewUser } from '../controllers/users/create-new-user';

import { userExists, validPassword } from '../helpers/custom-validators';

import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post(
  '/create',
  [
    check('name', 'The name is required').not().isEmpty(),

    check('lastname1', 'The first lastname is required').not().isEmpty(),

    check('username', 'The username is required').not().isEmpty(),
    check(
      'username',
      'The username should be at least 6 characters long'
    ).isLength({ min: 6 }),
    check('username').custom(userExists),

    check('password', 'The password is required').not().isEmpty(),
    check(
      'password',
      'The password should be at least 8 characters long'
    ).isLength({ min: 8, max: 16 }),
    check('password').custom(validPassword),

    validateFields,
  ],
  createNewUser
);

module.exports = router;
