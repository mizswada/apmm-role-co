<template>
    <div class="p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-bold text-center mb-4">BORANG LAPORAN KEROSAKAN</h2>        
    
        <rs-fieldset label="MAKLUMAT STAF TEKNIKAL YANG DITUGASKAN">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormKit type="text" label="Jabatan" v-model="jabatan" disabled/>
            </div>            

            <div class="flex justify-end mb-2">
                <button @click="showAddStaffModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Icon name="material-symbols:add" />
                    Tambah Staff
                </button>
            </div>
            <rs-table
                :data="senaraiStaff"
                :options="{
                    variant: 'default',
                    striped: true,
                    borderless: true,
                }"
                :options-advanced="{
                    sortable: true,
                    responsive: true,
                    filterable: false,
                }"
                advanced
            >
                <template v-slot:tindakan="data">
                    <button 
                        @click="editStaff(data.value)"
                        class="text-blue-600 hover:text-blue-800 py-3 px-4"
                    >
                        Kemaskini
                    </button>
                    <button 
                        @click="deleteStaff(data.value)"
                        class="text-red-600 hover:text-red-800 py-3 px-4"
                    >
                        Hapus
                    </button>
                </template>
            
            </rs-table>
        </rs-fieldset>

        <rs-fieldset label="" class="mt-4 mb-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormKit type="datetime-local" label="Tarikh Mula Kerja" v-model="tarikhMula" />
                <FormKit type="datetime-local" label="Tarikh Siap Kerja" v-model="tarikhSiap" />
                <FormKit 
                    type="datetime-local" 
                    label="Tarikh Siap Kerja Sebenar" 
                    v-model="tarikhSiapSebenar"
                    :validation="[
                        ['date_after', tarikhMula, 'Tarikh Siap Kerja Sebenar mesti selepas Tarikh Mula Kerja']
                    ]"
                />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormKit type="number" label="Tempoh Pembaikan (Hari)" v-model="tempohPembaikan" disabled />
                <FormKit type="select" label="Status Pembaikan" v-model="statusPembaikan" :options="statusPembaikanOptions" />
                <FormKit type="select" label="Jumlah Pembaikan" v-model="jumlahPembaikan" :options="jumlahPembaikanOptions" />
            </div>
        </rs-fieldset>

        <rs-fieldset label="SENARAI ALAT GANTI" class="mt-4">
            <div class="flex justify-end mb-2">
                <button @click="showAddAlatGantiModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Icon name="material-symbols:add" />
                    Tambah Alat Ganti
                </button>
            </div>

            <rs-table
                :data="senaraiAlatGanti"
                :options="{
                    variant: 'default',
                    striped: true,
                    borderless: true,
                }"
                :options-advanced="{
                    sortable: true,
                    responsive: true,
                    filterable: false,
                }"
                advanced
            >
                <template v-slot:tindakan="data">
                    <button 
                        @click="editAlatGanti(data.value)"
                        class="text-blue-600 hover:text-blue-800 py-3 px-4"
                    >
                        Kemaskini
                    </button>
                    <button 
                        @click="deleteAlatGanti(data.value)"
                        class="text-red-600 hover:text-red-800 py-3 px-4"
                    >
                        Hapus
                    </button>
                </template>
            </rs-table>

            <div class="mt-4">
                <FormKit
                    type="textarea"
                    label="Catatan"
                    v-model="catatanAlatGanti"
                    rows="4"
                    placeholder="Masukkan catatan berkaitan alat ganti..."
                />
            </div>
        </rs-fieldset>

        <div class="flex justify-end gap-4 mt-6">
            <button 
                @click="handleHantar" 
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Hantar
            </button>
            <button 
                @click="handleSimpan" 
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Simpan
            </button>
            <button 
                @click="handleSah" 
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Sah
            </button>
            <button 
                @click="handleCetak" 
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Cetak
            </button>
        </div>
    </div>
    
    <rs-modal v-model="showAddStaffModal" size="lg" title="Tambah Staff Teknikal">
      <div class="p-4 space-y-4">
        <div>
          <FormKit type="select" label="Staf Teknikal" v-model="newStaff.nama" :options="availableStaffList" />
        </div>
        
        <div>
          <FormKit type="date" label="Tarikh Penugasan" v-model="newStaff.tarikhPenugasan" />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button @click="showAddStaffModal = false" class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
            Batal
          </button>
          <button @click="addStaff" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Tambah Staff
          </button>
        </div>
      </template>
    </rs-modal>

    <!-- Edit Staff Modal -->
    <rs-modal v-model="showEditStaffModal" size="lg" title="Kemaskini Staff Teknikal">
      <div class="p-4 space-y-4">
        <div>
          <FormKit type="select" label="Staf Teknikal" v-model="editingStaff.nama" :options="availableStaffList" />
        </div>
        
        <div>
          <FormKit type="date" label="Tarikh Penugasan" v-model="editingStaff.tarikhPenugasan" />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button @click="showEditStaffModal = false" class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
            Batal
          </button>
          <button @click="updateStaff" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Simpan
          </button>
        </div>
      </template>
    </rs-modal>

    <!-- Add Alat Ganti Modal -->
    <rs-modal v-model="showAddAlatGantiModal" size="lg" title="Tambah Alat Ganti">
        <div class="p-4 space-y-4">
            <div>
                <FormKit type="text" label="Nama Alat Ganti" v-model="newAlatGanti.nama" />
            </div>
            <div>
                <FormKit type="text" label="Part Number" v-model="newAlatGanti.partNumber" />
            </div>
            <div>
                <FormKit type="number" label="Kuantiti" v-model="newAlatGanti.kuantiti" />
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button @click="showAddAlatGantiModal = false" class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                    Batal
                </button>
                <button @click="addAlatGanti" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Tambah
                </button>
            </div>
        </template>
    </rs-modal>

    <!-- Edit Alat Ganti Modal -->
    <rs-modal v-model="showEditAlatGantiModal" size="lg" title="Kemaskini Alat Ganti">
        <div class="p-4 space-y-4">
            <div>
                <FormKit type="text" label="Nama Alat Ganti" v-model="editingAlatGanti.nama" />
            </div>
            <div>
                <FormKit type="text" label="Part Number" v-model="editingAlatGanti.partNumber" />
            </div>
            <div>
                <FormKit type="number" label="Kuantiti" v-model="editingAlatGanti.kuantiti" />
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button @click="showEditAlatGantiModal = false" class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                    Batal
                </button>
                <button @click="updateAlatGanti" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Simpan
                </button>
            </div>
        </template>
    </rs-modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const jabatan = ref('Kejuruteraan');
const tarikhMula = ref(new Date().toISOString().slice(0, 16));
const tarikhSiap = ref('');
const tarikhSiapSebenar = ref('');
const tempohPembaikan = ref(0);
const statusPembaikan = ref('');
const jumlahPembaikan = ref('');

// Computed property to calculate repair period
const calculateTempohPembaikan = computed(() => {
    if (!tarikhMula.value || !tarikhSiapSebenar.value) {
        return 0;
    }

    const startDate = new Date(tarikhMula.value);
    const endDate = new Date(tarikhSiapSebenar.value);
    
    // Check if end date is before start date
    if (endDate < startDate) {
        alert('Tarikh Siap Kerja Sebenar tidak boleh sebelum Tarikh Mula Kerja');
        tarikhSiapSebenar.value = '';
        return 0;
    }
    
    // Calculate difference in days
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Update tempohPembaikan
    tempohPembaikan.value = diffDays;
    
    return diffDays;
});

// Watch for changes in tarikhSiapSebenar
watch(tarikhSiapSebenar, (newValue) => {
    if (newValue) {
        calculateTempohPembaikan.value;
    }
});

// Watch for changes in tarikhMula
watch(tarikhMula, (newValue) => {
    if (newValue && tarikhSiapSebenar.value) {
        calculateTempohPembaikan.value;
    }
});

const statusPembaikanOptions = [
    { label: 'Dalam Proses', value: 'dalam_proses' },
    { label: 'Selesai', value: 'selesai' },
    { label: 'Belum Selesai', value: 'belum_selesai' }
];

const jumlahPembaikanOptions = [
    { label: '1 Kali', value: '1' },
    { label: '2 Kali', value: '2' },
    { label: '3 Kali', value: '3' },
    { label: 'Lebih 3 Kali', value: 'lebih_3' }
];

const stafTeknikalList = [
    { label: 'BK(M) ABD HALIM BIN HAMID - Pengubal', value: 'BK(M) ABD HALIM BIN HAMID' },
    { label: 'BK(M) ABD ALI BIN HAIQAL - Pengubal', value: 'BK(M) ABD ALI BIN HAIQAL' },
    { label: 'BK(M) HALIM BIN HAMID - Pengubal', value: 'BK(M) HALIM BIN HAMID' }
];

const senaraiStaff = ref([
    { 
        id: 1,
        nama: 'BK(M) ABD HALIM BIN HAMID',
        pangkat: 'Pengubal',
        tarikhPenugasan: '2024-03-15',
        tindakan: ['kemaskini', 'hapus']   
    }
])

// Computed property to filter out assigned staff
const availableStaffList = computed(() => {
    const assignedNames = senaraiStaff.value.map(staff => staff.nama);
    return stafTeknikalList.filter(staff => !assignedNames.includes(staff.value));
});

const showAddStaffModal = ref(false);
const showEditStaffModal = ref(false);

const newStaff = ref({
    nama: '',
    tarikhPenugasan: new Date().toISOString().split('T')[0],
    pangkat: 'Pengubal' // Default pangkat
});

const editingStaff = ref({
    id: null,
    nama: '',
    tarikhPenugasan: '',
    pangkat: 'Pengubal'
});

const addStaff = () => {
    if (!newStaff.value.nama || !newStaff.value.tarikhPenugasan) {
        alert('Sila lengkapkan semua maklumat');
        return;
    }

    const staff = {
        id: senaraiStaff.value.length + 1,
        nama: newStaff.value.nama,
        pangkat: newStaff.value.pangkat,
        tarikhPenugasan: newStaff.value.tarikhPenugasan
    };

    senaraiStaff.value.push(staff);
    
    // Reset form
    newStaff.value = {
        nama: '',
        tarikhPenugasan: new Date().toISOString().split('T')[0],
        pangkat: 'Pengubal'
    };
    
    // Close modal
    showAddStaffModal.value = false;
};

const editStaff = (staff) => {
    editingStaff.value = {
        id: staff.id,
        nama: staff.nama,
        tarikhPenugasan: staff.tarikhPenugasan,
        pangkat: staff.pangkat
    };
    showEditStaffModal.value = true;
};

const updateStaff = () => {
    if (!editingStaff.value.nama || !editingStaff.value.tarikhPenugasan) {
        alert('Sila lengkapkan semua maklumat');
        return;
    }

    const index = senaraiStaff.value.findIndex(staff => staff.id === editingStaff.value.id);
    if (index !== -1) {
        senaraiStaff.value[index] = {
            ...senaraiStaff.value[index],
            nama: editingStaff.value.nama,
            tarikhPenugasan: editingStaff.value.tarikhPenugasan,
            pangkat: editingStaff.value.pangkat
        };
    }

    showEditStaffModal.value = false;
};

const deleteStaff = (staff) => {
    if (confirm('Adakah anda pasti mahu memadamkan staff ini?')) {
        const index = senaraiStaff.value.findIndex(s => s.id === staff.id);
        if (index !== -1) {
            senaraiStaff.value.splice(index, 1);
        }
    }
};

const showAddAlatGantiModal = ref(false);
const showEditAlatGantiModal = ref(false);

const senaraiAlatGanti = ref([
    {
        id: 1,
        nama: 'Bearing 6205-2RS',
        partNumber: 'SKF-6205-2RS',
        kuantiti: 2,
        tindakan: ['kemaskini', 'hapus']
    },
    {
        id: 2,
        nama: 'O-Ring 25mm',
        partNumber: 'OR-25-BUNA',
        kuantiti: 5,
        tindakan: ['kemaskini', 'hapus']

    },
    {
        id: 3,
        nama: 'Belt V-Type',
        partNumber: 'V-BELT-A25',
        kuantiti: 1,
        tindakan: ['kemaskini', 'hapus']

    }    
]);

const newAlatGanti = ref({
    nama: '',
    partNumber: '',
    kuantiti: 0
});

const editingAlatGanti = ref({
    id: null,
    nama: '',
    partNumber: '',
    kuantiti: 0
});

const catatanAlatGanti = ref('');

const addAlatGanti = () => {
    if (!newAlatGanti.value.nama || !newAlatGanti.value.partNumber || !newAlatGanti.value.kuantiti) {
        alert('Sila lengkapkan semua maklumat yang diperlukan');
        return;
    }

    const alatGanti = {
        id: senaraiAlatGanti.value.length + 1,
        ...newAlatGanti.value
    };

    senaraiAlatGanti.value.push(alatGanti);
    
    // Reset form
    newAlatGanti.value = {
        nama: '',
        partNumber: '',
        kuantiti: 0
    };
    
    showAddAlatGantiModal.value = false;
};

const editAlatGanti = (alatGanti) => {
    editingAlatGanti.value = {
        id: alatGanti.id,
        nama: alatGanti.nama,
        partNumber: alatGanti.partNumber,
        kuantiti: alatGanti.kuantiti
    };
    showEditAlatGantiModal.value = true;
};

const updateAlatGanti = () => {
    if (!editingAlatGanti.value.nama || !editingAlatGanti.value.partNumber || !editingAlatGanti.value.kuantiti) {
        alert('Sila lengkapkan semua maklumat yang diperlukan');
        return;
    }

    const index = senaraiAlatGanti.value.findIndex(item => item.id === editingAlatGanti.value.id);
    if (index !== -1) {
        senaraiAlatGanti.value[index] = {
            ...senaraiAlatGanti.value[index],
            nama: editingAlatGanti.value.nama,
            partNumber: editingAlatGanti.value.partNumber,
            kuantiti: editingAlatGanti.value.kuantiti,
            tindakan: ['kemaskini', 'hapus']
        };
    }

    showEditAlatGantiModal.value = false;
};

const deleteAlatGanti = (alatGanti) => {
    if (confirm('Adakah anda pasti mahu memadamkan alat ganti ini?')) {
        const index = senaraiAlatGanti.value.findIndex(item => item.id === alatGanti.id);
        if (index !== -1) {
            senaraiAlatGanti.value.splice(index, 1);
        }
    }
};

const handleHantar = () => {
    // Add your submit logic here
    console.log('Hantar clicked');
};

const handleSimpan = () => {
    // Add your save logic here
    console.log('Simpan clicked');
};

const handleSah = () => {
    // Add your verify logic here
    console.log('Sah clicked');
};

const handleCetak = () => {
    // Add your print logic here
    console.log('Cetak clicked');
};
</script>

<style lang="scss" scoped>

</style>