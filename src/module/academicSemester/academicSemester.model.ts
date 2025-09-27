import mongoose, { Schema } from "mongoose";
import { AcademicSemesterCodes, AcademicSemesterNames, IAcademicSemester, Months } from "./academicSemester.interface";

// User Schema
const AcademicSemesterSchema = new Schema<IAcademicSemester>({
  name: {
    type: String,
    enum: {
      values: AcademicSemesterNames,
      message: "AcademicSemesterNames is Needed"
    },
    required: true
  },
  code: {
    type: String,
    enum: {
      values: AcademicSemesterCodes,
      message: "AcademicSemesterCodes is Needed"
    },
    required: true
  },
  year: {
    type: Date,
    required: true
  },
  startMonth: {
    type: String,
    enum: {
      values: Months,
      message: "Start Month are not valid",
    },
    required: true
  },
  endMonth: {
    type: String,
    enum: {
      values: Months,
      message: "End Month are not valid",
    },
    required: true
  },
},
  {
    timestamps: true
  });

// AcademicSemester Model
export const AcademicSemesterModel = mongoose.model<IAcademicSemester>('AcademicSemester', AcademicSemesterSchema);