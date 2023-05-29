import { Request } from "express";

import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, "./src/uploads");
      },
  
      filename: (req: Request, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
        }
  })
  
  const upload = multer({
    storage: storage,
  }).single("image")

export {
  upload
}