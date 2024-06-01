import { z } from "zod";

export const ClientRequestSchema = z.object({}).catchall(z.string());
export const ServerResponseSchema = z.object({});
export const ServerErrorResponseSchema = ServerResponseSchema.extend({
  message: z.string(),
});

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

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
