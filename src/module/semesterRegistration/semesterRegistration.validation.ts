import z from "zod";
import { Types } from "mongoose";
import { ISemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus, SemesterRegistrationStatusList } from "./semesterRegistration.constant";

// Create SemesterRegistration Validation
export const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.object({
      academicSemester: z.string(),
      status: z.enum(SemesterRegistrationStatusList).default(SemesterRegistrationStatus.UPCOMING),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      minCredit: z.number().default(3),
      maxCredit: z.number().default(3),
      isDeleted: z.boolean().default(false),
    })
  }),
});

// Update SemesterRegistration Validation (all fields optional)
export const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.object({
      academicSemester: z.string().optional(),
      status: z.enum(SemesterRegistrationStatusList).default(SemesterRegistrationStatus.UPCOMING).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      minCredit: z.number().default(3).optional(),
      maxCredit: z.number().default(3).optional(),
      isDeleted: z.boolean().default(false).optional(),
    })
  }),
});

// Export bundle
export const SemesterRegistrationValidationSchema = {
  createSemesterRegistration: createSemesterRegistrationValidationSchema,
  updateSemesterRegistration: updateSemesterRegistrationValidationSchema,
};
