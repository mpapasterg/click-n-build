export default defineEventHandler(
  withAuth(async (event) => {
    // Get build data
    const buildParseResult = await readValidatedBody(
      event,
      BuildPostRequestSchema.safeParse
    );
    if (!buildParseResult.success) {
      throw createError({
        statusCode: sanitizeStatusCode(400),
        statusMessage: sanitizeStatusMessage("Bad Request"),
        data: {
          message: "Invalid Build Data",
        },
      });
    }
    const buildData = buildParseResult.data;

    // Store build to database
    let newBuild = undefined;
    try {
      const newBuild = await BuildModel.create(buildData);
      newBuild.save();
    } catch (error) {
      throw createError({
        statusCode: sanitizeStatusCode(500),
        statusMessage: sanitizeStatusMessage("Internal Server Error"),
        data: {
          message: "Could not save build",
        },
      });
    }

    // Get builder information
    const auth: Auth = event.context.auth;

    // Store build to builder library
    try {
      const libraryEntry = await LibraryModel.create({
        build: newBuild!.id,
        builder: auth.id,
      });
      libraryEntry.save();
    } catch (error) {
      throw createError({
        statusCode: sanitizeStatusCode(500),
        statusMessage: sanitizeStatusMessage("Internal Server Error"),
        data: {
          message: "Could not save build to builder library",
        },
      });
    }

    return Response.json({});
  })
);
