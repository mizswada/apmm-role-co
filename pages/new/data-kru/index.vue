<script setup>
  definePageMeta({
    title: "Kapal Profile",
    layout: "default",
    middleware: ["auth"],
  });


  const fieldKrew = ref(['BIL', 'noTentera', 'nama', 'jawatan','kapal/bot','tindakan']);
  // Crew data
  const crewData = ref([
    {
      id: 1,
      noTentera: "T12345",
      name: "Kapt. Ahmad bin Ismail",
      position: "Kapten Kapal",
      ship: "KM TAMBISAN",
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
      ship: "KM TAMBISAN",
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
        { id: 2, position: "Pegawai Eksekutif", vessel: "KM TAMBISAN", startDate: "2019-05-15", endDate: "2021-03-01" }
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
      ship: "KM TAMBISAN",
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
      ship: "KM TAMBISAN",
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
      ship: "KM TAMBISAN",
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
      ship: "KM TAMBISAN",
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

  // Ship list for dropdown
  const shipsList = [
    "KM TAMBISAN",
    "KD PAHANG",
    "KD KELANTAN",
    "KD SELANGOR",
    "KD TERENGGANU",
    "KD PERAK"
  ];

  // Users list for dropdown
  const usersList = [
    {
      id: 1,
      name: "Kapt. Ahmad bin Ismail",
      noTentera: "T12345",
      position: "Kapten Kapal"
    },
    {
      id: 2,
      name: "Lt. Kdr. Siti binti Hassan",
      noTentera: "T23456",
      position: "Pegawai Eksekutif"
    },
    {
      id: 3,
      name: "Lt. Mohd Rizal bin Abdullah",
      noTentera: "T34567",
      position: "Pegawai Navigasi"
    },
    {
      id: 4,
      name: "PW I Ravi a/l Chandran",
      noTentera: "T45678",
      position: "Ketua Jurutera"
    },
    {
      id: 5,
      name: "PW II Tan Mei Ling",
      noTentera: "T56789",
      position: "Ketua Komunikasi"
    },
    {
      id: 6,
      name: "BM Iskandar bin Zulkifli",
      noTentera: "T67890",
      position: "Juruteknik Elektronik"
    }
  ];

  // Computed property for user options
  const userOptions = computed(() => {
    return usersList.map(user => ({
      label: `${user.noTentera} - ${user.name} - ${user.position}`,
      value: user.id
    }));
  });

  // Function to handle user selection
  const handleUserSelection = (userId) => {
    const selectedUser = usersList.find(user => user.id === userId);
    if (selectedUser) {
      crewForm.value.name = selectedUser.name;
      crewForm.value.noTentera = selectedUser.noTentera;
      crewForm.value.position = selectedUser.position;
    }
  };

  // Crew Modal state
  const isCrewModalOpen = ref(false);
  const isViewingCrew = ref(false);
  const isEditingCrew = ref(false);
  const crewForm = ref({
    id: null,
    noTentera: "",
    name: "",
    position: "",
    ship: "",
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
      ship: "",
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
    const selectedUser = usersList.find(user => user.id === crewForm.value.userId);
    if (selectedUser) {
      const newCrewMember = {
        id: Date.now(),
        noTentera: selectedUser.noTentera,
        name: selectedUser.name,
        position: selectedUser.position,
        ship: crewForm.value.ship,
        joinDate: crewForm.value.joinDate,
        endDate: crewForm.value.endDate,
        status: crewForm.value.status,
        contactNo: crewForm.value.contactNo,
        email: crewForm.value.email,
        tindakan: "lihat"
      };

      if (isEditingCrew.value) {
        // Update existing item
        const index = crewData.value.findIndex((i) => i.id === crewForm.value.id);
        if (index !== -1) {
          crewData.value[index] = { ...newCrewMember, id: crewForm.value.id };
        }
      } else {
        // Add new item
        crewData.value.push(newCrewMember);
      }
      closeCrewModal();
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
      'Pengguna Terakhir': 'KM TAMBISAN',
      'TARIKH ROSAK': '2024-03-15',
      'PEMOHON': 'Kapt. Razak',
      'AMOUN': 'RM 15,000',
      'TINDAKAN': '1'
    },
    {
      BIL: 2,
      'JENIS ASET': 'Enjin Utama',
      'Pengguna Terakhir': 'KM TAMBISAN',
      'TARIKH ROSAK': '2024-04-02',
      'PEMOHON': 'Kapt. Razak',
      'AMOUN': 'RM 45,000',
      'TINDAKAN': '2'
    },
    {
      BIL: 3,
      'JENIS ASET': 'Sistem Komunikasi',
      'Pengguna Terakhir': 'KM TAMBISAN',
      'TARIKH ROSAK': '2024-04-10',
      'PEMOHON': 'Lt. Mohd Rizal',
      'AMOUN': 'RM 12,500',
      'TINDAKAN': '3'
    },
    {
      BIL: 4,
      'JENIS ASET': 'Sistem Sonar',
      'Pengguna Terakhir': 'KM TAMBISAN',
      'TARIKH ROSAK': '2024-04-15',
      'PEMOHON': 'Kapt. Razak',
      'AMOUN': 'RM 22,300',
      'TINDAKAN': '4'
    },
    {
      BIL: 5,
      'JENIS ASET': 'Sistem Pendorongan',
      'Pengguna Terakhir': 'KM TAMBISAN',
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
    'Pengguna Terakhir': 'KM TAMBISAN',
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
      'Pengguna Terakhir': 'KM TAMBISAN',
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
    <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">Senarai Krew Kapal</h2>
        <rs-button variant="primary" @click="openAddCrewModal">
            <Icon name="material-symbols:add" />
            Tambah Krew
        </rs-button>
    </div>
    <rs-card>               
        <div class="p-4">
            <!-- Crew Table -->
            <rs-table
            :data="filteredCrewData"
            :columns="[
                { key: 'noTentera', label: 'No. Tentera' },
                { key: 'name', label: 'Nama' },
                { key: 'position', label: 'Jawatan' },
                { key: 'ship', label: 'Kapal' },
                { key: 'status', label: 'Status' },
                { key: 'joinDate', label: 'Tarikh Mula' },
                { key: 'endDate', label: 'Tarikh Tamat' },
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
                    <button @click="viewCrewItem(row.value)"  size="sm" >
                        <Icon class="text-primary" name="ic:baseline-remove-red-eye"></Icon>
                    </button>
                <!-- <rs-button variant="primary" size="sm" >Lihat</rs-button> -->
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
                <h5 class="text-sm font-medium text-gray-500">Kapal</h5>
                <p>{{ crewForm.ship }}</p>
                </div>

                <div class="mb-4">
                <h5 class="text-sm font-medium text-gray-500">No. Tentera</h5>
                <p>{{ crewForm.noTentera }}</p>
                </div>
                
                <div class="mb-4">
                <h5 class="text-sm font-medium text-gray-500">Tarikh Mula</h5>
                <p>{{ crewForm.joinDate }}</p>
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
            <!-- Ship -->
            <FormKit
            type="select"
            name="ship"
            label="Kapal"
            :options="shipsList"
            validation="required"
            placeholder="Pilih Kapal"
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

        <div class="grid grid-cols-1 gap-4">
            <!-- User Selection -->
            <FormKit
            type="select"
            name="userId"
            label="Nama"
            :options="userOptions"
            validation="required"
            placeholder="Pilih Nama"
            @input="handleUserSelection"
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
        <!-- <rs-button 
            v-if="isViewingCrew" 
            variant="warning" 
            @click="editCrewItem(crewForm)"
        >
            Kemaskini
        </rs-button> -->
        </div>
    </template>
    </rs-modal>
    
  </div>
</template>
