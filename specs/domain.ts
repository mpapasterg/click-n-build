export abstract class Component {
  public id: number;
  public name: string;
  public price: number;
  public image: string | undefined;
  public description: string | undefined;
  public manufacturer: string | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
    this.manufacturer = manufacturer;
  }

  public queryComponents(
    attributes: Map<string, string | number>
  ): Array<Component> {
    return [];
  } // TODO:

  public getComponents(): Array<Component> {
    return [];
  } // TODO:
}

export abstract class BasicComponent extends Component {}

export class CPU extends BasicComponent {
  public architecture: string | undefined;
  public cores: number | undefined;
  public threads: number | undefined;
  public base_clock: number | undefined;
  public oc_clock: number | undefined;
  public caches: Array<string> | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    architecture: string | undefined,
    cores: number | undefined,
    threads: number | undefined,
    base_clock: number | undefined,
    oc_clock: number | undefined,
    caches: Array<string> | undefined
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
  public architecture: string | undefined;
  public base_clock: number | undefined;
  public oc_clock: number | undefined;
  public vram_type: string | undefined;
  public vram_size: number | undefined;
  public pcie_type: string | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    architecture: string | undefined,
    base_clock: number | undefined,
    oc_clock: number | undefined,
    vram_type: string | undefined,
    vram_size: number | undefined,
    pcie_type: string | undefined
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
  public type: string | undefined;
  public modules: number | undefined;
  public size: number | undefined;
  public clock_speed: number | undefined;
  public cas_latency: number | undefined;
  public rgb_lighting: boolean | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    type: string | undefined,
    modules: number | undefined,
    size: number | undefined,
    clock_speed: number | undefined,
    cas_latency: number | undefined,
    rgb_lighting: boolean | undefined
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

export abstract class DependentComponent extends Component {
  private selectedCPU: CPU | undefined;
  private selectedGPU: GPU | undefined;
  private selectedRAM: RAM | undefined;

  public selectedBasicComponents(cpu: CPU, gpu: GPU, ram: RAM): void {
    this.selectedCPU = cpu;
    this.selectedGPU = gpu;
    this.selectedRAM = ram;
  }
}

export class CoolingSystem extends DependentComponent {
  public type: string | undefined;
  public active_cooling: boolean | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,

    type: string,
    active_cooling: boolean
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
    this.active_cooling = active_cooling;
  }
}

export class Decoration extends DependentComponent {
  public type: string | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    type: string
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
  }
}

export class Motherboard extends DependentComponent {
  public size_type: string | undefined;
  public socket: string | undefined;
  public chipset: string | undefined;
  public memory_channels: Array<string> | undefined;
  public pcie_slots: Array<string> | undefined;
  public external_io: Array<string> | undefined;
  public rgb_lighting: boolean | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    size_type: string | undefined,
    socket: string | undefined,
    chipset: string | undefined,
    memory_channels: Array<string> | undefined,
    pcie_slots: Array<string> | undefined,
    external_io: Array<string> | undefined,
    rgb_lighting: boolean | undefined
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
  public size_type: string | undefined;
  public max_wattage: number | undefined;
  public certification: string | undefined;
  public modularity_type: string | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    size_type: string | undefined,
    max_wattage: number | undefined,
    certification: string | undefined,
    modularity_type: string | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.size_type = size_type;
    this.max_wattage = max_wattage;
    this.certification = certification;
    this.modularity_type = modularity_type;
  }
}

export class Case extends DependentComponent {
  public type: string | undefined;
  public motherboard_types_supported: Array<string> | undefined;
  public skin: string | undefined;
  public features: Array<string> | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    type: string | undefined,
    motherboard_types_supported: Array<string> | undefined,
    skin: string | undefined,
    features: Array<string> | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
    this.motherboard_types_supported = motherboard_types_supported;
    this.skin = skin;
    this.features = features;
  }
}

export class Drive extends DependentComponent {
  public storage_type: string | undefined;
  public size: number | undefined;
  public read_speed: number | undefined;
  public write_speed: number | undefined;
  public buffer_size: number | undefined;

  public constructor(
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    storage_type: string | undefined,
    size: number | undefined,
    read_speed: number | undefined,
    write_speed: number | undefined,
    buffer_size: number | undefined
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
  public name: string;
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
    name: string,
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
    this.name = name;
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

  public static generateCandidateBuilds(
    answeredQuestions: Array<AnsweredQuestion>
  ): Array<Build> {
    return [];
  } // TODO:

  public constraintsMet(): boolean {
    return false;
  } // TODO:

  public uploadComment(comment: string): void {} // TODO:

  public increaseLikes(): void {} // TODO:

  public increaseDislikes(): void {} // TODO:

  public saveBuild(): void {} // TODO:
}

export class Library {
  public builds: Array<Build>;

  public constructor(builds: Array<Build>) {
    this.builds = builds;
  }

  public inLibrary(buildName: string): boolean {
    return false;
  } // TODO:
}

export class WallOfBuilds {
  public builds: Array<Build>;

  public constructor(builds: Array<Build>) {
    this.builds = builds;
  }

  public showBuilds(): Array<Build> {
    return [];
  } // TODO:

  public postBuild(build: Build): void {} // TODO:
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

  public isValid(): boolean {
    return false;
  } // TODO:
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

  public placeOrder(): void {} // TODO:
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
  public billing_information: BillingInformation | undefined;
  public library: Library | undefined;

  public constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    billing_information: BillingInformation | undefined,
    library: Library | undefined
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

export class UserStatus {
  public username: string | undefined;
  public email: string | undefined;

  public constructor() {}

  public logIn(username: string, email: string): void {
    this.username = username;
    this.email = email;
  }

  public logOut(): void {
    this.username = undefined;
    this.email = undefined;
  }

  public isLoggedIn(): boolean {
    return false;
  } // TODO:
}

export class Rating {
  public builder: Builder;
  public build: Build;
  public liked: boolean;
  public disliked: boolean;
  public comment: string | undefined;

  public constructor(
    builder: Builder,
    build: Build,
    liked: boolean,
    disliked: boolean,
    comment: string | undefined
  ) {
    this.builder = builder;
    this.build = build;
    this.liked = liked;
    this.disliked = disliked;
    this.comment = comment;
  }

  public updateRating(
    comment: string | undefined,
    liked: boolean | undefined,
    disliked: boolean | undefined
  ) {} // TODO:
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