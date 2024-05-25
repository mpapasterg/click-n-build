export abstract class Component {
  public id: number;
  public name: string;
  public price: number;
  public image: string;
  public description: string;
  public manufacturer: string;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
    this.manufacturer = manufacturer;
  }
}

export abstract class BasicComponent extends Component {}

export class CPU extends BasicComponent {
  public architecture: string;
  public cores: number;
  public threads: number;
  public base_clock: number;
  public oc_clock: number;
  public caches: Array<string>;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string,
    architecture: string,
    cores: number,
    threads: number,
    base_clock: number,
    oc_clock: number,
    caches: Array<string>
  ) {
    super(id, name, price, image, description, manufacturer);
    this.architecture = architecture;
    this.cores = cores;
    this.threads = threads;
    this.base_clock = base_clock;
    this.oc_clock = oc_clock;
    this.caches = caches;
  }
}

export class GPU extends BasicComponent {
  public architecture: string;
  public base_clock: number;
  public oc_clock: number;
  public vram_type: string;
  public vram_size: number;
  public pcie_type: string;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string,
    architecture: string,
    base_clock: number,
    oc_clock: number,
    vram_type: string,
    vram_size: number,
    pcie_type: string
  ) {
    super(id, name, price, image, description, manufacturer);
    this.architecture = architecture;
    this.base_clock = base_clock;
    this.oc_clock = oc_clock;
    this.vram_type = vram_type;
    this.vram_size = vram_size;
    this.pcie_type = pcie_type;
  }
}

export class RAM extends BasicComponent {
  public type: string;
  public modules: number;
  public size: number;
  public clock_speed: number;
  public cas_latency: number;
  public rgb_lighting: boolean;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string,
    type: string,
    modules: number,
    size: number,
    clock_speed: number,
    cas_latency: number,
    rgb_lighting: boolean
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
    this.modules = modules;
    this.size = size;
    this.clock_speed = clock_speed;
    this.cas_latency = cas_latency;
    this.rgb_lighting = rgb_lighting;
  }
}

export abstract class DependentComponent extends Component {}

export class CoolingSystem extends DependentComponent {
  public type: string;
  public active_cooling: boolean;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string,

    type: string,
    active_cooling: boolean
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
    this.active_cooling = active_cooling;
  }
}

export class Decoration extends DependentComponent {
  public type: string;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string,
    type: string
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
  }
}

export class Motherboard extends DependentComponent {
  public size_type: string;
  public socket: string;
  public chipset: string;
  public memory_channels: Array<string>;
  public pcie_slots: Array<string>;
  public external_io: Array<string>;
  public rgb_lighting: boolean;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string,
    size_type: string,
    socket: string,
    chipset: string,
    memory_channels: Array<string>,
    pcie_slots: Array<string>,
    external_io: Array<string>,
    rgb_lighting: boolean
  ) {
    super(id, name, price, image, description, manufacturer);
    this.size_type = size_type;
    this.socket = socket;
    this.chipset = chipset;
    this.memory_channels = memory_channels;
    this.pcie_slots = pcie_slots;
    this.external_io = external_io;
    this.rgb_lighting = rgb_lighting;
  }
}

export class PSU extends DependentComponent {
  public size_type: string;
  public max_wattage: number;
  public certification: string;
  public modularity_type: string;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string,
    size_type: string,
    max_wattage: number,
    certification: string,
    modularity_type: string
  ) {
    super(id, name, price, image, description, manufacturer);
    this.size_type = size_type;
    this.max_wattage = max_wattage;
    this.certification = certification;
    this.modularity_type = modularity_type;
  }
}

export class Case extends DependentComponent {
  public type: string;
  public motherboard_types_supported: Array<string>;
  public skin: string;
  public features: Array<string>;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string,
    type: string,
    motherboard_types_supported: Array<string>,
    skin: string,
    features: Array<string>
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
    this.motherboard_types_supported = motherboard_types_supported;
    this.skin = skin;
    this.features = features;
  }
}

export class Drive extends DependentComponent {
  public storage_type: string;
  public size: number;
  public read_speed: number;
  public write_speed: number;
  public buffer_size: number;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    manufacturer: string,
    storage_type: string,
    size: number,
    read_speed: number,
    write_speed: number,
    buffer_size: number
  ) {
    super(id, name, price, image, description, manufacturer);
    this.storage_type = storage_type;
    this.size = size;
    this.read_speed = read_speed;
    this.write_speed = write_speed;
    this.buffer_size = buffer_size;
  }
}

export class Build {
  public id: number;
  public gpu: GPU;
  public cpu: CPU;
  public ram: RAM;
  public cooling_system: CoolingSystem;
  public decoration: Decoration;
  public motherboard: Motherboard;
  public psu: PSU;
  public pc_case: Case;
  public drive: Drive;

  public constructor(
    id: number,
    gpu: GPU,
    cpu: CPU,
    ram: RAM,
    cooling_system: CoolingSystem,
    decoration: Decoration,
    motherboard: Motherboard,
    psu: PSU,
    pc_case: Case,
    drive: Drive
  ) {
    this.id = id;
    this.gpu = gpu;
    this.cpu = cpu;
    this.ram = ram;
    this.cooling_system = cooling_system;
    this.decoration = decoration;
    this.motherboard = motherboard;
    this.psu = psu;
    this.pc_case = pc_case;
    this.drive = drive;
  }
}

export class Library {
  public builds: Array<Build>;

  public constructor(builds: Array<Build>) {
    this.builds = builds;
  }
}

export class WallOfBuilds {
  public builds: Array<Build>;

  public constructor(builds: Array<Build>) {
    this.builds = builds;
  }
}

export class BillingInformation {
  public name: string;
  public surname: string;
  public address: string;
  public postal_code: number;
  public city: string;
  public country: string;

  public constructor(
    name: string,
    surname: string,
    address: string,
    postal_code: number,
    city: string,
    country: string
  ) {
    this.name = name;
    this.surname = surname;
    this.address = address;
    this.postal_code = postal_code;
    this.city = city;
    this.country = country;
  }
}

export class Purchase {
  public build: Build;
  public billing_information: BillingInformation;
  public price: number;

  public constructor(
    build: Build,
    billing_information: BillingInformation,
    price: number
  ) {
    this.build = build;
    this.billing_information = billing_information;
    this.price = price;
  }
}

export abstract class User {
  public constructor() {}
}

export class Guest extends User {}

export class Builder extends User {
  public id: number;
  public username: string;
  public email: string;
  public password: string;
  public billing_information: BillingInformation;
  public library: Library;

  public constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    billing_information: BillingInformation,
    library: Library
  ) {
    super();
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.billing_information = billing_information;
    this.library = library;
  }
}

export class Rating {
  public builder: Builder;
  public build: Build;
  public liked: boolean;
  public disliked: boolean;
  public comment: string;

  public constructor(
    builder: Builder,
    build: Build,
    liked: boolean,
    disliked: boolean,
    comment: string
  ) {
    this.builder = builder;
    this.build = build;
    this.liked = liked;
    this.disliked = disliked;
    this.comment = comment;
  }
}

export class Inventory {
  public items: Array<InventoryItem>;

  public constructor(items: Array<InventoryItem>) {
    this.items = items;
  }
}

export class InventoryItem {
  public component_name: string;
  public stock: number;

  public constructor(component_name: string, stock: number) {
    this.component_name = component_name;
    this.stock = stock;
  }
}

export abstract class SpellChecker {}

export abstract class BuildGenerator {}

export abstract class BuildingMode {}

export class BeginnerMode extends BuildingMode {
  public questions: Array<Question>;

  public constructor(questions: Array<Question>) {
    super();
    this.questions = questions;
  }
}

export class Question {
  public question: string;
  public choices: Array<string>;

  public constructor(question: string, choices: Array<string>) {
    this.question = question;
    this.choices = choices;
  }
}

export class AnsweredQuestion {
  public question: Question;
  public selected!: number;

  public constructor(question: Question, selected: number) {
    this.question = question;
    this.changeSelection(selected);
  }

  public changeSelection(selected: number) {
    this.selected = selected;
  }
}

export class NormalMode extends BuildingMode {}

export class ExpertMode extends BuildingMode {}
