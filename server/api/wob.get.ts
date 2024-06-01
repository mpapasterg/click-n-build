export default defineEventHandler(async (event) => {
  // Get Wall of Builds builds
  const builds = await BuildModel.find({ wall_of_builds: true }).exec();

  return Response.json({
    builds: builds,
  });
});
