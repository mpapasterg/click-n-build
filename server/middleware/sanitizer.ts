// Middleware for sanitizing GET request body

export default defineEventHandler(
  serverOnly(async (event) => {
    const path: string = getRequestURL(event).pathname;

    // Read body when receiving GET requests
    if (event.node.req.method === "GET") {
      const bodyParseResult = await readValidatedBody(
        event,
        Schemas[path].request.safeParse
      );
      if (!bodyParseResult.success) {
        throw createError({
          statusCode: sanitizeStatusCode(400),
          statusMessage: sanitizeStatusMessage("Bad Request"),
          data: <ServerErrorResponse>{
            message: "Invalid Request Body",
          },
        });
      }
    }
  })
);
