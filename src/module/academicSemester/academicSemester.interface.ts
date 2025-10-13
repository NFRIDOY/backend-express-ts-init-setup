import { AcademicSemesterNameMap, AcademicSemesterNames } from "./academicSemester.constant";

export type IAcademicSemesterName = typeof AcademicSemesterNameMap[keyof typeof AcademicSemesterNameMap];
export type IAcademicSemesterCode = "01" | "02" | "03";
export const AcademicSemesterCodes: IAcademicSemesterCode[] = ["01", "02", "03"] as const;

export type IMonth =
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";


export type IAcademicSemester = {
    name: IAcademicSemesterName;
    code: IAcademicSemesterCode;
    year: string;
    startMonth: IMonth;
    endMonth: IMonth;
}


// 💡 Advanced ✅ Strongly typed mapper (no manual repetition)
export type IAcademicSemesterNameCodeMapper = Record<IAcademicSemesterName, IAcademicSemesterCode>;

export const academicSemesterNameCodeMapper: IAcademicSemesterNameCodeMapper =
  AcademicSemesterNames.reduce((acc, name, index) => {
    acc[name] = AcademicSemesterCodes[index];
    return acc;
  }, {} as IAcademicSemesterNameCodeMapper);

// 📝 Explaination
// export type IAcademicSemesterNameCodeMapper = {
//     [key: string]: string;
// };

// export const academicSemesterNameCodeMapper: IAcademicSemesterNameCodeMapper = {
//     Autumn: '01',
//     Summar: '02',
//     Fall: '03',
// };