import mongoose, { Schema } from "mongoose";
import { GradeList, ICourseMarks, IEnrolledCourse, StatusCourseMarksList } from "./enrolledCourse.interface";
import { Status, EnrolledCourseStatusList } from "./enrolledCourse.constant";

const CourseMarksSchema = new Schema<ICourseMarks>(
  {
    classTestMarks: {
      type: Number,
      required: true,
      default: 0,
    },
    midTermMarks: {
      type: Number,
      required: true,
      default: 0,
    },
    assignmentMarks: {
      type: Number,
      required: true,
      default: 0,
    },
    finalTermMarks: {
      type: Number,
      required: true,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: StatusCourseMarksList, // e.g. ["ACTIVE", "INACTIVE", "PENDING"]
      required: true,
    },
  },
  {
    _id: false, // if you embed this inside another schema, you usually don’t need a separate _id
  }
);

export const CourseMarksModel = mongoose.model<ICourseMarks>(
  "CourseMarks",
  CourseMarksSchema
);

// EnrolledCourseSchema
const EnrolledCourseSchema = new Schema<IEnrolledCourse>(
  {
    studentId: {
      type: String,
      required: true,
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      ref: "OfferedCourse",
      required: true,
    },
    status: {
      type: String,
      enum: EnrolledCourseStatusList,
      required: true,
      default: Status.ACTIVE,
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
    courseMarks: {
      type: Object, // or define a sub-schema if ICourseMarks is structured
      required: false,
    },
    totalMarks: {
      type: Number,
      default: 0,
    },
    grade: {
      type: String, // A, B, C, D, F
      enum: GradeList,
    },
    gradePoints: {
      type: Number,
      min: 0.0,
      max: 4.0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isFailed: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);




// EnrolledCourse Model
export const EnrolledCourseModel = mongoose.model<IEnrolledCourse>('EnrolledCourse', EnrolledCourseSchema);