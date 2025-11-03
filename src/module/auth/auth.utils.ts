import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { IUser } from "../common/user/user.interface";
import { Status } from "./auth.constant";
import config from "../../config";

export function validateUserExist(user: IUser | null | undefined): void {
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

export const verifyToken = async (token: string) => {
  try {
    const decoded = await jwt.verify(token as string, config.jwt_access_secret as string) as JwtPayload
    if (!decoded) {
      throw new AppError(401, "Invalid Token");
    }
    return decoded
  } catch (err) {
    throw new AppError(401, "Invalid Token", config.NODE_ENV_DEV ? (err as Error) : undefined);
  }
}