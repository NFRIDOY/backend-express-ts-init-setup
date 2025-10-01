import mongoose, { Schema } from "mongoose";
import { IAcademicFaculty } from "./academicFaculty.interface";

// User Schema
const AcademicFacultySchema = new Schema<IAcademicFaculty>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
},
{
  timestamps: true
});
// ✨ check a year one semeter type (e.g. 2025 has one Autumn and one Summer and one Fall)
AcademicFacultySchema.pre("save", function(next) {
  if (this.name) {
    this.name = this.name.trim();
  }
  next();
});


// AcademicSemester Model
export const AcademicFacultyModel = mongoose.model<IAcademicFaculty>('AcademicFaculty', AcademicFacultySchema);