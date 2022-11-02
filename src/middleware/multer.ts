import fs from "fs";
import multer from "multer";
import path from "path";
import { DestinationCallback, FileNameCallback } from "../interfaces";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req: any, __: any, cb: DestinationCallback) => {
      const dir = path.join(
        __dirname,
        `../public/img/pictures/${req.user.account.slug}`
      );
      fs.exists(dir, (exist) => {
        if (!exist) {
          return fs.mkdir(dir, (error) => cb(error, dir));
        }
        return cb(null, dir);
      });
    },
    filename: (_: any, file: Express.Multer.File, cb: FileNameCallback) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});
