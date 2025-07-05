<template>
    <div class="p-6 space-y-6 bg-white rounded shadow p-4">
        <rs-card>
            <template #header>
                <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold"> GUARANTY DEFECT (GURDEF)</h2>
                <!-- <rs-button variant="primary" @click="openAddPMSModal">Tambah Baru</rs-button> -->
                </div>
            </template>
            
            <rs-table
                :data="pmsData"
                :columns="[
                { key: 'bil', label: 'Bil' },
                { key: 'namaKapal', label: 'Nama Kapal' },
                { key: 'namaAset', label: 'Nama Aset' },
                { key: 'namaVendor', label: 'Nama Vendor' },
                { key: 'tarikhMula', label: 'Tarikh Mula' },
                { key: 'tarikhTamat', label: 'Tarikh Tamat' },
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
                <template v-slot:tarikhMula="row">
                <span>{{ formatDate(row.value.tarikhMula) }}</span>
                </template>
                
                <template v-slot:tarikhTamat="row">
                <span>{{ formatDate(row.value.tarikhTamat) }}</span>
                </template>
                
                <!-- <template v-slot:tindakan="row">
                <div class="flex gap-2">
                    <rs-button variant="warning" size="sm" @click="editPMSItem(row.value)">Edit</rs-button>
                    <rs-button variant="danger" size="sm" @click="deletePMSItem(row.value.bil)">Delete</rs-button>
                </div>
                </template> -->
            </rs-table>
        </rs-card>
    </div>

    <!-- PMS Modal -->
    <rs-modal v-model="isPMSModalOpen" size="lg">
    <template #header>
        <h3 class="text-lg font-semibold">
        {{ isEditingPMS ? 'Kemaskini PMS' : 'Tambah PMS Baru' }}
        </h3>
    </template>

    <template #body>
        <FormKit type="form" :value="pmsForm" @submit="handlePMSSubmit">
        <div class="grid grid-cols-2 gap-4">
            <FormKit
            type="text"
            name="namaKapal"
            label="Nama Kapal"
            placeholder="Contoh: KM SATRIA"
            validation="required"
            />
            <FormKit
            type="text"
            name="namaAset"
            label="Nama Aset"
            placeholder="Contoh: Engine Room"
            validation="required"
            />
        </div>

        <div class="grid grid-cols-2 gap-4">
            <FormKit
            type="text"
            name="namaVendor"
            label="Nama Vendor"
            placeholder="Contoh: Vendor ABC"
            validation="required"
            />
        </div>

        <div class="grid grid-cols-2 gap-4">
            <FormKit
            type="date"
            name="tarikhMula"
            label="Tarikh Mula"
            validation="required"
            />
            <FormKit
            type="date"
            name="tarikhTamat"
            label="Tarikh Tamat"
            validation="required"
            />
        </div>
        </FormKit>
    </template>

    <template #footer>
        <div class="flex justify-end space-x-2">
        <rs-button variant="secondary" @click="closePMSModal">Batal</rs-button>
        <rs-button variant="primary" @click="submitPMSForm">
            {{ isEditingPMS ? 'Kemaskini' : 'Tambah' }}
        </rs-button>
        </div>
    </template>
    </rs-modal>
</template>

<script setup>
    // PMS data
    const pmsData = ref([
        {
            bil: 1,
            namaKapal: 'KM SATRIA',
            namaAset: 'Engine Room',
            namaVendor: 'Vendor ABC',
            tarikhMula: '2024-01-15',
            tarikhTamat: '2024-02-15'
        },
        {
            bil: 2,
            namaKapal: 'KM MARLIN',
            namaAset: 'Bridge Equipment',
            namaVendor: 'Vendor XYZ',
            tarikhMula: '2024-03-01',
            tarikhTamat: '2024-04-01'
        },
        {
            bil: 3,
            namaKapal: 'KM NAGA',
            namaAset: 'Navigation System',
            namaVendor: 'Vendor DEF',
            tarikhMula: '2024-05-10',
            tarikhTamat: '2024-06-10'
        },
        {
            bil: 4,
            namaKapal: 'KM LEKIU',
            namaAset: 'Communication System',
            namaVendor: 'Vendor GHI',
            tarikhMula: '2024-07-20',
            tarikhTamat: '2024-08-20'
        },
        {
            bil: 5,
            namaKapal: 'KM JEBAT',
            namaAset: 'Safety Equipment',
            namaVendor: 'Vendor JKL',
            tarikhMula: '2024-09-05',
            tarikhTamat: '2024-10-05'
        }
    ]);

    // PMS Modal state
    const isPMSModalOpen = ref(false);
    const isEditingPMS = ref(false);
    const pmsForm = ref({
        bil: null,
        namaKapal: '',
        namaAset: '',
        namaVendor: '',
        tarikhMula: '',
        tarikhTamat: ''
    });

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ms-MY');
    };

    // Open modal for adding PMS
    const openAddPMSModal = () => {
        isEditingPMS.value = false;
        pmsForm.value = {
            bil: pmsData.value.length + 1,
            namaKapal: '',
            namaAset: '',
            namaVendor: '',
            tarikhMula: '',
            tarikhTamat: ''
        };
        isPMSModalOpen.value = true;
    };

    // Open modal for editing PMS
    const editPMSItem = (item) => {
        isEditingPMS.value = true;
        pmsForm.value = { ...item };
        isPMSModalOpen.value = true;
    };

    // Close PMS modal
    const closePMSModal = () => {
        isPMSModalOpen.value = false;
    };

    // Submit PMS form
    const submitPMSForm = () => {
        if (isEditingPMS.value) {
            // Update existing item
            const index = pmsData.value.findIndex((i) => i.bil === pmsForm.value.bil);
            if (index !== -1) {
                pmsData.value[index] = { ...pmsForm.value };
            }
        } else {
            // Add new item
            pmsData.value.push({
                ...pmsForm.value,
                bil: pmsData.value.length + 1
            });
        }
        closePMSModal();
    };

    // Delete PMS item
    const deletePMSItem = (bil) => {
        if (confirm('Adakah anda pasti untuk memadamkan rekod ini?')) {
            const index = pmsData.value.findIndex((i) => i.bil === bil);
            if (index !== -1) {
                pmsData.value.splice(index, 1);
                // Reorder bil numbers
                pmsData.value.forEach((item, idx) => {
                    item.bil = idx + 1;
                });
            }
        }
    };

    // Handle PMS FormKit form submission
    const handlePMSSubmit = (values) => {
        pmsForm.value = {
            ...pmsForm.value,
            ...values
        };
        submitPMSForm();
    };
</script>

<style lang="scss" scoped>

</style>    