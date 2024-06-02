export default defineEventHandler(
  withID(async (id, event) => {
    // Get build from database
    let build: any = await BuildModel.findById(id)
      .populate("cpu")
      .populate("gpu")
      .populate("ram")
      .populate("drive")
      .populate("cooling_system")
      .populate("decoration")
      .populate("motherboard")
      .populate("psu")
      .populate("pc_case")
      .lean()
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
    console.log(build);

    build = {
      name: build.name,
      id: build._id,
      cpu: { ...build.cpu, id: build.cpu._id },
      gpu: { ...build.gpu, id: build.gpu._id },
      ram: { ...build.ram, id: build.ram._id },
      drive: { ...build.drive, id: build.drive._id },
      cooling_system: { ...build.cooling_system, id: build.cooling_system._id },
      decoration: { ...build.decoration, id: build.decoration._id },
      motherboard: { ...build.motherboard, id: build.motherboard._id },
      psu: { ...build.psu, id: build.psu._id },
      pc_case: { ...build.pc_case, id: build.pc_case._id },
    };

    // Return found build
    return Response.json(build);
  })
);
