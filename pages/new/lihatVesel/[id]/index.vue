<script setup>
  definePageMeta({
    title: "Kapal Profile",
    layout: "default",
    middleware: ["auth"],
  });

  // Mock data (example only)
  const kapalImage = "@/assets/image/vessels/km_siangin.png"; // Replace with your real image source
  const statusKapal = "OPS";
  const nextAdDate = "2025-08-15";
  const nextPrefitDate = "2026-09-20";
  const totalCrew = 28;

  const tabs = [
    { nama: "Operational Availability", key: "oa" },
    { nama: "Onboard Spare List", key: "osl" },
    { nama: "Floating Equipment", key: "floating_equipment" },
    { nama: "Health, Safety & Environment", key: "hse" },
    { nama: "Rupacara Aset", key: "rupacara" },
    { nama: "Return of Vessel Availability", key: "rova" },        
    { nama: "Ship Equipment List", key: "stock" },  
    { nama: "Planning Maintenance Schedule", key: "pms" },
    { nama: "Kad Kerja", key: "jobcard" },
    { nama: "Cannabilize", key: "cannaidize" },
    { nama: "Laporan di Limbungan", key: "shipyard_reports" },
  ];

  const field = ref(['tarikhKemaskini', 'penerangan','tindakan']);
  const fieldKrew = ref(['id', 'noTentera', 'nama', 'bahagian','tindakan']);


  const activeTab = ref("oa");

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
      id: Date.now() // Temporary id
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
      bulan: `${getMonthnama(today.getMonth())} ${today.getFullYear()}`,
      statusKapal: "Operational",
      tarikhMula: firstDay.toISOString().split('T')[0],
      tarikhTamat: lastDay.toISOString().split('T')[0],
      peratus: 0,
      catatan: ""
    };
    isRovaModalOpen.value = true;
  };

  // Helper function to get month nama
  function getMonthnama(monthIndex) {
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
        id: Date.now() // Temporary id
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
      nama: "KM TAMBISAN",
      pennantNumber: "P384",
      class: "SIANGIN Class",
      type: "Patrol Vessel",
      commissioned: "2008-08-20",
      builder: "NGV Tech Sdn. Bhd.",
      homePort: "Maritim Negeri Johor"
    },
    specifications: {
      displacement: "115 tons",
      length: "27.0 meters",
      beam: "6.0 meters",
      draft: "1.8 meters",
      propulsion: "2 × MTU 12V 2000 M90 diesel engines",
      speed: "25 knots (maximum)",
      range: "1,500 nautical miles at 12 knots",
      complement: "28 personnel (4 officers, 24 enlisted)"
    },
    armament: {
      mainGun: "1 × 20mm cannon",
      secondaryGuns: "2 × 12.7mm machine guns",
      missiles: "None",
      torpedoes: "None",
      other: "Electronic warfare suite"
    },
    electronics: {
      radar: "Furuno navigation radar",
      sonar: "None",
      combatSystem: "Integrated bridge system",
      communication: "Standard maritime communications suite with SATCOM"
    },
    maintenance: {
      lastMaintenance: "2024-02-15",
      nextScheduled: "2024-08-15",
      certifications: "Malaysian Maritime Classification, MARPOL compliance"
    }
  });

  // PMS data
  const pmsData = ref([
    {
      id: 1,
      type: "AD",
      year: 2024,
      lokasi: "Kuching, Sarawak",
      description: "Penyelenggaraan tahunan kapal"
    },
    {
      id: 2,
      type: "AD",
      year: 2025,
      lokasi: "Kuching, Sarawak",
      description: "Penyelenggaraan tahunan kapal"
    },
    {
      id: 3,
      type: "Refit",
      year: 2026,
      lokasi: "Kuching, Sarawak",
      description: "Penyelenggaraan refit kapal"
    },
    {
      id: 4,
      type: "AD",
      year: 2027,
      lokasi: "Kuching, Sarawak",
      description: "Penyelenggaraan tahunan kapal"
    },
    {
      id: 5,
      type: "AMP",
      year: 2028,
      lokasi: "Kuching, Sarawak",
      description: "Penyelenggaraan sistem elektronik dan pendorongan"
    }
  ]);

  // Ship Equipment data
  const shipEquipmentData = ref([
    {
      id: 1,
      noAset: "EQ-2024-001",
      nama: "Radar Navigasi",
      kategori: "Elektronik",
      pengeluaran: "Furuno",
      model: "FAR-2117",
      noSiri: "FR-2345-8976",
      tarikhPemasangan: "2008-08-20",
      status: "Beroperasi"
    },
    {
      id: 2,
      noAset: "EQ-2024-002",
      nama: "Sistem Komunikasi",
      kategori: "Komunikasi",
      pengeluaran: "Sailor",
      model: "6222 VHF DSC",
      noSiri: "SL-5678-1234",
      tarikhPemasangan: "2008-08-20",
      status: "Beroperasi"
    },
    {
      id: 3,
      noAset: "EQ-2024-003",
      nama: "Enjin Utama 1",
      kategori: "Pendorongan",
      pengeluaran: "MTU",
      model: "12V 2000 M90",
      noSiri: "MTU-1234-5678",
      tarikhPemasangan: "2008-08-15",
      status: "Beroperasi"
    },
    {
      id: 4,
      noAset: "EQ-2024-004",
      nama: "Enjin Utama 2",
      kategori: "Pendorongan",
      pengeluaran: "MTU",
      model: "12V 2000 M90",
      noSiri: "MTU-1234-5679",
      tarikhPemasangan: "2008-08-15",
      status: "Penyelenggaraan"
    },
    {
      id: 5,
      noAset: "EQ-2024-005",
      nama: "Meriam 20mm",
      kategori: "Persenjataan",
      pengeluaran: "Oerlikon",
      model: "20mm/85 KAA",
      noSiri: "OE-9876-5432",
      tarikhPemasangan: "2008-09-05",
      status: "Beroperasi"
    }
  ]);

  // Stock/Inventory data
  const stockData = ref([
    {
      id: 1,
      noAset: "STK-2024-001",
      nama: "Minyak Enjin MTU",
      kategori: "Alat Ganti",
      kuantiti: 200,
      unit: "Liter",
      lokasi: "Stor A",
      tarikhTerakhirKemaskini: "2024-03-15",
      jumlah: 100,
      status: "Mencukupi"
    },
    {
      id: 2,
      noAset: "STK-2024-002",
      nama: "Penapis Minyak MTU",
      kategori: "Alat Ganti",
      kuantiti: 8,
      unit: "Unit",
      lokasi: "Stor B",
      tarikhTerakhirKemaskini: "2024-03-10",
      jumlah: 4,
      status: "Mencukupi"
    },
    {
      id: 3,
      noAset: "STK-2024-003",
      nama: "Lampu Navigasi",
      kategori: "Elektrik",
      kuantiti: 5,
      unit: "Unit",
      lokasi: "Stor C",
      tarikhTerakhirKemaskini: "2024-02-28",
      jumlah: 6,
      status: "Kurang"
    },
    {
      id: 4,
      noAset: "STK-2024-004",
      nama: "Tali Tambat",
      kategori: "Peralatan Deck",
      kuantiti: 2,
      unit: "Gulung",
      lokasi: "Stor D",
      tarikhTerakhirKemaskini: "2024-03-05",
      jumlah: 2,
      status: "Mencukupi"
    },
    {
      id: 5,
      noAset: "STK-2024-005",
      nama: "Peluru 20mm",
      kategori: "Persenjataan",
      kuantiti: 1000,
      unit: "Butir",
      lokasi: "Stor Senjata",
      tarikhTerakhirKemaskini: "2024-03-20",
      jumlah: 500,
      status: "Mencukupi"
    }
  ]);

  // Stock Modal state
  const isStockModalOpen = ref(false);
  const isViewingStock = ref(false);
  const isEditingStock = ref(false);
  const stockForm = ref({
    id: null,
    noAset: "",
    nama: "",
    kategori: "",
    kuantiti: 0,
    unit: "",
    lokasi: "",
    tarikhTerakhirKemaskini: "",
    jumlah: 0,
    status: "Mencukupi"
  });

  // Open modal for adding stock
  const openAddStockModal = () => {
    isViewingStock.value = false;
    isEditingStock.value = false;
    const today = new Date().toISOString().split('T')[0];
    const newnoAset = `STK-${new Date().getFullYear()}-${String(stockData.value.length + 1).padStart(3, '0')}`;
    
    stockForm.value = {
      id: null,
      noAset: newnoAset,
      nama: "",
      kategori: "",
      kuantiti: 0,
      unit: "",
      lokasi: "",
      tarikhTerakhirKemaskini: today,
      jumlah: 0,
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
    // Update status based on kuantiti and minimum stock
    stockForm.value.status = stockForm.value.kuantiti >= stockForm.value.jumlah ? "Mencukupi" : "Kurang";
    
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
        id: Date.now() // Temporary id
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
  const selectedStockkategori = ref("Semua");

  // Filtered stock data
  const filteredStockData = computed(() => {
    if (selectedStockkategori.value === "Semua") {
      return stockData.value;
    }
    return stockData.value.filter(item => item.kategori === selectedStockkategori.value);
  });

  // Equipment Modal state
  const isEquipmentModalOpen = ref(false);
  const isViewingEquipment = ref(false);
  const isEditingEquipment = ref(false);
  const equipmentForm = ref({
    id: null,
    noAset: "",
    nama: "",
    kategori: "",
    pengeluaran: "",
    model: "",
    noSiri: "",
    tarikhPemasangan: "",
    status: "Beroperasi"
  });

  // Open modal for adding equipment
  const openAddEquipmentModal = () => {
    isViewingEquipment.value = false;
    isEditingEquipment.value = false;
    const today = new Date().toISOString().split('T')[0];
    const newnoAset = `EQ-${new Date().getFullYear()}-${String(shipEquipmentData.value.length + 1).padStart(3, '0')}`;
    
    equipmentForm.value = {
      id: null,
      noAset: newnoAset,
      nama: "",
      kategori: "",
      pengeluaran: "",
      model: "",
      noSiri: "",
      tarikhPemasangan: today,
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
        id: Date.now() // Temporary id
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
  const selectedkategori = ref("Semua");

  // Filtered equipment data
  const filteredEquipmentData = computed(() => {
    if (selectedkategori.value === "Semua") {
      return shipEquipmentData.value;
    }
    return shipEquipmentData.value.filter(item => item.kategori === selectedkategori.value);
  });

  // PMS Modal state
  const isMaintenanceModalOpen = ref(false);
  const isViewingMaintenance = ref(false);
  const isEditingMaintenance = ref(false);
  const maintenanceForm = ref({
    id: null,
    type: "AD",
    year: new Date().getFullYear(),
    lokasi: "",
    description: ""
  });

  // Open modal for adding maintenance
  const openAddMaintenanceModal = () => {
    isViewingMaintenance.value = false;
    maintenanceForm.value = {
      id: null,
      type: "AD",
      year: new Date().getFullYear(),
      lokasi: "",
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
        id: Date.now() // Temporary id
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
      noTentera: "M15234",
      nama: "Lt. Muda Azman bin Hashim",
      position: "Kapten Kapal",
      joinDate: "2023-03-15",
      endDate: "2025-03-14",
      status: "Aktif",
      contactNo: "012-3456789",
      email: "azman.hashim@apmm.gov.my",
      tindakan: "lihat",
      training: [
        { id: 1, nama: "Kursus Kepimpinan Maritim", date: "2023-05-15", duration: "2 minggu", lokasi: "Akademi APMM, Kuantan" },
        { id: 2, nama: "Latihan Pengurusan Krisis", date: "2023-08-10", duration: "1 minggu", lokasi: "Pusat Latihan APMM, Kuching" }
      ],
      serviceRecord: [
        { id: 1, position: "Pegawai Navigasi", vessel: "KM SATRIA", startDate: "2018-06-10", endDate: "2021-05-20" },
        { id: 2, position: "Pegawai Eksekutif", vessel: "KM MARLIN", startDate: "2021-06-01", endDate: "2023-03-10" }
      ],
      education: [
        { id: 1, qualification: "Ijazah Sarjana Muda Sains Nautika", institution: "Akademi Laut Malaysia", year: "2015" },
        { id: 2, qualification: "Diploma Pelayaran", institution: "Akademi APMM", year: "2012" }
      ]
    },
    {
      id: 2,
      noTentera: "M16345",
      nama: "PW II Sarah binti Omar",
      position: "Pegawai Navigasi",
      joinDate: "2023-06-10",
      endDate: "2025-06-09",
      status: "Aktif",
      contactNo: "013-4567890",
      email: "sarah.omar@apmm.gov.my",
      tindakan: "lihat",
      training: [
        { id: 1, nama: "Kursus Navigasi Lanjutan", date: "2023-09-20", duration: "3 minggu", lokasi: "Akademi APMM, Kuantan" },
        { id: 2, nama: "Latihan SAR", date: "2023-11-05", duration: "2 minggu", lokasi: "Pusat Latihan APMM, Kuching" }
      ],
      serviceRecord: [
        { id: 1, position: "Pegawai Navigasi", vessel: "KM SATRIA", startDate: "2020-03-15", endDate: "2023-06-01" }
      ],
      education: [
        { id: 1, qualification: "Ijazah Sarjana Muda Sains Nautika", institution: "Akademi Laut Malaysia", year: "2018" }
      ]
    },
    {
      id: 3,
      noTentera: "M17456",
      nama: "PW II Razak bin Abdullah",
      position: "Ketua Jurutera",
      joinDate: "2023-01-20",
      endDate: "2025-01-19",
      status: "Aktif",
      contactNo: "014-5678901",
      email: "razak.abdullah@apmm.gov.my",
      tindakan: "lihat",
      training: [
        { id: 1, nama: "Kursus Penyelenggaraan Enjin MTU", date: "2023-05-10", duration: "4 minggu", lokasi: "Pusat Teknikal APMM, Kuching" }
      ]
    },
    {
      id: 4,
      noTentera: "M18567",
      nama: "LK I Ahmad bin Rosli",
      position: "Juruteknik Elektronik",
      joinDate: "2022-11-05",
      endDate: "2024-11-04",
      status: "Aktif",
      contactNo: "015-6789012",
      email: "ahmad.rosli@apmm.gov.my",
      tindakan: "lihat",
      training: [
        { id: 1, nama: "Kursus Sistem Elektronik Kapal", date: "2023-02-15", duration: "3 minggu", lokasi: "Pusat Teknikal APMM, Kuching" }
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
    nama: "",
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
      nama: "",
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
        id: Date.now() // Temporary id
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
      id: 1,
      'JENIS ASET': 'Radar Navigasi',
      'Pengguna Terakhir': 'KM SIANGIN',
      'TARIKH ROSAK': '2024-03-15',
      'PEMOHON': 'Lt. Muda Azman',
      'AMOUN': 'RM 8,500',
      'TINDAKAN': '1'
    },
    {
      id: 2,
      'JENIS ASET': 'Enjin Utama 2',
      'Pengguna Terakhir': 'KM SIANGIN',
      'TARIKH ROSAK': '2024-04-02',
      'PEMOHON': 'PW II Razak',
      'AMOUN': 'RM 25,000',
      'TINDAKAN': '2'
    },
    {
      id: 3,
      'JENIS ASET': 'Sistem VHF',
      'Pengguna Terakhir': 'KM SIANGIN',
      'TARIKH ROSAK': '2024-04-10',
      'PEMOHON': 'Lt. Muda Azman',
      'AMOUN': 'RM 5,800',
      'TINDAKAN': '3'
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
    'lokasi': 'PANGKALAN TLDM LUMUT',
    'mainSystem': '',
    'runningHours': '',
    'pengeluaran': '',
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
      'lokasi': 'PANGKALAN TLDM LUMUT',
      'mainSystem': '',
      'runningHours': '',
      'pengeluaran': '',
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
      id: jobCardData.value.length + 1,
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

  // OA (Operational Availaidity) data
  const oaData = ref([
    {
      id: 1,
      kerosakanKritikal: "Sistem Radar Utama - Furuno FAR-2117",
      tarikhOpsNonOps: "2024-03-15",
      SiriKJPKP: "SiriKJPKP Lumut",
      kat: "KAT 4",
      vendor: "Thales Malaysia Sdn Bhd",
      CD: "2024-04-15",
      HAT: "2024-04-20",
      SAT: "2024-04-25",
      REC1: "2024-05-01",
    },
    {
      id: 2,
      kerosakanKritikal: "Enjin Utama No. 2 - MTU 12V 2000 M90",
      tarikhOpsNonOps: "2024-03-20",
      SiriKJPKP: "SiriKJPKP Kuching",
      kat: "KAT 5",
      vendor: "MTU Asia Pacific Pte Ltd",
      CD: "2024-04-20",
      HAT: "2024-04-25",
      SAT: "2024-04-30",
      REC1: "2024-05-05",
    },
    {
      id: 3,
      kerosakanKritikal: "Sistem Komunikasi VHF - Sailor 6222",
      tarikhOpsNonOps: "2024-03-25",
      SiriKJPKP: "SiriKJPKP Lumut",
      kat: "KAT 4",
      vendor: "Cobham SATCOM Malaysia",
      CD: "2024-04-25",
      HAT: "2024-04-30",
      SAT: "2024-05-05",
      REC1: "2024-05-10",
    },
    {
      id: 4,
      kerosakanKritikal: "Sistem Kawalan Enjin - MTU Engine Control",
      tarikhOpsNonOps: "2024-04-01",
      SiriKJPKP: "SiriKJPKP Sandakan",
      kat: "KAT 5",
      vendor: "MTU Asia Pacific Pte Ltd",
      CD: "2024-05-01",
      HAT: "2024-05-06",
      SAT: "2024-05-11",
      REC1: "2024-05-16",
    }
  ]);

  // Sort OA data in descending order by tarikhOpsNonOps
  const sortedOaData = computed(() => {
    return [...oaData.value].sort((a, b) => {
      return new Date(b.tarikhOpsNonOps) - new Date(a.tarikhOpsNonOps);
    });
  });

  // OA Modal state
  const isOaModalOpen = ref(false);
  const isViewingOa = ref(false);
  const isEditingOa = ref(false);
  const oaForm = ref({
    id: null,
    kerosakanKritikal: "",
    tarikhOpsNonOps: "",
    SiriKJPKP: "",
    kat: "",
    vendor: "",
    CD: "",
    HAT: "",
    SAT: "",
    REC1: "",
    catKapal: "",
    tindakan: ""
  });

  // Open modal for adding OA
  const openAddOaModal = () => {
    isViewingOa.value = false;
    isEditingOa.value = false;
    const today = new Date().toISOString().split('T')[0];
    
    oaForm.value = {
      id: null,
      kerosakanKritikal: "",
      tarikhOpsNonOps: today,
      SiriKJPKP: "",
      kat: "",
      vendor: "",
      CD: "",
      HAT: "",
      SAT: "",
      REC1: "",
      catKapal: ""
    };
    isOaModalOpen.value = true;
  };

  // Open modal for viewing OA
  const openViewOaModal = (item) => {
    isViewingOa.value = true;
    isEditingOa.value = false;
    oaForm.value = { ...item };
    isOaModalOpen.value = true;
  };

  // Open modal for editing OA
  const openEditOaModal = (item) => {
    isViewingOa.value = false;
    isEditingOa.value = true;
    oaForm.value = { ...item };
    isOaModalOpen.value = true;
  };

  // Close OA modal
  const closeOaModal = () => {
    isOaModalOpen.value = false;
  };

  // Submit OA form
  const submitOaForm = () => {
    if (isEditingOa.value) {
      // Update existing item
      const index = oaData.value.findIndex((i) => i.id === oaForm.value.id);
      if (index !== -1) {
        oaData.value[index] = { ...oaForm.value };
      }
    } else {
      // Add new item
      oaData.value.push({
        ...oaForm.value,
        id: Date.now() // Temporary id
      });
    }
    closeOaModal();
  };

  // Delete OA item
  const deleteOaItem = (id) => {
    if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
      const index = oaData.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        oaData.value.splice(index, 1);
      }
    }
  };

  // Handle OA FormKit form submission
  const handleOaSubmit = (values) => {
    oaForm.value = {
      ...oaForm.value,
      ...values
    };
    submitOaForm();
  };

  // Predefined options for OA form
  const SiriKJPKPOptions = [
    "SiriKJPKP Lumut",
    "SiriKJPKP Kuching", 
    "SiriKJPKP Sandakan",
    "SiriKJPKP Kota Kinabalu",
    "SiriKJPKP Miri",
    "SiriKJPKP Labuan",
    "SiriKJPKP Tawau",
    "SiriKJPKP Semporna"
  ];

  const vendorOptions = [
    "Thales Malaysia Sdn Bhd",
    "MTU Asia Pacific Pte Ltd",
    "Cobham SATCOM Malaysia",
    "Carrier Malaysia Sdn Bhd",
    "Caterpillar Malaysia Sdn Bhd",
    "Consilium Malaysia Sdn Bhd",
    "Rolls-Royce Marine Malaysia",
    "Daikin Malaysia Sdn Bhd",
    "Furuno Malaysia Sdn Bhd",
    "Siemens Malaysia Sdn Bhd",
    "ABB Malaysia Sdn Bhd",
    "Schneider Electric Malaysia Sdn Bhd"
  ];

  // Floating Equipment data
  const floatingEquipmentData = ref([
    {
      id: 1,
      nama: 'Rakit Penyelamat Kembung (Inflatable Liferaft)',
      serialNo: 'ILR-2023-001',
      lokasi: 'Port Side',
      status: 'Baik',
      tarikhTerakhirPemeriksaan: '2024-01-15',
    },
    {
      id: 2,
      nama: 'Bot Kerja (Workboat)',
      serialNo: 'WB-2022-005',
      lokasi: 'Stern',
      status: 'Baik',
      tarikhTerakhirPemeriksaan: '2024-02-20',
    },
    {
      id: 3,
      nama: 'Pelampung Penyelamat (Lifebuoy)',
      serialNo: 'LB-2023-015',
      lokasi: 'Starboard Side',
      status: 'Baik',
      tarikhTerakhirPemeriksaan: '2024-03-10',
    },
  ]);

  // Floating Equipment Modal state
  const isFloatingEquipmentModalOpen = ref(false);
  const isViewingFloatingEquipment = ref(false);
  const isEditingFloatingEquipment = ref(false);
  const floatingEquipmentForm = ref({
    id: null,
    nama: '',
    serialNo: '',
    lokasi: '',
    status: 'Baik',
    tarikhTerakhirPemeriksaan: '',
  });

  // Open modal for adding floating equipment
  const openAddFloatingEquipmentModal = () => {
    isViewingFloatingEquipment.value = false;
    isEditingFloatingEquipment.value = false;
    const today = new Date().toISOString().split('T')[0];
    
    floatingEquipmentForm.value = {
      id: null,
      nama: '',
      serialNo: `FE-${new Date().getFullYear()}-${String(floatingEquipmentData.value.length + 1).padStart(3, '0')}`,
      lokasi: '',
      status: 'Baik',
      tarikhTerakhirPemeriksaan: today,
    };
    isFloatingEquipmentModalOpen.value = true;
  };

  // Open modal for viewing floating equipment
  const viewFloatingEquipmentItem = (item) => {
    isViewingFloatingEquipment.value = true;
    isEditingFloatingEquipment.value = false;
    floatingEquipmentForm.value = { ...item };
    isFloatingEquipmentModalOpen.value = true;
  };

  // Open modal for editing floating equipment
  const editFloatingEquipmentItem = (item) => {
    isViewingFloatingEquipment.value = false;
    isEditingFloatingEquipment.value = true;
    floatingEquipmentForm.value = { ...item };
    isFloatingEquipmentModalOpen.value = true;
  };

  // Close floating equipment modal
  const closeFloatingEquipmentModal = () => {
    isFloatingEquipmentModalOpen.value = false;
  };

  // Submit floating equipment form
  const submitFloatingEquipmentForm = () => {
    if (isEditingFloatingEquipment.value) {
      // Update existing item
      const index = floatingEquipmentData.value.findIndex((i) => i.id === floatingEquipmentForm.value.id);
      if (index !== -1) {
        floatingEquipmentData.value[index] = { ...floatingEquipmentForm.value };
      }
    } else {
      // Add new item
      floatingEquipmentData.value.push({
        ...floatingEquipmentForm.value,
        id: Date.now() // Temporary id
      });
    }
    closeFloatingEquipmentModal();
  };

  // Delete floating equipment item
  const deleteFloatingEquipmentItem = (id) => {
    if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
      const index = floatingEquipmentData.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        floatingEquipmentData.value.splice(index, 1);
      }
    }
  };

  // Handle floating equipment FormKit form submission
  const handleFloatingEquipmentSubmit = (values) => {
    floatingEquipmentForm.value = {
      ...floatingEquipmentForm.value,
      ...values
    };
    submitFloatingEquipmentForm();
  };

  // Handle asset selection from OSL
  const handleAssetSelection = (selectednamaAset) => {
    const selectedAsset = allOslAssets.value.find(asset => asset.nama === selectednamaAset);
    if (selectedAsset) {
      floatingEquipmentForm.value.kuantiti = selectedAsset.qty;
      floatingEquipmentForm.value.remarks = selectedAsset.remark;
    }
  };

  // HSE (Health, Safety & Environment) data
  const hseData = ref([
    {
      id: 1,
      tarikhKejadian: '2024-03-15',
      jenisKejadian: 'Kerosakan Aset',
      namaAset: 'Sistem Radar Utama',
      penerangan: 'Kerosakan pada sistem radar akibat gelombang tinggi',
      statusKerosakan: 'Sederhana',
      kosPembaikan: 8500.00,
      tempohPembaikan: '5 hari',
      jabatan: 'Krew Navigasi',
      langkahPembaikan : 'Pemasangan pelindung tambahan',
      status: 'Selesai'
    },
    {
      id: 2,
      tarikhKejadian: '2024-02-28',
      jenisKejadian: 'Kemalangan Krew',
      namaAset: 'Sistem Kawalan Enjin',
      penerangan: 'Kecederaan ringan semasa penyelenggaraan enjin',
      statusKerosakan: 'Ringan',
      kosPembaikan: 1200.00,
      tempohPembaikan: '2 hari',
      jabatan: 'Jurutera',
      langkahPembaikan : 'Latihan keselamatan tambahan',
      status: 'Selesai'
    }
  ]);

  // HSE Modal state
  const isHseModalOpen = ref(false);
  const isViewingHse = ref(false);
  const isEditingHse = ref(false);
  const hseForm = ref({
    id: null,
    tarikhKejadian: '',
    jenisKejadian: '',
    namaAset: '',
    penerangan: '',
    statusKerosakan: '',
    kosPembaikan: 0,
    tempohPembaikan: '',
    jabatan: '',
    langkahPembaikan : '',
    status: 'Dalam Proses'
  });

  // Open modal for adding HSE incident
  const openAddHseModal = () => {
    isViewingHse.value = false;
    isEditingHse.value = false;
    const today = new Date().toISOString().split('T')[0];
    
    hseForm.value = {
      id: null,
      tarikhKejadian: today,
      jenisKejadian: '',
      namaAset: '',
      penerangan: '',
      statusKerosakan: '',
      kosPembaikan: 0,
      tempohPembaikan: '',
      jabatan: '',
      langkahPembaikan : '',
      status: 'Dalam Proses'
    };
    isHseModalOpen.value = true;
  };

  // Open modal for viewing HSE incident
  const viewHseItem = (item) => {
    isViewingHse.value = true;
    isEditingHse.value = false;
    hseForm.value = { ...item };
    isHseModalOpen.value = true;
  };

  // Open modal for editing HSE incident
  const editHseItem = (item) => {
    isViewingHse.value = false;
    isEditingHse.value = true;
    hseForm.value = { ...item };
    isHseModalOpen.value = true;
  };

  // Close HSE modal
  const closeHseModal = () => {
    isHseModalOpen.value = false;
  };

  // Submit HSE form
  const submitHseForm = () => {
    if (isEditingHse.value) {
      // Update existing item
      const index = hseData.value.findIndex((i) => i.id === hseForm.value.id);
      if (index !== -1) {
        hseData.value[index] = { ...hseForm.value };
      }
    } else {
      // Add new item
      hseData.value.push({
        ...hseForm.value,
        id: Date.now() // Temporary id
      });
    }
    closeHseModal();
  };

  // Delete HSE item
  const deleteHseItem = (id) => {
    if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
      const index = hseData.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        hseData.value.splice(index, 1);
      }
    }
  };

  // Handle HSE FormKit form submission
  const handleHseSubmit = (values) => {
    hseForm.value = {
      ...hseForm.value,
      ...values
    };
    submitHseForm();
  };

  // HSE Statistics
  const hseStatistics = computed(() => {
    const totalIncidents = hseData.value.length;
    const kos = hseData.value.reduce((sum, item) => sum + item.kosPembaikan, 0);
    const completedIncidents = hseData.value.filter(item => item.status === 'Selesai').length;
    const pendingIncidents = hseData.value.filter(item => item.status === 'Dalam Proses').length;
    
    const incidentsByType = {};
    hseData.value.forEach(item => {
      incidentsByType[item.jenisKejadian] = (incidentsByType[item.jenisKejadian] || 0) + 1;
    });
    
    const incidentsBystatusKerosakan = {};
    hseData.value.forEach(item => {
      incidentsBystatusKerosakan[item.statusKerosakan] = (incidentsBystatusKerosakan[item.statusKerosakan] || 0) + 1;
    });
    
    return {
      totalIncidents,
      kos,
      completedIncidents,
      pendingIncidents,
      incidentsByType,
      incidentsBystatusKerosakan
    };
  });

  // Shipyard Reports Data
  const shipyardReportsData = ref([
    {
      id: 1,
      minggu: "Minggu 1",
      tarikhLapor: "2024-03-01",
      noSebutHarga: "SH-2024-001",
      namaAset: "KM SIANGIN",
      namaLimbungan: "Limbungan Kapal Lumut Sdn Bhd",
      kos: 45000.00,
      skor: 4.5,
      namaPenyelia: "En. Ahmad bin Ismail",
      noTelefonPenyelia: "012-3456789"
    },
    {
      id: 2,
      minggu: "Minggu 2",
      tarikhLapor: "2024-03-08",
      noSebutHarga: "SH-2024-002",
      namaAset: "KM SIANGIN",
      namaLimbungan: "Limbungan Kapal Lumut Sdn Bhd",
      kos: 28000.00,
      skor: 5.0,
      namaPenyelia: "En. Ahmad bin Ismail",
      noTelefonPenyelia: "012-3456789"
    },
    {
      id: 3,
      minggu: "Minggu 3",
      tarikhLapor: "2024-03-15",
      noSebutHarga: "SH-2024-003",
      namaAset: "KM SIANGIN",
      namaLimbungan: "Limbungan Kapal Lumut Sdn Bhd",
      kos: 35000.00,
      skor: 4.0,
      namaPenyelia: "En. Ahmad bin Ismail",
      noTelefonPenyelia: "012-3456789"
    }
  ]);

  // Sort shipyard reports data in descending order by tarikhLapor
  const sortedShipyardReportsData = computed(() => {
    return [...shipyardReportsData.value].sort((a, b) => {
      return new Date(b.tarikhLapor) - new Date(a.tarikhLapor);
    });
  });

  // Shipyard Reports Modal state
  const isShipyardReportModalOpen = ref(false);
  const isViewingShipyardReport = ref(false);
  const isEditingShipyardReport = ref(false);
  const shipyardReportForm = ref({
    id: null,
    minggu: "",
    tarikhLapor: "",
    noSebutHarga: "",
    namaAset: "",
    namaLimbungan: "",
    kos: 0,
    skor: 0,
    namaPenyelia: "",
    noTelefonPenyelia: ""
  });

  // Open modal for adding shipyard report
  const openAddShipyardReportModal = () => {
    isViewingShipyardReport.value = false;
    isEditingShipyardReport.value = false;
    const today = new Date();
    const minggu = `Minggu ${Math.ceil(today.getDate() / 7)}`;
    const newnoSebutHarga = `SH-${today.getFullYear()}-${String(shipyardReportsData.value.length + 1).padStart(3, '0')}`;
    
    shipyardReportForm.value = {
      id: null,
      minggu: minggu,
      tarikhLapor: today.toISOString().split('T')[0],
      noSebutHarga: newnoSebutHarga,
      namaAset: "KM SIANGIN",
      namaLimbungan: "Limbungan Kapal Lumut Sdn Bhd",
      kos: 0,
      skor: 0,
      namaPenyelia: "",
      noTelefonPenyelia: ""
    };
    isShipyardReportModalOpen.value = true;
  };

  // Open modal for viewing shipyard report
  const openViewShipyardReportModal = (item) => {
    isViewingShipyardReport.value = true;
    isEditingShipyardReport.value = false;
    shipyardReportForm.value = { ...item };
    isShipyardReportModalOpen.value = true;
  };

  // Open modal for editing shipyard report
  const openEditShipyardReportModal = (item) => {
    isViewingShipyardReport.value = false;
    isEditingShipyardReport.value = true;
    shipyardReportForm.value = { ...item };
    isShipyardReportModalOpen.value = true;
  };

  // Close shipyard report modal
  const closeShipyardReportModal = () => {
    isShipyardReportModalOpen.value = false;
  };

  // Submit shipyard report form
  const submitShipyardReportForm = () => {
    if (isEditingShipyardReport.value) {
      // Update existing item
      const index = shipyardReportsData.value.findIndex((i) => i.id === shipyardReportForm.value.id);
      if (index !== -1) {
        shipyardReportsData.value[index] = { ...shipyardReportForm.value };
      }
    } else {
      // Add new item
      shipyardReportsData.value.push({
        ...shipyardReportForm.value,
        id: Date.now() // Temporary id
      });
    }
    closeShipyardReportModal();
  };

  // Delete shipyard report item
  const deleteShipyardReportItem = (id) => {
    if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
      const index = shipyardReportsData.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        shipyardReportsData.value.splice(index, 1);
      }
    }
  };

  // Handle shipyard report FormKit form submission
  const handleShipyardReportSubmit = (values) => {
    shipyardReportForm.value = {
      ...shipyardReportForm.value,
      ...values
    };
    submitShipyardReportForm();
  };

  // Add activity to shipyard report
  const addActivityToReport = () => {
    const newActivity = {
      id: Date.now(),
      activitynama: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Dalam Proses",
      qualityRating: 0,
      images: [],
      catatan: ""
    };
  };

  

  // Shipyard reports statistics
  const shipyardReportsStatistics = computed(() => {
    const totalReports = shipyardReportsData.value.length;
    const kos = shipyardReportsData.value.reduce((sum, item) => sum + item.kos, 0);
    const averageQualityRating = shipyardReportsData.value.length > 0 
      ? shipyardReportsData.value.reduce((sum, item) => sum + item.skor, 0) / shipyardReportsData.value.length 
      : 0;
    
    return {
      totalReports,
      kos,
      averageQualityRating,
    };
  });

  // Cannaidize Asset data
  const cannaidizeAssetData = ref([
    {
      id: 1,
      nama: 'Enjin Utama MTU 12V 2000 M90',
      serialNo: 'CA-2024-001',
      lokasi: 'Engine Room',
      status: 'Tersedia',
      tarikhTerakhirPemeriksaan: '2024-01-15',
     kaadaan: 'Baik',
      catatan: 'Enjin utama yang telah dibaiki dan sedia untuk digunakan'
    },    
    {
      id: 2,
      nama: 'Generator Set Caterpillar 3406',
      serialNo: 'CA-2024-003',
      lokasi: 'Generator Room',
      status: 'Tersedia',
      tarikhTerakhirPemeriksaan: '2024-03-10',
     kaadaan: 'Sederhana',
      catatan: 'Generator set yang memerlukan penyelenggaraan ringan'
    },
    {
      id: 3,
      nama: 'Sistem Komunikasi VHF Sailor 6222',
      serialNo: 'CA-2024-004',
      lokasi: 'Radio Room',
      status: 'Tersedia',
      tarikhTerakhirPemeriksaan: '2024-02-28',
    kaadaan: 'Baik',
      catatan: 'Sistem komunikasi yang berfungsi dengan baik'
    },
    
  ]);

  // Cannaidize Asset Modal state
  const isCannaidizeAssetModalOpen = ref(false);
  const isViewingCannaidizeAsset = ref(false);
  const isEditingCannaidizeAsset = ref(false);
  const cannaidizeAssetForm = ref({
    id: null,
    nama: '',
    serialNo: '',
    lokasi: '',
    status: 'Tersedia',
    tarikhTerakhirPemeriksaan: '',
   kaadaan: 'Baik',
    pemilikAsal: '',
    tarikhPindahMilik: '',
    catatan: ''
  });

  // Open modal for adding cannaidize asset
  const openAddCannaidizeAssetModal = () => {
    isViewingCannaidizeAsset.value = false;
    isEditingCannaidizeAsset.value = false;
    const today = new Date().toISOString().split('T')[0];
    
    cannaidizeAssetForm.value = {
      id: null,
      nama: '',
      serialNo: `CA-${new Date().getFullYear()}-${String(cannaidizeAssetData.value.length + 1).padStart(3, '0')}`,
      lokasi: '',
      status: 'Tersedia',
      tarikhTerakhirPemeriksaan: today,
     kaadaan: 'Baik',
      pemilikAsal: '',
      tarikhPindahMilik: today,
      catatan: ''
    };
    isCannaidizeAssetModalOpen.value = true;
  };

  // Open modal for viewing cannaidize asset
  const viewCannaidizeAssetItem = (item) => {
    isViewingCannaidizeAsset.value = true;
    isEditingCannaidizeAsset.value = false;
    cannaidizeAssetForm.value = { ...item };
    isCannaidizeAssetModalOpen.value = true;
  };

  // Open modal for editing cannaidize asset
  const editCannaidizeAssetItem = (item) => {
    isViewingCannaidizeAsset.value = false;
    isEditingCannaidizeAsset.value = true;
    cannaidizeAssetForm.value = { ...item };
    isCannaidizeAssetModalOpen.value = true;
  };

  // Close cannaidize asset modal
  const closeCannaidizeAssetModal = () => {
    isCannaidizeAssetModalOpen.value = false;
  };

  // Submit cannaidize asset form
  const submitCannaidizeAssetForm = () => {
    if (isEditingCannaidizeAsset.value) {
      // Update existing item
      const index = cannaidizeAssetData.value.findIndex((i) => i.id === cannaidizeAssetForm.value.id);
      if (index !== -1) {
        cannaidizeAssetData.value[index] = { ...cannaidizeAssetForm.value };
      }
    } else {
      // Add new item
      cannaidizeAssetData.value.push({
        ...cannaidizeAssetForm.value,
        id: Date.now() // Temporary id
      });
    }
    closeCannaidizeAssetModal();
  };

  // Delete cannaidize asset item
  const deleteCannaidizeAssetItem = (id) => {
    if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
      const index = cannaidizeAssetData.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        cannaidizeAssetData.value.splice(index, 1);
      }
    }
  };

  // Handle cannaidize asset FormKit form submission
  const handleCannaidizeAssetSubmit = (values) => {
    cannaidizeAssetForm.value = {
      ...cannaidizeAssetForm.value,
      ...values
    };
    submitCannaidizeAssetForm();
  };
</script>

<template>
  <div class="p-6 space-y-6">
     <!-- Ship identity Banner -->
     <div class="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg shadow-lg overflow-hidden">
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/3 p-6 flex items-center justify-center">
                  <img src="@/assets/img/vessels/kelas_langkawi.png" alt="KD KEDAH" class="h-48 object-contain" />
                </div>
                <div class="md:w-2/3 p-6 text-white">
                  <div class="flex items-center space-x-3">
                    <h1 class="text-3xl font-bold">{{ vesselProfile.generalInfo.nama }}</h1>
                    <span class="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">{{ vesselProfile.generalInfo.pennantNumber }}</span>
                  </div>
                  <p class="text-xl mt-2">{{ vesselProfile.generalInfo.class }} - {{ vesselProfile.generalInfo.type }}</p>
                  <div class="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-blue-200 text-sm">DITUGASKAN PADA</p>
                      <p>{{ vesselProfile.generalInfo.commissioned }}</p>
                    </div>
                    <div>
                      <p class="text-blue-200 text-sm">Maritim Negeri / Zon Maritim</p>
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
          {{ tab.nama }}
        </button>
      </div>

      <div class="p-4 bg-gray-50 rounded">
        
        <div v-if="activeTab === 'oa'">
          <rs-card>
            <template #header>
              <!-- <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Operational Availability (OA)</h2>
                <rs-button variant="primary" @click="openAddOaModal">Tambah OA</rs-button>
              </div> -->
            </template>

            <rs-table
              :data="sortedOaData"
              :columns="[
                { key: 'kerosakanKritikal', label: 'KEROSAKAN KRITIKAL (KAT 4&5)' },
                { key: 'tarikhOpsNonOps', label: 'TARIKH OPS/NON-OPS' },
                { key: 'SiriKJPKP', label: 'SiriSiriKJPKP' },
                { key: 'kat', label: 'KAT' },
                { key: 'vendor', label: 'VENDOR' },
                { key: 'CD', label: 'CD' },
                { key: 'HAT', label: 'HAT' },
                { key: 'SAT', label: 'SAT' },
                { key: 'REC1', label: 'REC1' },
                { key: 'catKapal', label: 'CAT KAPAL (1-5)' }
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
                defaultSort: { column: 'tarikhOpsNonOps', direction: 'desc' }
              }"
              advanced
            >
              <template v-slot:kat="row">
                <rs-badge
                  :variant="row.value.kat === 'KAT 4' ? 'warning' : 'danger'"
                >
                  {{ row.value.kat }}
                </rs-badge>
              </template>
              
             
             
            </rs-table>
          </rs-card>

          <!-- OA Modal -->
          <rs-modal v-model="isOaModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingOa ? 'Maklumat OA' : isEditingOa ? 'Kemaskini OA' : 'Tambah OA' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingOa" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Kerosakan Kritikal:</h4>
                    <p>{{ oaForm.kerosakanKritikal }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Tarikh OPS/NON-OPS:</h4>
                    <p>{{ oaForm.tarikhOpsNonOps }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">KJKP:</h4>
                    <p>{{ oaForm.SiriKJPKP }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">KAT:</h4>
                    <rs-badge
                      :variant="oaForm.kat === 'KAT 4' ? 'warning' : 'danger'"
                    >
                      {{ oaForm.kat }}
                    </rs-badge>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Vendor:</h4>
                  <p>{{ oaForm.vendor }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">CD:</h4>
                    <p>{{ oaForm.CD }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">HAT:</h4>
                    <p>{{ oaForm.HAT }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">SAT:</h4>
                    <p>{{ oaForm.SAT }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">REC1:</h4>
                    <p>{{ oaForm.REC1 }}</p>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">CAT Kapal (1-5):</h4>
                  <rs-badge
                    :variant="
                      oaForm.catKapal === '1' ? 'success' :
                      oaForm.catKapal === '2' ? 'info' :
                      oaForm.catKapal === '3' ? 'warning' :
                      oaForm.catKapal === '4' ? 'danger' : 'dark'
                    "
                  >
                    {{ oaForm.catKapal }}
                  </rs-badge>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="oaForm" @submit="handleOaSubmit">
                <!-- Kerosakan Kritikal -->
                <FormKit
                  type="text"
                  nama="kerosakanKritikal"
                  label="Kerosakan Kritikal (KAT 4&5)"
                  placeholder="Contoh: Sistem Radar Utama - Furuno FAR-2117"
                  validation="required"
                  help="Masukkan nama sistem dan model peralatan yang rosak"
                />

                <div class="grid grid-cols-2 gap-4">
                  <!-- Tarikh OPS/NON-OPS -->
                  <FormKit
                    type="date"
                    nama="tarikhOpsNonOps"
                    label="Tarikh OPS/NON-OPS"
                    validation="required"
                    help="Tarikh kapal menjadi tidak beroperasi"
                  />

                  <!-- KJKP -->
                  <FormKit
                    type="select"
                    nama="SiriKJPKP"
                    label="KJKP"
                    :options="SiriKJPKPOptions"
                    validation="required"
                    help="Kawalan Jurutera Kapal"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- KAT -->
                  <FormKit
                    type="select"
                    nama="kat"
                    label="KAT"
                    :options="['KAT 4', 'KAT 5']"
                    validation="required"
                    help="Kategori kerosakan (4 = Kritikal, 5 = Sangat Kritikal)"
                  />

                  <!-- Vendor -->
                  <FormKit
                    type="select"
                    nama="vendor"
                    label="Vendor"
                    :options="vendorOptions"
                    validation="required"
                    help="Syarikat pembekal peralatan"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- CD -->
                  <FormKit
                    type="date"
                    nama="CD"
                    label="CD"
                    validation="required"
                    help="Contract Date - Tarikh kontrak"
                  />

                  <!-- HAT -->
                  <FormKit
                    type="date"
                    nama="HAT"
                    label="HAT"
                    validation="required"
                    help="Handover Acceptance Test - Tarikh ujian penerimaan"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- SAT -->
                  <FormKit
                    type="date"
                    nama="SAT"
                    label="SAT"
                    validation="required"
                    help="Sea Acceptance Test - Tarikh ujian penerimaan di laut"
                  />

                  <!-- REC1 -->
                  <FormKit
                    type="date"
                    nama="REC1"
                    label="REC1"
                    validation="required"
                    help="Recommendation 1 - Tarikh cadangan pertama"
                  />
                </div>

                <!-- CAT Kapal -->
                <FormKit
                  type="select"
                  nama="catKapal"
                  label="CAT Kapal (1-5)"
                  :options="['1', '2', '3', '4', '5']"
                  validation="required"
                  help="1 = Sangat Baik, 2 = Baik, 3 = Sederhana, 4 = Kurang Baik, 5 = Sangat Kurang Baik"
                />
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button variant="secondary" @click="closeOaModal">
                  {{ isViewingOa ? 'Tutup' : 'Batal' }}
                </rs-button>
                <rs-button 
                  v-if="!isViewingOa" 
                  variant="primary" 
                  @click="submitOaForm"
                >
                  {{ isEditingOa ? 'Kemaskini' : 'Tambah' }}
                </rs-button>
              </div>
            </template>
          </rs-modal>
        </div>

        <div v-else-if="activeTab === 'rova'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Return of Vessel Availaidity (ROVA)</h2>
                <!-- <rs-button variant="primary" @click="openAddRovaModal">Tambah ROVA</rs-button> -->
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
                    nama="bulan"
                    label="Bulan"
                    placeholder="Contoh: Januari 2024"
                    validation="required"
                  />

                  <!-- Status Kapal -->
                  <FormKit
                    type="select"
                    nama="statusKapal"
                    label="Status Kapal"
                    :options="['Operational', 'Maintenance', 'Repair', 'Standby']"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Tarikh Mula -->
                  <FormKit
                    type="date"
                    nama="tarikhMula"
                    label="Tarikh Mula"
                    validation="required"
                  />

                  <!-- Tarikh Tamat -->
                  <FormKit
                    type="date"
                    nama="tarikhTamat"
                    label="Tarikh Tamat"
                    validation="required"
                  />
                </div>

                <!-- Peratus -->
                <FormKit
                  type="range"
                  nama="peratus"
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
                  nama="catatan"
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
                <!-- <rs-button variant="primary" @click="openAddRupacaraModal">Tambah Rupacara</rs-button> -->
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
                  nama="tarikhKemaskini"
                  label="Tarikh Kemaskini"
                  :value="new Date().toISOString().split('T')[0]"
                  validation="required"
                />

                <!-- Penerangan -->
                <FormKit
                  type="textarea"
                  nama="penerangan"
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
                    nama="portView"
                    label="Port View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Starboard View -->
                  <FormKit
                    type="file"
                    nama="starboardView"
                    label="Starboard View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Forward View -->
                  <FormKit
                    type="file"
                    nama="forwardView"
                    label="Forward View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- After View -->
                  <FormKit
                    type="file"
                    nama="afterView"
                    label="After View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Engine Room -->
                  <FormKit
                    type="file"
                    nama="engineRoom"
                    label="Engine Room (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Closed Bridge -->
                  <FormKit
                    type="file"
                    nama="closedBridge"
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
            <!-- <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Senarai Aset Kapal</h2>
                <rs-button variant="primary" @click="openAddEquipmentModal">Tambah Aset</rs-button>
              </div>
            </template> -->
            
            <div class="p-4">                            
              <!-- Equipment Table -->
              <rs-table
                :data="filteredEquipmentData"
                :columns="[
                  { key: 'noAset', label: 'No. Aset' },
                  { key: 'nama', label: 'nama Aset' },
                  { key: 'kategori', label: 'Kategori' },
                  { key: 'pengeluaran', label: 'Pengeluar' },
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
                  defaultSort: { column: 'noAset', direction: 'asc' }
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
                    <p>{{ equipmentForm.noAset }}</p>
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
                  <h4 class="font-medium text-gray-700">nama Aset:</h4>
                  <p>{{ equipmentForm.nama }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Kategori:</h4>
                    <p>{{ equipmentForm.kategori }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Pengeluar:</h4>
                    <p>{{ equipmentForm.pengeluaran }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Model:</h4>
                    <p>{{ equipmentForm.model }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">No. Siri:</h4>
                    <p>{{ equipmentForm.noSiri }}</p>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Tarikh Pemasangan:</h4>
                  <p>{{ equipmentForm.tarikhPemasangan }}</p>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="equipmentForm" @submit="handleEquipmentSubmit">
                <div class="grid grid-cols-2 gap-4">
                  <!-- No. Aset -->
                  <FormKit
                    type="text"
                    nama="noAset"
                    label="No. Aset"
                    :disabled="isEditingEquipment"
                    validation="required"
                  />

                  <!-- Status -->
                  <FormKit
                    type="select"
                    nama="status"
                    label="Status"
                    :options="['Beroperasi', 'Penyelenggaraan', 'Tidak Beroperasi']"
                    validation="required"
                  />
                </div>

                <!-- nama Aset -->
                <FormKit
                  type="text"
                  nama="nama"
                  label="nama Aset"
                  placeholder="Contoh: Sistem Radar"
                  validation="required"
                />

                <div class="grid grid-cols-2 gap-4">
                  <!-- Kategori -->
                  <FormKit
                    type="select"
                    nama="kategori"
                    label="Kategori"
                    :options="['Elektronik', 'Pendorongan', 'Persenjataan', 'Komunikasi', 'Lain-lain']"
                    validation="required"
                  />

                  <!-- Pengeluar -->
                  <FormKit
                    type="text"
                    nama="pengeluaran"
                    label="Pengeluar"
                    placeholder="Contoh: Thales"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Model -->
                  <FormKit
                    type="text"
                    nama="model"
                    label="Model"
                    placeholder="Contoh: SMART-S Mk2"
                    validation="required"
                  />

                  <!-- No. Siri -->
                  <FormKit
                    type="text"
                    nama="noSiri"
                    label="No. Siri"
                    placeholder="Contoh: TH-1234-5678"
                    validation="required"
                  />
                </div>

                <!-- Tarikh Pemasangan -->
                <FormKit
                  type="date"
                  nama="tarikhPemasangan"
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
                <!-- <rs-button variant="primary" @click="openAddStockModal">Tambah Stok</rs-button> -->
              </div>
            </template>
            
            <div class="p-4">                            
              <!-- Stock Table -->
              <rs-table
                :data="filteredStockData"
                :columns="[
                  { key: 'noAset', label: 'No. Stok' },
                  { key: 'nama', label: 'nama Item' },
                  { key: 'kategori', label: 'Kategori' },
                  { key: 'kuantiti', label: 'Kuantiti' },
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
                  defaultSort: { column: 'noAset', direction: 'asc' }
                }"
                advanced
              >
                <template v-slot:kuantiti="row">
                  {{ row.value.kuantiti }} {{ row.value.unit }}
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
                    <p>{{ stockForm.noAset }}</p>
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
                  <h4 class="font-medium text-gray-700">nama Item:</h4>
                  <p>{{ stockForm.nama }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Kategori:</h4>
                    <p>{{ stockForm.kategori }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Lokasi:</h4>
                    <p>{{ stockForm.lokasi }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Kuantiti:</h4>
                    <p>{{ stockForm.kuantiti }} {{ stockForm.unit }}</p>
                  </div>
                  
                  <div class="mb-2">
                    <h4 class="font-medium text-gray-700">Stok Minimum:</h4>
                    <p>{{ stockForm.jumlah }} {{ stockForm.unit }}</p>
                  </div>
                </div>
                
                <div class="mb-2">
                  <h4 class="font-medium text-gray-700">Tarikh Kemaskini:</h4>
                  <p>{{ stockForm.tarikhTerakhirKemaskini }}</p>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="stockForm" @submit="handleStockSubmit">
                <div class="grid grid-cols-2 gap-4">
                  <!-- No. Stok -->
                  <FormKit
                    type="text"
                    nama="noAset"
                    label="No. Stok"
                    :disabled="isEditingStock"
                    validation="required"
                  />

                  <!-- Tarikh Kemaskini -->
                  <FormKit
                    type="date"
                    nama="tarikhTerakhirKemaskini"
                    label="Tarikh Kemaskini"
                    validation="required"
                  />
                </div>

                <!-- nama Item -->
                <FormKit
                  type="text"
                  nama="nama"
                  label="nama Item"
                  placeholder="Contoh: Minyak Enjin"
                  validation="required"
                />

                <div class="grid grid-cols-2 gap-4">
                  <!-- Kategori -->
                  <FormKit
                    type="select"
                    nama="kategori"
                    label="Kategori"
                    :options="['Alat Ganti', 'Elektrik', 'Elektronik', 'Peralatan Deck', 'Lain-lain']"
                    validation="required"
                  />

                  <!-- Lokasi -->
                  <FormKit
                    type="text"
                    nama="lokasi"
                    label="Lokasi"
                    placeholder="Contoh: Stor A"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <!-- Kuantiti -->
                  <FormKit
                    type="number"
                    nama="kuantiti"
                    label="Kuantiti"
                    validation="required|number|min:0"
                    min="0"
                    step="1"
                  />

                  <!-- Unit -->
                  <FormKit
                    type="text"
                    nama="unit"
                    label="Unit"
                    placeholder="Contoh: Liter"
                    validation="required"
                  />

                  <!-- Stok Minimum -->
                  <FormKit
                    type="number"
                    nama="jumlah"
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
                <!-- <rs-button variant="primary" @click="openAddMaintenanceModal">Tambah Baru</rs-button> -->
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
                  <p>{{ maintenanceForm.lokasi }}</p>
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
                  nama="type"
                  label="Jenis Penyelenggaraan"
                  :options="['AD', 'Refit', 'AMP']"
                  validation="required"
                />

                <!-- Tahun -->
                <FormKit
                  type="number"
                  nama="year"
                  label="Tahun"
                  validation="required|number|min:2020|max:2050"
                  min="2020"
                  max="2050"
                  step="1"
                />

                <!-- Lokasi -->
                <FormKit
                  type="text"
                  nama="lokasi"
                  label="Lokasi"
                  placeholder="Contoh: Lumut, Perak"
                  validation="required"
                />

                <!-- Penerangan -->
                <FormKit
                  type="textarea"
                  nama="description"
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
                  <h3 class="font-bold">MENUNGGU KELULUSAN DARI SiriKJPKP</h3>
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
                  <!-- <rs-button variant="primary" @click="openAddJobCardModal">Tambah Kad Kerja</rs-button> -->
                </div>
              </template>
              
              <div class="p-4">
                <!-- Job Card Table -->
                <rs-table
                  :data="jobCardData"
                  :columns="[
                    { key: 'id', label: 'id' },
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
                    defaultSort: { column: 'id', direction: 'asc' }
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

        <div v-else-if="activeTab === 'floating_equipment'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Floating Equipment</h2>
                <!-- <rs-button variant="primary" @click="openAddFloatingEquipmentModal">Tambah Peralatan</rs-button> -->
              </div>
            </template>
            
            <rs-table
              :data="floatingEquipmentData"
              :columns="[
                { key: 'nama', label: 'nama Peralatan' },
                { key: 'serialNo', label: 'No Siri' },
                { key: 'lokasi', label: 'Lokasi' },
                { key: 'status', label: 'Status' },
                { key: 'tarikhTerakhirPemeriksaan', label: 'Tarikh Pemeriksaan Terakhir' },
                { key: 'tindakan', label: 'Tindakan' }
              ]"
              :options="{
                variant: 'default',
                striped: true,
                borderless: true,
              }"
              advanced
            >
              <template v-slot:status="row">
                <rs-badge
                  :variant="row.value.status === 'Baik' ? 'success' : 'danger'"
                >
                  {{ row.value.status }}
                </rs-badge>
              </template>
              
              <template v-slot:tindakan="row">
                <div class="flex gap-2">
                  <rs-button variant="primary" size="sm" @click="viewFloatingEquipmentItem(row.value)">Lihat</rs-button>
                  <rs-button variant="warning" size="sm" @click="editFloatingEquipmentItem(row.value)">Kemaskini</rs-button>
                  <rs-button variant="danger" size="sm" @click="deleteFloatingEquipmentItem(row.value.id)">Padam</rs-button>
                </div>
              </template>
            </rs-table>
          </rs-card>

          <!-- Floating Equipment Modal -->
          <rs-modal v-model="isFloatingEquipmentModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingFloatingEquipment ? 'Maklumat Peralatan' : isEditingFloatingEquipment ? 'Kemaskini Peralatan' : 'Tambah Peralatan' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingFloatingEquipment" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-medium text-gray-700">nama Peralatan:</h4>
                        <p>{{ floatingEquipmentForm.nama }}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-700">No Siri:</h4>
                        <p>{{ floatingEquipmentForm.serialNo }}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-medium text-gray-700">Lokasi:</h4>
                        <p>{{ floatingEquipmentForm.lokasi }}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-700">Status:</h4>
                        <rs-badge :variant="floatingEquipmentForm.status === 'Baik' ? 'success' : 'danger'">
                        {{ floatingEquipmentForm.status }}
                        </rs-badge>
                    </div>
                </div>
                <div>
                    <h4 class="font-medium text-gray-700">Tarikh Pemeriksaan Terakhir:</h4>
                    <p>{{ floatingEquipmentForm.tarikhTerakhirPemeriksaan }}</p>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="floatingEquipmentForm" @submit="handleFloatingEquipmentSubmit">
                <FormKit
                  type="text"
                  nama="nama"
                  label="nama Peralatan"
                  placeholder="Contoh: Rakit Penyelamat"
                  validation="required"
                />
                <div class="grid grid-cols-2 gap-4">
                    <FormKit
                    type="text"
                    nama="serialNo"
                    label="No. Siri"
                    placeholder="Contoh: ILR-2023-001"
                    validation="required"
                    :disabled="isEditingFloatingEquipment"
                    />
                    <FormKit
                    type="text"
                    nama="lokasi"
                    label="Lokasi"
                    placeholder="Contoh: Port Side"
                    validation="required"
                    />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <FormKit
                    type="select"
                    nama="status"
                    label="Status"
                    :options="['Baik', 'Rosak', 'Penyelenggaraan']"
                    validation="required"
                    />
                    <FormKit
                    type="date"
                    nama="tarikhTerakhirPemeriksaan"
                    label="Tarikh Pemeriksaan Terakhir"
                    validation="required"
                    />
                </div>
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button variant="secondary" @click="closeFloatingEquipmentModal">
                  {{ isViewingFloatingEquipment ? 'Tutup' : 'Batal' }}
                </rs-button>
                <rs-button 
                  v-if="isViewingFloatingEquipment" 
                  variant="warning" 
                  @click="editFloatingEquipmentItem(floatingEquipmentForm)"
                >
                  Kemaskini
                </rs-button>
                <rs-button 
                  v-if="!isViewingFloatingEquipment" 
                  variant="primary" 
                  @click="submitFloatingEquipmentForm"
                >
                  {{ isEditingFloatingEquipment ? 'Simpan' : 'Tambah' }}
                </rs-button>
              </div>
            </template>
          </rs-modal>
        </div>

        <div v-else-if="activeTab === 'hse'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Statistik Kemalangan Aset (HSE)</h2>
                <!-- <rs-button variant="primary" @click="openAddHseModal">Tambah Insiden</rs-button> -->
              </div>
            </template>
            
            <!-- HSE Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <rs-card class="bg-blue-50">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-blue-600">{{ hseData.length }}</h3>
                  <p class="text-sm text-gray-600">Jumlah Insiden</p>
                </div>
              </rs-card>
              <rs-card class="bg-green-50">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-green-600">RM {{ hseData.reduce((sum, item) => sum + item.kosPembaikan, 0).toLocaleString() }}</h3>
                  <p class="text-sm text-gray-600">Jumlah Kos Pembaikan</p>
                </div>
              </rs-card>
              <rs-card class="bg-yellow-50">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-yellow-600">{{ hseData.filter(item => item.status === 'Dalam Proses').length }}</h3>
                  <p class="text-sm text-gray-600">Insiden Dalam Proses</p>
                </div>
              </rs-card>
              <rs-card class="bg-purple-50">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-purple-600">{{ hseData.filter(item => item.status === 'Selesai').length }}</h3>
                  <p class="text-sm text-gray-600">Insiden Selesai</p>
                </div>
              </rs-card>
            </div>
            
            <rs-table
              :data="hseData"
              :columns="[
                { key: 'tarikhKejadian', label: 'Tarikh Insiden' },
                { key: 'jenisKejadian', label: 'Jenis Insiden' },
                { key: 'namaAset', label: 'nama Aset' },
                { key: 'statusKerosakan', label: 'Tahap Kerosakan' },
                { key: 'kosPembaikan', label: 'Kos Pembaikan (RM)' },
                { key: 'status', label: 'Status' },
                { key: 'tindakan', label: 'Tindakan' }
              ]"
              :options="{
                variant: 'default',
                striped: true,
                borderless: true,
              }"
              advanced
            >
              <template v-slot:kosPembaikan="row">
                <span class="font-medium">RM {{ row.value.kosPembaikan.toLocaleString() }}</span>
              </template>
              
              <template v-slot:status="row">
                <rs-badge
                  :variant="row.value.status === 'Selesai' ? 'success' : 'warning'"
                >
                  {{ row.value.status }}
                </rs-badge>
              </template>
              
              <template v-slot:tindakan="row">
                <div class="flex gap-2">
                  <rs-button variant="primary" size="sm" @click="viewHseItem(row.value)">Lihat</rs-button>
                  <rs-button variant="warning" size="sm" @click="editHseItem(row.value)">Kemaskini</rs-button>
                  <rs-button variant="danger" size="sm" @click="deleteHseItem(row.value.id)">Padam</rs-button>
                </div>
              </template>
            </rs-table>
          </rs-card>

          <!-- HSE Modal -->
          <rs-modal v-model="isHseModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingHse ? 'Maklumat Insiden' : isEditingHse ? 'Kemaskini Insiden' : 'Tambah Insiden' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingHse" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-medium text-gray-700">Tarikh Insiden:</h4>
                    <p>{{ hseForm.tarikhKejadian }}</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-700">Jenis Insiden:</h4>
                    <p>{{ hseForm.jenisKejadian }}</p>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-gray-700">nama Aset:</h4>
                  <p>{{ hseForm.namaAset }}</p>
                </div>
                <div>
                  <h4 class="font-medium text-gray-700">Penerangan Insiden:</h4>
                  <p>{{ hseForm.penerangan }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-medium text-gray-700">Tahap Kerosakan:</h4>
                    <p>{{ hseForm.statusKerosakan }}</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-700">Kos Pembaikan:</h4>
                    <p>RM {{ hseForm.kosPembaikan.toLocaleString() }}</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-medium text-gray-700">Tempoh Pembaikan:</h4>
                    <p>{{ hseForm.tempohPembaikan }}</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-700">Pihak Bertanggungjawab:</h4>
                    <p>{{ hseForm.jabatan }}</p>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-gray-700">Tindakan Pencegahan:</h4>
                  <p>{{ hseForm.langkahPembaikan  }}</p>
                </div>
                <div>
                  <h4 class="font-medium text-gray-700">Status:</h4>
                  <rs-badge :variant="hseForm.status === 'Selesai' ? 'success' : 'warning'">
                    {{ hseForm.status }}
                  </rs-badge>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="hseForm" @submit="handleHseSubmit">
                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="date"
                    nama="tarikhKejadian"
                    label="Tarikh Insiden"
                    validation="required"
                  />
                  <FormKit
                    type="select"
                    nama="jenisKejadian"
                    label="Jenis Insiden"
                    :options="['Kerosakan Aset', 'Kemalangan Krew', 'Insiden Keselamatan', 'Pencemaran Alam Sekitar', 'Lain-lain']"
                    validation="required"
                  />
                </div>
                
                <FormKit
                  type="text"
                  nama="namaAset"
                  label="nama Aset"
                  placeholder="Contoh: Sistem Radar Utama"
                  validation="required"
                />
                
                <FormKit
                  type="textarea"
                  nama="penerangan"
                  label="Penerangan Insiden"
                  placeholder="Terangkan secara terperinci tentang insiden yang berlaku"
                  validation="required"
                />
                
                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="select"
                    nama="statusKerosakan"
                    label="Tahap Kerosakan"
                    :options="['Ringan', 'Sederhana', 'Teruk', 'Kritikal']"
                    validation="required"
                  />
                  <FormKit
                    type="number"
                    nama="kosPembaikan"
                    label="Kos Pembaikan (RM)"
                    validation="required|min:0"
                    step="0.01"
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="text"
                    nama="tempohPembaikan"
                    label="Tempoh Pembaikan"
                    placeholder="Contoh: 5 hari"
                    validation="required"
                  />
                  <FormKit
                    type="text"
                    nama="jabatan"
                    label="Pihak Bertanggungjawab"
                    placeholder="Contoh: Krew Navigasi"
                    validation="required"
                  />
                </div>
                
                <FormKit
                  type="textarea"
                  nama="langkahPembaikan "
                  label="Tindakan Pencegahan"
                  placeholder="Terangkan tindakan pencegahan yang akan diamid"
                  validation="required"
                />
                
                <FormKit
                  type="select"
                  nama="status"
                  label="Status"
                  :options="['Dalam Proses', 'Selesai']"
                  validation="required"
                />
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button variant="secondary" @click="closeHseModal">
                  {{ isViewingHse ? 'Tutup' : 'Batal' }}
                </rs-button>
                <rs-button 
                  v-if="isViewingHse" 
                  variant="warning" 
                  @click="editHseItem(hseForm)"
                >
                  Kemaskini
                </rs-button>
                <rs-button 
                  v-if="!isViewingHse" 
                  variant="primary" 
                  @click="submitHseForm"
                >
                  {{ isEditingHse ? 'Simpan' : 'Tambah' }}
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
                <!-- <rs-button variant="primary" @click="openAddRupacaraModal">Tambah Rupacara</rs-button> -->
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
                  nama="tarikhKemaskini"
                  label="Tarikh Kemaskini"
                  :value="new Date().toISOString().split('T')[0]"
                  validation="required"
                />

                <!-- Penerangan -->
                <FormKit
                  type="textarea"
                  nama="penerangan"
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
                    nama="portView"
                    label="Port View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Starboard View -->
                  <FormKit
                    type="file"
                    nama="starboardView"
                    label="Starboard View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Forward View -->
                  <FormKit
                    type="file"
                    nama="forwardView"
                    label="Forward View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- After View -->
                  <FormKit
                    type="file"
                    nama="afterView"
                    label="After View (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Engine Room -->
                  <FormKit
                    type="file"
                    nama="engineRoom"
                    label="Engine Room (Gambar)"
                    accept="image/*"
                    validation="required"
                  />

                  <!-- Closed Bridge -->
                  <FormKit
                    type="file"
                    nama="closedBridge"
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
        
        <div v-else-if="activeTab === 'shipyard_reports'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Laporan di Limbungan</h2>
                <!-- <rs-button variant="primary" @click="openAddShipyardReportModal">Tambah Laporan</rs-button> -->
              </div>
            </template>
            
            <!-- Shipyard Reports Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <rs-card class="bg-blue-50">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-blue-600">{{ shipyardReportsStatistics.totalReports }}</h3>
                  <p class="text-sm text-gray-600">Jumlah Laporan</p>
                </div>
              </rs-card>
              <rs-card class="bg-green-50">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-green-600">RM {{ shipyardReportsStatistics.kos.toLocaleString() }}</h3>
                  <p class="text-sm text-gray-600">Jumlah Kos</p>
                </div>
              </rs-card>
              <rs-card class="bg-yellow-50">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-yellow-600">{{ shipyardReportsStatistics.averageQualityRating.toFixed(1) }}</h3>
                  <p class="text-sm text-gray-600">Purata Penilaian</p>
                </div>
              </rs-card>
            </div>
            
            <rs-table
              :data="sortedShipyardReportsData"
              :columns="[
                { key: 'minggu', label: 'Minggu' },
                { key: 'tarikhLapor', label: 'Tarikh Laporan' },
                { key: 'noSebutHarga', label: 'No. Sebut Harga' },
                { key: 'namaLimbungan', label: 'nama Limbungan' },
                { key: 'kos', label: 'Jumlah Kos (RM)' },
                { key: 'skor', label: 'Penilaian Kualiti' },
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
                defaultSort: { column: 'tarikhLapor', direction: 'desc' }
              }"
              advanced
            >
              <template v-slot:kos="row">
                <span class="font-medium">RM {{ row.value.kos.toLocaleString() }}</span>
              </template>
              
              <template v-slot:skor="row">
                <div class="flex items-center">
                  <div class="flex text-yellow-400">
                    <i v-for="star in 5" :key="star" 
                       :class="star <= row.value.skor ? 'fas fa-star' : 'far fa-star'"
                       class="text-sm"></i>
                  </div>
                  <span class="ml-2 text-sm text-gray-600">({{ row.value.skor.toFixed(1) }})</span>
                </div>
              </template>
              
              <template v-slot:tindakan="row">
                <div class="flex gap-2">
                  <rs-button variant="primary" size="sm" @click="openViewShipyardReportModal(row.value)">Lihat</rs-button>
                  <rs-button variant="warning" size="sm" @click="openEditShipyardReportModal(row.value)">Kemaskini</rs-button>
                  <rs-button variant="danger" size="sm" @click="deleteShipyardReportItem(row.value.id)">Padam</rs-button>
                </div>
              </template>
            </rs-table>
          </rs-card>

          <!-- Shipyard Report Modal -->
          <rs-modal v-model="isShipyardReportModalOpen" size="xl">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingShipyardReport ? 'Maklumat Laporan Limbungan' : isEditingShipyardReport ? 'Kemaskini Laporan Limbungan' : 'Tambah Laporan Limbungan' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingShipyardReport" class="space-y-6">
                <!-- Report Header -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <h4 class="font-medium text-gray-700">Minggu:</h4>
                      <p class="text-lg font-semibold">{{ shipyardReportForm.minggu }}</p>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">Tarikh Laporan:</h4>
                      <p>{{ shipyardReportForm.tarikhLapor }}</p>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">No. Sebut Harga:</h4>
                      <p class="font-mono">{{ shipyardReportForm.noSebutHarga }}</p>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">nama Limbungan:</h4>
                      <p>{{ shipyardReportForm.namaLimbungan }}</p>
                    </div>
                  </div>
                </div>

                <!-- Quality Rating -->
                <div class="bg-yellow-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-700 mb-2">Penilaian Kualiti Keseluruhan:</h4>
                  <div class="flex items-center">
                    <div class="flex text-yellow-400">
                      <i v-for="star in 5" :key="star" 
                         :class="star <= shipyardReportForm.skor ? 'fas fa-star' : 'far fa-star'"
                         class="text-xl"></i>
                    </div>
                    <span class="ml-3 text-lg font-semibold">({{ shipyardReportForm.skor.toFixed(1) }}/5.0)</span>
                  </div>
                </div>

               

                <!-- Summary -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <h4 class="font-medium text-gray-700">Jumlah Kos:</h4>
                      <p class="text-xl font-bold text-green-600">RM {{ shipyardReportForm.kos.toLocaleString() }}</p>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">Penyelia:</h4>
                      <p>{{ shipyardReportForm.namaPenyelia }}</p>
                      <p class="text-sm text-gray-600">{{ shipyardReportForm.noTelefonPenyelia }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <div v-else type="form" :value="shipyardReportForm" @submit="handleShipyardReportSubmit">
                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="text"
                    nama="minggu"
                    label="Minggu"
                    placeholder="Contoh: Minggu 1"
                    validation="required"
                  />
                  <FormKit
                    type="date"
                    nama="tarikhLapor"
                    label="Tarikh Laporan"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="text"
                    nama="noSebutHarga"
                    label="No. Sebut Harga"
                    validation="required"
                  />
                  <FormKit
                    type="text"
                    nama="namaLimbungan"
                    label="nama Limbungan"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="number"
                    nama="kos"
                    label="Jumlah Kos (RM)"
                    validation="required|min:0"
                    step="0.01"
                  />
                  <FormKit
                    type="range"
                    nama="skor"
                    label="Penilaian Kualiti Keseluruhan"
                    validation="required|number|min:0|max:5"
                    min="0"
                    max="5"
                    step="0.5"
                    help="Sila pilih penilaian kualiti dari 0 hingga 5"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="text"
                    nama="namaPenyelia"
                    label="nama Penyelia"
                    placeholder="Contoh: En. Ahmad bin Ismail"
                    validation="required"
                  />
                  <FormKit
                    type="tel"
                    nama="noTelefonPenyelia"
                    label="No. Telefon Penyelia"
                    placeholder="Contoh: 012-3456789"
                    validation="required"
                  />
                </div>

                
              </div>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <rs-button variant="secondary" @click="closeShipyardReportModal">
                  {{ isViewingShipyardReport ? 'Tutup' : 'Batal' }}
                </rs-button>
                <rs-button 
                  v-if="!isViewingShipyardReport" 
                  variant="primary" 
                  @click="submitShipyardReportForm"
                >
                  {{ isEditingShipyardReport ? 'Simpan' : 'Tambah' }}
                </rs-button>
              </div>
            </template>
          </rs-modal>
        </div>
        
        <div v-else-if="activeTab === 'cannaidize'">
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Cannibalize Asset</h2>
                <!-- <rs-button variant="primary" @click="openAddCannaidizeAssetModal">Tambah Asset</rs-button> -->
              </div>
            </template>
            
            <rs-table
              :data="cannaidizeAssetData"
              :columns="[
                { key: 'nama', label: 'nama Asset' },
                { key: 'serialNo', label: 'No. Siri' },
                { key: 'lokasi', label: 'Lokasi' },
                { key: 'status', label: 'Status' },
                { key: 'condition', label: 'Keadaan' },
                { key: 'sourceVessel', label: 'Kapal Sumber' },
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
                defaultSort: { column: 'nama', direction: 'asc' }
              }"
              advanced
            >
              <template v-slot:status="row">
                <rs-badge
                  :variant="row.value.status === 'Tersedia' ? 'success' : 'warning'"
                >
                  {{ row.value.status }}
                </rs-badge>
              </template>
              
              <template v-slot:condition="row">
                <rs-badge
                  :variant="row.value.condition === 'Baik' ? 'success' : row.value.condition === 'Sederhana' ? 'warning' : 'danger'"
                >
                  {{ row.value.condition }}
                </rs-badge>
              </template>
              
              <template v-slot:tindakan="row">
                <div class="flex gap-2">
                  <rs-button variant="primary" size="sm" @click="viewCannaidizeAssetItem(row.value)">Lihat</rs-button>
                  <rs-button variant="warning" size="sm" @click="editCannaidizeAssetItem(row.value)">Kemaskini</rs-button>
                  <rs-button variant="danger" size="sm" @click="deleteCannaidizeAssetItem(row.value.id)">Padam</rs-button>
                </div>
              </template>
            </rs-table>
          </rs-card>

          <!-- Cannaidize Asset Modal -->
          <rs-modal v-model="isCannaidizeAssetModalOpen" size="lg">
            <template #header>
              <h3 class="text-lg font-semibold">
                {{ isViewingCannaidizeAsset ? 'Maklumat Asset' : isEditingCannaidizeAsset ? 'Kemaskini Asset' : 'Tambah Asset' }}
              </h3>
            </template>

            <template #body>
              <!-- View Mode -->
              <div v-if="isViewingCannaidizeAsset" class="space-y-6">
                <!-- Asset Details -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <h4 class="font-medium text-gray-700">nama Asset:</h4>
                      <p class="text-lg font-semibold">{{ cannaidizeAssetForm.nama }}</p>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">No. Siri:</h4>
                      <p class="font-mono">{{ cannaidizeAssetForm.serialNo }}</p>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">Lokasi:</h4>
                      <p>{{ cannaidizeAssetForm.lokasi }}</p>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">Status:</h4>
                      <rs-badge
                        :variant="cannaidizeAssetForm.status === 'Tersedia' ? 'success' : 'warning'"
                      >
                        {{ cannaidizeAssetForm.status }}
                      </rs-badge>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">Keadaan:</h4>
                      <rs-badge
                        :variant="cannaidizeAssetForm.condition === 'Baik' ? 'success' : cannaidizeAssetForm.condition === 'Sederhana' ? 'warning' : 'danger'"
                      >
                        {{ cannaidizeAssetForm.condition }}
                      </rs-badge>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">Kapal Sumber:</h4>
                      <p>{{ cannaidizeAssetForm.sourceVessel }}</p>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">Tarikh Pemeriksaan Terakhir:</h4>
                      <p>{{ cannaidizeAssetForm.tarikhTerakhirPemeriksaan }}</p>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-700">Tarikh Cannaidize:</h4>
                      <p>{{ cannaidizeAssetForm.cannaidizeDate }}</p>
                    </div>
                  </div>
                </div>

                <!-- Remarks -->
                <div class="bg-white p-4 rounded-lg border">
                  <h4 class="font-medium text-gray-700 mb-2">Catatan:</h4>
                  <p>{{ cannaidizeAssetForm.remarks }}</p>
                </div>
              </div>
              
              <!-- Edit/Add Mode -->
              <FormKit v-else type="form" :value="cannaidizeAssetForm" @submit="handleCannaidizeAssetSubmit">
                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="text"
                    nama="nama"
                    label="nama Asset"
                    placeholder="Contoh: Enjin Utama MTU 12V 2000 M90"
                    validation="required"
                  />
                  <FormKit
                    type="text"
                    nama="serialNo"
                    label="No. Siri"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="text"
                    nama="lokasi"
                    label="Lokasi"
                    placeholder="Contoh: Engine Room"
                    validation="required"
                  />
                  <FormKit
                    type="select"
                    nama="status"
                    label="Status"
                    :options="['Tersedia', 'Dalam Penggunaan']"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="select"
                    nama="condition"
                    label="Keadaan"
                    :options="['Baik', 'Sederhana', 'Rosak']"
                    validation="required"
                  />
                  <FormKit
                    type="text"
                    nama="sourceVessel"
                    label="Kapal Sumber"
                    placeholder="Contoh: KM SATRIA"
                    validation="required"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <FormKit
                    type="date"
                    nama="tarikhTerakhirPemeriksaan"
                    label="Tarikh Pemeriksaan Terakhir"
                    validation="required"
                  />
                  <FormKit
                    type="date"
                    nama="cannaidizeDate"
                    label="Tarikh Cannaidize"
                    validation="required"
                  />
                </div>

                <FormKit
                  type="textarea"
                  nama="remarks"
                  label="Catatan"
                  placeholder="Catatan mengenai asset ini..."
                  :rows="3"
                />
              </FormKit>
            </template>

            <template #footer>
              <div class="flex justify-end space-x-2">
                <rs-button variant="secondary" @click="closeCannaidizeAssetModal">Batal</rs-button>
                <rs-button v-if="!isViewingCannaidizeAsset" variant="primary" @click="submitCannaidizeAssetForm">
                  {{ isEditingCannaidizeAsset ? 'Kemaskini' : 'Tambah' }}
                </rs-button>
              </div>
            </template>
          </rs-modal>
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
                  nama="reportType"
                  value="DEFECT"
                  label="KEROSAKAN"
                />
                <FormKit
                  type="radio"
                  nama="reportType"
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
                  nama="JENIS ASET"
                  label="Jenis Aset"
                  placeholder="Contoh: Sistem Radar"
                  validation="required"
                />
                
                <FormKit
                  type="text"
                  nama="mainSystem"
                  label="Sistem Utama / Peralatan"
                  placeholder="Contoh: RADAR SISTEM"
                  validation="required"
                />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <FormKit
                  type="date"
                  nama="TARIKH ROSAK"
                  label="Tarikh Rosak"
                  validation="required"
                />
                
                <FormKit
                  type="text"
                  nama="PEMOHON"
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
                  nama="lokasi"
                  label="Lokasi"
                  placeholder="Contoh: PANGKALAN TLDM LUMUT"
                  validation="required"
                />
                
                <FormKit
                  type="number"
                  nama="runningHours"
                  label="Jam Operasi"
                  placeholder="Contoh: 1250"
                />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <FormKit
                  type="text"
                  nama="pengeluaran"
                  label="Pengeluar / Model"
                  placeholder="Contoh: Thales"
                />
                
                <FormKit
                  type="text"
                  nama="serialNo"
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
                nama="AMOUN"
                label="Anggaran Kos"
                placeholder="Contoh: RM 15,000"
                validation="required"
              />
              
              <FormKit
                type="textarea"
                nama="remarks"
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
                nama="attachment"
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
            <p class="text-sm">JC-2024-{{ selectedJobCard.id.toString().padStart(3, '0') }}</p>
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
                <td class="p-2">: {{ selectedJobCard.lokasi || 'PANGKALAN TLDM LUMUT' }}</td>
                <td class="p-2 border-l border-gray-800 font-medium">Pengeluar / Model</td>
                <td class="p-2">{{ selectedJobCard.pengeluaran || 'N/A' }}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-2 border-r border-gray-800 font-medium">Lokasi</td>
                <td class="p-2">: {{ selectedJobCard.lokasi || 'PANGKALAN TLDM LUMUT' }}</td>
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
                <td class="p-2 border-r border-gray-800">nama: {{ selectedJobCard['PEMOHON'] }}</td>
                <td class="p-2">nama: _________________</td>
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
