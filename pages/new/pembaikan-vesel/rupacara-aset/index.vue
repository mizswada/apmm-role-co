<template>
    <div class="flex flex-col gap-4">
       
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
              <template v-slot:namaKapal="row">
                {{ row.value.namaKapal }}
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
            <h4 class="font-medium text-gray-700">Nama Kapal:</h4>
            <p>{{ rupacaraForm.namaKapal }}</p>
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

        <!-- Nama Kapal -->
        <FormKit
            type="text"
            name="namaKapal"
            label="Nama Kapal"
            placeholder="Masukkan nama kapal"
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
    
</template>

<script setup>
 // Rupacara data
 const rupacaraData = ref([
    {
      id: 1,
      tarikhKemaskini: "2024-03-20",
      namaKapal: "KM TAMBISAN",
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
      namaKapal: "KM TAMBISAN",
      penerangan: "Penambahbaikan sistem radar dan komunikasi",
      portView: "@/assets/img/vessels/port_view_2.jpg",
      starboardView: "@/assets/img/vessels/starboard_view_2.jpg",
      forwardView: "@/assets/img/vessels/forward_view_2.jpg",
      afterView: "@/assets/img/vessels/after_view_2.jpg",
      engineRoom: "@/assets/img/vessels/engine_room_2.jpg",
      closedBridge: "@/assets/img/vessels/closed_bridge_2.jpg"
    }
  ]);
  const field = ref(['tarikhKemaskini', 'namaKapal', 'penerangan','tindakan']);

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
    namaKapal: "",
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
      namaKapal: "",
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
</script>

<style lang="scss" scoped>

</style>