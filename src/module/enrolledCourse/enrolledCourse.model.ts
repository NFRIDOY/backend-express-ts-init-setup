import mongoose, { Schema } from "mongoose";
import { IEnrolledCourse } from "./enrolledCourse.interface";
import { Status, EnrolledCourseStatusList } from "./enrolledCourse.constant";

// EnrolledCourseSchema
const EnrolledCourseSchema = new Schema<IEnrolledCourse>({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'offeredCourse',
    required: true,
  },
  offeredCourseSection: {
    type: Schema.Types.ObjectId,
    ref: 'offeredCourseSection',
    required: true,
  },
  status: {
    type: String,
    enum: EnrolledCourseStatusList,
    required: true,
    default: Status.ACTIVE
  },
},
  {
    timestamps: true,
  });


// EnrolledCourse Model
export const EnrolledCourseModel = mongoose.model<IEnrolledCourse>('EnrolledCourse', EnrolledCourseSchema);