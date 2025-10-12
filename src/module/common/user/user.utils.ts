// year semesterCode 4digit number

import { IAcademicDepartment } from "../../academicDepartment/academicDepartment.interface";
import { IAcademicSemester } from "../../academicSemester/academicSemester.interface";
import { IRole } from "./user.interface";
import { UserModel } from "./user.model";

const findLastIdOfThisRole = async (role: IRole) => {
  const lastStudent = await UserModel.findOne(
    {
      role: role,
    },
    {
      id: 1,
      _id: 0,
    }, // projection
  ).sort({
    createdAt: -1,
  })
    .lean();

  //2030 01 0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString();
  const lastStudentId = await findLastIdOfThisRole("student")
  const lastStudentCode = lastStudentId?.substring(4, 6) // 01
  const lastStudentYear = lastStudentId?.substring(0, 4) // 2025
  const newStudentSemesterCode = payload.code;
  const newStudentSemesterYear = payload.year;
  let incrementId = '';

  if (lastStudentId && lastStudentCode === newStudentSemesterCode && lastStudentYear === newStudentSemesterYear) {
    currentId = lastStudentId?.substring(6)
  }
  incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  // 0001+ 1 = 2



  incrementId = `${payload.year}${payload.code}${incrementId}`;
  console.log("id = ", incrementId)

  return incrementId;
};

export const generateFacultyId = async (payload: IAcademicDepartment) => {
  /** 
   * example: 2025010001
   * year + department + 0000
   * */ 
  // first time 0000
  //0001  => 1
  let currentId = (0).toString();
  const lastFacultyId = await findLastIdOfThisRole("faculty")
  const lastFacultyCode = lastFacultyId?.substring(4, 6) // 01
  // const lastStudentYear = lastStudentId?.substring(0, 4) // 2025
  const thisYear = new Date().getFullYear();
  const newFacultyDepartmentCode = payload.code;
  let incrementId = '';

  if (lastFacultyId && lastFacultyCode === newFacultyDepartmentCode) {
    currentId = lastFacultyId?.substring(6)
  }
  incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  // 0001+ 1 = 2

  incrementId = `F${thisYear}${payload.code}${incrementId}`;
  console.log("id = ", incrementId)

  return incrementId;
};