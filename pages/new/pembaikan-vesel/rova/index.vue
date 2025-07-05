<template>
    <div class="p-6 space-y-6 bg-white rounded shadow p-4">
       
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
                <!-- <rs-button variant="secondary" @click="closeRovaModal">
                  {{ isViewingRova ? 'Tutup' : 'Batal' }}
                </rs-button>
                <rs-button 
                  v-if="!isViewingRova" 
                  variant="primary" 
                  @click="submitRovaForm"
                >
                  {{ isEditingRova ? 'Kemaskini' : 'Tambah' }}
                </rs-button> -->
              </div>
            </template>
          </rs-modal>
    </div>

   
</template>

<script setup>
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
</script>

<style lang="scss" scoped>
.rs-card {
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
}

.progress-bar {
    height: 8px;
    border-radius: 4px;
}
</style>    