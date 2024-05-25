import { Schemas } from "~/specs/global";

export default defineNitroPlugin((nitro) => {
  // Sanitize request body
  nitro.hooks.hook("request", async (event) => {
    // Skip client endpoints
    if (!getRequestURL(event).pathname.startsWith("/api")) {
      return;
    }

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
  });

  // Sanitize response body
  nitro.hooks.hook("beforeResponse", async (event, { body }) => {
    // Skip client endpoints
    if (!getRequestURL(event).pathname.startsWith("/api")) {
      return;
    }

    const path: string = getRequestURL(event).pathname;
    const responseValidation = Schemas[path].response.safeParse(body);
    if (!responseValidation.success) {
      throw Error(responseValidation.error.toString());
    }
  });
});
