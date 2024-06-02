export default defineEventHandler(async (event) => {
  // Get Wall of Builds builds
  let builds: any = await BuildModel.find({ wall_of_builds: true })
    .lean()
    .exec();
  builds = builds.map((build: any) => ({ ...build, id: build._id }));

  return Response.json({
    builds: builds,
  });
});
