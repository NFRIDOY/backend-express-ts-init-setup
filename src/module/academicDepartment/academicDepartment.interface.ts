import { Types } from "mongoose";

export type IAcademicDepartment = {
    name: string; // e.g. Computer Science and Engineering
    code?: string; // e.g. 01
    alfaCode?: string; // e.g. CSE
    shortName?: string; // e.g. CSE
    description?: string; // e.g. Computer Science and Engineering is a branch of engineering that deals with the study of computers and their applications.
    initiatedYear?: string; // e.g. 2025
    isActive?: boolean; // e.g. true
    isDeleted?: boolean; // e.g. false
    academicFaculty: Types.ObjectId;
}