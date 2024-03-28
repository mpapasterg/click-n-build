import { z } from "zod";

// User Related Schemas

export const UsernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long.")
  .max(30, "Username must be less than 30 characters long.");

export const EmailSchema = z.string().refine(
  (email: string) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    ), // RFC 5322
  "E-mail entered is not valid."
);

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .refine(
    (email) => /\d/.test(email),
    "Password must contain at least a digit."
  )
  .refine(
    (email) => /[A-Z]/.test(email),
    "Password must contain at least an uppercase letter."
  )
  .refine(
    (email) => /[#\$&@\*]/.test(email),
    "Password must contain at least a symbol (#$&@*)."
  );

export const AuthSchema = z.object({
  username: UsernameSchema,
  email: EmailSchema,
});

export const UserSchema = AuthSchema.extend({});

export const ClientRequestSchema = z.object({}).catchall(z.string());

export const ServerResponseSchema = z.object({
  message: z.string(),
});

// API Schemas

// /api/auth/signin

export const SignInPostRequestSchema = ClientRequestSchema.extend({
  username: UsernameSchema,
  password: PasswordSchema,
});

export const SignInPostResponseSchema = ServerResponseSchema.extend({
  username: UsernameSchema,
  email: EmailSchema,
});

// /api/auth/signup

export const SignUpPostRequestSchema = ClientRequestSchema.extend({
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignUpPostResponseSchema = ServerResponseSchema;

// /api/auth/signout

export const SignOutPostResponseSchema = ServerResponseSchema;

// Global Schema Types Declaration

declare global {
  type Username = z.infer<typeof UsernameSchema>;
  type Email = z.infer<typeof EmailSchema>;
  type Password = z.infer<typeof PasswordSchema>;
  type Auth = z.infer<typeof AuthSchema>;
  type User = z.infer<typeof UserSchema>;

  type ClientRequest = z.infer<typeof ClientRequestSchema>;

  type ServerResponse = z.infer<typeof ServerResponseSchema>;

  type SignInPostRequest = z.infer<typeof SignInPostRequestSchema>;
  type SignInPostResponse = z.infer<typeof SignInPostResponseSchema>;

  type SignUpPostRequest = z.infer<typeof SignUpPostRequestSchema>;
  type SignUpPostResponse = z.infer<typeof SignUpPostResponseSchema>;

  type SignOutPostResponse = z.infer<typeof SignOutPostResponseSchema>;
}
