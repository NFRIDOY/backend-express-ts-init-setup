import { Types } from "mongoose";
import { Days, OfferdCoursesStatusList } from "./offerdCourses.constant";

export type IDays = typeof Days[keyof typeof Days]; // Type
export type IOfferdCoursesStatus = typeof OfferdCoursesStatusList[keyof typeof OfferdCoursesStatusList]; // Type

export type IOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: IDays[];
  startTime: string;
  endTime: string;
  status: IOfferdCoursesStatus;
};

// export type ISchedule = {
//   days: IDays[];
//   startTime: string;
//   endTime: string;
// };