import multer from "multer"
import path from "path";
import fs from 'fs';

// Ensure upload directory exists. and genarate the path if needed.
let uploadDir = path.join(process.cwd(), 'uploads')

// if(isImage) {
//   uploadDir = path.join(process.cwd(), 'uploads/images');
// }
uploadDir = path.join(process.cwd(), 'uploads/images');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    // console.log("file", file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = file?.originalname.split('.').pop() || 'unknown';
    const fileName = file.fieldname + '-' + uniqueSuffix + "." + extension
    req.image_path = path.join(uploadDir, fileName) 
    req.image_name = fileName;
    cb(null, fileName)
  },

})

export const upload = multer({ storage: storage })