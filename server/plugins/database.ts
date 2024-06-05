import mongoose from "mongoose";
import { callOnce } from "nuxt/app";

let runOnce: boolean = false;

export default defineNitroPlugin(async (nitro) => {
  let runOnce: boolean = false;
  return (async (nitro) => {
    // Connect to the database
    mongoose.connect("mongodb://root:root@mongodb:27017/", {
      autoIndex: false,
      dbName: "click-n-build-dev",
    });

    // Populate Database
    if (!runOnce) {
      runOnce = true;
      // Populate Components
      const cpu = await CPUModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "AMD Ryzen 5 5500GT",
        price: 109.75,
        image:
          "https://a.scdn.gr/images/sku_main_images/050305/50305298/xlarge_20240207095926_amd_ryzen_5_5500gt_3_6ghz_epexergastis_6_pyrinon_gia_socket_am4_se_kouti.jpeg",
        description: "",
        manufacturer: "AMD",
        architecture: "Zen 3",
        socket: "AM4",
        cores: 6,
        threads: 12,
        base_clock: 3.6,
        oc_clock: 4.4,
        caches: [384, 3000, 16000],
        watt_consumption: 65,
      });

      await CPUModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "AMD Ryzen 7 5700X",
        price: 173.9,
        image:
          "https://b.scdn.gr/images/sku_main_images/035208/35208363/20220603161518_amd_ryzen_7_5700x_3_4ghz_epexergastis_8_pyrinon_gia_socket_am4_se_kouti.jpeg",
        description: "",
        manufacturer: "AMD",
        architecture: "Zen 3",
        socket: "AM4",
        cores: 8,
        threads: 16,
        base_clock: 3.4,
        oc_clock: 4.6,
        caches: [384, 4000, 32000],
        watt_consumption: 65,
      });

      await CPUModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Intel Core i5 14600KF 24 M Cache",
        price: 291.62,
        image:
          "https://c.scdn.gr/images/sku_main_images/046852/46852484/xlarge_20231018111631_intel_core_i5_14600kf_2_6ghz_epexergastis_14_pyrinon_gia_socket_1700_se_kouti.jpeg",
        description: "",
        manufacturer: "Intel",
        architecture: "Raptor Lake",
        socket: "FCLGA1700",
        cores: 8,
        threads: 20,
        base_clock: 2.6,
        oc_clock: 5.3,
        caches: [20000, 24000],
        watt_consumption: 181,
      });

      const gpu = await GPUModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Sapphire Radeon RX 7900 XTX 24GB GDDR6 Pulse",
        price: 1011.2,
        image:
          "https://d.scdn.gr/images/sku_main_images/040296/40296432/xlarge_20230110155112_sapphire_radeon_rx_7900_xtx_24gb_gddr6_pulse_karta_grafikon_11322_02_20g.jpeg",
        description: "",
        manufacturer: "AMD",
        architecture: "RDNA 3",
        base_clock: 1.895,
        oc_clock: 2.525,
        vram_type: "GDDR6",
        vram_size: 24,
        pcie_type: 4.0,
        watt_consumption: 355,
      });

      await GPUModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "NVIDIA GeForce RTX 4090",
        price: 2326.41,
        image:
          "https://d.scdn.gr/images/sku_main_images/038718/38718004/xlarge_20221014154624_asus_geforce_rtx_4090_24gb_gddr6x_tuf_gaming_oc_karta_grafikon_pci_e_x16_4_0_me_2_hdmi_kai_3_displayport_90yv0ie1_m0na00.jpeg",
        description: "",
        manufacturer: "Asus",
        architecture: "Ada Lovelace",
        base_clock: 2.235,
        oc_clock: 2.52,
        vram_type: "GDDR6X",
        vram_size: 24,
        pcie_type: 4.0,
        watt_consumption: 450,
      });

      await GPUModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "NVIDIA GeForce RTX 4050",
        price: 1865.2,
        image:
          "https://b.scdn.gr/images/sku_main_images/038263/38263429/xlarge_20220929100810_gigabyte_geforce_rtx_4090_24gb_gddr6x_gaming_oc_karta_grafikon_pci_e_x16_4_0_me_hdmi_kai_3_displayport.jpeg",
        description: "",
        manufacturer: "AMD",
        architecture: "RDNA 1",
        base_clock: 1.647,
        oc_clock: 1.845,
        vram_type: "GDDR6",
        vram_size: 4,
        pcie_type: 4.0,
        watt_consumption: 130,
      });

      const ram = await RAMModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Corsair Vengeance LPX",
        price: 45.55,
        image:
          "https://a.scdn.gr/images/sku_main_images/007332/7332757/20211102144000_corsair_vengeance_lpx_16gb_ddr4_ram_me_2_modules_2x8gb_kai_sychnotita_3200mhz_gia_desktop_cmk16gx4m2b3200c16.jpeg",
        description: "",
        manufacturer: "Corsair",
        type: "DDR4",
        modules: 2,
        size: 16,
        clock_speed: 3200,
        cas_latency: 16,
        rgb_lighting: false,
        watt_consumption: 10,
      });

      await RAMModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "G.Skill Trident Z RGB",
        price: 58.0,
        image:
          "https://c.scdn.gr/images/sku_main_images/011105/11105234/xlarge_20201013122452_g_skill_tridentz_rgb_16gb_ddr4_3200mhz_f4_3200c16d_16gtzr.jpeg",
        description: "",
        manufacturer: "G.Skill",
        type: "DDR4",
        modules: 2,
        size: 16,
        clock_speed: 3600,
        cas_latency: 18,
        rgb_lighting: true,
        watt_consumption: 13,
      });

      await RAMModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Kingston HyperX Fury",
        price: 113.0,
        image:
          "https://b.scdn.gr/images/sku_main_images/010829/10829380/xlarge_20170116103210_hyperx_impact_16gb_ddr4_2666mhz_hx426s15ib2_16.jpeg",
        description: "",
        manufacturer: "Kingston",
        type: "DDR4",
        modules: 2,
        size: 16,
        clock_speed: 2666,
        cas_latency: 16,
        rgb_lighting: false,
        watt_consumption: 10,
      });

      const drive = await DriveModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Samsung 970 EVO Plus NVMe SSD",
        price: 64.29,
        image:
          "https://d.scdn.gr/images/sku_main_images/017274/17274661/xlarge_20190206090920_samsung_970_evo_plus_500gb.jpeg",
        description: "",
        manufacturer: "Samsung",
        storage_type: "NVMe M.2 SSD",
        size: 1,
        read_speed: 3500,
        write_speed: 3300,
        buffer_size: 1000,
        watt_consumption: 6,
      });

      await DriveModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Western Digital Blue 3D NAND SATA SSD",
        price: 72.8,
        image:
          "https://d.scdn.gr/images/sku_main_images/012658/12658338/xlarge_20190205144158_western_digital_blue_3d_500gb.jpeg",
        description: "",
        manufacturer: "Western Digital",
        storage_type: "SATA III SSD",
        size: 1,
        read_speed: 560,
        write_speed: 530,
        buffer_size: 0,
        watt_consumption: 3,
      });

      await DriveModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Seagate BarraCuda HDD",
        price: 67.16,
        image:
          "https://a.scdn.gr/images/sku_main_images/015405/15405705/xlarge_20200310121558_seagate_barracuda_2tb_st2000dm008.jpeg",
        description: "",
        manufacturer: "Seagate",
        storage_type: "3.5 SATA III HDD",
        size: 2,
        read_speed: 220,
        write_speed: 220,
        buffer_size: 256,
        watt_consumption: 3,
      });

      const motherboard = await MotherboardModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "ASUS ROG Strix Z790-E Gaming WiFi",
        price: 456.4,
        image:
          "https://a.scdn.gr/images/sku_main_images/038889/38889669/xlarge_20221021164552_asus_rog_strix_z790_e_gaming_wifi_motherboard_atx_me_intel_1700_socket.jpeg",
        description: "",
        manufacturer: "Asus",
        size_type: "ATX",
        socket: "LGA 1700",
        chipset: "Intel Z790",
        memory_channels: ["2(Dual Channel)"],
        pcie_slots: ["1 x PCIe 5.0 x16", "1 x PCIe 4.0 x16", "3 x PCIe 3.0 x1"],
        external_io: [
          "1 x HDMI",
          "1 x DisplayPort",
          "8 x USB 3.2 Gen 2 Type-A",
          "2 x USB 3.2 Gen 2 Type-C",
          "4 x USB 2.0",
          "1 x 2.5G Ethernet",
          "WiFi 6E",
          "Bluetooth 5.2",
          "Audio ports",
        ],
        rgb_lightning: true,
        watt_consumption: 30,
        ram_type: "DDR5",
        nvme_slots: 5,
      });

      await MotherboardModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "MSI MPG B550 Gaming Edge WiFi",
        price: 179.99,
        image:
          "https://a.scdn.gr/images/sku_main_images/024026/24026826/xlarge_20200715120931_msi_b550_gaming_edge_wifi.jpeg",
        description: "",
        manufacturer: "MSI",
        size_type: "ATX",
        socket: "AM4",
        chipset: "AMD B550",
        memory_channels: ["2(Dual Channel)"],
        pcie_slots: ["1 x PCIe 5.0 x16", "1 x PCIe 4.0 x16", "3 x PCIe 3.0 x1"],
        external_io: [
          "1 x HDMI",
          "1 x DisplayPort",
          "2 x USB 3.2 Gen 2 Type-A",
          "1 x USB 3.2 Gen 2 Type-C",
          "2 x USB 3.2 Gen 1",
          "2 x USB 2.0",
          "1 x 2.5G Ethernet",
          "WiFi 6E",
          "Bluetooth 5.1",
          "Audio ports",
        ],
        rgb_lightning: true,
        watt_consumption: 30,
        ram_type: "DDR4",
        nvme_slots: 2,
      });

      await MotherboardModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Gigabyte B660M DS3H AX",
        price: 170.0,
        image:
          "https://c.scdn.gr/images/sku_main_images/033526/33526509/xlarge_20230130094749_gigabyte_b660m_ds3h_ax_ddr4_rev_1_x_motherboard_micro_atx_me_intel_1700_socket.jpeg",
        description: "",
        manufacturer: "Gigabyte",
        size_type: "Micro ATX",
        socket: "LGA 1700",
        chipset: "Intel B660",
        memory_channels: ["2(Dual Channel)"],
        pcie_slots: ["1 x PCIe 4.0 x16", "1 x PCIe 3.0 x16", "1 x PCIe 3.0 x1"],
        external_io: [
          "1 x HDMI",
          "1 x DisplayPort",
          "1 x USB 3.2 Gen 2 Type-A",
          "1 x USB 3.2 Gen 2 Type-C",
          "4 x USB 3.2 Gen 1",
          "4 x USB 2.0",
          "1 x 2.5G Ethernet",
          "WiFi 6",
          "Bluetooth 5.2",
          "Audio ports",
        ],
        rgb_lightning: false,
        watt_consumption: 30,
        ram_type: "DDR4",
        nvme_slots: 2,
      });

      const cooling_system = await CoolingSystemModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Noctua NH-D15",
        price: 107.6,
        image:
          "https://c.scdn.gr/images/sku_main_images/004754/4754042/xlarge_20211126155208_noctua_nh_d15_psyktra_epexergasti_gia_socket_am4_115x_am3_am3_kafe.jpeg",
        description: "",
        manufacturer: "Noctua",
        type: "Air Cooler",
        active_cooling: true,
        watt_consumption: 3,
      });

      await CoolingSystemModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Corsair H150i Elite Capellix",
        price: 80.0,
        image:
          "https://c.scdn.gr/images/sku_main_images/026520/26520835/xlarge_20210111135254_corsair_icue_h150i_elite_capellix.jpeg",
        description: "",
        manufacturer: "Corsair",
        type: "Liquid Cooler",
        active_cooling: true,
        watt_consumption: 19,
      });

      await CoolingSystemModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "be quiet! Dark Rock Pro 4",
        price: 118.98,
        image:
          "https://c.scdn.gr/images/sku_main_images/014899/14899529/xlarge_20211020141801_be_quiet_dark_rock_pro_4.jpeg",
        description: "",
        manufacturer: "Be Quiet",
        type: "Air Cooler",
        active_cooling: true,
        watt_consumption: 3,
      });

      await CaseModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "NZXT H510",
        price: 110.0,
        image:
          "https://a.scdn.gr/images/sku_main_images/019812/19812807/xlarge_20190821163108_nzxt_h510_black.jpeg",
        description: "",
        manufacturer: "NZXT",
        type: "Mid Tower",
        motherboard_type: ["ATX", "Micro-ATX", "Mini-ITX"],
        skin: "Steel chassis with tempered glass side panel",
        features: [
          "USB 3.1 Gen 1 Type-A",
          "USB 3.1 Gen 2 Type-C",
          "audio/microphone jack",
          "Cable management system with pre-installed channels and straps",
          "Two pre-installed 120mm fans for optimized airflow",
          "Removable filters for PSU and front intake",
          "Supports radiators up to 280mm for liquid cooling",
        ],
        watt_consumption: 0,
      });

      const pc_case = await CaseModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Corsair iCUE 4000X RGB",
        price: 134.9,
        image:
          "https://c.scdn.gr/images/sku_main_images/025056/25056599/xlarge_20201002151604_corsair_icue_4000x_rgb_black.jpeg",
        description: "",
        manufacturer: "Corsair",
        type: "Mid Tower",
        motherboard_type: ["ATX", "Micro-ATX", "Mini-ITX"],
        skin: "Steel chassis with tempered glass front and side panels",
        features: [
          "USB 3.0 and USB 3.1 Gen 1 Type-C",
          "audio/microphone jack",
          "Cable management system with routing channels and Velcro straps",
          "Supports up to 6x 120mm or 4x 140mm cooling fans",
          "Removable filters on top, front and bottom",
          "Supports radiators up to 360mm for liquid cooling",
        ],
        watt_consumption: 0,
      });

      await CaseModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Fractal Design Meshify C",
        price: 117.72,
        image:
          "https://b.scdn.gr/images/sku_main_images/020659/20659103/xlarge_20191023105614_fractal_design_meshify_c_dark_tempered_glass.jpeg",
        description: "",
        manufacturer: "Fractal Design",
        type: "Mid Tower",
        motherboard_type: ["ATX", "Micro-ATX", "Mini-ITX"],
        skin: "Steel chassis with tempered glass side panel and mesh front panel",
        features: [
          "USB 3.0",
          "audio/microphone jack",
          "High airflow design with mesh front panel",
          "Two pre-installed 120mm fans (one front, one rear)",
          "Full-length PSU shroud for clean cable management",
          "Supports up to 7x 120mm or 4x 140mm cooling fans",
          "Removable dust filters on top, front, and bottom",
          "Supports radiators up to 360mm for liquid cooling ",
        ],
        watt_consumption: 0,
      });

      const psu = await PSUModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Corsair RM850x",
        price: 109.9,
        image:
          "https://d.scdn.gr/images/sku_main_images/028863/28863784/xlarge_20210513120147_corsair_rmx_series_rm850x_2021_850w_full_modular_80_plus_gold.jpeg",
        description: "",
        manufacturer: "Corsair",
        size_type: "ATX",
        max_wattage: 850,
        certification: "80 PLUS Gold",
        modularity_type: "Full Modular",
      });

      await PSUModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "EVGA SuperNOVA 750 G5",
        price: 129.99,
        image: "https://www.wsn.gr/photos/products/large/2122.jpg",
        description: "",
        manufacturer: "EVGA",
        size_type: "ATX",
        max_wattage: 750,
        certification: "80 PLUS Gold",
        modularity_type: "Full Modular",
      });

      await PSUModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Seasonic Focus GX-650",
        price: 120.0,
        image:
          "https://b.scdn.gr/images/sku_main_images/020318/20318246/xlarge_20200304151254_seasonic_focus_gx_650.jpeg",
        description: "",
        manufacturer: "Seasonic",
        size_type: "ATX",
        max_wattage: 650,
        certification: "80 PLUS Gold",
        modularity_type: "Full Modular",
      });

      const decoration = await DecorationModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "LED RGB Light Strips",
        price: 8.89,
        image:
          "https://b.scdn.gr/images/sku_main_images/040960/40960306/xlarge_20230324095217_yeelight_ylot01yl_tainia_led_trofodosias_24v_rgb_mikous_1m.jpeg",
        description: "",
        manufacturer: "Yeelight",
        type: "LED RGB Light Strips",
        watt_consumption: 15,
      });

      await DecorationModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "RGB Fans (120mm)",
        price: 35.0,
        image:
          "https://c.scdn.gr/images/sku_main_images/013241/13241820/xlarge_20171106135726_deepcool_rf_120_rgb_3_pack.jpeg",
        description: "",
        manufacturer: "Deepcool",
        type: "120mm RGB Fans",
        watt_consumption: 4,
      });

      await DecorationModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "LED Display Panel (Acrylic Panel with Customizable LED Lighting)",
        price: 50.0,
        image:
          "https://byiba.com/wp-content/uploads/2020/02/Acrylic-Led-Light-Panel-1.png",
        description: "",
        manufacturer: "Byiba",
        type: "LED Display Panel",
        watt_consumption: 10,
      });

      // Populate Test Build
      const build = await BuildModel.create({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: "Performance Build",
        cpu: cpu._id,
        gpu: gpu._id,
        ram: ram._id,
        drive: drive._id,
        cooling_system: cooling_system._id,
        decoration: decoration._id,
        motherboard: motherboard._id,
        psu: psu._id,
        pc_case: pc_case._id,
        wall_of_builds: true,
      });
      console.log(`===== Test Build: '${build._id}' =====`);
    }
  })(nitro);
});
