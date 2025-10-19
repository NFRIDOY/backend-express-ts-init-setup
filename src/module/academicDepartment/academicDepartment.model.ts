import mongoose, { Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";

// User Schema
const AcademicDepartmentSchema = new Schema<IAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  alfaCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  shortName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
  },
  initiatedYear: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicFaculty',
    required: true,
  },
},
  {
    timestamps: true,
  });
// ✨ check a year one semeter type (e.g. 2025 has one Autumn and one Summer and one Fall)
// AcademicDepartmentSchema.pre("save", function (next) {
//   if (this.name) {
//     this.name = this.name.trim();
//   }
//   next();
// });


// AcademicSemester Model
export const AcademicDepartmentModel = mongoose.model<IAcademicDepartment>('academicDepartment', AcademicDepartmentSchema);