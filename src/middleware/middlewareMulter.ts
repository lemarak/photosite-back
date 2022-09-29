import multer from "multer";
import path from "path";
import { DestinationCallback, FileNameCallback } from "../interfaces";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_: any, __: any, cb: DestinationCallback) => {
      cb(null, path.join(__dirname, "../public/img/pictures"));
    },
    filename: (_: any, file: Express.Multer.File, cb: FileNameCallback) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});
