<template>
    <div class="p-6 space-y-6 bg-white rounded shadow p-4">
        <rs-card>
            <template #header>
                <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Cannibalize Asset</h2>
                <!-- <rs-button variant="primary" @click="openAddCannaidizeAssetModal">Tambah Asset</rs-button> -->
                </div>
            </template>
            
            <rs-table
                :data="cannaidizeAssetData"
                :options="cannaidizeAssetOptions"
                advanced
            >
                <template v-slot:status="row">
                <rs-badge
                    :variant="row.value.status === 'Tersedia' ? 'success' : 'warning'"
                >
                    {{ row.value.status }}
                </rs-badge>
                </template>
                
                <template v-slot:kaadaan="row">
                <rs-badge
                    :variant="row.value.kaadaan === 'Baik' ? 'success' : row.value.kaadaan === 'Sederhana' ? 'warning' : 'danger'"
                >
                    {{ row.value.kaadaan }}
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
    </div>
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
                :variant="cannaidizeAssetForm.kaadaan === 'Baik' ? 'success' : cannaidizeAssetForm.kaadaan === 'Sederhana' ? 'warning' : 'danger'"
                >
                {{ cannaidizeAssetForm.kaadaan }}
                </rs-badge>
            </div>
            <div>
                <h4 class="font-medium text-gray-700">Kapal Sumber:</h4>
                <p>{{ cannaidizeAssetForm.namaKapal }}</p>
            </div>
            <div>
                <h4 class="font-medium text-gray-700">Penerima:</h4>
                <p>{{ cannaidizeAssetForm.penerima }}</p>
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
        <div class="grid grid-cols-1 gap-4">
            <FormKit
            type="select"
            nama="selectedAssetId"
            label="nama Asset"
            placeholder="Pilih asset yang telah didaftarkan"
            :options="assetOptions"
            validation="required"
            @change="onAssetSelectionChange"
            />
            
        </div>


        <div class="grid grid-cols-1 gap-4">
            
            <FormKit
            type="select"
            nama="kaadaan"
            label="Keadaan"
            :options="['Baik', 'Sederhana', 'Rosak']"
            validation="required"
            />
        </div>       

        <div class="grid grid-cols-1 gap-4">
            <FormKit
              type="textarea"
              nama="remarks"
              label="Catatan"
              placeholder="Catatan mengenai aset ini..."
              :rows="3"
            />
        </div>
        </FormKit>
    </template>

    <template #footer>
        
    </template>
    </rs-modal>
</template>

<script setup>

  const cannaidizeAssetOptions = ['bil', 'namaKapal', 'nama', 'serialNo', 'lokasi', 'status', 'kaadaan', 'tindakan'];

  // Registered assets under KM Tambisan (this would typically come from an API)
  const registeredAssets = ref([
    {
      id: 1,
      nama: 'Enjin Utama MTU 12V 2000 M90',
      PattNum: 'TBS-2024-001',
      lokasi: 'Engine Room',
      serialNo: 'MTU-001-2024'
    },
    {
      id: 2,
      nama: 'Sistem Radar Furuno FAR-2117',
      PattNum: 'TBS-2024-002',
      lokasi: 'Bridge',
      serialNo: 'FUR-002-2024'
    },
    {
      id: 3,
      nama: 'Generator Set Caterpillar 3406',
      PattNum: 'TBS-2024-003',
      lokasi: 'Generator Room',
      serialNo: 'CAT-003-2024'
    },
    {
      id: 4,
      nama: 'Sistem Komunikasi VHF Sailor 6222',
      PattNum: 'TBS-2024-004',
      lokasi: 'Radio Room',
      serialNo: 'SAI-004-2024'
    },
    {
      id: 5,
      nama: 'Panel Elektrik Utama',
      PattNum: 'TBS-2024-005',
      lokasi: 'Electrical Room',
      serialNo: 'PAN-005-2024'
    },
    {
      id: 6,
      nama: 'Sistem Hidraulik Utama',
      PattNum: 'TBS-2024-006',
      lokasi: 'Hydraulic Room',
      serialNo: 'HYD-006-2024'
    },
    {
      id: 7,
      nama: 'Sistem Air Conditioning',
      PattNum: 'TBS-2024-007',
      lokasi: 'AC Room',
      serialNo: 'AC-007-2024'
    },
    {
      id: 8,
      nama: 'Sistem Navigasi GPS',
      PattNum: 'TBS-2024-008',
      lokasi: 'Navigation Room',
      serialNo: 'GPS-008-2024'
    }
  ]);

  // Create options for the dropdown showing name, part number and location
  const assetOptions = computed(() => {
    return registeredAssets.value.map(asset => ({
      label: `${asset.nama} | ${asset.PattNum} | ${asset.lokasi}`,
      value: asset.id
    }));
  });

  // Cannaidize Asset data
  const cannaidizeAssetData = ref([
    {
      bil: 1,
      namaKapal: 'KM Tambisan',
      namaAset: 'Enjin Utama MTU 12V 2000 M90',
      PattNum: 'TBS-2024-001',
      lokasi: 'Engine Room',
      kaadaan: 'Baik',      
      catatan: 'Enjin utama yang telah dibaiki dan sedia untuk digunakan'
    },
    {
      bil: 2,
      namaKapal: 'KM Tambisan',
      namaAset: 'Sistem Radar Furuno FAR-2117',
      PattNum: 'TBS-2024-002',
      lokasi: 'Bridge',
      kaadaan: 'Baik',
      catatan: 'Sistem radar yang telah diperbaiki dan sedia untuk digunakan'
    },
    {
      bil: 3,
      namaKapal: 'KM Tambisan',
      namaAset: 'Generator Set Caterpillar 3406',
      PattNum: 'TBS-2024-003',
      lokasi: 'Generator Room',
      kaadaan: 'Baik',
      catatan: 'Generator set yang telah diperbaiki dan sedia untuk digunakan'
    },
    {
      bil: 4,
      namaKapal: 'KM Tambisan',
      namaAset: 'Sistem Komunikasi VHF Sailor 6222',
      PattNum: 'TBS-2024-004',
      lokasi: 'Radio Room',
      kaadaan: 'Baik',
      catatan: 'Sistem komunikasi yang telah diperbaiki dan sedia untuk digunakan'
    },
    {
      bil: 5,
      namaKapal: 'KM Tambisan',
      namaAset: 'Panel Elektrik Utama',
      PattNum: 'TBS-2024-005',
      lokasi: 'Electrical Room',
      kaadaan: 'Baik',   
      catatan: 'Panel elektrik yang telah diperbaiki dan sedia untuk digunakan'
    }
  ]);

  // Cannaidize Asset Modal state
  const isCannaidizeAssetModalOpen = ref(false);
  const isViewingCannaidizeAsset = ref(false);
  const isEditingCannaidizeAsset = ref(false);
  const cannaidizeAssetForm = ref({
    bil: null,
    namaAset: '',
    PattNum: '',
    lokasi: '',
    status: 'Tersedia',
    tarikhTerakhirPemeriksaan: '',
   kaadaan: 'Baik',
    namaKapal: '',
    penerima: '',
    tarikhPindahMilik: '',
    catatan: ''
  });

  // Function to handle asset selection change
  const onAssetSelectionChange = (selectedId) => {
    const selectedAsset = registeredAssets.value.find((asset) => asset.id === parseInt(selectedId));
    if (selectedAsset) {
      // Auto-populate form fields
      cannaidizeAssetForm.value.namaAset = selectedAsset.nama;
      cannaidizeAssetForm.value.PattNum = selectedAsset.PattNum;
      cannaidizeAssetForm.value.lokasi = selectedAsset.lokasi;
      cannaidizeAssetForm.value.serialNo = selectedAsset.serialNo;
    }
  };

  // Open modal for adding cannaidize asset
  const openAddCannaidizeAssetModal = () => {
    isViewingCannaidizeAsset.value = false;
    isEditingCannaidizeAsset.value = false;
    const today = new Date().toISOString().split('T')[0];
    
    cannaidizeAssetForm.value = {
      bil: null,
      namaAset: '',
      PattNum: `CA-${new Date().getFullYear()}-${String(cannaidizeAssetData.value.length + 1).padStart(3, '0')}`,
      lokasi: '',
      status: 'Tersedia',
      tarikhTerakhirPemeriksaan: today,
     kaadaan: 'Baik',
      namaKapal: '',
      penerima: '',
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
        bil: Date.now() // Temporary id
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

<style lang="scss" scoped>

</style>    