export default defineEventHandler(
  withAuth(async (event) => {
    // Get builder information
    const auth: Auth = event.context.auth;

    // Get builds from builder library
    const libraryEntries = await LibraryModel.find({ builder: auth.id })
      .populate<{ build: InterfaceType<typeof Build> }>("build")
      .exec();
    const builds: Array<InterfaceType<typeof Build>> = libraryEntries.map(
      (libraryEntry) => libraryEntry.build
    );

    return Response.json({
      builds: builds,
    });
  })
);
