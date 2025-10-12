import { Types } from "mongoose";
import { IName, IPersonalInfo } from "../common/user/user.interface";

export type IStatus = "active" | "inactive" | "pending" | "blocked" | "deleted";
export const STATUS_LIST: IStatus[] = ["active", "inactive", "pending", "blocked", "deleted"];

export type IParent = {
    id: string;
    name: IName;
    email: string;
    phone: string;
    address?: string;
}
export interface IGuardian {
    name: IName;
    email: string;
    phone: string;
    address?: string;
}
export interface ILocalGuardian extends IGuardian {
    occupation: string;
}

export interface IStudent extends IPersonalInfo {
    id: string;
    user: Types.ObjectId;
    guardian?: IGuardian;
    parent?: IParent[];
    // parent?: [IParent, IParent?]; /** This allows your student to have 0, 1, or multiple parents. */
    localGuardian?: ILocalGuardian;
    admissionSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    isActive: boolean;
    status?: IStatus;
    isDeleted: boolean;

}