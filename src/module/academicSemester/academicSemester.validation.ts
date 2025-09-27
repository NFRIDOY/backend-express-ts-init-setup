import z from "zod";
import { AcademicSemesterCodes, AcademicSemesterNames, Months } from "./academicSemester.interface";

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(AcademicSemesterNames),
    code: z.enum(AcademicSemesterCodes),
    year: z.string(), // Changed from Date to string
    startMonth: z.enum(Months),
    endMonth: z.enum(Months),
  })
});

export const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(AcademicSemesterNames).optional(),
    code: z.enum(AcademicSemesterCodes).optional(),
    year: z.string().optional(), // Changed from Date to string
    startMonth: z.enum(Months).optional(),
    endMonth: z.enum(Months).optional(),
  })
});

export const AcademicSemesterValidationSchema = {
  createAcademicSemester: createAcademicSemesterValidationSchema,
  updateAcademicSemester: updateAcademicSemesterValidationSchema
};