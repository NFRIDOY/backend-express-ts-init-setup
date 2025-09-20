import z from "zod";
import { statusList, userRoles } from "./user.interface";

export const UserValidationSchema = z.object({
    // id: z.string(), // genareted by backend
    password: z.string()
    .min(6, 'Password must be at least 6 characters').optional(), // set an default pass or init by admin
    // needsPasswordChange: z.boolean().optional().default(true), // set from admin
    // role: z.enum(userRoles), // set from admin
    // status: z.enum(statusList).default('in-progress'),  // set from admin
    // isDeleted: z.boolean().optional().default(false), // default
  });

  export const UserValidation = {
    UserValidationSchema
  }
  