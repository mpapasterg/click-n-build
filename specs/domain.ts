export abstract class Component {
  public id: string;
  public name: string;
  public price: number;
  public image: string | undefined;
  public description: string | undefined;
  public manufacturer: string | undefined;

  public constructor(
    id: string,
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

  public static async queryComponents(
    componentType: string,
    attributes: { [k: string]: string }
  ): Promise<Array<Component> | null> {
    const response = await useTypedFetch(
      ComponentGetResponseSchema,
      ComponentGetURL.replace("[type]", componentType) +
        useQueryParameters(attributes),
      {
        method: "GET",
        server: false,
      }
    );

    if (response.error.value) {
      return null;
    } else {
      const data = response.data.value.components;
      const componentsData = new Array<Component>();
      switch (componentType) {
        case "cpu":
          for (const component of data as Array<InterfaceType<typeof CPU>>) {
            componentsData.push(
              new CPU(
                component.id,
                component.name,
                component.price,
                component.image,
                component.description,
                component.manufacturer,
                component.architecture,
                component.socket,
                component.cores,
                component.threads,
                component.base_clock,
                component.oc_clock,
                component.caches,
                component.watt_consumption
              )
            );
          }
          break;
        case "gpu":
          for (const component of data as Array<InterfaceType<typeof GPU>>) {
            componentsData.push(
              new GPU(
                component.id,
                component.name,
                component.price,
                component.image,
                component.description,
                component.manufacturer,
                component.architecture,
                component.base_clock,
                component.oc_clock,
                component.vram_type,
                component.vram_size,
                component.pcie_type,
                component.watt_consumption
              )
            );
          }
          break;
        case "ram":
          for (const component of data as Array<InterfaceType<typeof RAM>>) {
            componentsData.push(
              new RAM(
                component.id,
                component.name,
                component.price,
                component.image,
                component.description,
                component.manufacturer,
                component.type,
                component.modules,
                component.size,
                component.clock_speed,
                component.cas_latency,
                component.rgb_lighting,
                component.watt_consumption
              )
            );
          }
          break;
        case "drive":
          for (const component of data as Array<InterfaceType<typeof Drive>>) {
            componentsData.push(
              new Drive(
                component.id,
                component.name,
                component.price,
                component.image,
                component.description,
                component.manufacturer,
                component.storage_type,
                component.size,
                component.read_speed,
                component.write_speed,
                component.buffer_size,
                component.watt_consumption
              )
            );
          }
          break;
        case "coolingsystem":
          for (const component of data as Array<
            InterfaceType<typeof CoolingSystem>
          >) {
            componentsData.push(
              new CoolingSystem(
                component.id,
                component.name,
                component.price,
                component.image,
                component.description,
                component.manufacturer,
                component.type,
                component.active_cooling,
                component.watt_consumption
              )
            );
          }
          break;
        case "decoration":
          for (const component of data as Array<
            InterfaceType<typeof Decoration>
          >) {
            componentsData.push(
              new Decoration(
                component.id,
                component.name,
                component.price,
                component.image,
                component.description,
                component.manufacturer,
                component.type,
                component.watt_consumption
              )
            );
          }
          break;
        case "motherboard":
          for (const component of data as Array<
            InterfaceType<typeof Motherboard>
          >) {
            componentsData.push(
              new Motherboard(
                component.id,
                component.name,
                component.price,
                component.image,
                component.description,
                component.manufacturer,
                component.size_type,
                component.socket,
                component.chipset,
                component.memory_channels,
                component.pcie_slots,
                component.external_io,
                component.rgb_lighting,
                component.watt_consumption,
                component.ram_type,
                component.nvme_slots
              )
            );
          }
          break;
        case "psu":
          for (const component of data as Array<InterfaceType<typeof PSU>>) {
            componentsData.push(
              new PSU(
                component.id,
                component.name,
                component.price,
                component.image,
                component.description,
                component.manufacturer,
                component.size_type,
                component.max_wattage,
                component.certification,
                component.modularity_type
              )
            );
          }
          break;
        case "case":
          for (const component of data as Array<InterfaceType<typeof Case>>) {
            componentsData.push(
              new Case(
                component.id,
                component.name,
                component.price,
                component.image,
                component.description,
                component.manufacturer,
                component.type,
                component.motherboard_types_supported,
                component.skin,
                component.features,
                component.watt_consumption
              )
            );
          }
          break;
      }
      return componentsData;
    }
  }

  public static getComponents(
    componentType: string
  ): Promise<Array<Component> | null> {
    return Component.queryComponents(componentType, {});
  }
}

export abstract class BasicComponent extends Component {}

export class CPU extends BasicComponent {
  public architecture: string | undefined;
  public socket: string | undefined;
  public cores: number | undefined;
  public threads: number | undefined;
  public base_clock: number | undefined;
  public oc_clock: number | undefined;
  public caches: Array<string> | undefined;
  public watt_consumption: number | undefined;

  public constructor(
    id: string,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    architecture: string | undefined,
    socket: string | undefined,
    cores: number | undefined,
    threads: number | undefined,
    base_clock: number | undefined,
    oc_clock: number | undefined,
    caches: Array<string> | undefined,
    watt_consumption: number | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.architecture = architecture;
    this.socket = socket;
    this.cores = cores;
    this.threads = threads;
    this.base_clock = base_clock;
    this.oc_clock = oc_clock;
    this.caches = caches;
    this.watt_consumption = watt_consumption;
  }
}

export class GPU extends BasicComponent {
  public architecture: string | undefined;
  public base_clock: number | undefined;
  public oc_clock: number | undefined;
  public vram_type: string | undefined;
  public vram_size: number | undefined;
  public pcie_type: string | undefined;
  public watt_consumption: number | undefined;

  public constructor(
    id: string,
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
    pcie_type: string | undefined,
    watt_consumption: number | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.architecture = architecture;
    this.base_clock = base_clock;
    this.oc_clock = oc_clock;
    this.vram_type = vram_type;
    this.vram_size = vram_size;
    this.pcie_type = pcie_type;
    this.watt_consumption = watt_consumption;
  }
}

export class RAM extends BasicComponent {
  public type: string | undefined;
  public modules: number | undefined;
  public size: number | undefined;
  public clock_speed: number | undefined;
  public cas_latency: number | undefined;
  public rgb_lighting: boolean | undefined;
  public watt_consumption: number | undefined;

  public constructor(
    id: string,
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
    rgb_lighting: boolean | undefined,
    watt_consumption: number | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
    this.modules = modules;
    this.size = size;
    this.clock_speed = clock_speed;
    this.cas_latency = cas_latency;
    this.rgb_lighting = rgb_lighting;
    this.watt_consumption = watt_consumption;
  }
}

export class Drive extends BasicComponent {
  public storage_type: string | undefined;
  public size: number | undefined;
  public read_speed: number | undefined;
  public write_speed: number | undefined;
  public buffer_size: number | undefined;
  public watt_consumption: number | undefined;

  public constructor(
    id: string,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    storage_type: string | undefined,
    size: number | undefined,
    read_speed: number | undefined,
    write_speed: number | undefined,
    buffer_size: number | undefined,
    watt_consumption: number | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.storage_type = storage_type;
    this.size = size;
    this.read_speed = read_speed;
    this.write_speed = write_speed;
    this.buffer_size = buffer_size;
    this.watt_consumption = watt_consumption;
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
  public watt_consumption: number | undefined;

  public constructor(
    id: string,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    type: string | undefined,
    active_cooling: boolean | undefined,
    watt_consumption: number | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
    this.active_cooling = active_cooling;
    this.watt_consumption = watt_consumption;
  }
}

export class Decoration extends DependentComponent {
  public type: string | undefined;
  public watt_consumption: number | undefined;

  public constructor(
    id: string,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    type: string | undefined,
    watt_consumption: number | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
    this.watt_consumption = watt_consumption;
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
  public watt_consumption: number | undefined;
  public ram_type: string | undefined;
  public nvme_slots: number | undefined;

  public constructor(
    id: string,
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
    rgb_lighting: boolean | undefined,
    watt_consumption: number | undefined,
    ram_type: string | undefined,
    nvme_slots: number | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.size_type = size_type;
    this.socket = socket;
    this.chipset = chipset;
    this.memory_channels = memory_channels;
    this.pcie_slots = pcie_slots;
    this.external_io = external_io;
    this.rgb_lighting = rgb_lighting;
    this.watt_consumption = watt_consumption;
    this.ram_type = ram_type;
    this.nvme_slots = nvme_slots;
  }
}

export class PSU extends DependentComponent {
  public size_type: string | undefined;
  public max_wattage: number | undefined;
  public certification: string | undefined;
  public modularity_type: string | undefined;

  public constructor(
    id: string,
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
  public watt_consumption: number | undefined;

  public constructor(
    id: string,
    name: string,
    price: number,
    image: string | undefined,
    description: string | undefined,
    manufacturer: string | undefined,
    type: string | undefined,
    motherboard_types_supported: Array<string> | undefined,
    skin: string | undefined,
    features: Array<string> | undefined,
    watt_consumption: number | undefined
  ) {
    super(id, name, price, image, description, manufacturer);
    this.type = type;
    this.motherboard_types_supported = motherboard_types_supported;
    this.skin = skin;
    this.features = features;
    this.watt_consumption = watt_consumption;
  }
}

export class Build {
  public id: string;
  public name: string;
  public cpu: CPU;
  public gpu: GPU;
  public ram: RAM;
  public drive: Drive;
  public cooling_system: CoolingSystem;
  public decoration: Decoration;
  public motherboard: Motherboard;
  public psu: PSU;
  public pc_case: Case;

  public constructor(
    id: string,
    name: string,
    cpu: CPU,
    gpu: GPU,
    ram: RAM,
    drive: Drive,
    cooling_system: CoolingSystem,
    decoration: Decoration,
    motherboard: Motherboard,
    psu: PSU,
    pc_case: Case
  ) {
    this.id = id;
    this.name = name;
    this.gpu = gpu;
    this.cpu = cpu;
    this.ram = ram;
    this.drive = drive;
    this.cooling_system = cooling_system;
    this.decoration = decoration;
    this.motherboard = motherboard;
    this.psu = psu;
    this.pc_case = pc_case;
  }

  public static generateCandidateBuilds(
    answeredQuestions: Array<AnsweredQuestion>
  ): Array<Build> {
    return [];
  }

  public constraintsMet(): boolean {
    // Check Power Flow
    const power_consumption =
      (this.cpu.watt_consumption ?? 0) +
      (this.gpu.watt_consumption ?? 0) +
      (this.ram.watt_consumption ?? 0) +
      (this.drive.watt_consumption ?? 0) +
      (this.cooling_system.watt_consumption ?? 0) +
      (this.decoration.watt_consumption ?? 0) +
      (this.motherboard.watt_consumption ?? 0) +
      (this.pc_case.watt_consumption ?? 0);
    if (power_consumption > (this.psu.max_wattage ?? 0) + 100) {
      return false;
    }

    // Check sockets match between CPU and motherboard
    if (
      this.cpu.socket !== undefined &&
      this.motherboard.socket !== undefined &&
      this.cpu.socket !== this.motherboard.socket
    ) {
      return false;
    }

    // Check RAM compatibility with motherboard
    if (
      this.ram.type !== undefined &&
      this.motherboard.ram_type !== undefined &&
      this.ram.type !== this.motherboard.ram_type
    ) {
      return false;
    }

    // Check GPU compatibility with motherboard
    if (
      this.gpu.pcie_type !== undefined &&
      this.motherboard.pcie_slots !== undefined &&
      this.motherboard.pcie_slots.length > 0 &&
      !this.motherboard.pcie_slots.includes(this.gpu.pcie_type)
    ) {
      return false;
    }

    // Check if PSU fits case
    if (
      this.psu.size_type !== undefined &&
      this.pc_case.type !== undefined &&
      this.psu.size_type !== this.pc_case.type
    ) {
      return false;
    }

    return true;
  }

  public uploadComment(comment: string): void {
    useTypedFetch(
      BuildRatePostResponseSchema,
      BuildRatePostURL.replace("[id]", this.id),
      {
        method: "POST",
        server: false,
        body: new URLSearchParams(
          useFormData({ comment: comment }) as any
        ).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  public increaseLikes(): void {
    useTypedFetch(
      BuildRatePostResponseSchema,
      BuildRatePostURL.replace("[id]", this.id),
      {
        method: "POST",
        server: false,
        body: new URLSearchParams(
          useFormData({ liked: "true" }) as any
        ).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  public increaseDislikes(): void {
    useTypedFetch(
      BuildRatePostResponseSchema,
      BuildRatePostURL.replace("[id]", this.id),
      {
        method: "POST",
        server: false,
        body: new URLSearchParams(
          useFormData({ disliked: "true" }) as any
        ).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  public async saveBuild(): Promise<string> {
    const response = await useTypedFetch(
      BuildPostResponseSchema,
      BuildPostURL,
      {
        method: "POST",
        server: false,
        body: new URLSearchParams(
          useFormData({
            name: this.name,
            cpu: this.cpu.id,
            gpu: this.gpu.id,
            ram: this.ram.id,
            drive: this.drive.id,
            cooling_system: this.cooling_system.id,
            decoration: this.decoration.id,
            motherboard: this.motherboard.id,
            psu: this.psu.id,
            pc_case: this.pc_case.id,
          }) as any
        ).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.error.value) {
      return "";
    } else {
      return response.data.value.id;
    }
  }
}

export class BuildEntry {
  public id: string;
  public name: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Library {
  public builds: Array<Build>;

  public constructor(builds: Array<Build>) {
    this.builds = builds;
  }

  public inLibrary(buildName: string): boolean {
    return (
      this.builds.find((build: Build) => build.name === buildName) !== undefined
    );
  }
}

export class WallOfBuilds {
  public builds: Array<Build>;

  public constructor(builds: Array<Build>) {
    this.builds = builds;
  }

  public static async showBuilds(): Promise<Array<BuildEntry> | null> {
    const response = await useTypedFetch(WoBGetResponseSchema, WoBGetURL, {
      method: "GET",
      server: false,
    });

    if (response.error.value) {
      return null;
    } else {
      const data = response.data.value.builds;
      const buildsData = new Array<BuildEntry>();
      for (const build of data) {
        buildsData.push(new BuildEntry(build.id, build.name));
      }
      return buildsData;
    }
  }

  public static postBuild(build: Build): void {
    useTypedFetch(
      BuildPostPostResponseSchema,
      BuildPostPostURL.replace("[id]", build.id),
      { method: "POST", server: false }
    );
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

  public isValid(): boolean {
    // Check street number
    const streetNumber = +this.address.split(" ")[1];
    if (streetNumber === Number.NaN || !Number.isInteger(streetNumber)) {
      return false;
    }

    // Check postal code
    if (
      this.postal_code.toString().length != 5 ||
      !Number.isInteger(this.postal_code)
    ) {
      return false;
    }

    // Check city
    if (!(this.city in ["Athens", "Thessaloniki", "Patras"])) {
      return false;
    }

    // Check country
    if (this.country !== "Greece") {
      return false;
    }

    return true;
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

  public placeOrder(): void {
    useTypedFetch(BuildPurchasePostResponseSchema, BuildPurchasePostURL, {
      method: "POST",
      server: false,
      body: new URLSearchParams(
        useFormData({
          name: this.billing_information.name,
          surname: this.billing_information.surname,
          address: this.billing_information.address,
          postal_code: this.billing_information.postal_code.toString(),
          city: this.billing_information.city,
          country: this.billing_information.country,
        }) as any
      ).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}

export abstract class User {
  public constructor() {}
}

export class Guest extends User {}

export class Builder extends User {
  public id: string;
  public username: string;
  public email: string;
  public password: string;
  public billing_information: BillingInformation | undefined;
  public library: Library | undefined;

  public constructor(
    id: string,
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

  public isLoggedIn(): boolean {
    const auth = useAuthStore();
    return auth.isAuthenticated;
  }
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
    liked: boolean | undefined,
    disliked: boolean | undefined,
    comment: string | undefined
  ) {
    this.liked = liked ?? this.liked;
    this.disliked = disliked ?? this.disliked;
    this.comment = comment ?? this.comment;
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

export abstract class SpellChecker {
  public static spellCheck(comment: string): boolean {
    return true;
  }
}

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
    if (selected > this.question.choices.length) {
      throw new Error("Invalid selection");
    }
    this.selected = selected;
  }
}

export class NormalMode extends BuildingMode {}

export class ExpertMode extends BuildingMode {}
