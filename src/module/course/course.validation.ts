import z from "zod";
import { statusList } from "../common/user/user.interface";

const PreRequisiteCourseValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

// export const createCourseValidationSchema = z.object({
//   body: z.object({
//     title: z.string().trim().min(1, 'Title is required'),
//     prifix: z.string().trim().min(1, 'Prifix is required'),
//     courseCode: z.string().trim().min(1, 'Course Code is required'),
//     credit: z.number().min(0.5).default(1),
//     preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
//     isActive: z.boolean().optional().default(true),
//     status: z.enum(statusList).optional().default('active'),
//     isDeleted: z.boolean().optional().default(false),
//   })
// });

// Main course creation schema
// export const createCourseValidationSchema = z.object({
//   title: z.string().trim().min(1, 'Title is required'),
//   prifix: z.string().trim().min(1, 'Prifix is required'),
//   courseCode: z.string().trim().min(1, 'Course Code is required'),
//   credit: z.number().min(0.5).default(1),
//   preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
//   isActive: z.boolean().optional().default(true),
//   status: z.enum(statusList).optional().default('active'),
//   isDeleted: z.boolean().optional().default(false),
// });


export const createCourseValidationSchema = z.object({
  // body: z.object({
  title: z.string(),
  prifix: z.string(),
  courseCode: z.string(),
  credit: z.number(),
  preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
  isActive: z.boolean().optional(),
  status: z.enum(statusList).optional(),
  isDeleted: z.boolean(),
  // })
});

export const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prifix: z.string().optional(),
    courseCode: z.string().optional(),
    credit: z.number().optional(),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
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
 * Course REQUEST obj without preRequisiteCourses
{
  "course": {
    "title": "Introduction to Computer Science",
    "prifix": "CSE",
    "courseCode": "101",
    "credit": 3,
    "isActive": true,
    "status": "active",
    "isDeleted": false
  }
}
  * 
{
  "course": {
    "title": "Introduction to Computer Science",
    "prifix": "CSE",
    "courseCode": "101",
    "credit": 3,
    "preRequisiteCourses": [
      {
        "course": "652f1a9c3b2e4a0012d9c8a1",
        "isDeleted": false
      },
      {
        "course": "652f1a9c3b2e4a0012d9c8a2"
      }
    ],
    "isActive": true,
    "status": "active",
    "isDeleted": false
  }
}
 */