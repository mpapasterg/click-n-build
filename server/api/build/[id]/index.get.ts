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

    // Sanitize DB data
    build = {
      id: build._id,
      _id: undefined,
      name: build.name,
      cpu: { ...build.cpu, id: build.cpu._id, _id: undefined, __v: undefined },
      gpu: { ...build.gpu, id: build.gpu._id, _id: undefined, __v: undefined },
      ram: { ...build.ram, id: build.ram._id, _id: undefined, __v: undefined },
      drive: {
        ...build.drive,
        id: build.drive._id,
        _id: undefined,
        __v: undefined,
      },
      cooling_system: {
        ...build.cooling_system,
        id: build.cooling_system._id,
        _id: undefined,
        __v: undefined,
      },
      decoration: {
        ...build.decoration,
        id: build.decoration._id,
        _id: undefined,
        __v: undefined,
      },
      motherboard: {
        ...build.motherboard,
        id: build.motherboard._id,
        _id: undefined,
        __v: undefined,
      },
      psu: { ...build.psu, id: build.psu._id, _id: undefined, __v: undefined },
      pc_case: {
        ...build.pc_case,
        id: build.pc_case._id,
        _id: undefined,
        __v: undefined,
      },
    };

    // Return found build
    return Response.json(build);
  })
);
