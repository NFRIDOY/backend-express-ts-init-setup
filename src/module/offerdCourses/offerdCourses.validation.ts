import z from "zod";
import { Types } from "mongoose";
import { IOfferdCourses} from "./offerdCourses.interface";
import { OfferdCoursesStatus, OfferdCoursesStatusList } from "./offerdCourses.constant";

// Create OfferdCoursesValidation
export const createOfferdCoursesValidationSchema = z.object({
  body: z.object({
    offerdCourses: z.object({
      academicSemester: z.string(),
      status: z.enum(OfferdCoursesStatusList).default(OfferdCoursesStatus.UPCOMING),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      minCredit: z.number().default(3),
      maxCredit: z.number().default(3),
      isDeleted: z.boolean().default(false),
    })
  }),
});

// Update OfferdCoursesValidation (all fields optional)
export const updateOfferdCoursesValidationSchema = z.object({
  body: z.object({
    offerdCourses: z.object({
      academicSemester: z.string().optional(),
      status: z.enum(OfferdCoursesStatusList).default(OfferdCoursesStatus.UPCOMING).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      minCredit: z.number().default(3).optional(),
      maxCredit: z.number().default(3).optional(),
      isDeleted: z.boolean().default(false).optional(),
    })
  }),
});

// Export bundle
export const OfferdCoursesValidationSchema = {
  createOfferdCourses: createOfferdCoursesValidationSchema,
  updateOfferdCourses: updateOfferdCoursesValidationSchema,
};
