import { z } from "zod";

export const ClientRequestSchema = z.object({}).catchall(z.string());
export const ServerResponseSchema = z.object({});
export const ServerErrorResponseSchema = ServerResponseSchema.extend({
  message: z.string(),
});

export const Schemas: EndpointSchemaMap = {};

declare global {
  type ClientRequest = z.infer<typeof ClientRequestSchema>;
  type ServerResponse = z.infer<typeof ServerResponseSchema>;
  type ServerErrorResponse = z.infer<typeof ServerErrorResponseSchema>;

  type EndpointSchema = {
    request: typeof ClientRequestSchema;
    response: typeof ServerResponseSchema;
  };

  type EndpointSchemaMap = {
    [key: string]: EndpointSchema;
  };
}
