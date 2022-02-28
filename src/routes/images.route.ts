import { Router } from 'express';

import { uploadImage } from '../controllers/images/upload-image';

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

module.exports = router;
