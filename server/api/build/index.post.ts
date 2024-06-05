export default defineEventHandler(
  withAuth(async (event) => {
    // Get build data
    const buildFormData = await readFormData(event);
    const buildParseResult = BuildPostRequestSchema.safeParse({
      name: buildFormData.get("name")?.toString(),
      cpu: buildFormData.get("cpu")?.toString(),
      gpu: buildFormData.get("gpu")?.toString(),
      ram: buildFormData.get("ram")?.toString(),
      drive: buildFormData.get("drive")?.toString(),
      cooling_system: buildFormData.get("cooling_system")?.toString(),
      decoration: buildFormData.get("decoration")?.toString(),
      motherboard: buildFormData.get("motherboard")?.toString(),
      psu: buildFormData.get("psu")?.toString(),
      pc_case: buildFormData.get("pc_case")?.toString(),
    });
    if (!buildParseResult.success) {
      throw createError({
        statusCode: sanitizeStatusCode(400),
        statusMessage: sanitizeStatusMessage("Bad Request"),
        data: {
          message: "Invalid build data",
        },
      });
    }
    const buildData = buildParseResult.data;

    // Store build to database
    let newBuild = undefined;
    try {
      newBuild = await BuildModel.create({
        ...buildData,
        wall_of_builds: false,
      });
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
        build: newBuild!._id,
        builder: auth.id,
      });
      libraryEntry.save();
    } catch (error) {
      console.log(error);
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
