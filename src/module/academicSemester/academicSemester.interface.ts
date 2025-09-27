export type IAcademicSemesterName = "Autumn" | "Summer" | "Fall"
export type IAcademicSemesterCode = "01" | "02" | "03"

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

export const months: IMonth[] = [
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


export type IAcademicSemester = {
    name: IAcademicSemesterName;
    code: IAcademicSemesterCode;
    year: Date;
    startMonth: IMonth;
    endMonth: IMonth;
}