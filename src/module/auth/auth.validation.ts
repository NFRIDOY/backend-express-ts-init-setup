import z from "zod";

export const LoginUserValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    password: z.string(),
  })
});

export const LoginUserValidation = {
  LoginUserValidationSchema
}
