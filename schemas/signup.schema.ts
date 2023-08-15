import { z } from "zod";

const signUpFormSchema = z
  .object({
    first_name: z
      .string()
      .min(3, "First name should be at least 3 characters")
      .max(50, "First name should be at most 50 characters"),
    last_name: z
      .string()
      .min(3, "Last name should be at least 3 characters")
      .max(50, "First name should be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone number should be 10 digits"),
    city: z
      .string()
      .min(2, "City name should be at least 2 characters")
      .max(50, "City name should be at most 50 characters"),
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirm_password: z
      .string()
      .min(6, "Password should be at least 6 characters"),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default signUpFormSchema;
