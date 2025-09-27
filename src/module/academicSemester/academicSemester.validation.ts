import z from "zod";
import { AcademicSemesterCodes, AcademicSemesterNames, Months } from "./academicSemester.interface";

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(AcademicSemesterNames),
    code: z.enum(AcademicSemesterCodes),
    // year: z.date(),
    year: z.coerce.date(), // ✅ Fix: Accepts string & converts to Date
    startMonth: z.enum(Months),
    endMonth: z.enum(Months), 
  })
});

export default createAcademicSemesterValidationSchema;