import { Types } from "mongoose";
import { Days, EnrolledCourseStatusList } from "./enrolledCourse.constant";

export type IDays = typeof Days[keyof typeof Days]; // Type
export type IEnrolledCourseStatus = typeof EnrolledCourseStatusList[keyof typeof EnrolledCourseStatusList]; // Type

export type IEnrolledCourse = {
  student: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  offeredCourseSection: Types.ObjectId;
  status: IEnrolledCourseStatus;
};

// export type ISchedule = {
//   days: IDays[];
//   startTime: string;
//   endTime: string;
// };