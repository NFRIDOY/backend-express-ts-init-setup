import { Types } from "mongoose";
import { IPersonalInfo, IStatus } from "../common/user/user.interface";

// export type IStatus = "active" | "inactive" | "pending" | "blocked" | "deleted";
// export const STATUS_LIST: IStatus[] = ["active", "inactive", "pending", "blocked", "deleted"];

export interface IPreRequisiteCourses {
    course: Types.ObjectId;
    isDeleted: boolean;
}

export interface ICourse {
    title: string;
    prifix: string;
    courseCode: string;
    credit: number;
    preRequisiteCourses?: IPreRequisiteCourses[];
    // preRequisite: [IPreRequisiteCourses]; // 🚨 wrong
    isActive: boolean;
    status?: IStatus;
    isDeleted: boolean;
}