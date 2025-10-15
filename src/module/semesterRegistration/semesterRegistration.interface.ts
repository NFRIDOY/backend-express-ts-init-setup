import { Types } from "mongoose";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

export type ISemesterRegistrationStatus = typeof SemesterRegistrationStatus[keyof typeof SemesterRegistrationStatus]; // Type

export type ISemesterRegistration = {
    academicSemester: Types.ObjectId;
    status: ISemesterRegistrationStatus;
    startDate: Date;
    endDate: Date;
    minCredit: number;
    maxCredit: number;
    isDeleted: boolean;
}