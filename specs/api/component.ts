import { z } from "zod";
import { Schemas } from "../global";

// Field Schemas

export const BaseComponentSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().nonnegative(),
  image: z.string(),
  description: z.string(),
  manufacturer: z.string(),
});

export const CPUSchema = BaseComponentSchema.extend({
  architecture: z.string().optional(),
  socket: z.string().optional(),
  cores: z.number().optional(),
  threads: z.number().optional(),
  base_clock: z.number().optional(),
  oc_clock: z.number().optional(),
  caches: z.string().array().optional(),
  watt_consumption: z.number().optional(),
});

export const GPUSchema = BaseComponentSchema.extend({
  architecture: z.string().optional(),
  base_clock: z.number().optional(),
  oc_clock: z.number().optional(),
  vram_type: z.string().optional(),
  vram_size: z.number().optional(),
  pcie_type: z.string().optional(),
  watt_consumption: z.number().optional(),
});

export const RAMSchema = BaseComponentSchema.extend({
  type: z.string().optional(),
  modules: z.number().optional(),
  size: z.number().optional(),
  clock_speed: z.number().optional(),
  cas_latency: z.number().optional(),
  rgb_lighting: z.boolean().optional(),
  watt_consumption: z.number().optional(),
});

export const DriveSchema = BaseComponentSchema.extend({
  storage_type: z.string().optional(),
  size: z.number().optional(),
  read_speed: z.number().optional(),
  write_speed: z.number().optional(),
  buffer_size: z.number().optional(),
  watt_consumption: z.number().optional(),
});

export const CoolingSystemSchema = BaseComponentSchema.extend({
  type: z.string().optional(),
  active_cooling: z.boolean().optional(),
  watt_consumption: z.number().optional(),
});

export const DecorationSchema = BaseComponentSchema.extend({
  type: z.string().optional(),
  watt_consumption: z.number().optional(),
});

export const MotherboardSchema = BaseComponentSchema.extend({
  size_type: z.string().optional(),
  socket: z.string().optional(),
  chipset: z.string().optional(),
  memory_channels: z.string().array().optional(),
  pcie_slots: z.string().array().optional(),
  external_io: z.string().array().optional(),
  rgb_lighting: z.boolean().optional(),
  watt_consumption: z.number().optional(),
  ram_type: z.string().optional(),
  nvme_slots: z.number().optional(),
});

export const PSUSchema = BaseComponentSchema.extend({
  size_type: z.number().optional(),
  max_wattage: z.number().optional(),
  certification: z.string().optional(),
  modularity_type: z.string().optional(),
});

export const CaseSchema = BaseComponentSchema.extend({
  type: z.string().optional(),
  motherboard_types_supported: z.string().array().optional(),
  skin: z.string().optional(),
  features: z.string().array().optional(),
  watt_consumption: z.number().optional(),
});

export const ComponentSchema = z.union([
  CPUSchema,
  GPUSchema,
  RAMSchema,
  DriveSchema,
  CoolingSystemSchema,
  DecorationSchema,
  MotherboardSchema,
  PSUSchema,
  CaseSchema,
]);

// GET /api/component/[type]

export const ComponentGetURL: string = "/api/component/[type]";
export const ComponentGetRequestSchema = ClientRequestSchema;
export const ComponentGetResponseSchema = ServerResponseSchema.extend({
  components: ComponentSchema.array(),
});
Schemas[ComponentGetURL] = {
  request: ComponentGetRequestSchema,
  response: ComponentGetResponseSchema,
};

// Global Schema Types Declaration

declare global {
  // GET /api/component/[type]
  type ComponentGetRequest = z.infer<typeof ComponentGetRequestSchema>;
  type ComponentGetResponse = z.infer<typeof ComponentGetResponseSchema>;
}
