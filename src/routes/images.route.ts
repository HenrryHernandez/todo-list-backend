import { Router } from 'express';

import { upload } from '../helpers/upload-image';

const router = Router();

router.post('/upload', [upload.array('todo-image')]);

module.exports = router;
