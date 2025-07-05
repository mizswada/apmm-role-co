<template>
    <div class="p-6 space-y-6">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold mb-6">Senarai Latihan Tersedia</h1>
        </div>
        <rs-card>
            <div class="p-4">           
                <rs-table
                    :data="tableData"
                    :field="['bil', 'namaPeserta', 'namaLatihan', 'penerangan', 'tempoh', 'lokasi', 'tarikhMula', 'status', 'tindakan']"
                    :options="{
                        variant: 'default',
                        striped: true,
                        borderless: true,
                        hover: true
                    }"
                    :options-advanced="{
                        sortable: true,
                        responsive: true,
                        filterable: true
                    }"
                    advanced
                >
                    <template v-slot:bil="{ text }">
                        {{ text }}
                    </template>
                    <template v-slot:namaPeserta="{ text }">
                        <div class="space-y-1">
                            <div class="font-medium text-gray-900">{{ text.namaPenuh }}</div>
                            <div class="text-sm text-gray-600">{{ text.jawatan }}</div>
                            <div class="text-xs text-gray-500">{{ text.department }}</div>
                        </div>
                    </template>
                    <template v-slot:namaLatihan="{ text }">
                        <span class="font-medium">{{ text }}</span>
                    </template>
                    <template v-slot:penerangan="{ text }">
                        <span class="text-sm text-gray-600">{{ text }}</span>
                    </template>
                    <template v-slot:tempoh="{ text }">
                        <span class="text-sm">{{ text }}</span>
                    </template>
                    <template v-slot:lokasi="{ text }">
                        <span class="text-sm">{{ text }}</span>
                    </template>
                    <template v-slot:tarikhMula="{ text }">
                        <span class="text-sm">{{ text }}</span>
                    </template>
                    <template v-slot:status="{ text }">
                        <rs-badge :variant="getBadgeVariant(text)">
                            {{ text }}
                        </rs-badge>
                    </template>
                    <template v-slot:tindakan="{ value }">
                        <div class="flex gap-2">
                            <rs-button
                                variant="primary"
                                size="sm"
                                @click="openApproveModal(value)"
                                :disabled="value.status === 'Tutup'"
                            >
                                {{ value.status === 'Tutup' ? 'Tutup' : 'Luluskan' }}
                            </rs-button>
                            <rs-button
                                variant="danger"
                                size="sm"
                                @click="openRejectModal(value)"
                                :disabled="value.status === 'Tutup'"
                            >
                                Tolak
                            </rs-button>
                        </div>
                    </template>
                </rs-table>
            </div>
        </rs-card>

        <!-- Apply Modal -->
        <rs-modal v-model="isApplyModalOpen" size="lg">
            <template #header>
                <h3 class="text-lg font-semibold">Luluskan Permohonan Latihan</h3>
            </template>
            <template #body>
                <div class="space-y-4">
                    <div class="grid grid-cols-1 gap-4">
                        <div>
                            <label class="font-medium">Nama Latihan:</label>
                            <p>{{ selectedTraining?.namaLatihan }}</p>
                        </div>
                        <div>
                            <label class="font-medium">Penerangan:</label>
                            <p>{{ selectedTraining?.penerangan }}</p>
                        </div>
                        <div>
                            <label class="font-medium">Tempoh:</label>
                            <p>{{ selectedTraining?.tempoh }}</p>
                        </div>
                        <div>
                            <label class="font-medium">Lokasi:</label>
                            <p>{{ selectedTraining?.lokasi }}</p>
                        </div>
                        <div>
                            <label class="font-medium">Tarikh Mula:</label>
                            <p>{{ selectedTraining?.tarikhMula }}</p>
                        </div>
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-sm font-medium text-yellow-800">
                                        Pengesahan
                                    </h3>
                                    <div class="mt-2 text-sm text-yellow-700">
                                        <p>
                                            Adakah anda pasti untuk meluluskan permohonan latihan ini? 
                                            Tindakan ini tidak boleh dibatalkan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div>
                            <label class="font-medium">Alasan Permohonan:</label>
                            <FormKit 
                                type="textarea" 
                                v-model="applicationForm.alasan"
                                placeholder="Nyatakan alasan anda untuk menyertai latihan ini"
                                rows="4"
                                class="w-full"
                            />
                        </div>
                        <div>
                            <label class="font-medium">Lampiran Sokongan:</label>
                            <FormKit
                                type="file"
                                @change="handleFileUpload"
                                accept=".pdf,.doc,.docx"
                                class="w-full"
                            />
                        </div> -->
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <rs-button
                        variant="secondary"
                        @click="isApplyModalOpen = false"
                    >
                        Batal
                    </rs-button>
                    <rs-button
                        variant="success"
                        @click="handleApprove"
                    >
                        Luluskan
                    </rs-button>
                </div>
            </template>
        </rs-modal>

        <!-- Reject Modal -->
        <rs-modal v-model="isRejectModalOpen" size="lg">
            <template #header>
                <h3 class="text-lg font-semibold">Tolak Permohonan Latihan</h3>
            </template>
            <template #body>
                <div class="space-y-4">
                    <div class="grid grid-cols-1 gap-4">
                        <div>
                            <label class="font-medium">Nama Latihan:</label>
                            <p>{{ selectedTraining?.namaLatihan }}</p>
                        </div>
                        <div>
                            <label class="font-medium">Penerangan:</label>
                            <p>{{ selectedTraining?.penerangan }}</p>
                        </div>
                        <div>
                            <label class="font-medium">Tempoh:</label>
                            <p>{{ selectedTraining?.tempoh }}</p>
                        </div>
                        <div>
                            <label class="font-medium">Lokasi:</label>
                            <p>{{ selectedTraining?.lokasi }}</p>
                        </div>
                        <div>
                            <label class="font-medium">Tarikh Mula:</label>
                            <p>{{ selectedTraining?.tarikhMula }}</p>
                        </div>
                        <div>
                            <label class="font-medium">Alasan Penolakan:</label>
                            <FormKit 
                                type="textarea" 
                                v-model="rejectionForm.alasan"
                                placeholder="Nyatakan alasan untuk menolak permohonan latihan ini"
                                rows="4"
                                class="w-full"
                                validation="required"
                                validation-label="Alasan penolakan"
                            />
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <rs-button
                        variant="secondary"
                        @click="isRejectModalOpen = false"
                    >
                        Batal
                    </rs-button>
                    <rs-button
                        variant="danger"
                        @click="handleReject"
                        :disabled="!rejectionForm.alasan.trim()"
                    >
                        Tolak Permohonan
                    </rs-button>
                </div>
            </template>
        </rs-modal>
    </div>    
</template>

<script setup>
const tableData = ref([
    {
        bil: 1,
        namaPeserta: {
            namaPenuh: 'Mohammad bin Ismail',
            jawatan: 'Leftenan',
            department: 'Jabatan Operasi Maritim'
        },
        namaLatihan: 'Kursus Pengurusan Projek Maritim',
        penerangan: 'Kursus ini memberi pendedahan kepada peserta tentang asas pengurusan projek dalam konteks maritim.',
        tempoh: '5 hari',
        lokasi: 'Akademi Tentera Laut Lumut',
        tarikhMula: '15 Januari 2024',
        status: 'Terbuka'
    },
    {
        bil: 2,
        namaPeserta: {
            namaPenuh: 'Nurul Ain binti Ahmad',
            jawatan: 'Sarjan Mejar',
            department: 'Jabatan Keselamatan'
        },
        namaLatihan: 'Latihan Keselamatan Maritim',
        penerangan: 'Program latihan keselamatan dan pencegahan kemalangan di laut.',
        tempoh: '3 hari',
        lokasi: 'Pangkalan Tentera Laut Kota Kinabalu',
        tarikhMula: '20 Januari 2024',
        status: 'Terbuka'
    },
    {
        bil: 3,
        namaPeserta: {
            namaPenuh: 'Raj Kumar a/l Subramaniam',
            jawatan: 'Leftenan Muda',
            department: 'Jabatan Navigasi'
        },
        namaLatihan: 'Kursus Teknologi Navigasi Moden',
        penerangan: 'Latihan penggunaan sistem navigasi dan teknologi terkini dalam operasi maritim.',
        tempoh: '7 hari',
        lokasi: 'Akademi Tentera Laut Lumut',
        tarikhMula: '25 Januari 2024',
        status: 'Terbuka'
    }
]);

const isApplyModalOpen = ref(false);
const isRejectModalOpen = ref(false);
const selectedTraining = ref(null);

const applicationForm = ref({
    alasan: '',
    attachment: null
});

const rejectionForm = ref({
    alasan: ''
});

const getBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
        case 'terbuka':
            return 'success';
        case 'tutup':
            return 'danger';
        default:
            return 'primary';
    }
};

const openApproveModal = (training) => {
    selectedTraining.value = training;
    applicationForm.value = {
        alasan: '',
        attachment: null
    };
    isApplyModalOpen.value = true;
};

const openRejectModal = (training) => {
    selectedTraining.value = training;
    rejectionForm.value = {
        alasan: ''
    };
    isRejectModalOpen.value = true;
};

const handleFileUpload = (event) => {
    applicationForm.value.attachment = event.target.files[0];
};

const handleApprove = () => {
    // Here you would typically send the approval to the backend
    console.log('Approving training:', selectedTraining.value.namaLatihan);
    console.log('Approval form:', applicationForm.value);
    
    // Show success message (you can use your preferred notification system)
    alert('Permohonan latihan telah diluluskan dengan jayanya!');
    
    isApplyModalOpen.value = false;
    
    // Reset form
    applicationForm.value = {
        alasan: '',
        attachment: null
    };
};

const handleReject = () => {
    // Here you would typically send the rejection to the backend
    console.log('Rejecting training:', selectedTraining.value.namaLatihan);
    console.log('Rejection reason:', rejectionForm.value.alasan);
    
    // Show success message (you can use your preferred notification system)
    alert('Permohonan latihan telah ditolak dengan jayanya!');
    
    isRejectModalOpen.value = false;
    
    // Reset form
    rejectionForm.value = {
        alasan: ''
    };
};
</script>

<style lang="scss" scoped>
.rs-card {
    @apply bg-white rounded-lg shadow;
}
</style>