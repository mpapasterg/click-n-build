export default defineEventHandler(
  withAuth(
    withID(async (id, event) => {
      // Get rating data
      const ratingParseResult = await readValidatedBody(
        event,
        BuildRatePostRequestSchema.safeParse
      );
      if (!ratingParseResult.success) {
        throw createError({
          statusCode: sanitizeStatusCode(400),
          statusMessage: sanitizeStatusMessage("Bad Request"),
          data: {
            message: "Invalid rating",
          },
        });
      }
      const ratingData = ratingParseResult.data;

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

      // Get builder information
      const auth: Auth = event.context.auth;

      // Create rating entry for build and builder
      try {
        const newRating = await RatingModel.create({
          builder: auth.id,
          build: id,
          liked: ratingData.liked,
          disliked: ratingData.disliked,
          comment: ratingData.comment,
        });
        newRating.save();
      } catch (error) {
        throw createError({
          statusCode: sanitizeStatusCode(500),
          statusMessage: sanitizeStatusMessage("Internal Server Error"),
          data: {
            message: "Could not save rating",
          },
        });
      }

      return Response.json({});
    })
  )
);
