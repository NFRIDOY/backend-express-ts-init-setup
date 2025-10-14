import z from "zod";
import { statusList } from "../common/user/user.interface";
import { ICourseFacultyAssignment } from "./course.interface";

const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    course: z.object({
      title: z.string(),
      prifix: z.string(),
      courseCode: z.string(),
      credit: z.number(),
      preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
      isActive: z.boolean().optional(),
      status: z.enum(statusList).optional(),
      isDeleted: z.boolean(),
    })
  })
});

export const updateCourseValidationSchema = z.object({
  body: z.object({
    course: z.object({
      title: z.string().optional(),
      prifix: z.string().optional(),
      courseCode: z.string().optional(),
      credit: z.number().optional(),
      preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
      isActive: z.boolean().optional(),
      status: z.enum(statusList).optional(),
      isDeleted: z.boolean().optional(),
    })
  })
});

const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  })
});


export const CourseValidationSchema = {
  createCourse: createCourseValidationSchema,
  updateCourse: updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
}