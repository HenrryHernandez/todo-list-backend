import { Router } from 'express';

import { uploadImage } from '../controllers/images/upload-image';
import { deleteImage } from '../controllers/images/delete-image';
import { getImage } from '../controllers/images/get-image';
import { uploadProfilePicture } from '../controllers/images/upload-profile-picture';

import { upload } from '../helpers/upload-image';

import { sharpTodoImage } from '../middlewares/sharp-todo-image';
import { sharpProfilePicture } from '../middlewares/sharp-profile-picture';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';
import { validateCanGetImage } from '../middlewares/validate-can-get-image';

const router = Router();

router.post(
  '/upload',
  [validateJWT, validateFields, upload.array('todoImage'), sharpTodoImage],
  uploadImage
);

router.post(
  '/upload/profile-picture',
  [
    validateJWT,
    validateFields,
    upload.array('profilePicture'),
    sharpProfilePicture,
  ],
  uploadProfilePicture
);

router.delete('/delete/:imageId', [validateJWT, validateFields], deleteImage);

router.get(
  '/:imageName',
  [validateJWT, validateFields, validateCanGetImage],
  getImage
);

module.exports = router;
