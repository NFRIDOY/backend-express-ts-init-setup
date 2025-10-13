import z from "zod";
import { statusList } from "../common/user/user.interface";

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prifix: z.string(),
    courseCode: z.string(),
    credit: z.number(),
    isActive: z.boolean(),
    status: z.enum(statusList),
    isDeleted: z.boolean(),
  })
});

export const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prifix: z.string().optional(),
    courseCode: z.string().optional(),
    credit: z.number().optional(),
    isActive: z.boolean().optional(),
    status: z.enum(statusList).optional(),
    isDeleted: z.boolean().optional(),
  })
});

export const CourseValidationSchema = {
  createCourse: createCourseValidationSchema,
  updateCourse: updateCourseValidationSchema
};

/**
 * Course REQUEST obj
{
  "password": "123456",
  "course": {
   
  }
}
 */