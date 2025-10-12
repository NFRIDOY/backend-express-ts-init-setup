import { Types } from "mongoose";
import { IPersonalInfo, IStatus } from "../common/user/user.interface";

// export type IStatus = "active" | "inactive" | "pending" | "blocked" | "deleted";
// export const STATUS_LIST: IStatus[] = ["active", "inactive", "pending", "blocked", "deleted"];

export interface IAdmin extends IPersonalInfo {
    id: string;
    user: Types.ObjectId;
    adminCode?: string;
    isActive: boolean;
    status?: IStatus;
    isDeleted: boolean;
}