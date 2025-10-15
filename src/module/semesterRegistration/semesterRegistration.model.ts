import mongoose, { Schema } from "mongoose";
import { ISemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

// SemesterRegistration Schema
const SemesterRegistrationSchema = new Schema<ISemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    default: SemesterRegistrationStatus.UPCOMING,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    required: true,
  },
  maxCredit: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
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