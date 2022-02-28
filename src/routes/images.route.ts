import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploaded-images'));
  },
  filename: (req, file, cb) => {
    let theFile = file.originalname.split('.');
    const fileType = theFile[theFile.length - 1];
    cb(null, `${uuidv4()}.${fileType}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  /*if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }*/
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post('/upload', [upload.array('todo-image')]);

module.exports = router;
