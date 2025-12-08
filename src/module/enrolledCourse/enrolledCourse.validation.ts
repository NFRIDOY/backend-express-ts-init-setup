import z from "zod";
import { Status, EnrolledCourseStatusList } from "./enrolledCourse.constant";

// Create EnrolledCourseValidation
export const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    enrolledCourse: z.object({
      student: z.string(),
      offeredCourse: z.string(),
      offeredCourseSection: z.string(),
      status: z.enum(EnrolledCourseStatusList).default(Status.ACTIVE),
    })
  }),
});


// Update EnrolledCourseValidation (all fields optional)
export const updateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    enrolledCourse: z.object({
        student: z.string().optional(),
        offeredCourse: z.string().optional(),
        offeredCourseSection: z.string().optional(),
        status: z.enum(EnrolledCourseStatusList).optional(),
      })
  }),
});


// Export bundle
export const EnrolledCourseValidationSchema = {
  createEnrolledCourse: createEnrolledCourseValidationSchema,
  updateEnrolledCourse: updateEnrolledCourseValidationSchema,
};
