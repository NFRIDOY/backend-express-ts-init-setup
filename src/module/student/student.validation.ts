import z from "zod";
import { bloodGroups, GENDER_LIST } from "../common/user/user.interface";
import { nameSchema } from "../common/user/user.validation";

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: nameSchema,
      email: z.string().email("Invalid email format").min(1, "Email is required"),
      phone: z.string().min(1, "Phone is required"),
      emergencyPhone: z.string().optional(),
      dateOfBirth: z.string().optional(),
      // dateOfBirth: z.string().refine(val => !isNaN(Date.parse(val)), {
      //   message: "Invalid date format",
      // }),
      gender: z.enum(GENDER_LIST),
      profileImage: z.string().optional(),
      guardian: z
        .object({
          name: nameSchema,
          email: z.string().email("Invalid email format").min(1, "Email is required"),
          phone: z.string().min(1, "Phone is required"),
          address: z.string().optional(),
        })
        .optional(),
      parent: z
        .array(
          z.object({
            id: z.string().min(1, "ID is required"),
            name: nameSchema,
            email: z.string().email("Invalid email format").min(1, "Email is required"),
            phone: z.string().min(1, "Phone is required"),
            address: z.string().optional(),
          })
        )
        .optional(),
      localGuardian: z
        .object({
          name: nameSchema,
          email: z.string().email("Invalid email format").min(1, "Email is required"),
          phone: z.string().min(1, "Phone is required"),
          address: z.string().optional(),
          occupation: z.string().min(1, "Occupation is required"),
        })
        .optional(),
      bloodGroup: z.enum(bloodGroups).optional(),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    })
  })
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: nameSchema.partial().optional(),
      email: z.string().email("Invalid email format").min(1, "Email is required").optional(),
      phone: z.string().min(1, "Phone is required").optional(),
      emergencyPhone: z.string().optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(GENDER_LIST).optional(),
      profileImage: z.string().optional(),
      guardian: z
        .object({
          name: nameSchema.optional(),
          email: z.string().email("Invalid email format").min(1, "Email is required").optional(),
          phone: z.string().min(1, "Phone is required").optional(),
          address: z.string().optional(),
        })
        .optional(),
      parent: z
        .array(
          z.object({
            id: z.string().min(1, "ID is required").optional(),
            name: nameSchema.optional(),
            email: z.string().email("Invalid email format").min(1, "Email is required").optional(),
            phone: z.string().min(1, "Phone is required").optional(),
            address: z.string().optional(),
          })
        )
        .optional(),
      localGuardian: z
        .object({
          name: nameSchema.optional(),
          email: z.string().email("Invalid email format").min(1, "Email is required").optional(),
          phone: z.string().min(1, "Phone is required").optional(),
          address: z.string().optional(),
          occupation: z.string().min(1, "Occupation is required").optional(),
        })
        .optional(),
      bloodGroup: z.enum(bloodGroups).optional(),
      presentAddress: z.string().min(1, "Present address is required").optional(),
      permanentAddress: z.string().min(1, "Permanent address is required").optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }).optional()
  }).optional()
});

export const StudentValidationSchema = {
  createStudent: createStudentValidationSchema,
  updateStudent: updateStudentValidationSchema
};

/**
 * Student REQUEST obj
{
  "password": "123456",
  "student": {
    "name": {
      "firstName": "Muhammad",
      "middleName": "Salahuddin",
      "lastName": "Ali"
    },
    "email": "muhammad.ali@student.edu.bd",
    "phone": "01711223344",
    "emergencyPhone": "01899887766",
    "dateOfBirth": "2006-03-21",
    "gender": "male",
    "profileImage": "https://example.com/images/muhammad-ali.jpg",
    "guardian": {
      "name": {
        "firstName": "Abdul",
        "middleName": "Karim",
        "lastName": "Ali"
      },
      "email": "abdul.karim@example.com",
      "phone": "01922334455",
      "address": "House 45, Road 10, Uttara, Dhaka"
    },
    "parent": [
      {
        "id": "PARENT002",
        "name": {
          "firstName": "Abdul",
          "middleName": "Karim",
          "lastName": "Ali"
        },
        "email": "abdul.karim@example.com",
        "phone": "01922334455",
        "address": "House 45, Road 10, Uttara, Dhaka"
      }
    ],
    "localGuardian": {
      "name": {
        "firstName": "Shamsul",
        "middleName": "Haque",
        "lastName": "Khan"
      },
      "email": "shamsul.khan@example.com",
      "phone": "01633445566",
      "address": "Flat 3A, Block D, Mirpur DOHS, Dhaka",
      "occupation": "Engineer"
    },
    "bloodGroup": "B+",
    "presentAddress": "Flat 3A, Block D, Mirpur DOHS, Dhaka",
    "permanentAddress": "Village: Bhuapur, Upazila: Tangail Sadar, District: Tangail",
    "admissionSemester": "Spring 2025",
    "academicDepartment": "Electrical and Electronic Engineering"
  }
}
 */