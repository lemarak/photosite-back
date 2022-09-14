import { IUser } from "./user.interface";

declare global {
  declare namespace Express {
    interface User extends IUser {}
  }
}
