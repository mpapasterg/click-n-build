import { withID } from "~/server/utils/withID";

export default defineEventHandler(
  withID(async (id, event) => {
    // Get build from database
    const build = await BuildModel.findById(id)
      .populate("cpu")
      .populate("gpu")
      .populate("ram")
      .populate("cooling_system")
      .populate("drive")
      .populate("decoration")
      .populate("motherboard")
      .populate("psu")
      .populate("pc_case")
      .exec();
    if (build === null) {
      throw createError({
        statusCode: sanitizeStatusCode(404),
        statusMessage: sanitizeStatusMessage("Not Found"),
        data: {
          message: `Build with ID '${id}' does not exist`,
        },
      });
    }

    // Return found build
    return Response.json(build.toJSON());
  })
);
