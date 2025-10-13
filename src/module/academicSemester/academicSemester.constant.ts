import { IMonth } from "./academicSemester.interface";

export const AcademicSemesterNameMap = {
  AUTUMN: "Autumn",
  SUMMER: "Summer",
  FALL: "Fall",
} as const;

export const AcademicSemesterNames = Object.values(AcademicSemesterNameMap);

export const Months: IMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;