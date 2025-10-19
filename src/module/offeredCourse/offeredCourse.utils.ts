import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";


export const isExistValidation = async (
  payload: {
    academicFaculty?: Types.ObjectId;
    academicDepartment?: Types.ObjectId;
    course?: Types.ObjectId;
    faculty?: Types.ObjectId;
  },
) => {

  // Validate academic faculty
  const isAcademicFacultyExists = await AcademicFacultyModel.findById(payload.academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(404, 'This Semester Academic Faculty not found!');
  }

  // Validate academic department
  const isAcademicDepartmentExists = await AcademicDepartmentModel.findById(payload.academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(404, 'This Semester Academic Department not found!');
  }

  // Validate course existence
  const isCourseExists = await CourseModel.findById(payload.course);

  if (!isCourseExists) {
    throw new AppError(404, 'This Course is not exists!');
  }

  // Validate faculty
  const isFacultyExists = await FacultyModel.findById(payload.faculty);
  if (!isFacultyExists) {
    throw new AppError(404, 'This Semester Academic Department not found!');
  }
};