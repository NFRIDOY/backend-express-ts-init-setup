import z from "zod";
import { Days, Status, OfferedCourseStatusList } from "./offeredCourse.constant";

// Create OfferedCourseValidation
export const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      startTime: z.string().regex(
        /^(?:[01]\d|2[0-3]):[0-5]\d$/,
        { message: "Invalid time format. Expected HH:MM in 24-hour format." }
      ),
      endTime: z.string().regex(
        /^(?:[01]\d|2[0-3]):[0-5]\d$/,
        { message: "Invalid time format. Expected HH:MM in 24-hour format." }
      ),

      days: z.array(z.enum(Days)),
      status: z.enum(OfferedCourseStatusList).default(Status.ACTIVE),
    })
    // ⬇️ Custom refinement to ensure valid time range
    .refine(
      (data) => data.startTime < data.endTime,
      {
        message: "Start time must be earlier than end time.",
        path: ["endTime"], // highlight error on endTime field
      }
    ),
  }),
});


// Update OfferedCourseValidation (all fields optional)
export const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z
      .object({
        course: z.string().optional(),
        faculty: z.string().optional(),
        maxCapacity: z.number().optional(),
        section: z.number().optional(),

        startTime: z
          .string()
          .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
            message: "Invalid time format. Expected HH:MM in 24-hour format.",
          })
          .optional(),

        endTime: z
          .string()
          .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
            message: "Invalid time format. Expected HH:MM in 24-hour format.",
          })
          .optional(),

        days: z.array(z.enum(Days)).optional(),
        status: z.enum(OfferedCourseStatusList).optional(),
      })
      // ✅ Custom refinement for valid time range
      .refine(
        (data) =>
          !data.startTime || !data.endTime || data.startTime < data.endTime,
        {
          message: "Start time must be earlier than end time.",
          path: ["endTime"],
        }
      ),
  }),
});


// Export bundle
export const OfferedCourseValidationSchema = {
  createOfferedCourse: createOfferedCourseValidationSchema,
  updateOfferedCourse: updateOfferedCourseValidationSchema,
};
