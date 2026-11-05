import { z } from "zod";

export const pakistaniPhone = z
  .string()
  .trim()
  .regex(/^(\+92|0)3[0-9]{9}$/, "Use a Pakistani mobile number such as 03XXXXXXXXX or +923XXXXXXXXX");

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  phone: pakistaniPhone,
  password: z.string().min(10, "Use at least 10 characters"),
  role: z.enum(["buyer", "owner", "dealer"]),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(12, "Please write a short message").max(2000),
});
