import { Response, NextFunction } from "express";

import { IGetUserAuthenticated, IUser } from "../interfaces";
import { getUserByToken } from "../queries/user.queries";

const isAuthenticated = async (
  req: IGetUserAuthenticated,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const user: IUser | null = await getUserByToken(
        req.headers.authorization.replace("Bearer ", "")
      );
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
