import { withID } from "~/server/utils/withID";
import { BuildPurchasePostRequestSchema } from "~/specs/api/build";

export default defineEventHandler(
  withID(async (id, event) => {
    // Get billing information data
    const buildingInformationParseResult = await readValidatedBody(
      event,
      BuildPurchasePostRequestSchema.safeParse
    );
    if (!buildingInformationParseResult.success) {
      throw createError({
        statusCode: sanitizeStatusCode(400),
        statusMessage: sanitizeStatusMessage("Bad Request"),
        data: {
          message: "Invalid billing information data",
        },
      });
    }
    const billingInformationData = buildingInformationParseResult.data;

    // Check billing information validity
    const billingInformationObj = new BillingInformation(
      billingInformationData.name,
      billingInformationData.surname,
      billingInformationData.address,
      billingInformationData.postal_code,
      billingInformationData.city,
      billingInformationData.country
    );
    if (!billingInformationObj.isValid()) {
      throw createError({
        statusCode: sanitizeStatusCode(400),
      });
    }

    // Check if build with ID exists
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
        statusCode: sanitizeStatusCode(400),
        statusMessage: sanitizeStatusMessage("Bad Request"),
        data: {
          message: "Invalid billing information data",
        },
      });
    }

    // Get total build price
    const price: number =
      build.cpu.price +
      build.gpu.price +
      build.ram.price +
      build.cooling_system.price +
      build.drive.price +
      build.decoration.price +
      build.psu.price +
      build.pc_case.price;

    // Request bank transaction

    // Create billing information entry
    let billingInformation = undefined;
    try {
      billingInformation = await BillingInformationModel.create(
        billingInformationData
      );
      billingInformation.save();
    } catch (error) {
      throw createError({
        statusCode: sanitizeStatusCode(500),
        statusMessage: sanitizeStatusMessage("Internal Server Error"),
        data: {
          message: "Could not create billing information",
        },
      });
    }

    // Get builder information
    const auth: Auth = event.context.auth;

    // Add billing information to builder
    const builder = (await BuilderModel.findById(auth.id).exec())!;
    builder.billing_information = billingInformation.id;
    builder.save();

    // Create purchase entry
    try {
      const purchase = await PurchaseModel.create({
        build: build.id,
        billing_information: billingInformation.id,
        price: price,
      });
      purchase.save();
    } catch (error) {
      throw createError({
        statusCode: sanitizeStatusCode(500),
        statusMessage: sanitizeStatusMessage("Internal Server Error"),
        data: {
          message: "Could not create purchase",
        },
      });
    }

    return Response.json({});
  })
);
