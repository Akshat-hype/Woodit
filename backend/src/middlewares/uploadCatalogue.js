import multer from 'multer';

const storage = multer.memoryStorage();

export const uploadCataloguePdf = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }

    cb(null, true);
  },
});