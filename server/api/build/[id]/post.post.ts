import { withID } from "~/server/utils/withID";

export default defineEventHandler(
  withID(async (id, event) => {
    // Check if build with ID exists
    const build = await BuildModel.findById(id).exec();
    if (build === null) {
      throw createError({
        statusCode: sanitizeStatusCode(404),
        statusMessage: sanitizeStatusMessage("Not Found"),
        data: {
          message: `Build with ID '${id}' does not exist`,
        },
      });
    }

    // Post build to Wall of Builds
    build.wall_of_builds = true;
    build.save();

    return Response.json({});
  })
);
