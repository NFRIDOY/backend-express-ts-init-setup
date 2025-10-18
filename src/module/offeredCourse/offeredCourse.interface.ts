import { Types } from "mongoose";
import { Days, OfferedCourseStatusList } from "./offeredCourse.constant";

export type IDays = typeof Days[keyof typeof Days]; // Type
export type IOfferedCourseStatus = typeof OfferedCourseStatusList[keyof typeof OfferedCourseStatusList]; // Type

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
  status: IOfferedCourseStatus;
};

// export type ISchedule = {
//   days: IDays[];
//   startTime: string;
//   endTime: string;
// };