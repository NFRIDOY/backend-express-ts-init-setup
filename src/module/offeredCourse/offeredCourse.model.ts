import mongoose, { Schema } from "mongoose";
import { IOfferedCourse } from "./offeredCourse.interface";
import { Days, Status, OfferedCourseStatusList } from "./offeredCourse.constant";

// OfferedCourseSchema
const OfferedCourseSchema = new Schema<IOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'semesterRegistration',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'academicSemester',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicFaculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'faculty',
    required: true,
  },
  maxCapacity: {
    type: Number,
    default: 10,
  },
  section: {
    type: Number,
    required: true,
    default: 1,
  },
  days: [
    {
      type: String,
      enum: Days,
      required: true,
    }
  ],
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: OfferedCourseStatusList,
    required: true,
    default: Status.ACTIVE
  },
},
  {
    timestamps: true,
  });


// AcademicSemester Model
export const OfferedCourseModel = mongoose.model<IOfferedCourse>('OfferedCourse', OfferedCourseSchema);