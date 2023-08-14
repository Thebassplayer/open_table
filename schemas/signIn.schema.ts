import { z } from "zod";

const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export default signInFormSchema;
