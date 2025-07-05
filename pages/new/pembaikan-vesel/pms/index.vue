<template>
    <div class="p-6 space-y-6 bg-white rounded shadow p-4">
        <rs-card>
            <template #header>
                <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">PM/REFIT/AD/AMP/SLEP</h2>
                <!-- <rs-button variant="primary" @click="openAddPMSModal">Tambah Baru</rs-button> -->
                </div>
            </template>
            
            <rs-table
                :data="pmsData"
                :columns="[
                { key: 'bil', label: 'Bil' },
                { key: 'tahunPembaikan', label: 'Tahun Pembaikan' },
                { key: 'jenisPembaikan', label: 'Jenis Pembaikan' },
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
                defaultSort: { column: 'bil', direction: 'asc' }
                }"
                advanced
            >
                <template v-slot:jenisPembaikan="row">
                <rs-badge
                    :variant="row.value.jenisPembaikan === 'AD' ? 'info' : 'success'"
                >
                    {{ row.value.jenisPembaikan }}
                </rs-badge>
                </template>
                
                <template v-slot:tindakan="row">
                <div class="flex gap-2">
                    <rs-button variant="info" size="sm" @click="viewTugasan(row.value)">Lihat Tugasan</rs-button>
                </div>
                </template>
            </rs-table>
        </rs-card>
    </div>

    <!-- Tugasan Modal -->
    <rs-modal v-model="isTugasanModalOpen" size="lg">
    <template #header>
        <h3 class="text-lg font-semibold">
            Senarai Tugasan - {{ selectedPMS?.jenisPembaikan }} {{ selectedPMS?.tahunPembaikan }}
        </h3>
    </template>

    <template #body>
        <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-700 mb-2">Maklumat Pembaikan:</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="font-medium">Jenis Pembaikan:</span>
                        <rs-badge :variant="selectedPMS?.jenisPembaikan === 'AD' ? 'info' : 'success'" class="ml-2">
                            {{ selectedPMS?.jenisPembaikan }}
                        </rs-badge>
                    </div>
                    <div>
                        <span class="font-medium">Tahun Pembaikan:</span>
                        <span class="ml-2">{{ selectedPMS?.tahunPembaikan }}</span>
                    </div>
                </div>
            </div>
            
            <rs-table
                :data="tugasanData"
                :columns="[
                { key: 'bil', label: 'Bil' },
                { key: 'tugasan', label: 'Tugasan' },
                { key: 'vendor', label: 'Vendor' }
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
                <template v-slot:vendor="row">
                    <rs-badge variant="warning">
                        {{ row.value.vendor }}
                    </rs-badge>
                </template>
            </rs-table>
        </div>
    </template>

    <template #footer>
        <div class="flex justify-end space-x-2">
        <rs-button variant="secondary" @click="closeTugasanModal">Tutup</rs-button>
        </div>
    </template>
    </rs-modal>
</template>

<script setup>
    // PMS data
    const pmsData = ref([
        {
            bil: 1,
            tahunPembaikan: 2024,
            jenisPembaikan: 'AD',
            tindakan: 'Edit'
        },
        {
            bil: 2,
            tahunPembaikan: 2025,
            jenisPembaikan: 'Refit',
            tindakan: 'Edit'
        },
        {
            bil: 3,
            tahunPembaikan: 2024,
            jenisPembaikan: 'AD',
            tindakan: 'Edit'
        },
        {
            bil: 4,
            tahunPembaikan: 2026,
            jenisPembaikan: 'AD',
            tindakan: 'Edit'
        }
      
    ]);

    // Tugasan Modal state
    const isTugasanModalOpen = ref(false);
    const selectedPMS = ref(null);
    
    // Sample tugasan data - in real app this would come from API
    const tugasanData = ref([
        {
            bil: 1,
            tugasan: 'Pemeriksaan Enjin Utama',
            vendor: 'Marine Engineering Sdn Bhd'
        },
        {
            bil: 2,
            tugasan: 'Pembaikan Sistem Elektrik',
            vendor: 'Electro Marine Services'
        },
        {
            bil: 3,
            tugasan: 'Pemeriksaan Hull dan Propeller',
            vendor: 'Hull Inspection Co.'
        },
        {
            bil: 4,
            tugasan: 'Pembaikan Sistem Navigasi',
            vendor: 'NavTech Solutions'
        },
        {
            bil: 5,
            tugasan: 'Pemeriksaan Sistem Keselamatan',
            vendor: 'Safety Marine Systems'
        }
    ]);

    // Open modal for adding PMS
    const openAddPMSModal = () => {
        isEditingPMS.value = false;
        pmsForm.value = {
            bil: pmsData.value.length + 1,
            namaAset: '',
            jenisPembaikan: 'AD',
            tahunPembaikan: new Date().getFullYear()
        };
        isPMSModalOpen.value = true;
    };

    // View tugasan for PMS item
    const viewTugasan = (item) => {
        selectedPMS.value = item;
        isTugasanModalOpen.value = true;
    };

    // Close tugasan modal
    const closeTugasanModal = () => {
        isTugasanModalOpen.value = false;
        selectedPMS.value = null;
    };
</script>

<style lang="scss" scoped>

</style>    