import { z } from "zod";

export const FormLoginSchema = z.object({
  email: z.string().email({ message: "Entered the correct e-mail type" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export const FormRegistSchema = FormLoginSchema.merge(
  z.object({
    name: z.string().min(3, { message: "Must be 3 or more characters long" }),
    confirmPassword: z.string().min(5, { message: "Must be 5 or more characters long" })
  })
).superRefine((data, ctx) => {
  if (data.confirmPassword !== data.password) {
    ctx.addIssue({
      path: ['confirmPassword'],
      message: "Passwords don't match",
      code: z.ZodIssueCode.custom
    });
  }
});

export const FormUpdateSchema = FormLoginSchema.merge(z.object({})).partial();

export type FormLoginData = z.infer<typeof FormLoginSchema>;
export type FormUpdateSchemaData = z.infer<typeof FormUpdateSchema>;
export type FormRegistSchemaData = z.infer<typeof FormRegistSchema>;