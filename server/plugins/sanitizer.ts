import { Schemas } from "~/specs/global";
import { serverOnly } from "../utils/serverOnly";

export default defineNitroPlugin((nitro) => {
  // Sanitize request body
  nitro.hooks.hook(
    "request",
    serverOnly(async (event) => {
      const path: string = getRequestURL(event).pathname;
      const requestValidation = await readValidatedBody(
        event,
        Schemas[path].request.safeParse
      );
      if (!requestValidation.success) {
        throw createError({
          statusCode: sanitizeStatusCode(400),
          statusMessage: sanitizeStatusMessage("Bad Request"),
          data: <ServerErrorResponse>{
            message: "Invalid Request Body",
          },
        });
      }
    })
  );

  // Sanitize response body
  nitro.hooks.hook(
    "beforeResponse",
    serverOnly(async (event, { body }) => {
      const path: string = getRequestURL(event).pathname;
      const responseValidation = Schemas[path].response.safeParse(body);
      if (!responseValidation.success) {
        throw Error(responseValidation.error.toString());
      }
    })
  );
});
