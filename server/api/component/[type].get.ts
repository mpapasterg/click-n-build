import { Component } from "~/specs/domain";
import {
  ComponentQueryParametersSchema,
  ComponentTypeSchema,
} from "~/specs/api/component";
import { type NonFunctionProperties } from "~/specs/global";

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
  const componentType: string = componentTypeParseResult.data;

  // Check for query parameters
  const componentQueryParametersParseResult = await getValidatedQuery(
    event,
    ComponentQueryParametersSchema.safeParse
  );
  if (!componentQueryParametersParseResult.success) {
    throw createError({
      statusCode: sanitizeStatusCode(400),
      statusMessage: sanitizeStatusMessage("Bad Request"),
      data: {
        message: "Invalid Component Query Parameters",
      },
    });
  }
  const componentQueryParameters: Map<string, string | number> =
    componentQueryParametersParseResult.data;

  // Search for component type with query parameters
  let components: Array<NonFunctionProperties<Component>> = [];
  switch (componentType) {
    case CPU.name:
      components = await CPUModel.find(componentQueryParameters).exec();
      break;
    case GPU.name:
      components = await GPUModel.find(componentQueryParameters).exec();
      break;
    case RAM.name:
      components = await RAMModel.find(componentQueryParameters).exec();
      break;
    case Drive.name:
      components = await DriveModel.find(componentQueryParameters).exec();
      break;
    case CoolingSystem.name:
      components = await CoolingSystemModel.find(
        componentQueryParameters
      ).exec();
      break;
    case Decoration.name:
      components = await DecorationModel.find(componentQueryParameters).exec();
      break;
    case Motherboard.name:
      components = await MotherboardModel.find(componentQueryParameters).exec();
      break;
    case PSU.name:
      components = await PSUModel.find(componentQueryParameters).exec();
      break;
    case Case.name:
      components = await CaseModel.find(componentQueryParameters).exec();
      break;
  }

  return Response.json({ components: components });
});
