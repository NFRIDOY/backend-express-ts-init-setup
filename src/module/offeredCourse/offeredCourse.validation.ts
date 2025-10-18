import z from "zod";
import { Days, OfferedCourseStatus, OfferedCourseStatusList } from "./offeredCourse.constant";

// Create OfferedCourseValidation
export const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.object({
      semesterRegistration: z.string(),
      academicSemester: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      // updatable fields: 
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      startTime: z.string(),
      endTime: z.string(),
      days: z.array(z.enum(Days)),
      status: z.enum(OfferedCourseStatusList).default(OfferedCourseStatus.ACTIVE),
    })
  }),
});

// Update OfferedCourseValidation (all fields optional)
export const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.object({
      course: z.string().optional(),
      faculty: z.string().optional(),
      maxCapacity: z.number().optional(),
      section: z.number().optional(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      days: z.array(z.enum(Days)).optional(),
      status: z.enum(OfferedCourseStatusList).optional(),
    })
  }),
});

// Export bundle
export const OfferedCourseValidationSchema = {
  createOfferedCourse: createOfferedCourseValidationSchema,
  updateOfferedCourse: updateOfferedCourseValidationSchema,
};
