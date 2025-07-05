<template>
  <div class="space-y-8">
    <!-- Page Title -->
    <div class="flex items-center gap-2">
      <i class="ri-settings-4-line text-xl"></i>
      <!-- <h1 class="text-2xl font-bold">Kemas kini Sistem - SMTP</h1> -->
      <h2 class="text-lg font-semibold 6">Konfigurasi dan Cubaan SMTP</h2>

    </div> 
    <!-- SMTP Configuration Section -->
    <div class="bg-white rounded-lg p-6 shadow-sm">
      
      <!-- Configuration Form -->
      <div class="space-y-6">
        <h3 class="font-medium">Konfigurasi</h3>
        <FormKit type="form" @submit="handleConfigSubmit" #default="{ state }" :actions="false">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- SMTP Host -->
            <FormKit
              type="text"
              name="smtpHost"
              label="SMTP Host"
              validation="required"
              placeholder="smtp.gmail.com"
              v-model="config.smtpHost"
            />

            <!-- Port -->
            <FormKit
              type="text"
              name="port"
              label="Port"
              validation="required|number"
              placeholder="587"
              v-model="config.port"
            />

            <!-- Username -->
            <FormKit
              type="email"
              name="username"
              label="Username"
              validation="required|email"
              placeholder="mmea.mcglis@gmail.com"
              v-model="config.username"
            />

            <!-- Password -->
            <FormKit
              type="password"
              name="password"
              label="Katalaluan"
              validation="required"
              placeholder="••••••••••••"
              v-model="config.password"
            />

            <!-- Sender Email -->
            <FormKit
              type="email"
              name="senderEmail"
              label="Penghantar Emel"
              validation="required|email"
              placeholder="mmea.mcglis@gmail.com"
              v-model="config.senderEmail"
            />
          </div>

          <div class="flex justify-between mt-6">
            <FormKit
              type="button"
              @click="resetForm"
              input-class="!bg-orange-500"
            >
              Set Semula
            </FormKit>
            <FormKit
              type="submit"
              input-class="!bg-primary"
            >
              Simpan
            </FormKit>
          </div>
        </FormKit>
      </div>
    </div>

    <div class="space-y-4">
        <div class="bg-white rounded-lg p-6 shadow-sm">         
        <!-- SMTP Test Section -->
        <div class="mt-8 space-y-6">
          <h3 class="font-medium">Cubaan SMTP</h3>
          <FormKit :actions="false" type="form" @submit="handleTestSubmit" >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Recipient Email -->
              <FormKit
                type="email"
                name="recipientEmail"
                label="Penerima Emel"
                validation="required|email"
                placeholder="fairuz.yusoff@mimos.my"
                v-model="testEmail.recipientEmail"
              />

              <!-- Subject -->
              <FormKit
                type="text"
                name="subject"
                label="Subjek"
                validation="required"
                placeholder="Cubaan Subjek"
                v-model="testEmail.subject"
              />

              <FormKit
              type="textarea"
              name="message"
              label="Teks Mesej"
              validation="required"
              placeholder="Ini mesej percubaan"
              class="mt-6"
              v-model="testEmail.message"
            />
            </div>

            <!-- Message -->          

            <div class="flex justify-end mt-6">
              <FormKit
                type="submit"
                input-class="!bg-primary"
              >
                Hantar
              </FormKit>
            </div>
          </FormKit>
        </div>
        </div>
    </div>

    <!-- SMTP Response Log Section -->
    <div class="bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-6">Log Respons SMTP</h2>
      
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Start Date -->
          
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

        <!-- Log Table -->
        <div class="mt-6">
          <rs-table
            :data="logData"
            :columns="columns"
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// SMTP Configuration
const config = ref({
  smtpHost: '',
  port: '',
  username: '',
  password: '',
  senderEmail: ''
})

// Test Email
const testEmail = ref({
  recipientEmail: '',
  subject: '',
  message: ''
})

// Log Filtering
const logFilter = ref({
  ipAddress: '',
  user: 'all',
  startDate: '',
  endDate: ''
})

// Table Configuration
const columns = [
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
    username: 'Ahmad Kamal',
    activityType: 'Konfigurasi SMTP',
    description: 'Kemaskini tetapan SMTP server',
    ipAddress: '192.168.1.100',
    status: 'Success'
  },
  {
    datetime: '2024-03-20 09:30:45',
    username: 'Nurul Huda',
    activityType: 'Hantar Emel',
    description: 'Cubaan penghantaran emel ujian',
    ipAddress: '192.168.1.101',
    status: 'Error'
  },
  {
    datetime: '2024-03-20 10:00:12',
    username: 'Mohd Rizal',
    activityType: 'Konfigurasi SMTP',
    description: 'Tukar kata laluan SMTP',
    ipAddress: '192.168.1.102',
    status: 'Success'
  },
  {
    datetime: '2024-03-20 10:15:30',
    username: 'Siti Aminah',
    activityType: 'Hantar Emel',
    description: 'Penghantaran emel notifikasi',
    ipAddress: '192.168.1.103',
    status: 'Pending'
  },
  {
    datetime: '2024-03-20 10:45:18',
    username: 'Zulkifli Hassan',
    activityType: 'Konfigurasi SMTP',
    description: 'Reset tetapan SMTP',
    ipAddress: '192.168.1.104',
    status: 'Success'
  }
])

// Pagination Configuration
const pagination = ref({
  total: 50,
  current: 1,
  pageSize: 10
})

// Page Change Handler
const handlePageChange = (page) => {
  pagination.value.current = page
  // Add your pagination logic here
}

// Form Handlers
const handleConfigSubmit = async (formData) => {
  try {
    // Handle SMTP configuration submission
    console.log('Submitting config:', formData)
    // Add your API call here
  } catch (error) {
    console.error('Error saving config:', error)
  }
}

const handleTestSubmit = async (formData) => {
  try {
    // Handle test email submission
    console.log('Sending test email:', formData)
    // Add your API call here
  } catch (error) {
    console.error('Error sending test email:', error)
  }
}

const resetForm = () => {
  config.value = {
    smtpHost: '',
    port: '',
    username: '',
    password: '',
    senderEmail: ''
  }
}

const filterLogs = () => {
  // Handle log filtering
  console.log('Filtering logs with:', logFilter.value)
  // Add your log filtering logic here
}
</script>

<style lang="scss" scoped>

</style>