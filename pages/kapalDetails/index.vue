<script setup>
  definePageMeta({
    title: "Kapal Profile",
    layout: "default",
    middleware: ["auth"],
  });

  // Mock data (example only)
  const kapalImage = "@/assets/image/vessels/kelas_langkawi.png"; // Replace with your real image source
  const statusKapal = "OPS";
  const nextAdDate = "2025-06-01";
  const nextPrefitDate = "2026-07-15";
  const totalCrew = 35;

  const tabs = [
    { name: "Profile", key: "profile" },
    { name: "Rupacara Aset", key: "rupacara" },
    { name: "ROVA", key: "rova" },    
    { name: "Aset", key: "osl" }, 
    { name: "Stock", key: "stock" },  
    { name: "PMS", key: "pms" },
    { name: "Kad Kerja", key: "jobcard" },
    { name: "Krew", key: "krew" },
    
  ];

  const field = ref(['tarikhKemaskini', 'penerangan','tindakan']);
  const fieldKrew = ref(['BIL', 'noTentera', 'nama', 'bahagian','tindakan']);


  const activeTab = ref("profile");

  // Rupacara data
  const rupacaraData = ref([
    {
      id: 1,
      tarikhKemaskini: "2024-03-20",
      penerangan: "Penggantian enjin utama dan sistem kawalan kapal",
      portView: "@/assets/img/vessels/port_view.png",
      starboardView: "@/assets/img/vessels/starboard_view.png",
      forwardView: "@/assets/img/vessels/forward_view.png",
      afterView: "@/assets/img/vessels/after_view.png",
      engineRoom: "@/assets/img/vessels/engine_room_1.jpg",
      closedBridge: "@/assets/img/vessels/closed_bridge_1.jpg"
    },
    {
      id: 2,
      tarikhKemaskini: "2024-03-15",
      penerangan: "Penambahbaikan sistem radar dan komunikasi",
      portView: "@/assets/img/vessels/port_view_2.jpg",
      starboardView: "@/assets/img/vessels/starboard_view_2.jpg",
      forwardView: "@/assets/img/vessels/forward_view_2.jpg",
      afterView: "@/assets/img/vessels/after_view_2.jpg",
      engineRoom: "@/assets/img/vessels/engine_room_2.jpg",
      closedBridge: "@/assets/img/vessels/closed_bridge_2.jpg"
    }
  ]);

  // Sort data in descending order by tarikhKemaskini
  const sortedRupacaraData = computed(() => {
    return [...rupacaraData.value].sort((a, b) => {
      return new Date(b.tarikhKemaskini) - new Date(a.tarikhKemaskini);
    });
  });

  // Modal state
  const isRupacaraModalOpen = ref(false);
  const isViewingRupacara = ref(false);
  const rupacaraForm = ref({
    id: null,
    tarikhKemaskini: new Date().toISOString().split('T')[0],
    penerangan: "",
    portView: null,
    starboardView: null,
    forwardView: null,
    afterView: null,
    engineRoom: null,
    closedBridge: null
  });

  // Open modal for adding rupacara
  const openAddRupacaraModal = () => {
    isViewingRupacara.value = false;
    rupacaraForm.value = {
      id: null,
      tarikhKemaskini: new Date().toISOString().split('T')[0],
      penerangan: "",
      portView: null,
      starboardView: null,
      forwardView: null,
      afterView: null,
      engineRoom: null,
      closedBridge: null
    };
    isRupacaraModalOpen.value = true;
  };

  // Open modal for viewing rupacara
  const openViewRupacaraModal = (item) => {
    isViewingRupacara.value = true;
    rupacaraForm.value = { ...item };
    isRupacaraModalOpen.value = true;
  };

  // Close modal
  const closeRupacaraModal = () => {
    isRupacaraModalOpen.value = false;
  };

  // Submit rupacara form
  const submitRupacaraForm = () => {
    // Add new item
    rupacaraData.value.push({
      ...rupacaraForm.value,
      id: Date.now() // Temporary ID
    });
    closeRupacaraModal();
  };

  // Handle FormKit form submission
  const handleRupacaraSubmit = (values) => {
    rupacaraForm.value = {
      ...rupacaraForm.value,
      ...values
    };
    submitRupacaraForm();
  };

  // ROVA data
  const rovaData = ref([
    {
      id: 1,
      bulan: "Januari 2024",
      statusKapal: "Operational",
      tarikhMula: "2024-01-01",
      tarikhTamat: "2024-01-31",
      peratus: 85,
      catatan: "Kapal beroperasi dengan baik sepanjang bulan"
    },
    {
      id: 2,
      bulan: "Februari 2024",
      statusKapal: "Maintenance",
      tarikhMula: "2024-02-01",
      tarikhTamat: "2024-02-29",
      peratus: 45,
      catatan: "Kapal menjalani penyelenggaraan berjadual"
    },
    {
      id: 3,
      bulan: "Mac 2024",
      statusKapal: "Operational",
      tarikhMula: "2024-03-01",
      tarikhTamat: "2024-03-31",
      peratus: 92,
      catatan: "Kapal beroperasi dengan prestasi tinggi"
    }
  ]);

  // Sort ROVA data in descending order by tarikhMula
  const sortedRovaData = computed(() => {
    return [...rovaData.value].sort((a, b) => {
      return new Date(b.tarikhMula) - new Date(a.tarikhMula);
    });
  });

  // ROVA Modal state
  const isRovaModalOpen = ref(false);
  const isViewingRova = ref(false);
  const isEditingRova = ref(false);
  const rovaForm = ref({
    id: null,
    bulan: "",
    statusKapal: "Operational",
    tarikhMula: "",
    tarikhTamat: "",
    peratus: 0,
    catatan: ""
  });

  // Open modal for adding ROVA
  const openAddRovaModal = () => {
    isViewingRova.value = false;
    isEditingRova.value = false;
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    rovaForm.value = {
      id: null,
      bulan: `${getMonthName(today.getMonth())} ${today.getFullYear()}`,
      statusKapal: "Operational",
      tarikhMula: firstDay.toISOString().split('T')[0],
      tarikhTamat: lastDay.toISOString().split('T')[0],
      peratus: 0,
      catatan: ""
    };
    isRovaModalOpen.value = true;
  };

  // Helper function to get month name
  function getMonthName(monthIndex) {
    const months = [
      "Januari", "Februari", "Mac", "April", "Mei", "Jun",
      "Julai", "Ogos", "September", "Oktober", "November", "Disember"
    ];
    return months[monthIndex];
  }

  // Open modal for viewing ROVA
  const openViewRovaModal = (item) => {
    isViewingRova.value = true;
    isEditingRova.value = false;
    rovaForm.value = { ...item };
    isRovaModalOpen.value = true;
  };

  // Open modal for editing ROVA
  const openEditRovaModal = (item) => {
    isViewingRova.value = false;
    isEditingRova.value = true;
    rovaForm.value = { ...item };
    isRovaModalOpen.value = true;
  };

  // Close ROVA modal
  const closeRovaModal = () => {
    isRovaModalOpen.value = false;
  };

  // Submit ROVA form
  const submitRovaForm = () => {
    if (isEditingRova.value) {
      // Update existing item
      const index = rovaData.value.findIndex((i) => i.id === rovaForm.value.id);
      if (index !== -1) {
        rovaData.value[index] = { ...rovaForm.value };
      }
    } else {
      // Add new item
      rovaData.value.push({
        ...rovaForm.value,
        id: Date.now() // Temporary ID
      });
    }
    closeRovaModal();
  };

  // Delete ROVA item
  const deleteRovaItem = (id) => {
    if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
      const index = rovaData.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        rovaData.value.splice(index, 1);
      }
    }
  };

  // Handle ROVA FormKit form submission
  const handleRovaSubmit = (values) => {
    rovaForm.value = {
      ...rovaForm.value,
      ...values
    };
    submitRovaForm();
  };

  // Vessel profile data
  const vesselProfile = ref({
    generalInfo: {
      name: "KD KEDAH",
      pennantNumber: "F171",
      class: "KEDAH Class",
      type: "Patrol Vessel",
      commissioned: "2006-06-12",
      builder: "Boustead Naval Shipyard Sdn. Bhd.",
      homePort: "Lumut, Perak"
    },
    specifications: {
      displacement: "1,850 tons",
      length: "91.1 meters",
      beam: "12.5 meters",
      draft: "3.4 meters",
      propulsion: "2 × MTU 16V 4000 M90 diesel engines",
      speed: "22 knots (maximum)",
      range: "5,000 nautical miles at 12 knots",
      complement: "68 personnel (8 officers, 60 enlisted)"
    },
    armament: {
      mainGun: "1 × Bofors 57mm Mk3 naval gun",
      secondaryGuns: "2 × MSI Defence 30mm cannon",
      missiles: "MBDA Exocet MM40 Block II anti-ship missiles",
      torpedoes: "J+S torpedo launcher system",
      other: "Decoy launchers, Electronic warfare suite"
    },
    electronics: {
      radar: "Thales SMART-S Mk2 3D surveillance radar",
      sonar: "Thales Kingklip hull-mounted sonar",
      combatSystem: "Atlas TACTICOS combat management system",
      communication: "Integrated communications system with SATCOM capability"
    },
    maintenance: {
      lastMaintenance: "2023-09-15",
      nextScheduled: "2024-09-15",
      certifications: "Lloyd's Register Classification, MARPOL compliance"
    }
  });

  // PMS data
  const pmsData = ref([
    {
      id: 1,
      type: "AD",
      year: 2024,
      location: "Lumut, Perak",
      description: "Penyelenggaraan tahunan kapal"
    },
    {
      id: 2,
      type: "AD",
      year: 2025,
      location: "Lumut, Perak",
      description: "Penyelenggaraan tahunan kapal"
    },
    {
      id: 3,
      type: "AD",
      year: 2026,
      location: "Lumut, Perak",
      description: "Penyelenggaraan tahunan kapal"
    },
    {
      id: 4,
      type: "AD",
      year: 2027,
      location: "Lumut, Perak",
      description: "Penyelenggaraan tahunan kapal"
    },
    {
      id: 5,
      type: "Refit",
      year: 2028,
      location: "Lumut, Perak",
      description: "Penyelenggaraan prefit kapal"
    },
    {
      id: 6,
      type: "AMP",
      year: 2029,
      location: "Lumut, Perak",
      description: "Penyelenggaraan sistem elektronik kapal"
    },
    {
      id: 7,
      type: "AD",
      year: 2030,
      location: "Lumut, Perak",
      description: "Penyelenggaraan tahunan kapal"
    },
    {
      id: 8,
      type: "Refit",
      year: 2031,
      location: "Lumut, Perak",
      description: "Penyelenggaraan refit lengkap kapal"
    },
    {
      id: 9,
      type: "AD",
      year: 2032,
      location: "Lumut, Perak",
      description: "Penyelenggaraan tahunan kapal"
    },
    {
      id: 10,
      type: "AMP",
      year: 2033,
      location: "Lumut, Perak",
      description: "Penyelenggaraan sistem pendorongan kapal"
    }
  ]);

  // Ship Equipment data
  const shipEquipmentData = ref([
    {
      id: 1,
      equipmentNo: "EQ-2024-001",
      name: "Sistem Radar",
      category: "Elektronik",
      manufacturer: "Thales",
      model: "SMART-S Mk2",
      serialNumber: "TH-2345-8976",
      installationDate: "2006-06-15",
      status: "Beroperasi"
    },
    {
      id: 2,
      equipmentNo: "EQ-2024-002",
      name: "Sonar Sistem",
      category: "Elektronik",
      manufacturer: "Thales",
      model: "Kingklip",
      serialNumber: "TH-5678-1234",
      installationDate: "2006-06-20",
      status: "Beroperasi"
    },
    {
      id: 3,
      equipmentNo: "EQ-2024-003",
      name: "Enjin Utama 1",
      category: "Pendorongan",
      manufacturer: "MTU",
      model: "16V 4000 M90",
      serialNumber: "MTU-1234-5678",
      installationDate: "2006-05-10",
      status: "Beroperasi"
    },
    {
      id: 4,
      equipmentNo: "EQ-2024-004",
      name: "Enjin Utama 2",
      category: "Pendorongan",
      manufacturer: "MTU",
      model: "16V 4000 M90",
      serialNumber: "MTU-1234-5679",
      installationDate: "2006-05-10",
      status: "Penyelenggaraan"
    },
    {
      id: 5,
      equipmentNo: "EQ-2024-005",
      name: "Senjata Utama",
      category: "Persenjataan",
      manufacturer: "Bofors",
      model: "57mm Mk3",
      serialNumber: "BF-9876-5432",
      installationDate: "2006-07-05",
      status: "Beroperasi"
    },
    {
      id: 6,
      equipmentNo: "EQ-2024-006",
      name: "Sistem Komunikasi",
      category: "Komunikasi",
      manufacturer: "Harris",
      model: "RF-7800",
      serialNumber: "HR-4567-8901",
      installationDate: "2006-06-25",
      status: "Beroperasi"
    }
  ]);

  // Stock/Inventory data
  const stockData = ref([
    {
      id: 1,
      stockNo: "STK-2024-001",
      name: "Minyak Enjin",
      category: "Alat Ganti",
      quantity: 50,
      unit: "Liter",
      location: "Stor A",
      lastUpdated: "2024-03-15",
      minimumStock: 20,
      status: "Mencukupi"
    },
    {
      id: 2,
      stockNo: "STK-2024-002",
      name: "Penapis Minyak",
      category: "Alat Ganti",
      quantity: 15,
      unit: "Unit",
      location: "Stor B",
      lastUpdated: "2024-03-10",
      minimumStock: 5,
      status: "Mencukupi"
    },
    {
      id: 3,
      stockNo: "STK-2024-003",
      name: "Lampu Isyarat",
      category: "Elektrik",
      quantity: 8,
      unit: "Unit",
      location: "Stor C",
      lastUpdated: "2024-02-28",
      minimumStock: 10,
      status: "Kurang"
    },
    {
      id: 4,
      stockNo: "STK-2024-004",
      name: "Tali Tambat",
      category: "Peralatan Deck",
      quantity: 3,
      unit: "Gulung",
      location: "Stor D",
      lastUpdated: "2024-03-05",
      minimumStock: 2,
      status: "Mencukupi"
    },
    {
      id: 5,
      stockNo: "STK-2024-005",
      name: "Alat Ganti Radar",
      category: "Elektronik",
      quantity: 2,
      unit: "Set",
      location: "Stor E",
      lastUpdated: "2024-03-20",
      minimumStock: 1,
      status: "Mencukupi"
    },
    {
      id: 6,
      stockNo: "STK-2024-006",
      name: "Bateri",
      category: "Elektrik",
      quantity: 5,
      unit: "Unit",
      location: "Stor C",
      lastUpdated: "2024-03-18",
      minimumStock: 8,
      status: "Kurang"
    }
  ]);

  // Stock Modal state
  const isStockModalOpen = ref(false);
  const isViewingStock = ref(false);
  const isEditingStock = ref(false);
  const stockForm = ref({
    id: null,
    stockNo: "",
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    location: "",
    lastUpdated: "",
    minimumStock: 0,
    status: "Mencukupi"
  });

  // Open modal for adding stock
  const openAddStockModal = () => {
    isViewingStock.value = false;
    isEditingStock.value = false;
    const today = new Date().toISOString().split('T')[0];
    const newStockNo = `STK-${new Date().getFullYear()}-${String(stockData.value.length + 1).padStart(3, '0')}`;
    
    stockForm.value = {
      id: null,
      stockNo: newStockNo,
      name: "",
      category: "",
      quantity: 0,
      unit: "",
      location: "",
      lastUpdated: today,
      minimumStock: 0,
      status: "Mencukupi"
    };
    isStockModalOpen.value = true;
  };

  // Open modal for viewing stock
  const viewStockItem = (item) => {
    isViewingStock.value = true;
    isEditingStock.value = false;
    stockForm.value = { ...item };
    isStockModalOpen.value = true;
  };

  // Open modal for editing stock
  const editStockItem = (item) => {
    isViewingStock.value = false;
    isEditingStock.value = true;
    stockForm.value = { ...item };
    isStockModalOpen.value = true;
  };

  // Close stock modal
  const closeStockModal = () => {
    isStockModalOpen.value = false;
  };

  // Submit stock form
  const submitStockForm = () => {
    // Update status based on quantity and minimum stock
    stockForm.value.status = stockForm.value.quantity >= stockForm.value.minimumStock ? "Mencukupi" : "Kurang";
    
    if (isEditingStock.value) {
      // Update existing item
      const index = stockData.value.findIndex((i) => i.id === stockForm.value.id);
      if (index !== -1) {
        stockData.value[index] = { ...stockForm.value };
      }
    } else {
      // Add new item
      stockData.value.push({
        ...stockForm.value,
        id: Date.now() // Temporary ID
      });
    }
    closeStockModal();
  };

  // Delete stock item
  const deleteStockItem = (id) => {
    if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
      const index = stockData.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        stockData.value.splice(index, 1);
      }
    }
  };

  // Handle stock FormKit form submission
  const handleStockSubmit = (values) => {
    stockForm.value = {
      ...stockForm.value,
      ...values
    };
    submitStockForm();
  };

  // Stock categories for filtering
  const stockCategories = ["Semua", "Alat Ganti", "Elektrik", "Elektronik", "Peralatan Deck", "Lain-lain"];
  const selectedStockCategory = ref("Semua");

  // Filtered stock data
  const filteredStockData = computed(() => {
    if (selectedStockCategory.value === "Semua") {
      return stockData.value;
    }
    return stockData.value.filter(item => item.category === selectedStockCategory.value);
  });

  // Equipment Modal state
  const isEquipmentModalOpen = ref(false);
  const isViewingEquipment = ref(false);
  const isEditingEquipment = ref(false);
  const equipmentForm = ref({
    id: null,
    equipmentNo: "",
    name: "",
    category: "",
    manufacturer: "",
    model: "",
    serialNumber: "",
    installationDate: "",
    status: "Beroperasi"
  });

  // Open modal for adding equipment
  const openAddEquipmentModal = () => {
    isViewingEquipment.value = false;
    isEditingEquipment.value = false;
    const today = new Date().toISOString().split('T')[0];
    const newEquipmentNo = `EQ-${new Date().getFullYear()}-${String(shipEquipmentData.value.length + 1).padStart(3, '0')}`;
    
    equipmentForm.value = {
      id: null,
      equipmentNo: newEquipmentNo,
      name: "",
      category: "",
      manufacturer: "",
      model: "",
      serialNumber: "",
      installationDate: today,
      status: "Beroperasi"
    };
    isEquipmentModalOpen.value = true;
  };

  // Open modal for viewing equipment
  const viewEquipmentItem = (item) => {
    isViewingEquipment.value = true;
    isEditingEquipment.value = false;
    equipmentForm.value = { ...item };
    isEquipmentModalOpen.value = true;
  };

  // Open modal for editing equipment
  const editEquipmentItem = (item) => {
    isViewingEquipment.value = false;
    isEditingEquipment.value = true;
    equipmentForm.value = { ...item };
    isEquipmentModalOpen.value = true;
  };

  // Close equipment modal
  const closeEquipmentModal = () => {
    isEquipmentModalOpen.value = false;
  };

  // Submit equipment form
  const submitEquipmentForm = () => {
    if (isEditingEquipment.value) {
      // Update existing item
      const index = shipEquipmentData.value.findIndex((i) => i.id === equipmentForm.value.id);
      if (index !== -1) {
        shipEquipmentData.value[index] = { ...equipmentForm.value };
      }
    } else {
      // Add new item
      shipEquipmentData.value.push({
        ...equipmentForm.value,
        id: Date.now() // Temporary ID
      });
    }
    closeEquipmentModal();
  };

  // Delete equipment item
  const deleteEquipmentItem = (id) => {
    if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
      const index = shipEquipmentData.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        shipEquipmentData.value.splice(index, 1);
      }
    }
  };

  // Handle equipment FormKit form submission
  const handleEquipmentSubmit = (values) => {
    equipmentForm.value = {
      ...equipmentForm.value,
      ...values
    };
    submitEquipmentForm();
  };

  // Equipment categories for filtering
  const equipmentCategories = ["Semua", "Elektronik", "Pendorongan", "Persenjataan", "Komunikasi", "Lain-lain"];
  const selectedCategory = ref("Semua");

  // Filtered equipment data
  const filteredEquipmentData = computed(() => {
    if (selectedCategory.value === "Semua") {
      return shipEquipmentData.value;
    }
    return shipEquipmentData.value.filter(item => item.category === selectedCategory.value);
  });

  // PMS Modal state
  const isMaintenanceModalOpen = ref(false);
  const isViewingMaintenance = ref(false);
  const isEditingMaintenance = ref(false);
  const maintenanceForm = ref({
    id: null,
    type: "AD",
    year: new Date().getFullYear(),
    location: "",
    description: ""
  });

  // Open modal for adding maintenance
  const openAddMaintenanceModal = () => {
    isViewingMaintenance.value = false;
    maintenanceForm.value = {
      id: null,
      type: "AD",
      year: new Date().getFullYear(),
      location: "",
      description: ""
    };
    isMaintenanceModalOpen.value = true;
  };

  // Open modal for viewing maintenance
  const viewMaintenanceItem = (item) => {
    isViewingMaintenance.value = true;
    isEditingMaintenance.value = false;
    maintenanceForm.value = { ...item };
    isMaintenanceModalOpen.value = true;
  };

  // Open modal for editing maintenance
  const editMaintenanceItem = (item) => {
    isViewingMaintenance.value = false;
    isEditingMaintenance.value = true;
    maintenanceForm.value = { ...item };
    isMaintenanceModalOpen.value = true;
  };

  // Close maintenance modal
  const closeMaintenanceModal = () => {
    isMaintenanceModalOpen.value = false;
  };

  // Submit maintenance form
  const submitMaintenanceForm = () => {
    if (isEditingMaintenance.value) {
      // Update existing item
      const index = pmsData.value.findIndex((i) => i.id === maintenanceForm.value.id);
      if (index !== -1) {
        pmsData.value[index] = { ...maintenanceForm.value };
      }
    } else {
      // Add new item
      pmsData.value.push({
        ...maintenanceForm.value,
        id: Date.now() // Temporary ID
      });
    }
    closeMaintenanceModal();
  };

  // Handle maintenance FormKit form submission
  const handleMaintenanceSubmit = (values) => {
    maintenanceForm.value = {
      ...maintenanceForm.value,
      ...values
    };
    submitMaintenanceForm();
  };

  // Current start year (for 10-year view)
  const startYear = ref(2024);

  // Next decade
  const nextDecade = () => {
    startYear.value += 10;
  };

  // Previous decade
  const prevDecade = () => {
    startYear.value -= 10;
  };

  // Get maintenance items for a specific year
  const getYearMaintenanceItems = (year) => {
    return pmsData.value.filter(item => item.year === year);
  };

  // Get current year
  const currentYear = new Date().getFullYear();

  // Next year
  const nextYear = () => {
    currentYear.value++;
  };

  // Previous year
  const prevYear = () => {
    currentYear.value--;
  };

  // Get months
  const months = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];

  // Get maintenance items for a specific month
  const getMonthMaintenanceItems = (monthIndex) => {
    return pmsData.value.filter(item => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      const monthStart = new Date(currentYear.value, monthIndex, 1);
      const monthEnd = new Date(currentYear.value, monthIndex + 1, 0);
      
      return (
        (startDate <= monthEnd && endDate >= monthStart) || 
        (startDate >= monthStart && startDate <= monthEnd) ||
        (endDate >= monthStart && endDate <= monthEnd)
      );
    });
  };

  // Get days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Crew data
  const crewData = ref([
    {
      id: 1,
      noTentera: "T12345",
      name: "Kapt. Ahmad bin Ismail",
      position: "Kapten Kapal",
      joinDate: "2020-06-15",
      endDate: "2024-06-14",
      status: "Aktif",
      contactNo: "012-3456789",
      email: "ahmad.ismail@tldm.mil.my",
      tindakan: "lihat",
      training: [
        { id: 1, name: "Kursus Kepimpinan Maritim", date: "2021-03-15", duration: "2 minggu", location: "Akademi TLDM, Lumut" },
        { id: 2, name: "Latihan Pengurusan Krisis", date: "2022-06-10", duration: "1 minggu", location: "Pusat Latihan TLDM, Kuantan" }
      ],
      serviceRecord: [
        { id: 1, position: "Pegawai Navigasi", vessel: "KD LEKIU", startDate: "2015-06-10", endDate: "2018-05-20" },
        { id: 2, position: "Pegawai Eksekutif", vessel: "KD JEBAT", startDate: "2018-06-01", endDate: "2020-06-10" }
      ],
      education: [
        { id: 1, qualification: "Ijazah Sarjana Muda Kejuruteraan Maritim", institution: "Universiti Pertahanan Nasional Malaysia", year: "2010" },
        { id: 2, qualification: "Diploma Pengajian Maritim", institution: "Akademi TLDM", year: "2008" }
      ]
    },
    {
      id: 2,
      noTentera: "T23456",
      name: "Lt. Kdr. Siti binti Hassan",
      position: "Pegawai Eksekutif",
      joinDate: "2021-03-10",
      endDate: "2025-03-09",
      status: "Aktif",
      contactNo: "013-4567890",
      email: "siti.hassan@tldm.mil.my",
      tindakan: "lihat",
      training: [
        { id: 1, name: "Kursus Pengurusan Strategik", date: "2021-09-20", duration: "3 minggu", location: "Akademi TLDM, Lumut" },
        { id: 2, name: "Latihan Operasi Bersama", date: "2022-11-05", duration: "2 minggu", location: "Pangkalan TLDM, Kota Kinabalu" }
      ],
      serviceRecord: [
        { id: 1, position: "Pegawai Komunikasi", vessel: "KD KASTURI", startDate: "2016-03-15", endDate: "2019-04-30" },
        { id: 2, position: "Pegawai Eksekutif", vessel: "KD KEDAH", startDate: "2019-05-15", endDate: "2021-03-01" }
      ],
      education: [
        { id: 1, qualification: "Ijazah Sarjana Muda Sains Komputer", institution: "Universiti Malaya", year: "2012" },
        { id: 2, qualification: "Diploma Pengajian Pertahanan", institution: "Akademi TLDM", year: "2009" }
      ]
    },
    {
      id: 3,
      noTentera: "T34567",
      name: "Lt. Mohd Rizal bin Abdullah",
      position: "Pegawai Navigasi",
      joinDate: "2022-01-20",
      endDate: "2026-01-19",
      status: "Aktif",
      contactNo: "014-5678901",
      email: "mohd.rizal@tldm.mil.my",
      tindakan: "lihat",
      training: [
        { id: 1, name: "Kursus Navigasi Lanjutan", date: "2022-05-10", duration: "4 minggu", location: "Akademi TLDM, Lumut" }
      ]
    },
    {
      id: 4,
      noTentera: "T45678",
      name: "PW I Ravi a/l Chandran",
      position: "Ketua Jurutera",
      joinDate: "2019-11-05",
      endDate: "2023-11-04",
      status: "Cuti",
      contactNo: "015-6789012",
      email: "ravi.chandran@tldm.mil.my",
      tindakan: "lihat",
      training: [
        { id: 1, name: "Kursus Penyelenggaraan Enjin", date: "2020-02-15", duration: "3 minggu", location: "Pusat Teknikal TLDM, Lumut" },
        { id: 2, name: "Latihan Sistem Pendorongan", date: "2021-07-20", duration: "2 minggu", location: "Pusat Teknikal TLDM, Lumut" },
        { id: 3, name: "Kursus Pengurusan Kejuruteraan", date: "2022-09-12", duration: "1 minggu", location: "Akademi TLDM, Lumut" }
      ]
    },
    {
      id: 5,
      noTentera: "T56789",
      name: "PW II Tan Mei Ling",
      position: "Ketua Komunikasi",
      joinDate: "2020-08-15",
      endDate: "2024-08-14",
      status: "Aktif",
      contactNo: "016-7890123",
      email: "tan.meiling@tldm.mil.my",
      tindakan: "lihat",
      training: [
        { id: 1, name: "Kursus Sistem Komunikasi Maritim", date: "2021-04-05", duration: "3 minggu", location: "Pusat Latihan TLDM, Kuantan" },
        { id: 2, name: "Latihan Keselamatan Siber", date: "2022-08-15", duration: "1 minggu", location: "Pusat Siber TLDM, Kuala Lumpur" }
      ]
    },
    {
      id: 6,
      noTentera: "T67890",
      name: "BM Iskandar bin Zulkifli",
      position: "Juruteknik Elektronik",
      joinDate: "2021-05-20",
      endDate: "2025-05-19",
      status: "Aktif",
      contactNo: "017-8901234",
      email: "iskandar.zulkifli@tldm.mil.my",
      tindakan: "lihat",
      training: [
        { id: 1, name: "Kursus Asas Elektronik Kapal", date: "2021-08-10", duration: "4 minggu", location: "Pusat Teknikal TLDM, Lumut" }
      ]
    }
  ]);

  // Crew Modal state
  const isCrewModalOpen = ref(false);
  const isViewingCrew = ref(false);
  const isEditingCrew = ref(false);
  const crewForm = ref({
    id: null,
    noTentera: "",
    name: "",
    position: "",
    joinDate: "",
    endDate: "",
    status: "Aktif",
    contactNo: "",
    email: "",
    tindakan: "lihat",
    training: [],
    serviceRecord: [],
    education: []
  });

  // Open modal for adding crew
  const openAddCrewModal = () => {
    isViewingCrew.value = false;
    isEditingCrew.value = false;
    const today = new Date().toISOString().split('T')[0];
    const fourYearsLater = new Date();
    fourYearsLater.setFullYear(fourYearsLater.getFullYear() + 4);
    
    crewForm.value = {
      id: null,
      noTentera: "",
      name: "",
      position: "",
      joinDate: today,
      endDate: fourYearsLater.toISOString().split('T')[0],
      status: "Aktif",
      contactNo: "",
      email: "",
      tindakan: "lihat",
      training: [],
      serviceRecord: [],
      education: []
    };
    isCrewModalOpen.value = true;
  };

  // Open modal for viewing crew
  const viewCrewItem = (item) => {
    isViewingCrew.value = true;
    isEditingCrew.value = false;
    crewForm.value = { ...item };
    isCrewModalOpen.value = true;
  };

  // Open modal for editing crew
  const editCrewItem = (item) => {
    isViewingCrew.value = false;
    isEditingCrew.value = true;
    crewForm.value = { ...item };
    isCrewModalOpen.value = true;
  };

  // Close crew modal
  const closeCrewModal = () => {
    isCrewModalOpen.value = false;
  };

  // Submit crew form
  const submitCrewForm = () => {
    if (isEditingCrew.value) {
      // Update existing item
      const index = crewData.value.findIndex((i) => i.id === crewForm.value.id);
      if (index !== -1) {
        crewData.value[index] = { ...crewForm.value };
      }
    } else {
      // Add new item
      crewData.value.push({
        ...crewForm.value,
        id: Date.now() // Temporary ID
      });
    }
    closeCrewModal();
  };

  // Delete crew item
  const deleteCrewItem = (id) => {
    if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
      const index = crewData.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        crewData.value.splice(index, 1);
      }
    }
  };

  // Handle crew FormKit form submission
  const handleCrewSubmit = (values) => {
    crewForm.value = {
      ...crewForm.value,
      ...values
    };
    submitCrewForm();
  };

  // Crew departments for filtering
  const crewDepartments = ["Semua", "Pemerintah", "Eksekutif", "Navigasi", "Kejuruteraan", "Komunikasi", "Elektronik", "Lain-lain"];
  const selectedCrewDepartment = ref("Semua");

  // Filtered crew data
  const filteredCrewData = computed(() => {
    if (selectedCrewDepartment.value === "Semua") {
      return crewData.value;
    }
    return crewData.value.filter(item => item.department === selectedCrewDepartment.value);
  });

  // Print crew item
  const printCrewItem = (item) => {
    // Implement print functionality
    console.log("Printing crew item:", item);
  };

  // Job Card data
  const jobCardData = ref([
    {
      BIL: 1,
      'JENIS ASET': 'Sistem Radar',
      'Pengguna Terakhir': 'KD Kedah',
      'TARIKH ROSAK': '2024-03-15',
      'PEMOHON': 'Kapt. Razak',
      'AMOUN': 'RM 15,000',
      'TINDAKAN': '1'
    },
    {
      BIL: 2,
      'JENIS ASET': 'Enjin Utama',
      'Pengguna Terakhir': 'KD Kedah',
      'TARIKH ROSAK': '2024-04-02',
      'PEMOHON': 'Kapt. Razak',
      'AMOUN': 'RM 45,000',
      'TINDAKAN': '2'
    },
    {
      BIL: 3,
      'JENIS ASET': 'Sistem Komunikasi',
      'Pengguna Terakhir': 'KD Kedah',
      'TARIKH ROSAK': '2024-04-10',
      'PEMOHON': 'Lt. Mohd Rizal',
      'AMOUN': 'RM 12,500',
      'TINDAKAN': '3'
    },
    {
      BIL: 4,
      'JENIS ASET': 'Sistem Sonar',
      'Pengguna Terakhir': 'KD Kedah',
      'TARIKH ROSAK': '2024-04-15',
      'PEMOHON': 'Kapt. Razak',
      'AMOUN': 'RM 22,300',
      'TINDAKAN': '4'
    },
    {
      BIL: 5,
      'JENIS ASET': 'Sistem Pendorongan',
      'Pengguna Terakhir': 'KD Kedah',
      'TARIKH ROSAK': '2024-04-18',
      'PEMOHON': 'Lt. Mohd Rizal',
      'AMOUN': 'RM 38,750',
      'TINDAKAN': '5'
    }
  ]);

  // Add Job Card Modal state
  const isAddJobCardModalOpen = ref(false);
  const newJobCardForm = ref({
    'JENIS ASET': '',
    'Pengguna Terakhir': 'KD Kedah',
    'TARIKH ROSAK': new Date().toISOString().split('T')[0],
    'PEMOHON': '',
    'AMOUN': '',
    'reportType': 'DEFECT',
    'location': 'PANGKALAN TLDM LUMUT',
    'mainSystem': '',
    'runningHours': '',
    'manufacturer': '',
    'serialNo': '',
    'remarks': ''
  });

  // Open add job card modal
  const openAddJobCardModal = () => {
    newJobCardForm.value = {
      'JENIS ASET': '',
      'Pengguna Terakhir': 'KD Kedah',
      'TARIKH ROSAK': new Date().toISOString().split('T')[0],
      'PEMOHON': '',
      'AMOUN': '',
      'reportType': 'DEFECT',
      'location': 'PANGKALAN TLDM LUMUT',
      'mainSystem': '',
      'runningHours': '',
      'manufacturer': '',
      'serialNo': '',
      'remarks': ''
    };
    isAddJobCardModalOpen.value = true;
  };

  // Close add job card modal
  const closeAddJobCardModal = () => {
    isAddJobCardModalOpen.value = false;
  };

  // Submit new job card
  const submitNewJobCard = () => {
    // Create a new job card entry
    const newJobCard = {
      id: Date.now(),
      BIL: jobCardData.value.length + 1,
      ...newJobCardForm.value
    };
    
    // Add to the job cards array
    jobCardData.value.push(newJobCard);
    
    // Close the modal
    closeAddJobCardModal();
  };

  // Add Job Card view modal state
  const isViewJobCardModalOpen = ref(false);
  const selectedJobCard = ref(null);

  // Open view job card modal
  const openViewJobCardModal = (jobCard) => {
    selectedJobCard.value = jobCard;
    isViewJobCardModalOpen.value = true;
  };

  // Close view job card modal
  const closeViewJobCardModal = () => {
    isViewJobCardModalOpen.value = false;
  };
</script>

<template>
  <div class="p-6 space-y-6">
    

     <!-- Ship Identity Banner -->
     <div class="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg shadow-lg overflow-hidden">
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/3 p-6 flex items-center justify-center">
                  <img src="@/assets/img/vessels/kelas_langkawi.png" alt="KD KEDAH" class="h-48 object-contain" />
                </div>
                <div class="md:w-2/3 p-6 text-white">
                  <div class="flex items-center space-x-3">
                    <h1 class="text-3xl font-bold">{{ vesselProfile.generalInfo.name }}</h1>
                    <span class="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">{{ vesselProfile.generalInfo.pennantNumber }}</span>
                  </div>
                  <p class="text-xl mt-2">{{ vesselProfile.generalInfo.class }} - {{ vesselProfile.generalInfo.type }}</p>
                  <div class="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-blue-200 text-sm">DITUGASKAN PADA</p>
                      <p>{{ vesselProfile.generalInfo.commissioned }}</p>
                    </div>
                    <div>
                      <p class="text-blue-200 text-sm">PELABUHAN UTAMA</p>
                      <p>{{ vesselProfile.generalInfo.homePort }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

    <!-- Status Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
        <p class="text-sm text-gray-500">STATUS KAPAL</p>
        <p class="text-xl font-semibold">{{ statusKapal }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
        <p class="text-sm text-gray-500">NEXT AD DATE</p>
        <p class="text-xl font-semibold">{{ nextAdDate }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
        <p class="text-sm text-gray-500">NEXT PREFIT DATE</p>
        <p class="text-xl font-semibold">{{ nextPrefitDate }}</p>
      </div>
    </div>

    <!-- Tabs Section -->
    <div class="bg-white rounded shadow p-4">
      <div class="flex space-x-2 border-b mb-4">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-4 py-2 font-semibold',
            activeTab === tab.key ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
          ]"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="p-4 bg-gray-50 rounded">
        <div v-if="activeTab === 'profile'">
          <!-- Vessel Profile Content -->
          <div class="space-y-6">      

            <!-- General Information -->
            <rs-card class="overflow-hidden border-0 shadow-lg">
              <template #header>
                <div class="bg-gray-50 px-4 py-3 border-b">
                  <div class="flex items-center">
                    <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                    <h2 class="text-lg font-semibold text-gray-800">Maklumat Am Kapal</h2>
                  </div>
                </div>
              </template>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                <div>
                  <div class="mb-4 bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 class="text-md font-medium text-blue-700">Nama Kapal</h3>
                    <p class="text-gray-700">{{ vesselProfile.generalInfo.name }}</p>
                  </div>
                  <div class="mb-4 bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 class="text-md font-medium text-blue-700">Nombor Pennant</h3>
                    <p class="text-gray-700">{{ vesselProfile.generalInfo.pennantNumber }}</p>
                  </div>
                  <div class="mb-4 bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 class="text-md font-medium text-blue-700">Kelas</h3>
                    <p class="text-gray-700">{{ vesselProfile.generalInfo.class }}</p>
                  </div>
                </div>
                <div>
                  <div class="mb-4 bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 class="text-md font-medium text-blue-700">Jenis</h3>
                    <p class="text-gray-700">{{ vesselProfile.generalInfo.type }}</p>
                  </div>
                  <div class="mb-4 bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 class="text-md font-medium text-blue-700">Pembuat</h3>
                    <p class="text-gray-700">{{ vesselProfile.generalInfo.builder }}</p>
                  </div>
                </div>
              </div>
            </rs-card>

            <!-- Specifications -->
            <rs-card class="overflow-hidden border-0 shadow-lg">
              <template #header>
                <div class="bg-gray-50 px-4 py-3 border-b">
                  <div class="flex items-center">
                    <i class="fas fa-ruler text-blue-600 mr-2"></i>
                    <h2 class="text-lg font-semibold text-gray-800">Spesifikasi Teknikal</h2>
                  </div>
                </div>
              </template>
              <div class="p-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="bg-blue-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Sesaran</p>
                    <p class="text-lg font-semibold text-blue-800">{{ vesselProfile.specifications.displacement }}</p>
                  </div>
                  <div class="bg-blue-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Panjang</p>
                    <p class="text-lg font-semibold text-blue-800">{{ vesselProfile.specifications.length }}</p>
                  </div>
                  <div class="bg-blue-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Lebar</p>
                    <p class="text-lg font-semibold text-blue-800">{{ vesselProfile.specifications.beam }}</p>
                  </div>
                  <div class="bg-blue-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Draf</p>
                    <p class="text-lg font-semibold text-blue-800">{{ vesselProfile.specifications.draft }}</p>
                  </div>
                </div>
                
                <div class="mt-6 space-y-4">
                  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 class="text-md font-medium text-blue-700">Sistem Pendorong</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.specifications.propulsion }}</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 class="text-md font-medium text-blue-700">Kelajuan</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.specifications.speed }}</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 class="text-md font-medium text-blue-700">Julat</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.specifications.range }}</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 class="text-md font-medium text-blue-700">Kapasiti Krew</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.specifications.complement }}</p>
                  </div>
                </div>
              </div>
            </rs-card>

            <!-- Two Column Layout for Armament and Electronics -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Armament -->
              <rs-card class="overflow-hidden border-0 shadow-lg h-full">
                <template #header>
                  <div class="bg-gray-50 px-4 py-3 border-b">
                    <div class="flex items-center">
                      <i class="fas fa-crosshairs text-red-600 mr-2"></i>
                      <h2 class="text-lg font-semibold text-gray-800">Persenjataan</h2>
                    </div>
                  </div>
                </template>
                <div class="p-4 space-y-4">
                  <div class="bg-red-50 p-3 rounded-lg">
                    <h3 class="text-md font-medium text-red-700">Senjata Utama</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.armament.mainGun }}</p>
                  </div>
                  <div class="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 class="text-md font-medium text-red-700">Senjata Sekunder</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.armament.secondaryGuns }}</p>
                  </div>
                  <div class="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 class="text-md font-medium text-red-700">Sistem Peluru Berpandu</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.armament.missiles }}</p>
                  </div>
                  <div class="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 class="text-md font-medium text-red-700">Sistem Torpedo</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.armament.torpedoes }}</p>
                  </div>
                </div>
              </rs-card>

              <!-- Electronics -->
              <rs-card class="overflow-hidden border-0 shadow-lg h-full">
                <template #header>
                  <div class="bg-gray-50 px-4 py-3 border-b">
                    <div class="flex items-center">
                      <i class="fas fa-satellite-dish text-purple-600 mr-2"></i>
                      <h2 class="text-lg font-semibold text-gray-800">Sistem Elektronik</h2>
                    </div>
                  </div>
                </template>
                <div class="p-4 space-y-4">
                  <div class="bg-purple-50 p-3 rounded-lg">
                    <h3 class="text-md font-medium text-purple-700">Sistem Radar</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.electronics.radar }}</p>
                  </div>
                  <div class="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 class="text-md font-medium text-purple-700">Sistem Sonar</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.electronics.sonar }}</p>
                  </div>
                  <div class="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 class="text-md font-medium text-purple-700">Sistem Pengurusan Tempur</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.electronics.combatSystem }}</p>
                  </div>
                  <div class="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 class="text-md font-medium text-purple-700">Sistem Komunikasi</h3>
                    <p class="text-gray-700 mt-1">{{ vesselProfile.electronics.communication }}</p>
                  </div>
                </div>
              </rs-card>
            </div>

            <!-- Maintenance Information -->
            <rs-card class="overflow-hidden border-0 shadow-lg">
              <template #header>
                <div class="bg-gray-50 px-4 py-3 border-b">
                  <div class="flex items-center">
                    <i class="fas fa-tools text-green-600 mr-2"></i>
                    <h2 class="text-lg font-semibold text-gray-800">Maklumat Penyelenggaraan</h2>
                  </div>
                </div>
              </template>
              <div class="p-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-green-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Penyelenggaraan Terakhir</p>
                    <p class="text-lg font-semibold text-green-800">{{ vesselProfile.maintenance.lastMaintenance }}</p>
                  </div>
                  <div class="bg-green-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Penyelenggaraan Seterusnya</p>
                    <p class="text-lg font-semibold text-green-800">{{ vesselProfile.maintenance.nextScheduled }}</p>
                  </div>
                  <div class="bg-green-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Pensijilan</p>
                    <p class="text-lg font-semibold text-green-800">Lloyd's Register</p>
                  </div>
                </div>
                <div class="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                  <h3 class="text-md font-medium text-green-700">Maklumat Pensijilan Lengkap</h3>
                  <p class="text-gray-700 mt-1">{{ vesselProfile.maintenance.certifications }}</p>
                </div>
              </div>
            </rs-card>
          </div>
        </div>

        <div v-else-if="activeTab === 'rova'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Return of Vessel Availability (ROVA)</h2>
                <rs-button variant="primary" @click="openAddRovaModal">Tambah ROVA</rs-button>
              </div>
            </template>

            <rs-table
              :data="sortedRovaData"
              :columns="[
                { key: 'bulan', label: 'Bulan' },
                { key: 'statusKapal', label: 'Status Kapal' },
                { key: 'peratus', label: 'Peratus (%)' },
                { key: 'tindakan', label: 'Tindakan' }
              ]"
              :options="{
                variant: 'default',
                striped: true,
                borderless: true,
              }"
              :options-advanced="{
                sortable: true,
                responsive: true,
                filterable: false,
                defaultSort: { column: 'tarikhMula', direction: 'desc' }
              }"
              advanced
            >
              <template v-slot:statusKapal="row">
                <rs-badge
                  :variant="row.value.statusKapal === 'Operational' ? 'success' : 'warning'"
                >
                  {{ row.value.statusKapal }}
                </rs-badge>
              </template>
              
              <template v-slot:peratus="row">
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: row.value.peratus + '%' }"></div>
                  </div>
                  <span>{{ row.value.peratus }}%</span>
                </div>
              </template>
              
              <template v-slot:tindakan="row">
                <div class="flex gap-2">
                  <rs-button variant="primary" size="sm" @click="openViewRovaModal(row.value)">Lihat</rs-button>
                  <rs-button variant="warning" size="sm" @click="openEditRovaModal(row.value)">Kemaskini</rs-button>
                  <rs-button variant="danger" size="sm" @click="deleteRovaItem(row.value.id)">Padam</rs-button>
                </div>
              </template>
            </rs-table>
          </rs-card>

          <!-- ROVA Modal -->
          <rs-modal v-model="isRovaModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingRova ? 'Maklumat ROVA' : isEditingRova ? 'Kemaskini ROVA' : 'Tambah ROVA' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingRova" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Bulan:</h4>
                    <p>{{ rovaForm.bulan }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Status Kapal:</h4>
                    <rs-badge
                      :variant="rovaForm.statusKapal === 'Operational' ? 'success' : 'warning'"
                    >
                      {{ rovaForm.statusKapal }}
                    </rs-badge>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Tarikh Mula:</h4>
                    <p>{{ rovaForm.tarikhMula }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Tarikh Tamat:</h4>
                    <p>{{ rovaForm.tarikhTamat }}</p>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Peratus Ketersediaan:</h4>
                  <div class="flex items-center mt-1">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: rovaForm.peratus + '%' }"></div>
                    </div>
                    <span>{{ rovaForm.peratus }}%</span>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Catatan:</h4>
                  <p>{{ rovaForm.catatan }}</p>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="rovaForm" @submit="handleRovaSubmit">
                <div class="grid grid-cols-2 gap-4">
                  <!-- Bulan -->
                  <FormKit
                    type="text"
                    name="bulan"
                    label="Bulan"
                    placeholder="Contoh: Januari 2024"
                    validation="required"
                  />

                  <!-- Status Kapal -->
                  <FormKit
                    type="select"
                    name="statusKapal"
                    label="Status Kapal"
                    :options="['Operational', 'Maintenance', 'Repair', 'Standby']"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Tarikh Mula -->
                  <FormKit
                    type="date"
                    name="tarikhMula"
                    label="Tarikh Mula"
                    validation="required"
                  />

                  <!-- Tarikh Tamat -->
                  <FormKit
                    type="date"
                    name="tarikhTamat"
                    label="Tarikh Tamat"
                    validation="required"
                  />
                </div>

                <!-- Peratus -->
                <FormKit
                  type="range"
                  name="peratus"
                  label="Peratus Ketersediaan (%)"
                  validation="required|number|min:0|max:100"
                  min="0"
                  max="100"
                  step="1"
                  help="Sila pilih peratus ketersediaan kapal"
                />

                <!-- Catatan -->
                <FormKit
                  type="textarea"
                  name="catatan"
                  label="Catatan"
                  placeholder="Masukkan catatan atau maklumat tambahan"
                  :rows="3"
                />
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button variant="secondary" @click="closeRovaModal">
                  {{ isViewingRova ? 'Tutup' : 'Batal' }}
                </rs-button>
                <rs-button 
                  v-if="!isViewingRova" 
                  variant="primary" 
                  @click="submitRovaForm"
                >
                  {{ isEditingRova ? 'Kemaskini' : 'Tambah' }}
                </rs-button>
              </div>
            </template>
          </rs-modal>
        </div>

        <div v-else-if="activeTab === 'rupacara'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Senarai Rupacara Aset</h2>
                <rs-button variant="primary" @click="openAddRupacaraModal">Tambah Rupacara</rs-button>
              </div>
            </template>

            <rs-table
              :data="sortedRupacaraData"
              :columns="[
                { key: 'tarikhKemaskini', label: 'Tarikh Terakhir Kemaskini' },
                { key: 'penerangan', label: 'Penerangan' },
                { key: 'tindakan', label: 'Tindakan' }
              ]"
              :options="{
                variant: 'default',
                striped: true,
                borderless: true,
              }"
              :field="field"
              :options-advanced="{
                sortable: true,
                responsive: true,
                filterable: false,
                defaultSort: { column: 'tarikhKemaskini', direction: 'desc' }
              }"
              advanced
            >
              <template v-slot:tarikhKemaskini="row">
              {{ row.value.tarikhKemaskini}}
              </template>
              <template v-slot:penerangan="row">
                {{ row.value.penerangan }}
              </template>
              <template v-slot:tindakan="row">
                <div class="flex gap-2">
                  <rs-button variant="primary" size="sm" @click="openViewRupacaraModal(row.value)">Lihat</rs-button>
                </div>
              </template>
            </rs-table>
          </rs-card>

          <!-- Rupacara Modal -->
          <rs-modal v-model="isRupacaraModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingRupacara ? 'Maklumat Rupacara' : 'Tambah Rupacara' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingRupacara" class="space-y-6">
                <div class="mb-4">
                  <h4 class="font-medium text-gray-700">Tarikh Kemaskini:</h4>
                  <p>{{ rupacaraForm.tarikhKemaskini }}</p>
                </div>
                
                <div class="mb-4">
                  <h4 class="font-medium text-gray-700">Penerangan:</h4>
                  <p>{{ rupacaraForm.penerangan }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div v-if="rupacaraForm.portView" class="mb-4 flex flex-col items-center">
                    <h4 class="font-medium text-gray-700">Port View:</h4>
                    <div class="mt-2 flex justify-center w-full">
                      <img src="@/assets/img/vessels/port_view.png" alt="Port View" class="max-h-40 rounded" />
                    </div>
                  </div>
                  
                  <div v-if="rupacaraForm.starboardView" class="mb-4 flex flex-col items-center">
                    <h4 class="font-medium text-gray-700">Starboard View:</h4>
                    <div class="mt-2 flex justify-center w-full">
                      <img src="@/assets/img/vessels/starboardView.png" alt="Starboard View" class="max-h-40 rounded" />
                    </div>
                  </div>
                  
                  <div v-if="rupacaraForm.forwardView" class="mb-4 flex flex-col items-center">
                    <h4 class="font-medium text-gray-700">Forward View:</h4>
                    <div class="mt-2 flex justify-center w-full">
                      <img src="@/assets/img/vessels/forwardView.png" alt="Forward View" class="max-h-40 rounded" />
                    </div>
                  </div>
                  
                  <div v-if="rupacaraForm.afterView" class="mb-4 flex flex-col items-center">
                    <h4 class="font-medium text-gray-700">After View:</h4>
                    <div class="mt-2 flex justify-center w-full">
                      <img src="@/assets/img/vessels/afterView.png" alt="After View" class="max-h-40 rounded" />
                    </div>
                  </div>
                  
                  <div v-if="rupacaraForm.engineRoom" class="mb-4 flex flex-col items-center">
                    <h4 class="font-medium text-gray-700">Engine Room:</h4>
                    <div class="mt-2 flex justify-center w-full">
                      <img src="@/assets/img/vessels/engineRoom.png" alt="Engine Room" class="max-h-40 rounded" />
                    </div>
                  </div>
                  
                  <div v-if="rupacaraForm.closedBridge" class="mb-4 flex flex-col items-center">
                    <h4 class="font-medium text-gray-700">Closed Bridge:</h4>
                    <div class="mt-2 flex justify-center w-full">
                      <img src="@/assets/img/vessels/closedBridge.png" alt="Closed Bridge" class="max-h-40 rounded" />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Add Mode -->
              <FormKit v-else type="form" :value="rupacaraForm" @submit="handleRupacaraSubmit">
                <!-- Tarikh Kemaskini -->
                <FormKit
                  type="date"
                  name="tarikhKemaskini"
                  label="Tarikh Kemaskini"
                  :value="new Date().toISOString().split('T')[0]"
                  validation="required"
                />

                <!-- Penerangan -->
                <FormKit
                  type="textarea"
                  name="penerangan"
                  label="Penerangan"
                  placeholder="Masukkan penerangan rupacara aset"
                  validation="required"
                  :rows="3"
                />

                <!-- Image Grid Container -->
                <div class="grid grid-cols-2 gap-4">
                  <!-- Port View -->
                  <FormKit
                    type="file"
                    name="portView"
                    label="Port View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Starboard View -->
                  <FormKit
                    type="file"
                    name="starboardView"
                    label="Starboard View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Forward View -->
                  <FormKit
                    type="file"
                    name="forwardView"
                    label="Forward View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- After View -->
                  <FormKit
                    type="file"
                    name="afterView"
                    label="After View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Engine Room -->
                  <FormKit
                    type="file"
                    name="engineRoom"
                    label="Engine Room (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Closed Bridge -->
                  <FormKit
                    type="file"
                    name="closedBridge"
                    label="Closed Bridge (Gambar)"
                    accept="image/*"
                    validation="required"
                  />
                </div>
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button v-if="isViewingRupacara" variant="secondary" @click="closeRupacaraModal">Tutup</rs-button>
                <template v-else>
                  <rs-button variant="secondary" @click="closeRupacaraModal">Batal</rs-button>
                  <rs-button variant="primary" @click="submitRupacaraForm">Tambah</rs-button>
                </template>
              </div>
            </template>
          </rs-modal>
        </div>
        
        <div v-else-if="activeTab === 'osl'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Senarai Aset Kapal</h2>
                <rs-button variant="primary" @click="openAddEquipmentModal">Tambah Aset</rs-button>
              </div>
            </template>
            
            <div class="p-4">
              <!-- Filter by category -->
              <div class="mb-4 flex items-center space-x-2">
                <label class="font-medium text-gray-700">Kategori:</label>
                <div class="flex flex-wrap gap-2">
                  <rs-button 
                    v-for="category in equipmentCategories" 
                    :key="category"
                    size="sm"
                    :variant="selectedCategory === category ? 'primary' : 'secondary'"
                    @click="selectedCategory = category"
                  >
                    {{ category }}
                  </rs-button>
                </div>
              </div>
              
              <!-- Equipment Table -->
              <rs-table
                :data="filteredEquipmentData"
                :columns="[
                  { key: 'equipmentNo', label: 'No. Aset' },
                  { key: 'name', label: 'Nama Aset' },
                  { key: 'category', label: 'Kategori' },
                  { key: 'manufacturer', label: 'Pengeluar' },
                  { key: 'status', label: 'Status' },
                  { key: 'tindakan', label: 'Tindakan' }
                ]"
                :options="{
                  variant: 'default',
                  striped: true,
                  borderless: true,
                }"
                :options-advanced="{
                  sortable: true,
                  responsive: true,
                  filterable: true,
                  defaultSort: { column: 'equipmentNo', direction: 'asc' }
                }"
                advanced
              >
                <template v-slot:status="row">
                  <rs-badge
                    :variant="row.value.status === 'Beroperasi' ? 'success' : row.value.status === 'Penyelenggaraan' ? 'warning' : 'danger'"
                  >
                    {{ row.value.status }}
                  </rs-badge>
                </template>
                
                <template v-slot:tindakan="row">
                  <div class="flex gap-2">
                    <rs-button variant="primary" size="sm" @click="viewEquipmentItem(row.value)">Lihat</rs-button>
                    <rs-button variant="warning" size="sm" @click="editEquipmentItem(row.value)">Kemaskini</rs-button>
                    <rs-button variant="danger" size="sm" @click="deleteEquipmentItem(row.value.id)">Padam</rs-button>
                  </div>
                </template>
              </rs-table>
            </div>
          </rs-card>

          <!-- Equipment Modal -->
          <rs-modal v-model="isEquipmentModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingEquipment ? 'Maklumat Aset' : isEditingEquipment ? 'Kemaskini Aset' : 'Tambah Aset' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingEquipment" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">No. Aset:</h4>
                    <p>{{ equipmentForm.equipmentNo }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Status:</h4>
                    <rs-badge
                      :variant="
                        equipmentForm.status === 'Beroperasi' ? 'success' : 
                        equipmentForm.status === 'Penyelenggaraan' ? 'warning' : 'danger'
                      "
                    >
                      {{ equipmentForm.status }}
                    </rs-badge>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Nama Aset:</h4>
                  <p>{{ equipmentForm.name }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Kategori:</h4>
                    <p>{{ equipmentForm.category }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Pengeluar:</h4>
                    <p>{{ equipmentForm.manufacturer }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Model:</h4>
                    <p>{{ equipmentForm.model }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">No. Siri:</h4>
                    <p>{{ equipmentForm.serialNumber }}</p>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Tarikh Pemasangan:</h4>
                  <p>{{ equipmentForm.installationDate }}</p>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="equipmentForm" @submit="handleEquipmentSubmit">
                <div class="grid grid-cols-2 gap-4">
                  <!-- No. Aset -->
                  <FormKit
                    type="text"
                    name="equipmentNo"
                    label="No. Aset"
                    :disabled="isEditingEquipment"
                    validation="required"
                  />

                  <!-- Status -->
                  <FormKit
                    type="select"
                    name="status"
                    label="Status"
                    :options="['Beroperasi', 'Penyelenggaraan', 'Tidak Beroperasi']"
                    validation="required"
                  />
                </div>

                <!-- Nama Aset -->
                <FormKit
                  type="text"
                  name="name"
                  label="Nama Aset"
                  placeholder="Contoh: Sistem Radar"
                  validation="required"
                />

                <div class="grid grid-cols-2 gap-4">
                  <!-- Kategori -->
                  <FormKit
                    type="select"
                    name="category"
                    label="Kategori"
                    :options="['Elektronik', 'Pendorongan', 'Persenjataan', 'Komunikasi', 'Lain-lain']"
                    validation="required"
                  />

                  <!-- Pengeluar -->
                  <FormKit
                    type="text"
                    name="manufacturer"
                    label="Pengeluar"
                    placeholder="Contoh: Thales"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Model -->
                  <FormKit
                    type="text"
                    name="model"
                    label="Model"
                    placeholder="Contoh: SMART-S Mk2"
                    validation="required"
                  />

                  <!-- No. Siri -->
                  <FormKit
                    type="text"
                    name="serialNumber"
                    label="No. Siri"
                    placeholder="Contoh: TH-1234-5678"
                    validation="required"
                  />
                </div>

                <!-- Tarikh Pemasangan -->
                <FormKit
                  type="date"
                  name="installationDate"
                  label="Tarikh Pemasangan"
                  validation="required"
                />
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button variant="secondary" @click="closeEquipmentModal">
                  {{ isViewingEquipment ? 'Tutup' : 'Batal' }}
                </rs-button>
                <rs-button 
                  v-if="isViewingEquipment" 
                  variant="warning" 
                  @click="editEquipmentItem(equipmentForm)"
                >
                  Kemaskini
                </rs-button>
                <rs-button 
                  v-if="!isViewingEquipment" 
                  variant="primary" 
                  @click="submitEquipmentForm"
                >
                  {{ isEditingEquipment ? 'Simpan' : 'Tambah' }}
                </rs-button>
              </div>
            </template>
          </rs-modal>
        </div>
        
        <div v-else-if="activeTab === 'stock'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Senarai Stok Kapal</h2>
                <rs-button variant="primary" @click="openAddStockModal">Tambah Stok</rs-button>
              </div>
            </template>
            
            <div class="p-4">
              <!-- Filter by category -->
              <div class="mb-4 flex items-center space-x-2">
                <label class="font-medium text-gray-700">Kategori:</label>
                <div class="flex flex-wrap gap-2">
                  <rs-button 
                    v-for="category in stockCategories" 
                    :key="category"
                    size="sm"
                    :variant="selectedStockCategory === category ? 'primary' : 'secondary'"
                    @click="selectedStockCategory = category"
                  >
                    {{ category }}
                  </rs-button>
                </div>
              </div>
              
              <!-- Stock Table -->
              <rs-table
                :data="filteredStockData"
                :columns="[
                  { key: 'stockNo', label: 'No. Stok' },
                  { key: 'name', label: 'Nama Item' },
                  { key: 'category', label: 'Kategori' },
                  { key: 'quantity', label: 'Kuantiti' },
                  { key: 'status', label: 'Status' },
                  { key: 'tindakan', label: 'Tindakan' }
                ]"
                :options="{
                  variant: 'default',
                  striped: true,
                  borderless: true,
                }"
                :options-advanced="{
                  sortable: true,
                  responsive: true,
                  filterable: true,
                  defaultSort: { column: 'stockNo', direction: 'asc' }
                }"
                advanced
              >
                <template v-slot:quantity="row">
                  {{ row.value.quantity }} {{ row.value.unit }}
                </template>
                
                <template v-slot:status="row">
                  <rs-badge
                    :variant="row.value.status === 'Mencukupi' ? 'success' : 'danger'"
                  >
                    {{ row.value.status }}
                  </rs-badge>
                </template>
                
                <template v-slot:tindakan="row">
                  <div class="flex gap-2">
                    <rs-button variant="primary" size="sm" @click="viewStockItem(row.value)">Lihat</rs-button>
                    <rs-button variant="warning" size="sm" @click="editStockItem(row.value)">Kemaskini</rs-button>
                    <rs-button variant="danger" size="sm" @click="deleteStockItem(row.value.id)">Padam</rs-button>
                  </div>
                </template>
              </rs-table>
            </div>
          </rs-card>

          <!-- Stock Modal -->
          <rs-modal v-model="isStockModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingStock ? 'Maklumat Stok' : isEditingStock ? 'Kemaskini Stok' : 'Tambah Stok' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingStock" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">No. Stok:</h4>
                    <p>{{ stockForm.stockNo }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Status:</h4>
                    <rs-badge
                      :variant="stockForm.status === 'Mencukupi' ? 'success' : 'danger'"
                    >
                      {{ stockForm.status }}
                    </rs-badge>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Nama Item:</h4>
                  <p>{{ stockForm.name }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Kategori:</h4>
                    <p>{{ stockForm.category }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Lokasi:</h4>
                    <p>{{ stockForm.location }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Kuantiti:</h4>
                    <p>{{ stockForm.quantity }} {{ stockForm.unit }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Stok Minimum:</h4>
                    <p>{{ stockForm.minimumStock }} {{ stockForm.unit }}</p>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Tarikh Kemaskini:</h4>
                  <p>{{ stockForm.lastUpdated }}</p>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="stockForm" @submit="handleStockSubmit">
                <div class="grid grid-cols-2 gap-4">
                  <!-- No. Stok -->
                  <FormKit
                    type="text"
                    name="stockNo"
                    label="No. Stok"
                    :disabled="isEditingStock"
                    validation="required"
                  />

                  <!-- Tarikh Kemaskini -->
                  <FormKit
                    type="date"
                    name="lastUpdated"
                    label="Tarikh Kemaskini"
                    validation="required"
                  />
                </div>

                <!-- Nama Item -->
                <FormKit
                  type="text"
                  name="name"
                  label="Nama Item"
                  placeholder="Contoh: Minyak Enjin"
                  validation="required"
                />

                <div class="grid grid-cols-2 gap-4">
                  <!-- Kategori -->
                  <FormKit
                    type="select"
                    name="category"
                    label="Kategori"
                    :options="['Alat Ganti', 'Elektrik', 'Elektronik', 'Peralatan Deck', 'Lain-lain']"
                    validation="required"
                  />

                  <!-- Lokasi -->
                  <FormKit
                    type="text"
                    name="location"
                    label="Lokasi"
                    placeholder="Contoh: Stor A"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <!-- Kuantiti -->
                  <FormKit
                    type="number"
                    name="quantity"
                    label="Kuantiti"
                    validation="required|number|min:0"
                    min="0"
                    step="1"
                  />

                  <!-- Unit -->
                  <FormKit
                    type="text"
                    name="unit"
                    label="Unit"
                    placeholder="Contoh: Liter"
                    validation="required"
                  />

                  <!-- Stok Minimum -->
                  <FormKit
                    type="number"
                    name="minimumStock"
                    label="Stok Minimum"
                    validation="required|number|min:0"
                    min="0"
                    step="1"
                  />
                </div>
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button variant="secondary" @click="closeStockModal">
                  {{ isViewingStock ? 'Tutup' : 'Batal' }}
                </rs-button>
                <rs-button 
                  v-if="isViewingStock" 
                  variant="warning" 
                  @click="editStockItem(stockForm)"
                >
                  Kemaskini
                </rs-button>
                <rs-button 
                  v-if="!isViewingStock" 
                  variant="primary" 
                  @click="submitStockForm"
                >
                  {{ isEditingStock ? 'Simpan' : 'Tambah' }}
                </rs-button>
              </div>
            </template>
          </rs-modal>
        </div>
        
        <div v-else-if="activeTab === 'pms'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Planned Maintenance Schedule (PMS)</h2>
                <rs-button variant="primary" @click="openAddMaintenanceModal">Tambah Baru</rs-button>
              </div>
            </template>
            
            <div class="p-4">
              <div class="flex justify-between items-center mb-4">
                
                <div class="flex items-center space-x-2">
                  <div class="flex items-center mr-4">
                    <div class="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
                    <span class="text-sm">AD</span>
                  </div>
                  <div class="flex items-center mr-4">
                    <div class="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                    <span class="text-sm">Refit</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-4 h-4 bg-purple-500 rounded-sm mr-2"></div>
                    <span class="text-sm">AMP</span>
                  </div>
                </div>
              </div>
              
              <!-- 10-Year Calendar -->
              <div class="border rounded-lg overflow-hidden">
                <div class="grid grid-cols-1">
                  <div 
                    v-for="yearOffset in 10" 
                    :key="yearOffset"
                    class="border-b last:border-b-0 p-4"
                    :class="{ 
                      'bg-gray-50': startYear + yearOffset - 1 === currentYear
                    }"
                  >
                    <div class="flex items-center justify-between">
                      <div class="text-lg font-medium">{{ startYear + yearOffset - 1 }}</div>
                      
                      <div class="flex flex-wrap gap-2">
                        <div 
                          v-for="item in getYearMaintenanceItems(startYear + yearOffset - 1)" 
                          :key="item.id"
                          class="px-3 py-1 rounded text-white cursor-pointer"
                          :class="{
                            'bg-blue-500': item.type === 'AD',
                            'bg-green-500': item.type === 'Refit',
                            'bg-purple-500': item.type === 'AMP'
                          }"
                          @click="viewMaintenanceItem(item)"
                        >
                          {{ item.type }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </rs-card>

          <!-- Maintenance Modal -->
          <rs-modal v-model="isMaintenanceModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingMaintenance ? 'Maklumat Penyelenggaraan' : isEditingMaintenance ? 'Kemaskini Penyelenggaraan' : 'Tambah Penyelenggaraan' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingMaintenance" class="space-y-4">
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Jenis:</h4>
                  <rs-badge
                    :variant="
                      maintenanceForm.type === 'AD' ? 'info' : 
                      maintenanceForm.type === 'Refit' ? 'success' : 'purple'
                    "
                  >
                    {{ maintenanceForm.type }}
                  </rs-badge>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Tahun:</h4>
                  <p>{{ maintenanceForm.year }}</p>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Lokasi:</h4>
                  <p>{{ maintenanceForm.location }}</p>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Penerangan:</h4>
                  <p>{{ maintenanceForm.description }}</p>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="maintenanceForm" @submit="handleMaintenanceSubmit">
                <!-- Jenis -->
                <FormKit
                  type="select"
                  name="type"
                  label="Jenis Penyelenggaraan"
                  :options="['AD', 'Refit', 'AMP']"
                  validation="required"
                />

                <!-- Tahun -->
                <FormKit
                  type="number"
                  name="year"
                  label="Tahun"
                  validation="required|number|min:2020|max:2050"
                  min="2020"
                  max="2050"
                  step="1"
                />

                <!-- Lokasi -->
                <FormKit
                  type="text"
                  name="location"
                  label="Lokasi"
                  placeholder="Contoh: Lumut, Perak"
                  validation="required"
                />

                <!-- Penerangan -->
                <FormKit
                  type="textarea"
                  name="description"
                  label="Penerangan"
                  placeholder="Masukkan penerangan penyelenggaraan"
                  :rows="3"
                />
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button variant="secondary" @click="closeMaintenanceModal" v-if="isViewingMaintenance">
                  Tutup
                </rs-button>
                <rs-button 
                  v-if="isViewingMaintenance" 
                  variant="warning" 
                  @click="editMaintenanceItem(maintenanceForm)"
                >
                  Kemaskini
                </rs-button>
              </div>
            </template>
          </rs-modal>
        </div>

        <div v-else-if="activeTab === 'krew'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Senarai Krew Kapal</h2>
                <rs-button variant="primary" @click="openAddCrewModal">Tambah Krew</rs-button>
              </div>
            </template>
            
            <div class="p-4">
              <!-- Filter by department -->
              <div class="mb-4 flex items-center space-x-2">
                <label class="font-medium text-gray-700">Jabatan:</label>
                <div class="flex flex-wrap gap-2">
                  <rs-button 
                    v-for="department in crewDepartments" 
                    :key="department"
                    size="sm"
                    :variant="selectedCrewDepartment === department ? 'primary' : 'secondary'"
                    @click="selectedCrewDepartment = department"
                  >
                    {{ department }}
                  </rs-button>
                </div>
              </div>
              
              <!-- Crew Table -->
              <rs-table
                :data="filteredCrewData"
                :columns="[
                  { key: 'noTentera', label: 'No. Tentera' },
                  { key: 'name', label: 'Nama' },
                  { key: 'position', label: 'Jawatan' },
                  { key: 'department', label: 'Jabatan' },
                  { key: 'tindakan', label: 'Tindakan' }
                ]"
                :options="{
                  variant: 'default',
                  striped: true,
                  borderless: true,
                }"
                :options-advanced="{
                  sortable: true,
                  responsive: true,
                  filterable: true,
                  defaultSort: { column: 'name', direction: 'asc' }
                }"
                advanced
                :field="fieldKrew"
              >
                <template v-slot:tindakan="row">
                  <div class="flex gap-2">
                    <rs-button variant="primary" size="sm" @click="viewCrewItem(row.value)">Lihat</rs-button>
                    <!-- <rs-button variant="warning" size="sm" @click="editCrewItem(row.value)">Kemaskini</rs-button>
                    <rs-button variant="danger" size="sm" @click="deleteCrewItem(row.value.id)">Padam</rs-button>
                    <rs-button variant="info" size="sm" @click="printCrewItem(row.value)">
                      <i class="fas fa-print mr-1"></i>Cetak
                    </rs-button> -->
                  </div>
                </template>
              </rs-table>
            </div>
          </rs-card>

          <!-- Crew Modal -->
          <rs-modal v-model="isCrewModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingCrew ? 'Maklumat Krew' : isEditingCrew ? 'Kemaskini Krew' : 'Tambah Krew' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingCrew" class="space-y-6">
                <!-- Crew Profile Section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h3 class="text-xl font-semibold text-blue-700 mb-4">Profil Krew</h3>
                  
                  <div class="flex items-center mb-6">
                    <div class="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center mr-6">
                      <span class="text-3xl font-bold text-gray-500">{{ crewForm.name.charAt(0) }}</span>
                    </div>
                    
                    <div>
                      <h4 class="text-lg font-semibold">{{ crewForm.name }}</h4>
                      <p class="text-gray-600">{{ crewForm.position }}</p>
                      <div class="mt-2">
                        <rs-badge
                          :variant="crewForm.status === 'Aktif' ? 'success' : 'warning'"
                        >
                          {{ crewForm.status }}
                        </rs-badge>
                      </div>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-6">
                    <div>
                      <div class="mb-4">
                        <h5 class="text-sm font-medium text-gray-500">No. Tentera</h5>
                        <p>{{ crewForm.noTentera }}</p>
                      </div>
                      
                      <div class="mb-4">
                        <h5 class="text-sm font-medium text-gray-500">Tarikh Mula</h5>
                        <p>{{ crewForm.joinDate }}</p>
                      </div>
                      
                      <div class="mb-4">
                        <h5 class="text-sm font-medium text-gray-500">No. Telefon</h5>
                        <p>{{ crewForm.contactNo }}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div class="mb-4">
                        <h5 class="text-sm font-medium text-gray-500">Jawatan</h5>
                        <p>{{ crewForm.position }}</p>
                      </div>
                      
                      <div class="mb-4">
                        <h5 class="text-sm font-medium text-gray-500">Tarikh Tamat</h5>
                        <p>{{ crewForm.endDate }}</p>
                      </div>
                      
                      <div class="mb-4">
                        <h5 class="text-sm font-medium text-gray-500">E-mel</h5>
                        <p>{{ crewForm.email }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Service Record Section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-blue-700">Rekod Perkhidmatan</h3>
                  </div>
                  
                  <div v-if="crewForm.serviceRecord && crewForm.serviceRecord.length > 0">
                    <div class="overflow-x-auto">
                      <table class="min-w-full bg-white">
                        <thead class="bg-gray-100">
                          <tr>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Jawatan</th>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Kapal</th>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Tarikh Mula</th>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Tarikh Tamat</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                          <tr v-for="record in crewForm.serviceRecord" :key="record.id" class="hover:bg-gray-50">
                            <td class="py-3 px-4 text-sm">{{ record.position }}</td>
                            <td class="py-3 px-4 text-sm">{{ record.vessel }}</td>
                            <td class="py-3 px-4 text-sm">{{ record.startDate }}</td>
                            <td class="py-3 px-4 text-sm">{{ record.endDate }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div v-else class="p-4 text-center text-gray-500">
                    Tiada rekod perkhidmatan dijumpai.
                  </div>
                </div>
                
                <!-- Education Section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-blue-700">Rekod Pendidikan</h3>
                  </div>
                  
                  <div v-if="crewForm.education && crewForm.education.length > 0">
                    <div class="overflow-x-auto">
                      <table class="min-w-full bg-white">
                        <thead class="bg-gray-100">
                          <tr>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Kelayakan</th>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Institusi</th>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Tahun</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                          <tr v-for="edu in crewForm.education" :key="edu.id" class="hover:bg-gray-50">
                            <td class="py-3 px-4 text-sm">{{ edu.qualification }}</td>
                            <td class="py-3 px-4 text-sm">{{ edu.institution }}</td>
                            <td class="py-3 px-4 text-sm">{{ edu.year }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div v-else class="p-4 text-center text-gray-500">
                    Tiada rekod pendidikan dijumpai.
                  </div>
                </div>
                
                <!-- Training List Section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-blue-700">Senarai Latihan</h3>
                    <!-- <rs-button variant="primary" size="sm">Tambah Latihan</rs-button> -->
                  </div>
                  
                  <div v-if="crewForm.training && crewForm.training.length > 0">
                    <div class="overflow-x-auto">
                      <table class="min-w-full bg-white">
                        <thead class="bg-gray-100">
                          <tr>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Nama Latihan</th>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Tarikh</th>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Tempoh</th>
                            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Lokasi</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                          <tr v-for="training in crewForm.training" :key="training.id" class="hover:bg-gray-50">
                            <td class="py-3 px-4 text-sm">{{ training.name }}</td>
                            <td class="py-3 px-4 text-sm">{{ training.date }}</td>
                            <td class="py-3 px-4 text-sm">{{ training.duration }}</td>
                            <td class="py-3 px-4 text-sm">{{ training.location }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div v-else class="p-4 text-center text-gray-500">
                    Tiada rekod latihan dijumpai.
                  </div>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="crewForm" @submit="handleCrewSubmit">
                <div class="grid grid-cols-2 gap-4">
                  <!-- No. Tentera -->
                  <FormKit
                    type="text"
                    name="noTentera"
                    label="No. Tentera"
                    placeholder="Contoh: T12345"
                    validation="required"
                  />

                  <!-- Status -->
                  <FormKit
                    type="select"
                    name="status"
                    label="Status"
                    :options="['Aktif', 'Cuti', 'Sakit', 'Latihan']"
                    validation="required"
                  />
                </div>

                <!-- Nama -->
                <FormKit
                  type="text"
                  name="name"
                  label="Nama"
                  placeholder="Contoh: Kapt. Ahmad bin Ismail"
                  validation="required"
                />

                <div class="grid grid-cols-2 gap-4">
                  <!-- Jawatan -->
                  <FormKit
                    type="text"
                    name="position"
                    label="Jawatan"
                    placeholder="Contoh: Kapten Kapal"
                    validation="required"
                  />

                  <!-- Jabatan -->
                  <FormKit
                    type="select"
                    name="department"
                    label="Jabatan"
                    :options="['Pemerintah', 'Eksekutif', 'Navigasi', 'Kejuruteraan', 'Komunikasi', 'Elektronik', 'Lain-lain']"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Tarikh Mula -->
                  <FormKit
                    type="date"
                    name="joinDate"
                    label="Tarikh Mula"
                    validation="required"
                  />

                  <!-- Tarikh Tamat -->
                  <FormKit
                    type="date"
                    name="endDate"
                    label="Tarikh Tamat"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- No. Telefon -->
                  <FormKit
                    type="tel"
                    name="contactNo"
                    label="No. Telefon"
                    placeholder="Contoh: 012-3456789"
                    validation="required"
                  />

                  <!-- E-mel -->
                  <FormKit
                    type="email"
                    name="email"
                    label="E-mel"
                    placeholder="Contoh: nama@tldm.mil.my"
                    validation="required|email"
                  />
                </div>
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button 
                  v-if="isViewingCrew" 
                  variant="warning" 
                  @click="editCrewItem(crewForm)"
                >
                  Kemaskini
                </rs-button>
              </div>
            </template>
          </rs-modal>
        </div>
        
        <div v-else-if="activeTab === 'jobcard'">
          <div class="space-y-6">
            <!-- Statistics Cards Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div class="text-center">
                  <h3 class="font-bold">JUMLAH KAD KERJA</h3>
                  <p class="text-3xl font-bold text-blue-600 mt-2">24</p>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div class="text-center">
                  <h3 class="font-bold">JUMLAH BAJET</h3>
                  <p class="text-3xl font-bold text-green-600 mt-2">RM 125,000</p>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div class="text-center">
                  <h3 class="font-bold">KAD KERJA SELESAI</h3>
                  <p class="text-3xl font-bold text-gray-600 mt-2">15</p>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div class="text-center">
                  <h3 class="font-bold">JUMLAH KAD KERJA TERTUNGGAK</h3>
                  <p class="text-3xl font-bold text-orange-600 mt-2">9</p>
                </div>
              </div>
            </div>
            
            <!-- Approval Status Cards Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div class="text-center">
                  <h3 class="font-bold">MENUNGGU KELULUSAN DARI MN/ZM</h3>
                  <p class="text-3xl font-bold text-yellow-600 mt-2">3</p>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div class="text-center">
                  <h3 class="font-bold">MENUNGGU KELULUSAN DARI KJPKP</h3>
                  <p class="text-3xl font-bold text-yellow-600 mt-2">4</p>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div class="text-center">
                  <h3 class="font-bold">MENUNGGU PEMBAYARAN</h3>
                  <p class="text-3xl font-bold text-red-600 mt-2">2</p>
                </div>
              </div>
            </div>
            
            <!-- Job Card List Section -->
            <rs-card>
              <template #header>
                <div class="flex justify-between items-center p-2">
                  <h2 class="text-lg font-semibold">Senarai Kad Kerja</h2>
                  <rs-button variant="primary" @click="openAddJobCardModal">Tambah Kad Kerja</rs-button>
                </div>
              </template>
              
              <div class="p-4">
                <!-- Job Card Table -->
                <rs-table
                  :data="jobCardData"
                  :columns="[
                    { key: 'BIL', label: 'BIL' },
                    { key: 'JENIS ASET', label: 'JENIS ASET' },
                    { key: 'Pengguna Terakhir', label: 'PENGGUNA TERAKHIR' },
                    { key: 'TARIKH ROSAK', label: 'TARIKH ROSAK' },
                    { key: 'PEMOHON', label: 'PEMOHON' },
                    { key: 'AMOUN', label: 'JUMLAH (RM)' },
                    { key: 'TINDAKAN', label: 'TINDAKAN' }
                  ]"
                  :options="{
                    variant: 'default',
                    striped: true,
                    borderless: true,
                  }"
                  :options-advanced="{
                    sortable: true,
                    responsive: true,
                    filterable: true,
                    defaultSort: { column: 'BIL', direction: 'asc' }
                  }"
                  advanced
                >
                  <template v-slot:TINDAKAN="row">
                    <div class="flex gap-2">
                      <rs-button variant="primary" size="sm" @click="openViewJobCardModal(row.value)">Lihat</rs-button>
                      <!-- <rs-button variant="warning" size="sm">Edit</rs-button>
                      <rs-button variant="danger" size="sm">Padam</rs-button> -->
                    </div>
                  </template>
                </rs-table>      
              </div>
            </rs-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Job Card Modal -->
    <rs-modal v-model="isAddJobCardModalOpen" size="lg">
      <template #header>
        <h3 class="text-lg font-semibold">Tambah Kad Kerja Baru</h3>
      </template>
      
      <template #body>
        <div class="p-4">
          <FormKit type="form" :value="newJobCardForm" @submit="submitNewJobCard">
            <!-- Report Type Section -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Laporan</label>
              <div class="flex items-center space-x-4">
                <FormKit
                  type="radio"
                  name="reportType"
                  value="DEFECT"
                  label="KEROSAKAN"
                />
                <FormKit
                  type="radio"
                  name="reportType"
                  value="OSL"
                  label="OSL"
                />
              </div>
            </div>
            
            <!-- Basic Information Section -->
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 class="font-medium text-gray-700 mb-3">Maklumat Asas</h4>
              
              <div class="grid grid-cols-2 gap-4 mb-4">
                <FormKit
                  type="text"
                  name="JENIS ASET"
                  label="Jenis Aset"
                  placeholder="Contoh: Sistem Radar"
                  validation="required"
                />
                
                <FormKit
                  type="text"
                  name="mainSystem"
                  label="Sistem Utama / Peralatan"
                  placeholder="Contoh: RADAR SISTEM"
                  validation="required"
                />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <FormKit
                  type="date"
                  name="TARIKH ROSAK"
                  label="Tarikh Rosak"
                  validation="required"
                />
                
                <FormKit
                  type="text"
                  name="PEMOHON"
                  label="Pemohon"
                  placeholder="Contoh: Kapt. Razak"
                  validation="required"
                />
              </div>
            </div>
            
            <!-- Technical Information Section -->
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 class="font-medium text-gray-700 mb-3">Maklumat Teknikal</h4>
              
              <div class="grid grid-cols-2 gap-4 mb-4">
                <FormKit
                  type="text"
                  name="location"
                  label="Lokasi"
                  placeholder="Contoh: PANGKALAN TLDM LUMUT"
                  validation="required"
                />
                
                <FormKit
                  type="number"
                  name="runningHours"
                  label="Jam Operasi"
                  placeholder="Contoh: 1250"
                />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <FormKit
                  type="text"
                  name="manufacturer"
                  label="Pengeluar / Model"
                  placeholder="Contoh: Thales"
                />
                
                <FormKit
                  type="text"
                  name="serialNo"
                  label="No. Siri"
                  placeholder="Contoh: TH-R5670-892"
                />
              </div>
            </div>
            
            <!-- Cost & Details Section -->
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 class="font-medium text-gray-700 mb-3">Kos & Keterangan</h4>
              
              <FormKit
                type="text"
                name="AMOUN"
                label="Anggaran Kos"
                placeholder="Contoh: RM 15,000"
                validation="required"
              />
              
              <FormKit
                type="textarea"
                name="remarks"
                label="Keterangan Kerosakan"
                placeholder="Sila masukkan keterangan terperinci mengenai kerosakan"
                validation="required"
                :rows="4"
              />
            </div>
            
            <!-- Attachment Section -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-700 mb-3">Lampiran</h4>
              
              <FormKit
                type="file"
                name="attachment"
                label="Lampirkan Dokumen"
                accept=".pdf,.doc,.docx,.jpg,.png"
                help="Sila lampirkan dokumen sokongan (PDF, Word, atau imej)"
              />
            </div>
          </FormKit>
        </div>
      </template>
      
      <template #footer>
        <div class="flex justify-end gap-2">
          <!-- <rs-button variant="secondary" @click="closeAddJobCardModal">Batal</rs-button>
          <rs-button variant="primary" @click="submitNewJobCard">Simpan</rs-button> -->
        </div>
      </template>
    </rs-modal>

    <!-- View Job Card Modal -->
    <rs-modal v-model="isViewJobCardModalOpen" size="lg">
      <template #header>
        <h3 class="text-lg font-semibold">Maklumat Kad Kerja</h3>
      </template>
      
      <template #body>
        <div v-if="selectedJobCard" class="p-4">
          <!-- Document Header -->
          <div class="text-center mb-4">
            <h2 class="text-xl font-bold">BORANG LAPORAN KEROSAKAN</h2>
            <p class="text-sm">JC-2024-{{ selectedJobCard.BIL.toString().padStart(3, '0') }}</p>
          </div>
          
          <!-- Report Type Section -->
          <div class="border border-gray-800 mb-4">
            <table class="w-full">
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800 font-medium w-1/5">JENIS LAPORAN:</td>
                <td class="p-2">
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                      <span>KEROSAKAN</span>
                      <div class="w-5 h-5 border border-gray-800 flex items-center justify-center">
                        <span class="text-lg" v-if="selectedJobCard.reportType === 'DEFECT'">✓</span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span>OSL</span>
                      <div class="w-5 h-5 border border-gray-800 flex items-center justify-center">
                        <span class="text-lg" v-if="selectedJobCard.reportType === 'OSL'">✓</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Vessel Information Section -->
          <div class="border border-gray-800 mb-4">
            <table class="w-full">
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800 font-medium w-1/3">Kapal Maritim</td>
                <td class="p-2">: {{ selectedJobCard['Pengguna Terakhir'] }}</td>
                <td class="p-2 border-l border-gray-800 font-medium w-1/5">Jam Operasi</td>
                <td class="p-2">{{ selectedJobCard.runningHours || 'N/A' }}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800 font-medium">Pangkalan Maritim</td>
                <td class="p-2">: {{ selectedJobCard.location || 'PANGKALAN TLDM LUMUT' }}</td>
                <td class="p-2 border-l border-gray-800 font-medium">Pengeluar / Model</td>
                <td class="p-2">{{ selectedJobCard.manufacturer || 'N/A' }}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800 font-medium">Lokasi</td>
                <td class="p-2">: {{ selectedJobCard.location || 'PANGKALAN TLDM LUMUT' }}</td>
                <td class="p-2 border-l border-gray-800 font-medium">No. Siri</td>
                <td class="p-2">{{ selectedJobCard.serialNo || 'N/A' }}</td>
              </tr>
              <tr>
                <td class="p-2 border-r border-gray-800 font-medium">Sistem Utama / Peralatan</td>
                <td colspan="3" class="p-2">: {{ selectedJobCard['JENIS ASET'] }}</td>
              </tr>
            </table>
          </div>
          
          <!-- Description Section -->
          <div class="border border-gray-800 mb-4">
            <table class="w-full">
              <tr>
                <td class="p-2 border-r border-gray-800 font-medium w-1/3">Penerangan</td>
                <td class="p-2">: {{ selectedJobCard.remarks || 'Tiada penerangan terperinci.' }}</td>
              </tr>
            </table>
          </div>
          
          <!-- Details Section -->
          <div class="border border-gray-800 mb-4">
            <table class="w-full">
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800 font-medium w-1/3">Tarikh Rosak</td>
                <td class="p-2">: {{ selectedJobCard['TARIKH ROSAK'] }}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800 font-medium">Pemohon</td>
                <td class="p-2">: {{ selectedJobCard['PEMOHON'] }}</td>
              </tr>
              <tr>
                <td class="p-2 border-r border-gray-800 font-medium">Anggaran Kos</td>
                <td class="p-2">: <span class="font-medium text-blue-600">{{ selectedJobCard['AMOUN'] }}</span></td>
              </tr>
            </table>
          </div>
          
          <!-- Report By / Verified By Section -->
          <div class="border border-gray-800 mb-4">
            <table class="w-full">
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800 font-medium w-1/3">Dilaporkan Oleh</td>
                <td class="p-2">Disahkan Oleh:</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800 font-medium text-xs">(PEGAWAI TEKNIKAL)</td>
                <td class="p-2 font-medium text-xs">(PEGAWAI KAPAL)</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800">Tandatangan: <span class="italic">[Signed]</span></td>
                <td class="p-2">Tandatangan: <span class="italic">[Signed]</span></td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800">Nama: {{ selectedJobCard['PEMOHON'] }}</td>
                <td class="p-2">Nama: _________________</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800">Jawatan: PEGAWAI TEKNIKAL</td>
                <td class="p-2">Jawatan: PEGAWAI KAPAL</td>
              </tr>
              <tr>
                <td class="p-2 border-r border-gray-800">Tarikh: {{ selectedJobCard['TARIKH ROSAK'] }}</td>
                <td class="p-2">Tarikh: {{ selectedJobCard['TARIKH ROSAK'] }}</td>
              </tr>
            </table>
          </div>
          
          <!-- Status Section -->
          <div class="border border-gray-800 mb-4">
            <table class="w-full">
              <tr class="border-b border-gray-800 bg-gray-100">
                <td colspan="2" class="p-2 font-bold">STATUS SEMASA</td>
              </tr>
              <tr>
                <td class="p-2 border-r border-gray-800 font-medium w-1/4">Status</td>
                <td class="p-2">: 
                  <rs-badge
                    :variant="'info'"
                  >
                    Dalam Proses
                  </rs-badge>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Attachment Section -->
          <div class="border border-gray-800 mb-4">
            <table class="w-full">
              <tr class="border-b border-gray-800 bg-gray-100">
                <td colspan="2" class="p-2 font-bold">LAMPIRAN</td>
              </tr>
              <tr>
                <td class="p-2">
                  <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div class="bg-blue-100 p-2 rounded-lg">
                      <i class="fas fa-file-pdf text-2xl text-blue-600"></i>
                    </div>
                    <div class="flex-grow">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium">Laporan Kerosakan.pdf</p>
                          <p class="text-sm text-gray-500">2.5 MB</p>
                        </div>
                        <div>
                          <rs-button variant="primary" size="sm" class="px-3">
                            <i class="fas fa-download mr-1"></i> Muat Turun
                          </rs-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Page Number -->
          <div class="text-center mt-4">
            <div class="inline-block bg-gray-700 text-white px-8 py-1 rounded-full">
              <span class="mr-2">Halaman</span>
              <span class="mr-2">1</span>
              <span class="mr-2">/</span>
              <span>1</span>
            </div>
          </div>
        </div>
      </template>
      
      <template #footer>
        <div class="flex justify-end gap-2">
          <rs-button variant="secondary" @click="closeViewJobCardModal">Tutup</rs-button>
          <rs-button variant="primary">
            <i class="fas fa-print mr-1"></i> Cetak Laporan
          </rs-button>
        </div>
      </template>
    </rs-modal>
  </div>
</template>
