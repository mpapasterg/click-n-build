import { Build } from "#imports";
import { type NonFunctionProperties } from "~/specs/global";

export default defineEventHandler(async (event) => {
  // Get builder information
  const auth: Auth = event.context.auth;

  // Get builds from builder library
  const libraryEntries = await LibraryModel.find({ builder: auth.id })
    .populate<{ build: NonFunctionProperties<Build> }>("build")
    .exec();
  const builds: Array<NonFunctionProperties<Build>> = libraryEntries.map(
    (libraryEntry) => libraryEntry.build
  );

  return Response.json({
    builds: builds,
  });
});
