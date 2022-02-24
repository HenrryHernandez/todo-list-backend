import { Router } from 'express';
import { check } from 'express-validator';

import { createNewUser } from '../controllers/users/create-new-user';
import { deleteUser } from '../controllers/users/delete-user';
import { updateUser } from '../controllers/users/update-user';

import {
  userExists,
  userExistsById,
  validPasswordToUpdate,
  validUsernameToUpdate,
  validPassword,
} from '../helpers/custom-validators';

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

router.put(
  '/update/:id',
  [
    check('id').custom(userExistsById),

    check('username').custom(validUsernameToUpdate),

    check('password').custom(validPasswordToUpdate),

    validateFields,
  ],
  updateUser
);

router.delete(
  '/delete/:id',
  [check('id').custom(userExistsById), validateFields],
  deleteUser
);

module.exports = router;
