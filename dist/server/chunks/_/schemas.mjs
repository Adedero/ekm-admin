import { z } from 'zod';

const EmailSchema = z.string().email({ message: "Invalid email" });
const PasswordSchema = z.string().min(8, {
  message: `Password must be at least 8 characters long`
}).refine((val) => /[a-z]/.test(val), {
  message: "Password must contain at least one lowercase letter"
}).refine((val) => /[A-Z]/.test(val), {
  message: "Password must contain at least one uppercase letter"
}).refine((val) => /\d/.test(val), {
  message: "Password must contain at least one number"
}).refine((val) => /[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]/.test(val), {
  message: "Password must contain at least one special character"
});
const RegisterSchema = z.object({
  name: z.string({ message: "Invalid name" }).nonempty({ message: "Full name is required" }),
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  rememberMe: z.boolean().optional()
});
const ResetPasswordSchema = z.object({
  password: PasswordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const AddressSchema = z.object({
  name: z.string({ message: "Invalid recipient name" }).optional().transform((value) => value === void 0 ? "" : value),
  address: z.string({ message: "Invalid recipient email address" }).email({ message: "Invalid recipient email address" })
});
const AttachmentSchema = z.object({
  id: z.string(),
  filename: z.string(),
  path: z.string(),
  cid: z.string().optional()
});
const EmailDataSchema = z.object({
  from: AddressSchema,
  to: z.array(AddressSchema, { message: "No email recipient(s) selected" }).min(1, { message: "No email recipient(s) selected" }),
  cc: z.array(AddressSchema).optional(),
  bcc: z.array(AddressSchema).optional(),
  subject: z.string({ message: "Invalid subject" }).optional(),
  html: z.string({ message: "Email message is empty!" }).nonempty({ message: "Email message is empty!" }).refine(
    (value) => {
      return !value.startsWith("<p><br></p>") && !value.startsWith("<p>Enter your message...</p>");
    },
    { message: "Email message is empty!" }
  ),
  attachments: z.array(AttachmentSchema)
}).strip();

export { EmailDataSchema as E, LoginSchema as L, RegisterSchema as R, ResetPasswordSchema as a, EmailSchema as b };
//# sourceMappingURL=schemas.mjs.map
