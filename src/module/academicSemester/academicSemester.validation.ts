import z from "zod";
import { AcademicSemesterCodes, AcademicSemesterNames, Months } from "./academicSemester.interface";

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(AcademicSemesterNames),
    code: z.enum(AcademicSemesterCodes),
    year: z.date(),
    startMonth: z.enum(Months),
    endMonth: z.enum(Months), 
  })
});

export default createAcademicSemesterValidationSchema;