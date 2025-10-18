import mongoose, { Schema } from "mongoose";
import { IOfferedCourse } from "./offeredCourse.interface";
import { Days, OfferedCourseStatus, OfferedCourseStatusList } from "./offeredCourse.constant";

// OfferedCourseSchema
const OfferedCourseSchema = new Schema<IOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
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
    default: OfferedCourseStatus.ACTIVE
  },
},
  {
    timestamps: true,
  });


// AcademicSemester Model
export const OfferedCourseModel = mongoose.model<IOfferedCourse>('OfferedCourse', OfferedCourseSchema);