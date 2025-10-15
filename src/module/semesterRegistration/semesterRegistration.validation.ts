import z from "zod";
import { Types } from "mongoose";
import { ISemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus, SemisterRegistrationStatusList } from "./semesterRegistration.constant";

// Create SemesterRegistration Validation
export const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.object({
      academicSemester: z.string(),
      status: z.enum(SemisterRegistrationStatusList).default(SemesterRegistrationStatus.UPCOMING),
      startDate: z.date(),
      endDate: z.date(),
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
      status: z.enum(SemisterRegistrationStatusList).default(SemesterRegistrationStatus.UPCOMING).optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
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
