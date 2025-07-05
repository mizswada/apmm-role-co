<template>
    <div class="p-6">
        <h1 class="text-2xl font-semibold mb-6">Data Vendor</h1>
        
        <rs-card>
            <template #header>
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-medium">Senarai Vendor</h2>
                    <!-- <rs-button variant="primary" size="sm">
                        <Icon name="mdi:plus" class="mr-1" />
                        Tambah Vendor
                    </rs-button> -->
                </div>
            </template>
            <template #body>
                <rs-table
                    :data="vendorData"
                    :field="['id', 'namaVendor', 'alamat', 'noTelefon', 'emel', 'status', 'tindakan']"
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
                        <rs-badge
                            :variant="text === 'Aktif' ? 'success' : 'danger'"
                        >
                            {{ text }}
                        </rs-badge>
                    </template>
                    <template v-slot:tindakan="{ value }">
                        <div class="flex ">
                            <rs-button 
                                variant="primary" 
                                size="sm"
                                @click="openVendorDetails(value)"
                            >
                                <Icon name="mdi:eye" class="mr-1" />
                                <!-- Lihat -->
                            </rs-button>
                        </div>
                    </template>
                </rs-table>
            </template>
        </rs-card>

        <!-- Vendor Details Modal -->
        <rs-modal v-model="isModalOpen" size="lg">
            <template #header>
                <h3 class="text-lg font-semibold">Maklumat Vendor</h3>
            </template>
            <template #body>
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">ID Vendor</label>
                            <div class="mt-1 text-gray-900">{{ selectedVendor?.id }}</div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Status</label>
                            <div class="mt-1">
                                <rs-badge
                                    :variant="selectedVendor?.status === 'Aktif' ? 'success' : 'danger'"
                                >
                                    {{ selectedVendor?.status }}
                                </rs-badge>
                            </div>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700">Nama Vendor</label>
                            <div class="mt-1 text-gray-900">{{ selectedVendor?.namaVendor }}</div>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700">Alamat</label>
                            <div class="mt-1 text-gray-900">{{ selectedVendor?.alamat }}</div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">No. Telefon</label>
                            <div class="mt-1 text-gray-900">{{ selectedVendor?.noTelefon }}</div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Emel</label>
                            <div class="mt-1 text-gray-900">{{ selectedVendor?.emel }}</div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <rs-button 
                        variant="secondary" 
                        @click="isModalOpen = false"
                    >
                        Tutup
                    </rs-button>
                </div>
            </template>
        </rs-modal>
    </div>
</template>

<script setup>
// Sample vendor data
const vendorData = ref([
    {
        id: 'V001',
        namaVendor: 'Syarikat ABC Sdn Bhd',
        alamat: 'No. 123, Jalan Merdeka, 50000 Kuala Lumpur',
        noTelefon: '03-12345678',
        emel: 'info@abc.com.my',
        status: 'Aktif'
    },
    {
        id: 'V002',
        namaVendor: 'XYZ Enterprise',
        alamat: 'Lot 456, Jalan Industri 2/1, Kawasan Perindustrian, 40000 Shah Alam',
        noTelefon: '03-87654321',
        emel: 'contact@xyz.com.my',
        status: 'Aktif'
    },
    {
        id: 'V003',
        namaVendor: 'Global Solutions Bhd',
        alamat: 'Level 15, Menara Tower, 10050 Georgetown, Penang',
        noTelefon: '04-2223333',
        emel: 'support@globalsolutions.com',
        status: 'Tidak Aktif'
    }
]);

// Modal state
const isModalOpen = ref(false);
const selectedVendor = ref(null);

// Function to open vendor details modal
const openVendorDetails = (vendor) => {
    selectedVendor.value = vendor;
    isModalOpen.value = true;
};
</script>

<style lang="scss" scoped>

</style>