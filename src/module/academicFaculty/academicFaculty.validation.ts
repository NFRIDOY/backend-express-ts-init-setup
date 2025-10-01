import z from "zod";

export const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      error: "Academic Faculty Must Be String" // zod error
    }),
  })
});

export const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      error: "Academic Faculty Must Be String" // zod error
    }),
  })
});

export const AcademicFacultyValidationSchema = {
  createAcademicFaculty: createAcademicFacultyValidationSchema,
  updateAcademicFaculty: updateAcademicFacultyValidationSchema
};