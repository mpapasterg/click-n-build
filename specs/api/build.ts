import { z } from "zod";
import { Schemas } from "../global";

// Field Schemas

export const ComponentSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().nonnegative(),
  image: z.string(),
  description: z.string(),
  manufacturer: z.string(),
});

export const CPUSchema = ComponentSchema.extend({
  architecture: z.string().optional(),
  socket: z.string().optional(),
  cores: z.number().optional(),
  threads: z.number().optional(),
  base_clock: z.number().optional(),
  oc_clock: z.number().optional(),
  caches: z.string().array().optional(),
  watt_consumption: z.number().optional(),
});

export const GPUSchema = ComponentSchema.extend({
  
});

export const BuildSchema = z.object({
  id: z.number(),
  name: z.string(),
  cpu: z.number(),
  gpu: z.number(),
  ram: z.number(),
  cooling_system: z.number(),
  decoration: z.number(),
  motherboard: z.number(),
  psu: z.number(),
  pc_case: z.number(),
});

// GET /api/build/[id]

export const BuildURL: string = "/api/build/";
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

// POST /api/build/[id]

// POST /api/build/[id]/post

// POST /api/build/[id]/purchase

// POST /api/build/[id]/rate

// GET /api/build/generate

// Global Schema Types Declaration

declare global {}
