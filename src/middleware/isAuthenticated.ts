import { Response, NextFunction } from "express";

import { User } from "../database/models/User";
import { IGetUserAuthenticated } from "../interfaces";

const isAuthenticated = async (
  req: IGetUserAuthenticated,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const user = await User.findOne({
        token: req.headers.authorization.replace("Bearer ", ""),
      });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        req.user = user;
        return next();
      }
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = isAuthenticated;
