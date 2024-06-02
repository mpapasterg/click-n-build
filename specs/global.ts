import { z } from "zod";

export const ClientRequestSchema = z.object({}).catchall(z.string());
export const ServerResponseSchema = z.object({});
export const ServerErrorResponseSchema = ServerResponseSchema.extend({
  message: z.string(),
});

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

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

  type FetchResponse<T> =
    | {
        success: true;
        data: T;
      }
    | {
        success: false;
        error: ServerErrorResponse;
      };

  type InterfaceType<T extends abstract new (...args: any) => any> =
    NonFunctionProperties<InstanceType<T>>;

  type NoIDType<T extends abstract new (...args: any) => any> =
    InterfaceType<T> & {
      id: undefined;
    };
}
