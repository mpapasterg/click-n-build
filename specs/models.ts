import mongoose from "mongoose";
import {
  CPU,
  GPU,
  RAM,
  CoolingSystem,
  Decoration,
  Motherboard,
  PSU,
  Case,
  Drive,
  Build,
  Library,
  BillingInformation,
  Purchase,
  Builder,
  Rating,
  InventoryItem,
  Question,
} from "./domain";
const { Schema, model } = mongoose;

// Mongoose Database Schemas

const CPUSchema = new Schema<CPU>({
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

const GPUSchema = new Schema<GPU>({
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

const RAMSchema = new Schema<RAM>({
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

const DriveSchema = new Schema<Drive>({
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

const CoolingSystemSchema = new Schema<CoolingSystem>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  type: String,
  active_cooling: Boolean,
  watt_consumption: Number,
});

const DecorationSchema = new Schema<Decoration>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  manufacturer: String,
  type: String,
  watt_consumption: Number,
});

const MotherboardSchema = new Schema<Motherboard>({
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

const PSUSchema = new Schema<PSU>({
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

const CaseSchema = new Schema<Case>({
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
  Build & {
    library: typeof Schema.ObjectId;
    wall_of_builds: typeof Schema.ObjectId;
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
  drive: {
    type: Schema.ObjectId,
    ref: Drive.name,
    required: true,
  },
  library: {
    type: Schema.ObjectId,
    ref: Library.name,
    required: true,
  },
  wall_of_builds: {
    type: Boolean,
    required: true,
  },
});

const LibrarySchema = new Schema<Library>({});

const BillingInformationSchema = new Schema<
  BillingInformation & { _id: boolean }
>({
  _id: false,
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

const PurchaseSchema = new Schema<Purchase>({
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

const BuilderSchema = new Schema<Builder>({
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
  billing_information: BillingInformationSchema,
  library: LibrarySchema,
});

const RatingSchema = new Schema<Rating>({
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
  comment: String,
});

const InventoryItemSchema = new Schema<InventoryItem>({
  component_name: { type: String, required: true, unique: true },
  stock: {
    type: Number,
    required: true,
  },
});

const QuestionSchema = new Schema<Question>({
  question: { type: String, required: true, unique: true },
  choices: {
    type: [String],
    required: true,
  },
});

// Create models for all collections
export const CPUModel = model(CPU.name, CPUSchema);
export const GPUModel = model(GPU.name, GPUSchema);
export const RAMModel = model(RAM.name, RAMSchema);
export const CoolingSystemModel = model(
  CoolingSystem.name,
  CoolingSystemSchema
);
export const DecorationModel = model(Decoration.name, DecorationSchema);
export const MotherboardModel = model(Motherboard.name, MotherboardSchema);
export const PSUModel = model(PSU.name, PSUSchema);
export const CaseModel = model(Case.name, CaseSchema);
export const DriveModel = model(Drive.name, DriveSchema);
export const BuildModel = model(Build.name, BuildSchema);
export const LibraryModel = model(Library.name, LibrarySchema);
export const BillingInformationModel = model(
  BillingInformation.name,
  BillingInformationSchema
);
export const PurchaseModel = model(Purchase.name, PurchaseSchema);
export const BuilderModel = model(Builder.name, BuilderSchema);
export const RatingModel = model(Rating.name, RatingSchema);
export const InventoryItemModel = model(
  InventoryItem.name,
  InventoryItemSchema
);
export const QuestionModel = model(Question.name, QuestionSchema);
