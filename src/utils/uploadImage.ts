import multer from "multer"
import path from "path";
import fs from 'fs';

// Ensure upload directory exists. and genarate the path if needed.
const uploadDir = path.join(process.cwd(), 'uploads/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },

})

export const upload = multer({ storage: storage })