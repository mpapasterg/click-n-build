import { z } from "zod";
import { Schemas } from "../global";

// Field Schemas

// GET /api/library/[id]

export const LibraryGetURL: string = "/api/library";
export const LibraryGetRequestSchema = ClientRequestSchema;
export const LibraryGetResponseSchema = ServerResponseSchema.extend({
  builds: BuildSchema.array(),
});
Schemas[LibraryGetURL] = {
  request: LibraryGetRequestSchema,
  response: LibraryGetResponseSchema,
};

// Global Schema Types Declaration

declare global {
  // GET /api/library/[id]
  type LibraryGetRequest = z.infer<typeof LibraryGetRequestSchema>;
  type LibraryGetResponse = z.infer<typeof LibraryGetResponseSchema>;
}
