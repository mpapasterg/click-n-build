import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Mongoose Database Schemas

const CPUSchema = new Schema<BaseComponent & InterfaceType<typeof CPU>>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  architecture: String,
  cores: Number,
  threads: Number,
  base_clock: Number,
  oc_clock: Number,
  caches: [String],
  watt_consumption: Number,
});

const GPUSchema = new Schema<BaseComponent & InterfaceType<typeof GPU>>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  architecture: String,
  base_clock: Number,
  oc_clock: Number,
  vram_type: String,
  vram_size: Number,
  pcie_type: String,
  watt_consumption: Number,
});

const RAMSchema = new Schema<BaseComponent & InterfaceType<typeof RAM>>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  type: String,
  modules: Number,
  size: Number,
  clock_speed: Number,
  cas_latency: Number,
  rgb_lighting: Boolean,
  watt_consumption: Number,
});

const DriveSchema = new Schema<BaseComponent & InterfaceType<typeof Drive>>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  storage_type: String,
  size: Number,
  read_speed: Number,
  write_speed: Number,
  buffer_size: Number,
  watt_consumption: Number,
});

const CoolingSystemSchema = new Schema<
  BaseComponent & InterfaceType<typeof CoolingSystem>
>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  type: String,
  active_cooling: Boolean,
  watt_consumption: Number,
});

const DecorationSchema = new Schema<
  BaseComponent & InterfaceType<typeof Decoration>
>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  type: String,
  watt_consumption: Number,
});

const MotherboardSchema = new Schema<
  BaseComponent & InterfaceType<typeof Motherboard>
>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  size_type: String,
  socket: String,
  chipset: String,
  memory_channels: [String],
  pcie_slots: [String],
  external_io: [String],
  rgb_lighting: Boolean,
  watt_consumption: Number,
  ram_type: String,
  nvme_slots: Number,
});

const PSUSchema = new Schema<BaseComponent & InterfaceType<typeof PSU>>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  size_type: String,
  max_wattage: Number,
  certification: String,
  modularity_type: String,
});

const CaseSchema = new Schema<BaseComponent & InterfaceType<typeof Case>>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  type: String,
  motherboard_types_supported: [String],
  skin: String,
  features: [String],
  watt_consumption: Number,
});

const BuildSchema = new Schema<
  InterfaceType<typeof Build> & {
    wall_of_builds: boolean;
  }
>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cpu: {
    type: Schema.ObjectId,
    ref: CPU.name,
    required: true,
  },
  gpu: {
    type: Schema.ObjectId,
    ref: GPU.name,
    required: true,
  },
  ram: {
    type: Schema.ObjectId,
    ref: RAM.name,
    required: true,
  },
  drive: {
    type: Schema.ObjectId,
    ref: Drive.name,
    required: true,
  },
  cooling_system: {
    type: Schema.ObjectId,
    ref: CoolingSystem.name,
    required: true,
  },
  decoration: {
    type: Schema.ObjectId,
    ref: Decoration.name,
    required: true,
  },
  motherboard: {
    type: Schema.ObjectId,
    ref: Motherboard.name,
    required: true,
  },
  psu: {
    type: Schema.ObjectId,
    ref: PSU.name,
    required: true,
  },
  pc_case: {
    type: Schema.ObjectId,
    ref: Case.name,
    required: true,
  },
  wall_of_builds: {
    type: Boolean,
    required: true,
  },
});

const LibrarySchema = new Schema<
  InterfaceType<typeof Library> & {
    builder: typeof Schema.ObjectId;
    build: typeof Schema.ObjectId;
  }
>({
  builder: {
    type: Schema.ObjectId,
    ref: Builder.name,
    required: true,
  },
  build: {
    type: Schema.ObjectId,
    ref: Build.name,
    required: true,
  },
});

const BillingInformationSchema = new Schema<
  InterfaceType<typeof BillingInformation> & {
    _id: boolean;
  }
>({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postal_code: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const PurchaseSchema = new Schema<InterfaceType<typeof Purchase>>({
  build: {
    type: Schema.ObjectId,
    ref: Build.name,
    required: true,
  },
  billing_information: {
    type: Schema.ObjectId,
    ref: BillingInformation.name,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const BuilderSchema = new Schema<InterfaceType<typeof Builder>>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  billing_information: {
    type: Schema.ObjectId,
    ref: BillingInformation.name,
  },
});

const RatingSchema = new Schema<InterfaceType<typeof Rating>>({
  builder: {
    type: Schema.ObjectId,
    ref: Builder.name,
    required: true,
  },
  build: {
    type: Schema.ObjectId,
    ref: Build.name,
    required: true,
  },
  liked: {
    type: Boolean,
    required: true,
  },
  disliked: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const InventoryItemSchema = new Schema<InterfaceType<typeof InventoryItem>>({
  component_name: { type: String, required: true, unique: true },
  stock: {
    type: Number,
    required: true,
  },
});

const QuestionSchema = new Schema<InterfaceType<typeof Question>>({
  question: { type: String, required: true, unique: true },
  choices: {
    type: [String],
    required: true,
  },
});

// Create models for all collections
export const CPUModel = model<BaseComponent & InterfaceType<typeof CPU>>(
  CPU.name,
  CPUSchema
);
export const GPUModel = model<BaseComponent & InterfaceType<typeof GPU>>(
  GPU.name,
  GPUSchema
);
export const RAMModel = model<BaseComponent & InterfaceType<typeof RAM>>(
  RAM.name,
  RAMSchema
);
export const DriveModel = model<BaseComponent & InterfaceType<typeof Drive>>(
  Drive.name,
  DriveSchema
);
export const CoolingSystemModel = model<
  BaseComponent & InterfaceType<typeof CoolingSystem>
>(CoolingSystem.name, CoolingSystemSchema);
export const DecorationModel = model<
  BaseComponent & InterfaceType<typeof Decoration>
>(Decoration.name, DecorationSchema);
export const MotherboardModel = model<
  BaseComponent & InterfaceType<typeof Motherboard>
>(Motherboard.name, MotherboardSchema);
export const PSUModel = model<BaseComponent & InterfaceType<typeof PSU>>(
  PSU.name,
  PSUSchema
);
export const CaseModel = model<BaseComponent & InterfaceType<typeof Case>>(
  Case.name,
  CaseSchema
);
export const BuildModel = model<
  InterfaceType<typeof Build> & {
    wall_of_builds: boolean;
  }
>(Build.name, BuildSchema);
export const LibraryModel = model<
  InterfaceType<typeof Library> & {
    builder: typeof Schema.ObjectId;
    build: typeof Schema.ObjectId;
  }
>(Library.name, LibrarySchema);
export const BillingInformationModel = model<
  InterfaceType<typeof BillingInformation> & {
    _id: boolean;
  }
>(BillingInformation.name, BillingInformationSchema);
export const PurchaseModel = model<InterfaceType<typeof Purchase>>(
  Purchase.name,
  PurchaseSchema
);
export const BuilderModel = model<InterfaceType<typeof Builder>>(
  Builder.name,
  BuilderSchema
);
export const RatingModel = model<InterfaceType<typeof Rating>>(
  Rating.name,
  RatingSchema
);
export const InventoryItemModel = model<InterfaceType<typeof InventoryItem>>(
  InventoryItem.name,
  InventoryItemSchema
);
export const QuestionModel = model<InterfaceType<typeof Question>>(
  Question.name,
  QuestionSchema
);
