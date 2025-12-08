import { Types } from "mongoose";
import { EnrolledCourseStatusList, GradeObject, StatusCourseMarksObject } from "./enrolledCourse.constant";


export type IEnrolledCourseStatus = typeof EnrolledCourseStatusList[keyof typeof EnrolledCourseStatusList]; // Type

export type IEnrolledCourse = {
  studentId: string;
  offeredCourse: Types.ObjectId;
  // courseMarks: ICourseMarks;
  status: IEnrolledCourseStatus;
};

export const StatusCourseMarksList = Object.values(StatusCourseMarksObject); // array

export type IStatusCourseMarks = typeof StatusCourseMarksList[keyof typeof StatusCourseMarksList]; // Type

export const GradeList = Object.values(GradeObject); // array

export type IGrade = typeof GradeList[keyof typeof GradeList]; // Type

export interface ICourseMarks {
  classTestMarks: number;
  midTermMarks: number;
  assignmentMarks: number;
  finalTermMarks: number;
  totalMarks: number;
  grade: IGrade; // A, B, C, D, F
  gradePoints: number; // 4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.0
  isFailed?: boolean;
  isDeleted: boolean; // true or false
  status: IStatusCourseMarks; 
}
