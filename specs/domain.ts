class User {
  public constructor() {}
}

class Guest extends User {}

class Builder extends User {
  private id: number;
  private username: string;
  private email: string;
  private password: string;
  private billing_information: BillingInformation;
  private library: Library;

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

class Build {
  private id: number;
  private components: Array<Component>;

  public constructor(id: number, components: Array<Component>) {
    this.id = id;
    this.components = components;
  }
}

class Library {
  private builds: Array<Build>;

  public constructor(builds: Array<Build>) {
    this.builds = builds;
  }
}

class WallOfBuilds {
  private builds: Array<Build>;

  public constructor(builds: Array<Build>) {
    this.builds = builds;
  }
}

class Rating {
  private builder: Builder;
  private build: Build;
  private liked: boolean;
  private disliked: boolean;
  private comment: string;

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

class BillingInformation {
  private name: string;
  private surname: string;
  private address: string;
  private postal_code: number;
  private city: string;
  private country: string;

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

class Purchase {
  private builds: Array<Build>;
  private billing_information: BillingInformation;
  private price: number;

  public constructor(
    builds: Array<Build>,
    billing_information: BillingInformation,
    price: number
  ) {
    this.builds = builds;
    this.billing_information = billing_information;
    this.price = price;
  }
}

class Inventory {
  private items: Array<InventoryItem>;

  public constructor(items: Array<InventoryItem>) {
    this.items = items;
  }
}

class InventoryItem {
  private component: Component;
  private stock: number;

  public constructor(component: Component, stock: number) {
    this.component = component;
    this.stock = stock;
  }
}

class Component {
  private id: number;
  private name: string;
  private image: string;
  private description: string;
  private manufacturer: string;
  private price: number;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.manufacturer = manufacturer;
    this.price = price;
  }
}

class BasicComponent extends Component {}

class CPU extends BasicComponent {
  private architecture: string;
  private cores: number;
  private threads: number;
  private base_clock: number;
  private oc_clock: number;
  private caches: Array<string>;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number,
    architecture: string,
    cores: number,
    threads: number,
    base_clock: number,
    oc_clock: number,
    caches: Array<string>
  ) {
    super(id, name, image, description, manufacturer, price);
    this.architecture = architecture;
    this.cores = cores;
    this.threads = threads;
    this.base_clock = base_clock;
    this.oc_clock = oc_clock;
    this.caches = caches;
  }
}

class GPU extends BasicComponent {
  private architecture: string;
  private base_clock: number;
  private oc_clock: number;
  private vram_type: string;
  private vram_size: number;
  private pcie_type: string;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number,
    architecture: string,
    base_clock: number,
    oc_clock: number,
    vram_type: string,
    vram_size: number,
    pcie_type: string
  ) {
    super(id, name, image, description, manufacturer, price);
    this.architecture = architecture;
    this.base_clock = base_clock;
    this.oc_clock = oc_clock;
    this.vram_type = vram_type;
    this.vram_size = vram_size;
    this.pcie_type = pcie_type;
  }
}

class CoolingSystem extends BasicComponent {
  private type: string;
  private active_cooling: boolean;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number,
    type: string,
    active_cooling: boolean
  ) {
    super(id, name, image, description, manufacturer, price);
    this.type = type;
    this.active_cooling = active_cooling;
  }
}

class DependentComponent extends Component {}

class Decoration extends DependentComponent {
  private type: string;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number,
    type: string
  ) {
    super(id, name, image, description, manufacturer, price);
    this.type = type;
  }
}

class RAM extends DependentComponent {
  private type: string;
  private modules: number;
  private size: number;
  private clock_speed: number;
  private cas_latency: number;
  private rgb_lighting: boolean;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number,
    type: string,
    modules: number,
    size: number,
    clock_speed: number,
    cas_latency: number,
    rgb_lighting: boolean
  ) {
    super(id, name, image, description, manufacturer, price);
    this.type = type;
    this.modules = modules;
    this.size = size;
    this.clock_speed = clock_speed;
    this.cas_latency = cas_latency;
    this.rgb_lighting = rgb_lighting;
  }
}

class Motherboard extends DependentComponent {
  private size_type: string;
  private socket: string;
  private chipset: string;
  private memory_channels: Array<string>;
  private pcie_slots: Array<string>;
  private external_io: Array<string>;
  private rgb_lighting: boolean;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number,
    size_type: string,
    socket: string,
    chipset: string,
    memory_channels: Array<string>,
    pcie_slots: Array<string>,
    external_io: Array<string>,
    rgb_lighting: boolean
  ) {
    super(id, name, image, description, manufacturer, price);
    this.size_type = size_type;
    this.socket = socket;
    this.chipset = chipset;
    this.memory_channels = memory_channels;
    this.pcie_slots = pcie_slots;
    this.external_io = external_io;
    this.rgb_lighting = rgb_lighting;
  }
}

class PSU extends DependentComponent {
  private size_type: string;
  private max_wattage: number;
  private certification: string;
  private modularity_type: string;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number,
    size_type: string,
    max_wattage: number,
    certification: string,
    modularity_type: string
  ) {
    super(id, name, image, description, manufacturer, price);
    this.size_type = size_type;
    this.max_wattage = max_wattage;
    this.certification = certification;
    this.modularity_type = modularity_type;
  }
}

class Case extends DependentComponent {
  private type: string;
  private motherboard_types_supported: Array<string>;
  private skin: string;
  private features: Array<string>;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number,
    type: string,
    motherboard_types_supported: Array<string>,
    skin: string,
    features: Array<string>
  ) {
    super(id, name, image, description, manufacturer, price);
    this.type = type;
    this.motherboard_types_supported = motherboard_types_supported;
    this.skin = skin;
    this.features = features;
  }
}

class Drive extends DependentComponent {
  private storage_type: string;
  private size: number;
  private read_speed: number;
  private write_speed: number;
  private buffer_size: number;

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    manufacturer: string,
    price: number,
    storage_type: string,
    size: number,
    read_speed: number,
    write_speed: number,
    buffer_size: number
  ) {
    super(id, name, image, description, manufacturer, price);
    this.storage_type = storage_type;
    this.size = size;
    this.read_speed = read_speed;
    this.write_speed = write_speed;
    this.buffer_size = buffer_size;
  }
}

class SpellChecker {}

class BuildGenerator {}

class BuildingMode {}

class BeginnerMode extends BuildingMode {
  private questions: Array<Question>;

  public constructor(questions: Array<Question>) {
    super();
    this.questions = questions;
  }
}

class Question {
  private question: string;
  private choices: Array<string>;
  private selected: number | null = null;

  public constructor(question: string, choices: Array<string>) {
    this.question = question;
    this.choices = choices;
  }

  public select(selected: number) {
    this.selected = selected;
  }
}

class NormalMode extends BuildingMode {}

class ExpertMode extends BuildingMode {}
