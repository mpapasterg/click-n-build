export default defineEventHandler(
  withAuth(
    withID(async (id, event) => {
      // Get rating data
      const ratingFormData = await readFormData(event);
      const ratingParseResult = BuildRatePostRequestSchema.safeParse({
        liked: ratingFormData.get("liked")?.toString(),
        disliked: ratingFormData.get("disliked")?.toString(),
        comment: ratingFormData.get("comment")?.toString(),
      });
      if (!ratingParseResult.success) {
        console.log(ratingParseResult.error);
        throw createError({
          statusCode: sanitizeStatusCode(400),
          statusMessage: sanitizeStatusMessage("Bad Request"),
          data: {
            message: "Invalid rating data",
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
      if (
        ratingData.liked !== undefined ||
        ratingData.disliked !== undefined ||
        ratingData.comment !== undefined
      ) {
        try {
          const newRating = await RatingModel.create({
            builder: auth.id,
            build: build._id,
            liked: ratingData.liked ?? false,
            disliked: ratingData.disliked ?? false,
            comment: ratingData.comment ?? "",
          });
          newRating.save();
        } catch (error) {
          console.log(error);
          throw createError({
            statusCode: sanitizeStatusCode(500),
            statusMessage: sanitizeStatusMessage("Internal Server Error"),
            data: {
              message: "Could not save rating",
            },
          });
        }
      }

      return Response.json({});
    })
  )
);
