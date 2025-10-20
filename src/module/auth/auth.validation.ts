import z from "zod";

export const nameSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Last name is required"),
});

export const nameSchemaOptional = z.object({
  firstName: z.string().trim().optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

export const AuthValidationSchema = z.object({
    // id: z.string(), // genareted by backend
    password: z.string()
    .min(6, 'Password must be at least 6 characters').optional(), // set an default pass or init by admin
    // needsPasswordChange: z.boolean().optional().default(true), // set from admin
    // role: z.enum(authRoles), // set from admin
    // status: z.enum(statusList).default('in-progress'),  // set from admin
    // isDeleted: z.boolean().optional().default(false), // default
  });

  export const AuthValidation = {
    AuthValidationSchema
  }
  