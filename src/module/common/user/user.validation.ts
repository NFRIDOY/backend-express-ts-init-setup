import z from "zod";
import { statusList, userRoles } from "./user.interface";

export const UserValidationSchema = z.object({
    id: z.string(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    needsPasswordChange: z.boolean().optional().default(true),
    role: z.enum(userRoles),
    status: z.enum(statusList).default('in-progress'),
    isDeleted: z.boolean().optional().default(false),
  });

  export const UserValidation = {
    UserValidationSchema
  }
  