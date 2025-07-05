<template>
    <div class="space-y-6">
        <!-- Database Configuration Section -->
        <rs-card>
            <template #header>
                <div class="flex justify-between items-center">
                    <h1 class="text-xl font-semibold">Konfigurasi dan Status Pangkalan Data APMM</h1>
                    <RsButton variant="primary" @click="openAddModal">
                        Tambah Pangkalan Data
                    </RsButton>
                </div>
            </template>
            
            <div class="overflow-x-auto">
                <RsTable
                    :columns="columns"
                    :data="databases"
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
                    <template v-slot:nama="item">
                        {{ item.nama }}
                    </template>
                    <template v-slot:host="item">
                        {{ item.value.host }}
                    </template>
                    <template v-slot:port="item">
                        {{ item.value.port }}
                    </template>
                    <template v-slot:username="item">
                        {{ item.value.username }}
                    </template>
                    <template v-slot:status="item">
                        {{ item.value.status }}
                    </template>
                    <template v-slot:lastUpdate="item">
                        {{ item.value.lastUpdate }}
                    </template>
                    <template v-slot:actions="item">
                        <div class="flex gap-2">
                            <button @click="openEditModal(item.value)">
                                <Icon class="text-primary" name="material-symbols:edit"></Icon>
                            </button>
                        </div>
                    </template>
                </RsTable>
            </div>
        </rs-card>

        <!-- SMTP Response Log Section -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
            <h2 class="text-lg font-semibold mb-6">Log Respons Sambungan Database APMM</h2>
            
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <!-- IP Address -->
                    <FormKit
                        type="text"
                        name="ipAddress"
                        label="Alamat IP"
                        placeholder="0.0.0.0/0"
                        v-model="logFilter.ipAddress"
                    />
                    <!-- User Filter -->
                    <FormKit
                        type="select"
                        name="user"
                        label="Pengguna"
                        :options="[{ label: 'All', value: 'all' }]"
                        placeholder="All"
                        v-model="logFilter.user"
                    />
                    <!-- Start Date -->
                    <FormKit
                        type="date"
                        name="startDate"
                        label="Tarikh Mula"
                        v-model="logFilter.startDate"
                    />
                    <!-- End Date -->
                    <FormKit
                        type="date"
                        name="endDate"
                        label="Tarikh Tamat"
                        v-model="logFilter.endDate"
                    />
                </div>

                <div class="flex justify-end">
                    <FormKit
                        type="button"
                        @click="filterLogs"
                        input-class="!bg-primary"
                    >
                        Tapis
                    </FormKit>
                </div>
                            
            </div>

            <!-- Log Table -->
            <div class="mt-6">
                <rs-table
                    :data="logData"
                    :columns="columns_logs"
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
                    <template v-slot:datetime="data">
                        {{ data.value.datetime }}
                    </template>
                    <template v-slot:username="data">
                        {{ data.value.username }}
                    </template>
                    <template v-slot:activityType="data">
                        {{ data.value.activityType }}
                    </template>
                    <template v-slot:description="data">
                        {{ data.value.description }}
                    </template>
                    <template v-slot:ipAddress="data">
                        {{ data.value.ipAddress }}
                    </template>
                    <template v-slot:status="data">
                        {{ data.value.status }}
                    </template>
                    
                    
                </rs-table>
            </div>
        </div>

        <!-- Edit Modal -->
        <rs-modal
            v-model="showEditModal"
            title="Kemaskini Data"
            size="lg"
            @close="closeEditModal"
        >
            <div class="space-y-4">
                <div class="form-group">
                    <label class="form-label">Pangkalan Data</label>
                    <FormKit  type="text" v-model="editForm.name" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">Host</label>
                    <FormKit  type="text" v-model="editForm.host" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">No. Port</label>
                    <FormKit  type="text" v-model="editForm.port" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">Nama Pengguna</label>
                    <FormKit  type="text" v-model="editForm.username" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">Kata Laluan</label>
                    <FormKit  type="password" v-model="editForm.password" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">Status Online</label>
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>{{ editForm.status }}</span>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <RsButton variant="secondary" @click="closeEditModal">Tutup</RsButton>
                    <RsButton variant="primary" @click="saveEdit">Kemaskini</RsButton>
                </div>
            </template>
        </rs-modal>

        <!-- Add Modal -->
        <rs-modal
            v-model="showAddModal"
            title="Tambah Pangkalan Data"
            size="lg"
            @close="closeAddModal"
        >
            <div class="space-y-4">
                <div class="form-group">
                    <label class="form-label">Pangkalan Data</label>
                    <FormKit type="text" v-model="addForm.name" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">Host</label>
                    <FormKit type="text" v-model="addForm.host" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">No. Port</label>
                    <FormKit type="text" v-model="addForm.port" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">Nama Pengguna</label>
                    <FormKit type="text" v-model="addForm.username" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">Kata Laluan</label>
                    <FormKit type="password" v-model="addForm.password" class="form-control" />
                </div>
            </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <RsButton variant="secondary" @click="closeAddModal">Tutup</RsButton>
                    <RsButton variant="primary" @click="saveAdd">Simpan</RsButton>
                </div>
            </template>
        </rs-modal>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = [
    { key: 'name', label: 'Pangkalan Data', sortable: true },
    { key: 'host', label: 'Host', sortable: true },
    { key: 'port', label: 'No. Port', sortable: true },
    { key: 'username', label: 'Nama Pengguna', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'lastUpdate', label: 'Tarikh Kemaskini', sortable: true },
    { key: 'actions', label: 'Tindakan' }
]

const databases = ref([
    {
        name: 'apmm',
        host: '10.1.69.87',
        port: '3306',
        username: 'usr_apmm',
        status: 'Online',
        lastUpdate: '13/4/2023, 2:51:54 PM',
        actions: ''
    },
    {
        name: 'apmm_1',
        host: '10.1.69.87',
        port: '3306',
        username: 'usr_apmm',
        status: 'Online',
        lastUpdate: '27/1/2023, 6:14:19 PM',
        actions: ''
    },
    {
        name: 'apmm_2',
        host: '10.1.69.87',
        port: '3306',
        username: 'usr_apmm',
        status: 'Online',
        lastUpdate: '27/1/2023, 6:26:30 PM',
        actions: ''
    },
    {
        name: 'apmm_3',
        host: '10.1.69.87',
        port: '3306',
        username: 'usr_apmm',
        status: 'Online',
        lastUpdate: '27/1/2023, 6:24:26 PM',
        actions: ''
    },
    {
        name: 'spm',
        host: '10.1.69.87',
        port: '3306',
        username: 'usr_apmm',
        status: 'Online',
        lastUpdate: '23/2/2023, 5:30:57 PM',
        actions: ''
    }
])

const filters = ref({
    ip: '0.0.0.0/0',
    user: '',
    startDate: '',
    endDate: ''
})

const showEditModal = ref(false)
const editForm = ref({
    name: '',
    host: '',
    port: '',
    username: '',
    password: '',
    status: 'Online'
})

const openEditModal = (item) => {
    editForm.value = { ...item, password: '' }
    showEditModal.value = true
}

const closeEditModal = () => {
    showEditModal.value = false
    editForm.value = {
        name: '',
        host: '',
        port: '',
        username: '',
        password: '',
        status: 'Online'
    }
}

const saveEdit = () => {
    // Here you would typically make an API call to save the changes
    const index = databases.value.findIndex(db => db.name === editForm.value.name)
    if (index !== -1) {
        databases.value[index] = {
            ...databases.value[index],
            ...editForm.value,
            lastUpdate: new Date().toLocaleString()
        }
    }
    closeEditModal()
}

const resetFilters = () => {
    filters.value = {
        ip: '0.0.0.0/0',
        user: '',
        startDate: '',
        endDate: ''
    }
}

const applyFilters = () => {
    // Implement filter logic here
    console.log('Applying filters:', filters.value)
}

// Log Filtering
const logFilter = ref({
  ipAddress: '',
  user: 'all',
  startDate: '',
  endDate: ''
})

const filterLogs = () => {
    // Implement filter logic here
    console.log('Applying filters:', logFilter.value)
}

const columns_logs = [
  {
    title: 'Tarikh dan Masa',
    key: 'datetime',
    sortable: true
  },
  {
    title: 'Nama Pengguna',
    key: 'username',
    sortable: true
  },
  {
    title: 'Jenis Aktiviti',
    key: 'activityType',
    sortable: true
  },
  {
    title: 'Penerangan',
    key: 'description'
  },
  {
    title: 'Alamat IP',
    key: 'ipAddress'
  },
  {
    title: 'Status',
    key: 'status',
    customRender: (text) => {
      const statusClasses = {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800'
      }
      return {
        children: text,
        props: {
          className: `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[text.toLowerCase()]}`
        }
      }
    }
  }
]

// Sample Data
const logData = ref([
  {
    datetime: '2024-03-20 09:15:23',
    username: 'usr_apmm',
    activityType: 'Sambungan Database',
    description: 'Sambungan berjaya ke dbops2',
    ipAddress: '10.1.69.87',
    status: 'Success'
  },
  {
    datetime: '2024-03-20 09:30:45',
    username: 'usr_apmm',
    activityType: 'Cubaan Sambungan',
    description: 'Ralat sambungan ke dbsam - Connection timeout',
    ipAddress: '10.1.69.87',
    status: 'Error'
  },
  {
    datetime: '2024-03-20 10:00:12',
    username: 'usr_apmm',
    activityType: 'Kemaskini Konfigurasi',
    description: 'Kemaskini port untuk dbsar_new dari 3306 ke 3307',
    ipAddress: '10.1.69.87',
    status: 'Success'
  },
  {
    datetime: '2024-03-20 10:15:30',
    username: 'usr_apmm',
    activityType: 'Sambungan Semula',
    description: 'Cubaan sambungan semula ke mymdi',
    ipAddress: '10.1.69.87',
    status: 'Pending'
  },
  {
    datetime: '2024-03-20 10:45:18',
    username: 'usr_apmm',
    activityType: 'Pengesahan Sambungan',
    description: 'Sambungan berjaya ke spm',
    ipAddress: '10.1.69.87',
    status: 'Success'
  },
  {
    datetime: '2024-03-20 11:00:33',
    username: 'usr_apmm',
    activityType: 'Kemaskini Kredential',
    description: 'Kemaskini kata laluan untuk dbops2',
    ipAddress: '10.1.69.87',
    status: 'Success'
  },
  {
    datetime: '2024-03-20 11:15:42',
    username: 'usr_apmm',
    activityType: 'Sambungan Database',
    description: 'Ralat autentikasi pada dbsam - Invalid credentials',
    ipAddress: '10.1.69.87',
    status: 'Error'
  },
  {
    datetime: '2024-03-20 11:30:55',
    username: 'usr_apmm',
    activityType: 'Ujian Sambungan',
    description: 'Ujian sambungan berjaya untuk semua pangkalan data',
    ipAddress: '10.1.69.87',
    status: 'Success'
  }
])

const showAddModal = ref(false)
const addForm = ref({
    name: '',
    host: '',
    port: '',
    username: '',
    password: ''
})

const openAddModal = () => {
    showAddModal.value = true
}

const closeAddModal = () => {
    showAddModal.value = false
    addForm.value = {
        name: '',
        host: '',
        port: '',
        username: '',
        password: ''
    }
}

const saveAdd = () => {
    // Here you would typically make an API call to save the new database
    databases.value.push({
        name: addForm.value.name,
        host: addForm.value.host,
        port: addForm.value.port,
        username: addForm.value.username,
        status: 'Online',
        lastUpdate: new Date().toLocaleString(),
        actions: ''
    })
    closeAddModal()
}
</script>

<style lang="scss" scoped>
.space-y-6 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1.5rem;
}


</style>