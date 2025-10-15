import mongoose, { Schema } from "mongoose";
import { ISemesterRegistration } from "./semesterRegistration.interface";

// User Schema
const SemesterRegistrationSchema = new Schema<ISemesterRegistration>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  code: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    index: true,
  },
  alfaCode: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    index: true,
  },
  shortName: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: false,
    index: true,
  },
  initiatedYear: {
    type: String,
    required: false,
    trim: true,
    index: true,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
},
  {
    timestamps: true,
  });
// ✨ check a year one semeter type (e.g. 2025 has one Autumn and one Summer and one Fall)
// SemesterRegistrationSchema.pre("save", function (next) {
//   if (this.name) {
//     this.name = this.name.trim();
//   }
//   next();
// });


// AcademicSemester Model
export const SemesterRegistrationModel = mongoose.model<ISemesterRegistration>('SemesterRegistration', SemesterRegistrationSchema);