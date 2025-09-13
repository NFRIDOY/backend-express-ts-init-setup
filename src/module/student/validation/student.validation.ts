import z from "zod";
import { bloodGroups, GENDER_LIST } from "../interface/student.interface";

const studentValidationSchema = z.object({
  id: z.string().min(1),
  name: z.object({
    firstName: z.string().min(1),
    middleName: z.string().optional(),
    lastName: z.string().min(1),
  }),
  email: z.string().min(1),
  phone: z.string().min(1),
  dateOfBirth: z.string().min(1),
  address: z.string().min(1),
  gender: z.enum(GENDER_LIST),
  profileImage: z.string().optional(),
  guardian: z
    .object({
      name: z.object({
        firstName: z.string().min(1),
        middleName: z.string().optional(),
        lastName: z.string().min(1),
      }),
      email: z.string().min(1),
      phone: z.string().min(1),
      address: z.string().optional(),
    })
    .optional(),
  parent: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.object({
          firstName: z.string().min(1),
          middleName: z.string().optional(),
          lastName: z.string().min(1),
        }),
        email: z.string().min(1),
        phone: z.string().min(1),
        address: z.string().optional(),
      })
    )
    .optional(),
  localGuardian: z
    .object({
      name: z.object({
        firstName: z.string().min(1),
        middleName: z.string().optional(),
        lastName: z.string().min(1),
      }),
      email: z.string().min(1),
      phone: z.string().min(1),
      address: z.string().optional(),
      occupation: z.string().min(1),
    })
    .optional(),
  bloodGroup: z.enum(bloodGroups).optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  isActive: z.boolean(),
  status: z.enum(["active", "inactive", "pending", "blocked", "deleted"]).optional(),
  isDeleted: z.boolean(),
});