import z from "zod";

export const LoginUserValidationSchema = z.object({
  body: z.object({
    auth: z.object({
      id: z.string(),
      password: z.string(),
    })
  })
});

export const changePasswordValidationSchema = z.object({
  body: z.object({
    auth: z.object({
      oldPassword: z.string(),
      newPassword: z.string(),
    })
  })
});

export const LoginUserValidation = {
  LoginUserValidationSchema,
  changePasswordValidationSchema
}
