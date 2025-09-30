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
    type: String,
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
// ✨ check a year one semeter type (e.g. 2025 has one Autumn and one Summer and one Fall)
AcademicSemesterSchema.pre("save", async function(next) {
  const isSemeterExists = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  })

  // console.log({isSemeterExists})
  if(isSemeterExists) {
    throw new Error("Semeter is already Exists");
  }

  // next();
})


// AcademicSemester Model
export const AcademicSemesterModel = mongoose.model<IAcademicSemester>('AcademicSemester', AcademicSemesterSchema);