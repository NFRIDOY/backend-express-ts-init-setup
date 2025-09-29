// year semesterCode 4digit number

import { IAcademicSemester } from "../../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
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
  const lastStudentId = await findLastStudentId()
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