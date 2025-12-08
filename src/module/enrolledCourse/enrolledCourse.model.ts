import mongoose, { Schema } from "mongoose";
import { IEnrolledCourse } from "./enrolledCourse.interface";
import { Status, EnrolledCourseStatusList } from "./enrolledCourse.constant";

// EnrolledCourseSchema
const EnrolledCourseSchema = new Schema<IEnrolledCourse>({
  studentId: {
    type: String,
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'OfferedCourse',
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