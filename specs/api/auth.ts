import { z } from "zod";
import { Schemas } from "../global";

// Field Schemas

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

// POST /api/auth/signin

export const SignInPostURL: string = "/api/auth/signin";
export const SignInPostRequestSchema = ClientRequestSchema.extend({
  email: EmailSchema,
  password: PasswordSchema,
});
export const SignInPostResponseSchema = ServerResponseSchema.extend(
  AuthSchema.shape
);
Schemas[SignInPostURL] = {
  request: SignInPostRequestSchema,
  response: SignInPostResponseSchema,
};

// POST /api/auth/signup

export const SignUpPostURL: string = "/api/auth/signup";
export const SignUpPostRequestSchema = ClientRequestSchema.extend({
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});
export const SignUpPostResponseSchema = ServerResponseSchema.extend(
  AuthSchema.shape
);
Schemas[SignUpPostURL] = {
  request: SignUpPostRequestSchema,
  response: SignUpPostResponseSchema,
};

// POST /api/auth/signout

export const SignOutPostURL: string = "/api/auth/signout";
export const SignOutPostRequestSchema = ClientRequestSchema;
export const SignOutPostResponseSchema = ServerResponseSchema;
Schemas[SignOutPostURL] = {
  request: SignOutPostRequestSchema,
  response: SignOutPostResponseSchema,
};

// Add to API schemas

// Global Schema Types Declaration

declare global {
  type Auth = z.infer<typeof AuthSchema>;

  // POST /api/auth/signin
  type SignInPostRequest = z.infer<typeof SignInPostRequestSchema>;
  type SignInPostResponse = z.infer<typeof SignInPostResponseSchema>;

  // POST /api/auth/signup
  type SignUpPostRequest = z.infer<typeof SignUpPostRequestSchema>;
  type SignUpPostResponse = z.infer<typeof SignUpPostResponseSchema>;

  // POST /api/auth/signout
  type SignOutPostRequest = z.infer<typeof SignOutPostRequestSchema>;
  type SignOutPostResponse = z.infer<typeof SignOutPostResponseSchema>;
}
