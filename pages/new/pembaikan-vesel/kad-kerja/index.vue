<script setup>
  definePageMeta({
    title: "Kapal Profile",
    layout: "default",
    middleware: ["auth"],
  });




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
        { id: 2, position: "Pegawai Eksekutif", vessel: "KM Tambisan", startDate: "2019-05-15", endDate: "2021-03-01" }
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

  // Ship/Bot data
  const shipData = ref([
    { id: 1, name: 'KM Tambisan', type: 'Kapal', pennantNumber: 'F171' },
    { id: 2, name: 'KD PAHANG', type: 'Kapal', pennantNumber: 'F172' },
    { id: 3, name: 'KD KELANTAN', type: 'Kapal', pennantNumber: 'F173' },
    { id: 4, name: 'KD SELANGOR', type: 'Kapal', pennantNumber: 'F174' },
    { id: 5, name: 'BOT TUNDA 1', type: 'Bot', pennantNumber: 'BT001' },
    { id: 6, name: 'BOT TUNDA 2', type: 'Bot', pennantNumber: 'BT002' },
    { id: 7, name: 'BOT MALIM 1', type: 'Bot', pennantNumber: 'BM001' },
    { id: 8, name: 'BOT MALIM 2', type: 'Bot', pennantNumber: 'BM002' }
  ]);

  // Computed property for ship options
  const shipOptions = computed(() => {
    return shipData.value.map(ship => ({
      label: `${ship.name} (${ship.pennantNumber})`,
      value: ship.id
    }));
  });

  // Job Card data
  const jobCardData = ref([
    {
      bil: 1,
      noKadKerja: 'APMM/TBN/06/001',
      'namaKapal/Bot': 'KM Tambisan',
      'maritimNegeri/ZonMaritim': 'Maritim Negeri Johor',
      'sistemUtama/Peralatan': 'Sistem Radar',  
      'status': 'Dalam Proses',
      'tindakan': '1'
    },
    {
      bil: 2,
      noKadKerja: 'APMM/TBN/06/002',
      'namaKapal/Bot': 'KM Tambisan',
      'maritimNegeri/ZonMaritim': 'Maritim Negeri Johor',
      'sistemUtama/Peralatan': 'Enjin Utama',
      'status': 'Selesai',
      'tindakan': '2'
    },
    {
      bil: 3,
      noKadKerja: 'APMM/TBN/06/003',
      'namaKapal/Bot': 'KM Tambisan',
      'maritimNegeri/ZonMaritim': 'Maritim Negeri Johor',
      'sistemUtama/Peralatan': 'Sistem Komunikasi',
      'status': 'Dalam Proses',
      'tindakan': '3'
    },
    {
      bil: 4,
      noKadKerja: 'APMM/TBN/06/004',
      'namaKapal/Bot': 'KM Tambisan',
      'maritimNegeri/ZonMaritim': 'Maritim Negeri Johor',
      'sistemUtama/Peralatan': 'Sistem Sonar',
      'status': 'Menunggu Kelulusan',
      'tindakan': '4'
    },
    {
      bil: 5,
      noKadKerja: 'APMM/TBN/06/005',
      'namaKapal/Bot': 'KM Tambisan',
      'maritimNegeri/ZonMaritim': 'Maritim Negeri Johor',
      'sistemUtama/Peralatan': 'Sistem Pendorongan',
      'status': 'Dalam Proses',
      'tindakan': '5'
    }
  ]);

  // Computed property for asset options
  const assetOptions = computed(() => {
    return shipEquipmentData.value.map(equipment => ({
      label: `${equipment.name} (${equipment.equipmentNo})`,
      value: equipment.equipmentNo
    }));
  });

  // Add Job Card Modal state
  const isAddJobCardModalOpen = ref(false);
  const newJobCardForm = ref({
    'sistemUtama/Peralatan': '',
    'namaKapal/Bot': '',
    'Pengguna Terakhir': 'KM Tambisan',
    'reportType': 'DEFECT',
    'location': 'PANGKALAN TLDM LUMUT',
    'mainSystem': '',
    'runningHours': '',
    'manufacturer': '',
    'serialNo': '',
    'remarks': '',
    'selectedShipId': null
  });

  // Open add job card modal
  const openAddJobCardModal = () => {
    newJobCardForm.value = {
      'sistemUtama/Peralatan': '',
      'namaKapal/Bot': '',
      'Pengguna Terakhir': 'KM Tambisan',
      'reportType': 'DEFECT',
      'location': 'PANGKALAN TLDM LUMUT',
      'mainSystem': '',
      'runningHours': '',
      'manufacturer': '',
      'serialNo': '',
      'remarks': '',
      'selectedShipId': null
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
      bil: jobCardData.value.length + 1,
      noKadKerja: `APMM/TBN/06/${String(jobCardData.value.length + 1).padStart(2, '0')}`,
      'namaKapal/Bot': 'KM Tambisan', // Always set to KM Tambisan
      'maritimNegeri/ZonMaritim': 'Maritim Negeri Johor', // Default value, can be updated in form
      'status': 'Dalam Proses', // Default status for new job cards
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
    <div class="space-y-6">
               
        <!-- Job Card List Section -->
        <rs-card>
            <template #header>
            <div class="flex justify-between items-center p-2">
                <h2 class="text-lg font-semibold">Senarai Kad Kerja</h2>
                <rs-button variant="primary" @click="openAddJobCardModal">
                  <Icon name="material-symbols:add" />
                  Tambah Kad Kerja
                </rs-button>
            </div>
            </template>
            
            <div class="p-4">
            <!-- Job Card Table -->
            <rs-table
                :data="jobCardData"
                :columns="[
                  { key: 'bil', label: 'BIL' },
                  { key: 'noKadKerja', label: 'No. Kad Kerja' },
                  { key: 'namaKapal/Bot', label: 'namaKapal/Bot' },
                  { key: 'maritimNegeri/ZonMaritim', label: 'Maritim Negeri/Zon Maritim' },
                  { key: 'sistemUtama/Peralatan', label: 'sistemUtama/Peralatan' },
                  { key: 'status', label: 'Status' },
                  { key: 'tindakan', label: 'tindakan' }
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
                defaultSort: { column: 'bil', direction: 'asc' }
                }"
                advanced
            >
                <template v-slot:tindakan="row">
                <div class="flex gap-2">
                    <button variant="primary" size="sm" @click="openViewJobCardModal(row.value)" class="text-blue-600 hover:text-blue-800">
                      <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
                      <!-- Lihat -->
                    </button>
                    <!-- <rs-button variant="warning" size="sm">Edit</rs-button>
                    <rs-button variant="danger" size="sm">Padam</rs-button> -->
                </div>
                </template>
            </rs-table>      
            </div>
        </rs-card>
    </div>
    

    <!-- Add Job Card Modal -->
    <rs-modal v-model="isAddJobCardModalOpen" size="lg">
      <template #header>
        <h3 class="text-lg font-semibold">BORANG LAPORAN KEROSAKAN - APMM/TBN/06/006</h3>
      </template>
      
      <template #body>
        <div class="p-2">
          <FormKit type="form" :value="newJobCardForm" @submit="submitNewJobCard">
            <!-- Report Type Section -->
            <div class="">
              <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Laporan</label>
              <div class="flex items-center space-x-4">
                <FormKit type="radio" name="reportType" value="DEFECT" label="KEROSAKAN" />
                <FormKit type="radio" name="reportType" value="OSL" label="OSL" />
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 ">
              <FormKit 
                type="text" name="namaAset" label="Nama Kapal/Bot" 
                value="KM Tambisan" placeholder="KM Tambisan" readonly />

              <FormKit type="text" name="runningHours" label="Jam Operasi"
                value="12 jam" placeholder="1250" />
              
              <FormKit type="text" name="maritimNegeri/ZonMaritim" label="Maritim Negeri/Zon Maritim"
                value="Maritim Negeri Johor" placeholder="Maritim Negeri Johor" readonly   />
              
              <FormKit type="text" name="manufactureModel" label="Pengeluar / Model"
                value="" placeholder="Thales" />

              <FormKit type="text" name="location" label="Lokasi"
                value="Jeti APMM Sg. Pulai" placeholder="Jeti APMM Sg. Pulai"   />

              <FormKit type="text" name="serialNo" label="No. Siri"
                value="TH-R5670-892" placeholder="TH-R5670-892" />
            </div>
            
            <FormKit
                type="select"
                name="selectedAsset"
                label="Sistem Utama / Peralatan"
                :options="assetOptions"
                placeholder="Pilih Sistem Utama / Peralatan"
                validation="required"
                @input="(equipmentNo) => {
                  const selectedEquipment = shipEquipmentData.value.find(e => e.equipmentNo === equipmentNo);
                  if (selectedEquipment) {
                    newJobCardForm['sistemUtama/Peralatan'] = selectedEquipment.name;
                    newJobCardForm.mainSystem = selectedEquipment.category;
                    newJobCardForm.manufacturer = selectedEquipment.manufacturer;
                    newJobCardForm.serialNo = selectedEquipment.serialNumber;
                  }
                }"
              />

              <FormKit type="textarea" name="remarks" label="Penerangan"
               placeholder="Sila Jelaskan kerosakan yang berlaku" />
           
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
        <h3 class="text-lg font-semibold">BORANG LAPORAN KEROSAKAN - {{ selectedJobCard?.noKadKerja }}</h3>
      </template>
      
      <template #body>
        <div v-if="selectedJobCard" class="p-2">
          <FormKit type="form" :value="selectedJobCard" :disabled="true" :hidden-input="true">
            <!-- Report Type Section -->
            <div class="">
              <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Laporan</label>
              <div class="flex items-center space-x-4">
                <FormKit type="radio" name="reportType" value="DEFECT" label="KEROSAKAN" :disabled="true" :checked="true" />
                <FormKit type="radio" name="reportType" value="OSL" label="OSL" :disabled="true" :checked="false" />
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 ">
              <FormKit 
                type="text" name="namaAset" label="Nama Kapal/Bot" 
                :value="selectedJobCard['namaKapal/Bot']" placeholder="KM Tambisan" readonly />

              <FormKit type="text" name="runningHours" label="Jam Operasi"
                :value="selectedJobCard.runningHours || '12 jam'" placeholder="1250" readonly />
              
              <FormKit type="text" name="maritimNegeri/ZonMaritim" label="Maritim Negeri/Zon Maritim"
                :value="selectedJobCard['maritimNegeri/ZonMaritim']" placeholder="Maritim Negeri Johor" readonly />
              
              <FormKit type="text" name="manufactureModel" label="Pengeluar / Model"
                :value="selectedJobCard.manufacturer || 'Thales'" placeholder="Thales" readonly />

              <FormKit type="text" name="location" label="Lokasi"
                :value="selectedJobCard.location || 'Jeti APMM Sg. Pulai'" placeholder="Jeti APMM Sg. Pulai" readonly />

              <FormKit type="text" name="serialNo" label="No. Siri"
                :value="selectedJobCard.serialNo || 'TH-R5670-892'" placeholder="TH-R5670-892" readonly />
            </div>
            
            <FormKit
                type="text"
                name="sistemUtama/Peralatan"
                label="Sistem Utama / Peralatan"
                :value="selectedJobCard['sistemUtama/Peralatan']"
                placeholder="Pilih Sistem Utama / Peralatan"
                readonly
              />

            <FormKit type="textarea" name="remarks" label="Penerangan"
              :value="selectedJobCard.remarks || 'Kabel sambungan rosak atau terputus: Terutama pada sambungan berputar (slip ring), boleh menjejaskan data dan kuasa ke antena.'" placeholder="Sila Jelaskan kerosakan yang berlaku" readonly />
          
          </FormKit>
        </div>
      </template>
      
      <template #footer>
        
      </template>
    </rs-modal>
  </div>
</template>
