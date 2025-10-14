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

export interface ICourseFacultyAssignment {
    course: Types.ObjectId;
    faculties: Types.ObjectId[];
    // optional
    assignedBy?: Types.ObjectId; // who assigned the faculty
    assignedAt?: Date;
    roleMap?: Record<string, Types.ObjectId>; // e.g., { lead: id1, assistant: id2 }

}