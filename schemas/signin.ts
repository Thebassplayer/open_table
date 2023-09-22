import { z } from "zod";

const signInFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export default signInFormSchema;
