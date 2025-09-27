import z from "zod";
import { AcademicSemesterCodes, AcademicSemesterNames, months } from "./academicSemester.interface";

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(AcademicSemesterNames),
    code: z.enum(AcademicSemesterCodes),
    startMonth: z.enum(months),
    endMonth: z.enum(months), 
  })
});

export default createAcademicSemesterValidationSchema;