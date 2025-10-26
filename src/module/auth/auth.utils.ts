import AppError from "../../errors/AppError";
import { IUser } from "../common/user/user.interface";
import { Status } from "./auth.constant";

export function validateUserExistence(user: IUser | null | undefined): void {
    if (!user) {
      throw new AppError(404, "User Doesn't Exist");
    }
  
    if (user.status === Status.BLOCKED) {
      throw new AppError(404, "User is Blocked");
    }
  
    if (user.isDeleted === true) {
      throw new AppError(404, "User is Deleted");
    }
  }
  