import { z } from "zod";

// Field Schemas

// GET /api/wob

export const WoBGetURL: string = "/api/wob";
export const WoBGetRequestSchema = ClientRequestSchema;
export const WoBGetResponseSchema = ServerResponseSchema.extend({
  builds: BuildSchema.array(),
});

// Global Schema Types Declaration

declare global {
  // GET /api/wob
  type WoBGetRequest = z.infer<typeof WoBGetRequestSchema>;
  type WoBGetResponse = z.infer<typeof WoBGetResponseSchema>;
}
