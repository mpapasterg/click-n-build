import { z } from "zod";
import { Schemas } from "../global";
import {
  RAMSchema,
  CoolingSystemSchema,
  DecorationSchema,
  MotherboardSchema,
  PSUSchema,
  CaseSchema,
} from "./component";

// Field Schemas

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

export const BuildPopulatedSchema = z.object({
  id: z.number(),
  name: z.string(),
  cpu: CPUSchema,
  gpu: GPUSchema,
  ram: RAMSchema,
  cooling_system: CoolingSystemSchema,
  decoration: DecorationSchema,
  motherboard: MotherboardSchema,
  psu: PSUSchema,
  pc_case: CaseSchema,
});

export const BillingInformationSchema = z.object({
  name: z.string(),
  surname: z.string(),
  address: z.string(),
  postal_code: z.number(),
  city: z.string(),
  country: z.string(),
});

export const AnsweredQuestionSchema = z.object({
  question: z.number(),
  selected: z.number(),
});

// GET /api/build/[id]

export const BuildGetURL: string = "/api/build/[id]";
export const BuildGetRequestSchema = ClientRequestSchema;
export const BuildGetResponseSchema = ServerResponseSchema.extend(
  BuildPopulatedSchema.shape
);
Schemas[BuildGetURL] = {
  request: BuildGetRequestSchema,
  response: BuildGetResponseSchema,
};

// POST /api/build/[id]

export const BuildPostURL: string = "/api/build/[id]";
export const BuildPostRequestSchema = ClientRequestSchema.extend(
  BuildSchema.shape
);
export const BuildPostResponseSchema = ServerResponseSchema;
Schemas[BuildPostURL] = {
  request: BuildPostRequestSchema,
  response: BuildPostResponseSchema,
};

// POST /api/build/[id]/post

export const BuildPostPostURL: string = "/api/build/[id]/post";
export const BuildPostPostRequestSchema = ClientRequestSchema;
export const BuildPostPostResponseSchema = ServerResponseSchema;
Schemas[BuildPostPostURL] = {
  request: BuildPostPostRequestSchema,
  response: BuildPostPostResponseSchema,
};

// POST /api/build/[id]/purchase

export const BuildPurchasePostURL: string = "/api/build/[id]/purchase";
export const BuildPurchasePostRequestSchema = ClientRequestSchema.extend(
  BillingInformationSchema.shape
);
export const BuildPurchasePostResponseSchema = ServerResponseSchema;
Schemas[BuildPurchasePostURL] = {
  request: BuildPurchasePostRequestSchema,
  response: BuildPurchasePostResponseSchema,
};

// POST /api/build/[id]/rate

export const BuildRatePostURL: string = "/api/build/[id]/rate";
export const BuildRatePostRequestSchema = ClientRequestSchema.extend({
  liked: z.boolean(),
  disliked: z.boolean(),
  comment: z.string().optional(),
});
export const BuildRatePostResponseSchema = ServerResponseSchema;
Schemas[BuildRatePostURL] = {
  request: BuildRatePostRequestSchema,
  response: BuildRatePostResponseSchema,
};

// GET /api/build/generate

export const BuildGenerateGetURL: string = "/api/build/generate";
export const BuildGenerateGetRequestSchema = ClientRequestSchema.extend({
  questions: AnsweredQuestionSchema.array(),
});
export const BuildGenerateGetResponseSchema = ServerResponseSchema.extend({
  builds: BuildSchema.array(),
});
Schemas[BuildGenerateGetURL] = {
  request: BuildGenerateGetRequestSchema,
  response: BuildGenerateGetResponseSchema,
};

// Global Schema Types Declaration

declare global {
  // GET /api/build/[id]
  type BuildGetRequest = z.infer<typeof BuildGetRequestSchema>;
  type BuildGetResponse = z.infer<typeof BuildGetResponseSchema>;

  // POST /api/build/[id]
  type BuildPostRequest = z.infer<typeof BuildPostRequestSchema>;
  type BuildPostResponse = z.infer<typeof BuildPostResponseSchema>;

  // POST /api/build/[id]/post
  type BuildPostPostRequest = z.infer<typeof BuildPostPostRequestSchema>;
  type BuildPostPostResponse = z.infer<typeof BuildPostPostResponseSchema>;

  // POST /api/build/[id]/purchase
  type BuildPurchasePostRequest = z.infer<
    typeof BuildPurchasePostRequestSchema
  >;
  type BuildPurchasePostResponse = z.infer<
    typeof BuildPurchasePostResponseSchema
  >;

  // POST /api/build/[id]/rate
  type BuildRatePostRequest = z.infer<typeof BuildRatePostRequestSchema>;
  type BuildRatePostResponse = z.infer<typeof BuildRatePostResponseSchema>;

  // GET /api/build/generate
  type BuildGenerateGetRequest = z.infer<typeof BuildGenerateGetRequestSchema>;
  type BuildGenerateGetResponse = z.infer<
    typeof BuildGenerateGetResponseSchema
  >;
}
