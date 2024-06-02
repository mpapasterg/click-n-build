import { z } from "zod";

const ComponentTypeSchema = z.object({
  type: z.union([
    z.literal(CPU.name.toLowerCase()),
    z.literal(GPU.name.toLowerCase()),
    z.literal(RAM.name.toLowerCase()),
    z.literal(Drive.name.toLowerCase()),
    z.literal(CoolingSystem.name.toLowerCase()),
    z.literal(Decoration.name.toLowerCase()),
    z.literal(Motherboard.name.toLowerCase()),
    z.literal(PSU.name.toLowerCase()),
    z.literal(Case.name.toLowerCase()),
  ]),
});

export default defineEventHandler(async (event) => {
  // Check component type
  const componentTypeParseResult = await getValidatedRouterParams(
    event,
    ComponentTypeSchema.safeParse
  );
  if (!componentTypeParseResult.success) {
    throw createError({
      statusCode: sanitizeStatusCode(400),
      statusMessage: sanitizeStatusMessage("Bad Request"),
      data: {
        message: "Invalid Component Type",
      },
    });
  }
  const componentType: string = componentTypeParseResult.data.type;

  // Check for query parameters
  const componentQueryParametersParseResult = await getValidatedQuery(
    event,
    ComponentQueryParametersSchema.safeParse
  );
  if (!componentQueryParametersParseResult.success) {
    console.log(componentQueryParametersParseResult.error);
    throw createError({
      statusCode: sanitizeStatusCode(400),
      statusMessage: sanitizeStatusMessage("Bad Request"),
      data: {
        message: "Invalid Component Query Parameters",
      },
    });
  }
  const componentQueryParameters: Record<string, string | number> =
    componentQueryParametersParseResult.data;

  // Search for component type with query parameters
  let components: Array<BaseComponent & { _id: string }> = [];
  switch (componentType) {
    case CPU.name.toLowerCase():
      components = (await CPUModel.find(componentQueryParameters).exec()).map(
        (value: any) => value._doc
      );
      break;
    case GPU.name.toLowerCase():
      components = (await GPUModel.find(componentQueryParameters).exec()).map(
        (value: any) => value._doc
      );
      break;
    case RAM.name.toLowerCase():
      components = (await RAMModel.find(componentQueryParameters).exec()).map(
        (value: any) => value._doc
      );
      break;
    case Drive.name.toLowerCase():
      components = (await DriveModel.find(componentQueryParameters).exec()).map(
        (value: any) => value._doc
      );
      break;
    case CoolingSystem.name.toLowerCase().split(" ")[0]:
      components = (
        await CoolingSystemModel.find(componentQueryParameters).exec()
      ).map((value: any) => value._doc);
      break;
    case Decoration.name.toLowerCase():
      components = (
        await DecorationModel.find(componentQueryParameters).exec()
      ).map((value: any) => value._doc);
      break;
    case Motherboard.name.toLowerCase():
      components = (
        await MotherboardModel.find(componentQueryParameters).exec()
      ).map((value: any) => value._doc);
      break;
    case PSU.name.toLowerCase():
      components = (await PSUModel.find(componentQueryParameters).exec()).map(
        (value: any) => value._doc
      );
      break;
    case Case.name.toLowerCase():
      components = (await CaseModel.find(componentQueryParameters).exec()).map(
        (value: any) => value._doc
      );
      break;
  }
  components = components.map((component) => ({
    ...component,
    id: component._id,
  }));

  console.log(components);
  return Response.json({
    components: components,
  });
});
