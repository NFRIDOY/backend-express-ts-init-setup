import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IAcademicSemester } from "./academicSemester.interface";
import config from "../../config";

// User Schema
const AcademicSemesterSchema = new Schema<IAcademicSemester>({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  year: {
    type: Date,
    required: true
  },
  startMonth: {
    type: String,
    required: true
  },
  endMonth: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  });

// before saving on the db
// AcademicSemesterSchema.pre('save', async function (next) {
//   const user = this;
//   console.log('user', user)

//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt)
//   );

//   next();
// })

// pass is not on the IStudent fix it
// AcademicSemesterSchema.post('save', function (doc, next) {
//   doc.password = "";
//   next();
// })


// User Model
export const AcademicSemesterModel = mongoose.model('AcademicSemester', AcademicSemesterSchema);