import z from "zod";
import { bloodGroups, GENDER_LIST, STATUS_LIST } from "./student.interface";

export const nameSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Last name is required"),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: nameSchema,
      email: z.string().email("Invalid email format").min(1, "Email is required"),
      phone: z.string().min(1, "Phone is required"),
      dateOfBirth: z.date().optional(),
      // dateOfBirth: z.string().refine(val => !isNaN(Date.parse(val)), {
      //   message: "Invalid date format",
      // }),
      gender: z.enum(GENDER_LIST),
      profileImage: z.string().optional(),
      guardian: z
        .object({
          name: nameSchema,
          email: z.string().min(1, "Email is required"),
          phone: z.string().min(1, "Phone is required"),
          address: z.string().optional(),
        })
        .optional(),
      parent: z
        .array(
          z.object({
            id: z.string().min(1, "ID is required"),
            name: nameSchema,
            email: z.string().min(1, "Email is required"),
            phone: z.string().min(1, "Phone is required"),
            address: z.string().optional(),
          })
        )
        .optional(),
      localGuardian: z
        .object({
          name: nameSchema,
          email: z.string().min(1, "Email is required"),
          phone: z.string().min(1, "Phone is required"),
          address: z.string().optional(),
          occupation: z.string().min(1, "Occupation is required"),
        })
        .optional(),
      bloodGroup: z.enum(bloodGroups).optional(),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
    })
  })
});

export default createStudentValidationSchema;