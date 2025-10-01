import z from "zod";
import { Types } from "mongoose";

// Create AcademicDepartment Validation
export const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      error: "Academic Department name is required & must be a string",
    }),

    code: z.string({
      error: "Code must be a string",
    }).optional(),

    AlfaCode: z.string({
      error: "AlfaCode must be a string",
    }).optional(),

    shortName: z.string({
      error: "Short name must be a string",
    }).optional(),

    description: z.string({
      error: "Description must be a string",
    }).optional(),

    initiatedYear: z.string({
      error: "Initiated year must be a string",
    })
      .regex(/^\d{4}$/, { message: "Initiated year must be a 4-digit number" })
      .optional(),

    isActive: z.boolean({
      error: "isActive must be a boolean",
    }).default(true).optional(),

    isDeleted: z.boolean({
      error: "isDeleted must be a boolean",
    }).default(false).optional(),

    academicFaculty: z.string({
      error: "Academic Faculty ID is required",
    }).refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Academic Faculty ObjectId",
    }),
  }),
});

// Update AcademicDepartment Validation (all fields optional)
export const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      error: "Academic Department name must be a string",
    }).optional(),

    code: z.string({
      error: "Code must be a string",
    }).optional(),

    AlfaCode: z.string({
      error: "AlfaCode must be a string",
    }).optional(),

    shortName: z.string({
      error: "Short name must be a string",
    }).optional(),

    description: z.string({
      error: "Description must be a string",
    }).optional(),

    initiatedYear: z.string({
      error: "Initiated year must be a string",
    })
      .regex(/^\d{4}$/, { message: "Initiated year must be a 4-digit number" })
      .optional(),

    isActive: z.boolean({
      error: "isActive must be a boolean",
    }).optional(),

    isDeleted: z.boolean({
      error: "isDeleted must be a boolean",
    }).optional(),

    academicFaculty: z.string({
      error: "Academic Faculty ID must be a string",
    })
      .refine((val) => !val || Types.ObjectId.isValid(val), {
        message: "Invalid Academic Faculty ObjectId",
      })
      .optional(),
  }),
});

// Export bundle
export const AcademicDepartmentValidationSchema = {
  createAcademicDepartment: createAcademicDepartmentValidationSchema,
  updateAcademicDepartment: updateAcademicDepartmentValidationSchema,
};
