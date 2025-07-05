<template>
    <div class="p-6">
        <!-- Page Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-bold">Senarai Kapal / Bot</h1>
                <p class="text-gray-600">Dikemaskini sehingga 27/05/2025</p>
            </div>
            <button @click="showAddModal = true" class="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/80 transition-colors">
                <Icon name="material-symbols:add" />
                Tambah Aset
            </button>
        </div>

        <!-- Analytics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <!-- Jumlah Kapal -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Jumlah Kapal</p>
                    <h3 class="text-2xl font-bold">3</h3>
                </div>
                <div class="p-3 bg-blue-100 rounded-full">
                    <Icon class="text-primary" name="fluent:vehicle-ship-20-filled"></Icon>
                </div>
                </div>
            </div>

            <!-- Jumlah Bot -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Jumlah Bot</p>
                    <h3 class="text-2xl font-bold">7</h3>
                </div>
                <div class="p-3 bg-green-100 rounded-full">
                    <Icon class="text-primary" name="fluent:vehicle-ship-20-filled"></Icon>
                </div>
                </div>
            </div>

            <!-- Kapal OPS -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">OPS</p>
                    <h3 class="text-2xl font-bold"> Kapal 0 | Bot 0 </h3>
                </div>
                <div class="p-3 bg-yellow-100 rounded-full">
                    <Icon class="text-primary" name="fluent:vehicle-ship-20-filled"></Icon>
                </div>
                </div>
            </div>

            <!-- Kapal Non OPS -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Non OPS</p>
                    <h3 class="text-2xl font-bold"> Kapal 3 | Bot 7</h3>
                </div>
                <div class="p-3 bg-red-100 rounded-full">
                    <Icon class="text-primary" name="fluent:vehicle-ship-20-filled"></Icon>
                </div>
                </div>
            </div>

            

        </div>

        <!-- Table Section -->
        <div class="bg-white rounded-lg shadow p-6">
            <rs-table
                :data="tableData"
                :field="['bil', 'lokasi', 'namaVesel', 'jenisVesel', 'categoriAset', 'tindakan']"
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
                <template v-slot:categoriAset="row">
                    <span :class="{
                        'px-2 py-1 rounded-full text-xs': true,
                        'bg-green-100 text-green-800': row.text === 'OPS',
                        'bg-red-100 text-red-800': row.text === 'Non OPS'
                    }">
                        {{ row.text }}
                    </span>
                </template>
                
                <template v-slot:tindakan="row">
                    <div class="flex gap-2">
                        <button @click="$router.push(`/lihatVesel/${row.text}`)" class="text-blue-600 hover:text-blue-800">
                            <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
                        </button>
                        <button @click="editAsset(tableData[row.text])" class="text-blue-600 hover:text-blue-800">
                            <Icon class="text-primary" name="material-symbols:edit"></Icon>
                        </button>
                    </div>
                </template>
            </rs-table>
        </div>

        <!-- Add Asset Modal -->
        <rs-modal v-model="showAddModal" title="Tambah Aset Baru" size="lg" :ok-callback="handleSubmit" ok-title="Simpan" :cancel-callback="clickCancel">
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Lokasi</label>
                        <FormKit
                            type="text"
                            v-model="formData.lokasi"
                            placeholder="Masukkan lokasi"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Nama Vesel</label>
                        <FormKit
                            type="text"
                            v-model="formData.namaVesel"
                            placeholder="Masukkan nama vesel"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Jenis Vesel</label>
                        <FormKit
                            type="select"
                            v-model="formData.jenisVesel"
                            :options="['Kapal', 'Bot']"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Kategori Aset</label>
                        <FormKit
                            type="select"
                            v-model="formData.categoriAset"
                            :options="['OPS', 'Non OPS']"
                        />
                    </div>
                </div>
            </div>
        </rs-modal>

        <!-- Edit Asset Modal -->
        <rs-modal v-model="showEditModal" title="Edit Aset" size="lg" :ok-callback="handleEdit" ok-title="Simpan" :cancel-callback="clickCancel">
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Lokasi</label>
                        <FormKit
                            type="text"
                            v-model="editFormData.lokasi"
                            placeholder="Masukkan lokasi"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Nama Vesel</label>
                        <FormKit
                            type="text"
                            v-model="editFormData.namaVesel"
                            placeholder="Masukkan nama vesel"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Jenis Vesel</label>
                        <FormKit
                            type="select"
                            v-model="editFormData.jenisVesel"
                            :options="['Kapal', 'Bot']"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Kategori Aset</label>
                        <FormKit
                            type="select"
                            v-model="editFormData.categoriAset"
                            :options="['OPS', 'Non OPS']"
                        />
                    </div>
                </div>
            </div>
        </rs-modal>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const tableData = ref([
    {
        bil: 1,
        lokasi: 'IBU PEJABAT MARITIM NEGERI KEDAH / PERLIS',
        namaVesel: 'KM SIANGIN',
        jenisVesel: 'Kapal',
        categoriAset: 'Non OPS',
        id: '1'
    },
    {
        bil: 2,
        lokasi: 'IBU PEJABAT MARITIM NEGERI KEDAH / PERLIS',
        namaVesel: 'KM TENGGOL',
        jenisVesel: 'Kapal',
        categoriAset: 'Non OPS',
        id: '2'
    },
    {
        bil: 3,
        lokasi: 'IBU PEJABAT MARITIM NEGERI KEDAH / PERLIS',
        namaVesel: 'PERKASA 28',
        jenisVesel: 'Bot',
        categoriAset: 'OPS',
        id: '3'
    },
    {
        bil: 4,
        lokasi: 'IBU PEJABAT MARITIM NEGERI KEDAH / PERLIS',
        namaVesel: 'PETIR 81',
        jenisVesel: 'Bot',
        categoriAset: 'Non OPS',
        id: '4'
    },
])

const showAddModal = ref(false)
const showEditModal = ref(false)

// Initialize form data with default values
const defaultFormData = {
    lokasi: '',
    namaVesel: '',
    jenisVesel: 'Kapal',
    categoriAset: 'OPS'
}

const formData = ref({ ...defaultFormData })
const editFormData = ref({
    id: '',
    lokasi: '',
    namaVesel: '',
    jenisVesel: '',
    categoriAset: ''
})

// Form validation
const validateForm = (data) => {
    if (!data.lokasi?.trim()) return 'Lokasi is required'
    if (!data.namaVesel?.trim()) return 'Nama Vesel is required'
    if (!data.jenisVesel) return 'Jenis Vesel is required'
    if (!data.categoriAset) return 'Kategori Aset is required'
    return null
}

// Handle new asset submission
const handleSubmit = () => {
    console.log('Form submitted:', formData.value) // Debug log

    const error = validateForm(formData.value)
    if (error) {
        alert(error)
        return
    }

    try {
        // Generate new ID and bil number
        const newId = (Math.max(...tableData.value.map(item => parseInt(item.id))) + 1).toString()
        const newBil = Math.max(...tableData.value.map(item => item.bil)) + 1

        // Create new asset object
        const newAsset = {
            bil: newBil,
            lokasi: formData.value.lokasi.trim(),
            namaVesel: formData.value.namaVesel.trim(),
            jenisVesel: formData.value.jenisVesel,
            categoriAset: formData.value.categoriAset,
            id: newId
        }
        
        // console.log('New asset to be added:', newAsset) // Debug log
        
        // Add to table data
        tableData.value = [...tableData.value, newAsset]
        
        // Reset form and close modal
        formData.value = { ...defaultFormData }
        showAddModal.value = false

        // Optional: Show success message
        alert('Asset added successfully')
    } catch (error) {
        console.error('Error adding asset:', error)
        alert('Failed to add asset. Please try again.')
    }
}

const clickCancel = () => {
    showAddModal.value = false
    showEditModal.value = false
    // Reset forms
    formData.value = { ...defaultFormData }
    editFormData.value = {
        id: '',
        lokasi: '',
        namaVesel: '',
        jenisVesel: '',
        categoriAset: ''
    }
}

// Handle edit asset
const editAsset = (rowData) => {
    console.log('Editing row:', rowData) // Debug log
    if (!rowData) {
        console.error('No row data provided')
        return
    }
    // Clone the row data to avoid direct reference
    editFormData.value = {
        id: rowData.id,
        lokasi: rowData.lokasi || '',
        namaVesel: rowData.namaVesel || '',
        jenisVesel: rowData.jenisVesel || 'Kapal',
        categoriAset: rowData.categoriAset || 'OPS'
    }
    showEditModal.value = true
}

// Handle edit submission
const handleEdit = () => {
    console.log('Edit form submitted:', editFormData.value) // Debug log

    const error = validateForm(editFormData.value)
    if (error) {
        alert(error)
        return false // Return false to prevent modal from closing
    }

    try {
        const index = tableData.value.findIndex(item => item.id === editFormData.value.id)
        if (index !== -1) {
            // Update the existing record while preserving bil and id
            const updatedAsset = {
                ...tableData.value[index], // Keep existing data
                lokasi: editFormData.value.lokasi.trim(),
                namaVesel: editFormData.value.namaVesel.trim(),
                jenisVesel: editFormData.value.jenisVesel,
                categoriAset: editFormData.value.categoriAset
            }
            
            console.log('Updated asset:', updatedAsset) // Debug log
            
            // Update table data using spread operator to trigger reactivity
            tableData.value = [
                ...tableData.value.slice(0, index),
                updatedAsset,
                ...tableData.value.slice(index + 1)
            ]
            
            // Optional: Show success message
            alert('Asset updated successfully')
            showEditModal.value = false

            return true // Return true to close the modal
        }
    } catch (error) {
        console.error('Error updating asset:', error)
        alert('Failed to update asset. Please try again.')
        return false // Return false to prevent modal from closing
    }
}

// Watch for modal close to reset forms
watch(showAddModal, (newValue) => {
    if (!newValue) {
        formData.value = { ...defaultFormData }
    }
})

watch(showEditModal, (newValue) => {
    if (!newValue) {
        editFormData.value = {
            id: '',
            lokasi: '',
            namaVesel: '',
            jenisVesel: '',
            categoriAset: ''
        }
    }
})

// Debug watcher for tableData
watch(tableData, (newValue) => {
    console.log('Table data updated:', newValue)
}, { deep: true })
</script>

<style lang="scss" scoped>

</style>