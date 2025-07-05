<template>
    <div>
        <h1>Pengurusan Data</h1>
        
        <div class="bg-white rounded-lg shadow p-6 mt-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Muat Turun Templat Data </h2>
            </div>

            <div class="mb-6">
                <div class="flex items-center space-x-4">
                    <div class="w-64">
                        <FormKit
                            type="select"
                            v-model="selectedTable"
                            placeholder="Pilih Templat"
                            :options="tableLists"
                            outer-class="mb-0"
                        />
                    </div>
                    <rs-button
                        variant="primary"
                        @click="downloadTemplate"
                        :disabled="!selectedTable || isDownloading"
                    >
                        <Icon 
                            :name="isDownloading ? 'mdi:loading' : 'material-symbols:download'" 
                            class="mr-2"
                            :class="{ 'animate-spin': isDownloading }"
                        />
                        {{ isDownloading ? 'Sedang Muat Turun...' : 'Muat Turun' }}
                    </rs-button>
                </div>
                <p class="text-sm text-gray-500 mt-2">Pilih templat untuk muat turun templat Excel</p>
            </div>
        </div>

        <!-- New Upload and Review Section -->
        <div class="bg-white rounded-lg shadow p-6 mt-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Muat Naik dan Semak Data</h2>
            </div>

            <div class="mb-6">
                <div class="flex items-center space-x-4">
                    <div class="flex-1">
                        <input
                            type="file"
                            ref="fileInput"
                            accept=".xlsx,.xls"
                            class="hidden"
                            @change="handleFileUpload"
                        />
                        <div class="flex items-center space-x-2">
                            <div class="flex items-center space-x-2">
                                <rs-button
                                    variant="primary"
                                    @click="$refs.fileInput.click()"
                                    :disabled="isUploading"
                                >
                                    <Icon name="material-symbols:upload-file" class="mr-2" />
                                    Pilih Fail
                                </rs-button>
                                <div v-if="selectedFile" class="flex items-center space-x-2">
                                    <span class="text-sm text-gray-600">
                                        {{ selectedFile.name }}
                                    </span>
                                    <rs-button
                                        variant="success"
                                        @click="uploadFile"
                                        :disabled="isUploading"
                                    >
                                        <Icon name="material-symbols:cloud-upload" class="mr-2" />
                                        {{ isUploading ? 'Sedang Memuat Naik...' : 'Muat Naik' }}
                                    </rs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Upload Progress -->
                <div v-if="isUploading" class="mt-4">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            class="bg-blue-600 h-2.5 rounded-full"
                            :style="{ width: uploadProgress + '%' }"
                        ></div>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">Memuat naik... {{ uploadProgress }}%</p>
                </div>

                <!-- Error Review Section -->
                <div v-if="hasErrors" class="mt-6">
                    <h3 class="text-lg font-medium mb-4">Semakan Ralat</h3>
                    
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th v-for="header in errorHeaders" 
                                        :key="header"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {{ header }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="(row, index) in errorData" :key="index">
                                    <td v-for="(cell, cellIndex) in row" 
                                        :key="cellIndex"
                                        class="px-6 py-4 whitespace-nowrap"
                                    >
                                        <div v-if="cell.isError" class="relative">
                                            <input 
                                                type="text" 
                                                v-model="cell.value"
                                                class="border-red-300 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border rounded-md"
                                                :title="cell.errorMessage"
                                            />
                                            <Icon 
                                                name="mdi:alert-circle" 
                                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500"
                                                size="1.2em"
                                            />
                                        </div>
                                        <span v-else>{{ cell.value }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-4 flex justify-end space-x-3">
                        <rs-button variant="secondary" @click="cancelEdit">
                            Batal
                        </rs-button>
                        <rs-button variant="success" @click="saveCorrections">
                            Simpan dan Muat Naik
                        </rs-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 mt-6">
            <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4">Log Respons Kesiapsiagaan Aset - Harian</h2>
                
                <rs-table
                    :data="tableData"
                    :field="['tarikhDanMasa', 'namaPengguna', 'jenisAktiviti', 'penerangan', 'alamatIP', 'status']"
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
                    <template v-slot:status="{ text }">
                        <div class="flex items-center">
                            <span v-if="text" class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                            <span v-else class="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                            {{ text ? '✓' : '✗' }}
                        </div>
                    </template>
                </rs-table>
            </div>
        </div>
    </div>
</template>

<script setup>
const fileInput = ref(null);
const selectedFile = ref(null);
const isUploading = ref(false);
const uploadProgress = ref(0);
const hasErrors = ref(false);
const errorHeaders = ref([]);
const errorData = ref([]);
const selectedTable = ref('');
const isDownloading = ref(false);

const tableData = ref([
    {
        tarikhDanMasa: '27-05-2025 14:45:43',
        namaPengguna: 'ADMINISTRATOR APMM',
        jenisAktiviti: 'Check',
        penerangan: 'Check Template : tjutra_harian',
        alamatIP: '192.168.244.19',
        status: true
    },
    {
        tarikhDanMasa: '27-05-2025 14:42:49',
        namaPengguna: 'ADMINISTRATOR APMM',
        jenisAktiviti: 'Check',
        penerangan: 'Check Template : tjutra_harian',
        alamatIP: '192.168.244.19',
        status: true
    }
]);

// Sample table list - replace with your actual database tables
const tableLists = [
    { label: 'Maklumat Kapal', value: 'tjutra_kapal' },
    { label: 'Maklumat Latihan', value: 'tjutra_latihan' },
    { label: 'Maklumat Vendor', value: 'tjutra_vendor' }
];

// Function to get current date and time in the required format
const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

// Function to get client IP address (simulated for now)
const getClientIP = () => {
    // In a real implementation, this would come from your backend
    return '192.168.244.19';
};

const addLogEntry = (activity, description, success = true) => {
    const newEntry = {
        tarikhDanMasa: getCurrentDateTime(),
        namaPengguna: 'ADMINISTRATOR APMM', // This should come from your auth system
        jenisAktiviti: activity,
        penerangan: description,
        alamatIP: getClientIP(),
        status: success
    };
    
    // Add to the beginning of the array
    tableData.value.unshift(newEntry);
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        hasErrors.value = false;
        errorData.value = [];
    }
};

const uploadFile = async () => {
    if (!selectedFile.value) return;

    isUploading.value = true;
    uploadProgress.value = 0;

    try {
        // Simulate file upload progress
        const interval = setInterval(() => {
            if (uploadProgress.value < 90) {
                uploadProgress.value += 10;
            }
        }, 500);

        // Simulate file processing and error checking
        await new Promise(resolve => setTimeout(resolve, 3000));
        clearInterval(interval);
        uploadProgress.value = 100;

        // Add log entry for file check
        addLogEntry(
            'Check',
            `Check Template : ${selectedFile.value.name}`
        );

        // Simulate finding errors in the file
        simulateFileErrors();

    } catch (error) {
        console.error('Upload failed:', error);
        
        // Add failure log entry
        addLogEntry(
            'Check',
            `Gagal Check Template : ${selectedFile.value.name}`,
            false
        );
    } finally {
        isUploading.value = false;
    }
};

const simulateFileErrors = () => {
    // Simulate error data
    hasErrors.value = true;
    errorHeaders.value = ['No.', 'Tarikh', 'Nama Kapal', 'Status', 'Catatan'];
    errorData.value = [
        [
            { value: '1', isError: false },
            { value: '2023-05-27', isError: false },
            { value: 'KM REDZUAN', isError: false },
            { value: 'TIDAK AKTIF', isError: true, errorMessage: 'Status tidak sah' },
            { value: 'Dalam pembaikan', isError: false }
        ],
        [
            { value: '2', isError: false },
            { value: '2023-05-28', isError: true, errorMessage: 'Tarikh tidak sah' },
            { value: 'KM SATRIA', isError: false },
            { value: 'AKTIF', isError: false },
            { value: '', isError: false }
        ]
    ];
};

const cancelEdit = () => {
    hasErrors.value = false;
    errorData.value = [];
    selectedFile.value = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

const saveCorrections = async () => {
    isUploading.value = true;
    uploadProgress.value = 0;

    try {
        // Simulate saving corrections
        const interval = setInterval(() => {
            if (uploadProgress.value < 90) {
                uploadProgress.value += 10;
            }
        }, 200);

        await new Promise(resolve => setTimeout(resolve, 2000));
        clearInterval(interval);
        uploadProgress.value = 100;

        // Add success log entry
        addLogEntry(
            'Upload',
            `Muat Naik Fail: ${selectedFile.value.name}`,
            true
        );

        // Clear the form after successful upload
        cancelEdit();

        // Show success message
        alert('Data telah berjaya dimuat naik ke pangkalan data');

    } catch (error) {
        console.error('Failed to save corrections:', error);
        
        // Add failure log entry
        addLogEntry(
            'Upload',
            `Gagal Muat Naik: ${selectedFile.value.name}`,
            false
        );
        
        alert('Gagal menyimpan pembetulan');
    } finally {
        isUploading.value = false;
    }
};

// Download template function
const downloadTemplate = async () => {
    if (!selectedTable.value) return;
    
    isDownloading.value = true;
    try {
        // Add log entry for download attempt
        addLogEntry(
            'Download',
            `Muat Turun Template: ${selectedTable.value}.xlsx`
        );

        // Simulate API call and download
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In real implementation, you would:
        // 1. Call your API endpoint to generate the Excel file
        // 2. Get the file blob/buffer
        // 3. Create and trigger download
        
        // Simulate file download
        const link = document.createElement('a');
        link.href = `#`; // Replace with actual file URL
        link.download = `${selectedTable.value}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Add success log entry
        addLogEntry(
            'Download',
            `Berjaya Muat Turun Template: ${selectedTable.value}.xlsx`,
            true
        );

    } catch (error) {
        console.error('Download failed:', error);
        
        // Add failure log entry
        addLogEntry(
            'Download',
            `Gagal Muat Turun Template: ${selectedTable.value}.xlsx`,
            false
        );
        
        alert('Gagal muat turun templat');
    } finally {
        isDownloading.value = false;
    }
};
</script>

<style lang="scss" scoped>
.bg-white {
    background-color: white;
}
</style>