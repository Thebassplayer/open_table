import { z } from "zod";

const signUpFormSchema = z
  .object({
    first_name: z
      .string({
        invalid_type_error: "First name should be a string",
        required_error: "First name is required",
      })
      .min(3, "First name should be at least 3 characters")
      .max(50, "First name should be at most 50 characters")
      .refine(first_name => /^[A-Za-z\s]*$/.test(first_name), {
        message: "First name can only contain letters and spaces",
      }),
    last_name: z
      .string({
        invalid_type_error: "Last name should be a string",
        required_error: "Last name is required",
      })
      .min(3, "Last name should be at least 3 characters")
      .max(50, "First name should be at most 50 characters")
      .refine(first_name => /^[A-Za-z\s]*$/.test(first_name), {
        message: "First name can only contain letters and spaces",
      }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .regex(/^\d{10}$/, "Phone number should be 10 digits"),
    city: z
      .string({
        required_error: "City name is required",
      })
      .min(2, "City name should be at least 2 characters")
      .max(50, "City name should be at most 50 characters"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password should be at least 8 characters")
      .max(20, "Password should be at most 20 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    confirm_password: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default signUpFormSchema;
