import { Router } from 'express';

import { uploadImage } from '../controllers/images/upload-image';
import { deleteImage } from '../controllers/images/delete-image';

import { sharpImage } from '../helpers/sharp-image';
import { upload } from '../helpers/upload-image';

import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post(
  '/upload',
  [validateJWT, validateFields, upload.array('todo-image'), sharpImage],
  uploadImage
);

router.delete('/delete/:imageId', [validateJWT, validateFields], deleteImage);

module.exports = router;
