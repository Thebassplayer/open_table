import { z } from "zod";

const reserveSchema = z.object({
  bookerFirstName: z
    .string({
      invalid_type_error: "First name should be a string",
      required_error: "First name is required",
    })
    .min(3, "First name should be at least 3 characters")
    .max(50, "First name should be at most 50 characters")
    .refine(first_name => /^[A-Za-z\s]*$/.test(first_name), {
      message: "First name can only contain letters and spaces",
    }),
  bookerLastName: z
    .string({
      invalid_type_error: "Last name should be a string",
      required_error: "Last name is required",
    })
    .min(3, "Last name should be at least 3 characters")
    .max(50, "First name should be at most 50 characters")
    .refine(first_name => /^[A-Za-z\s]*$/.test(first_name), {
      message: "First name can only contain letters and spaces",
    }),
  bookerPhone: z
    .string({
      required_error: "Phone number is required",
    })
    .regex(/^\d{10}$/, "Phone number should be 10 digits"),
  bookerEmail: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  bookerOccasion: z
    .string({
      invalid_type_error: "Occasion should be a string",
    })
    .max(100, "First name should be at most 50 characters")
    .optional(),
  bookerRequest: z
    .string({
      invalid_type_error: "Occasion should be a string",
    })
    .max(100, "First name should be at most 50 characters")
    .optional(),
});

export type ReserveFormValues = z.infer<typeof reserveSchema>;

export default reserveSchema;
