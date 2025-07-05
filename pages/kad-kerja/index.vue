<template>
    <div class="p-6">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Laman Utama Kad Kerja</h1>
        <p class="text-gray-600">Pantau dan urus kad kerja anda</p>
      </div>
  
      <!-- Analytics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Jumlah Kad Kerja</p>
              <h3 class="text-2xl font-bold">150</h3>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <Icon class="text-primary" name="material-symbols:work-outline"></Icon>
            </div>
          </div>
        </div>
  
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Dalam Proses</p>
              <h3 class="text-2xl font-bold">120</h3>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <Icon class="text-primary" name="material-symbols:work-outline"></Icon>
            </div>
          </div>
        </div>
  
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Menunggu</p>
              <h3 class="text-2xl font-bold">25</h3>
            </div>
            <div class="p-3 bg-yellow-100 rounded-full">
              <Icon class="text-primary" name="material-symbols:work-outline"></Icon>
            </div>
          </div>
        </div>
  
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Selesai</p>
              <h3 class="text-2xl font-bold">5</h3>
            </div>
            <div class="p-3 bg-red-100 rounded-full">
              <Icon class="text-primary" name="material-symbols:work-outline"></Icon>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Job Card List Table -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Senarai Kad Kerja</h2>
            <button @click="$router.push('/kad-kerja/add')" class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Icon class="text-white" name="material-symbols:add"></Icon>
              Tambah Kad Kerja Baru
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <rs-table
              :data="jobCards"
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
              <template v-slot:status="data">
                <rs-badge
                  :variant="
                    data.text === 'Dalam Proses'
                      ? 'success'
                      : data.text === 'Menunggu Pengesahan'
                      ? 'warning'
                      : 'danger'
                  "
                >
                  {{ data.text }}
                </rs-badge>
              </template>
              <template v-slot:action="data">               
                <button   v-if="data.text === 'Menunggu Pengesahan'"
                  @click="$router.push(`/kad-kerja/${data.value.id}/pengesahan`)" 
                  class="text-blue-600 hover:text-blue-800" >
                  <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
                </button>
                <button   v-if="data.text === 'Penilaian Alat Ganti'"
                  @click="$router.push(`/kad-kerja/${data.value.id}/penilaian-alat-ganti`)" 
                  class="text-blue-600 hover:text-blue-800" >
                  <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
                </button>
                <button   v-if="data.text === 'Kelulusan Kerja'"
                  @click="$router.push(`/kad-kerja/${data.value.id}/kelulusan-kerja`)" 
                  class="text-blue-600 hover:text-blue-800" >
                  <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
                </button>
                <!-- <button @click="$router.push(`/kad-kerja/${data.value.id}`)" class="text-blue-600 hover:text-blue-800" >
                  <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
                </button> -->
              </template>
            </rs-table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const jobCards = [
    {
      id: 1,
      title: 'Penyelenggaraan Enjin',
      jobNumber: 'JC1234567',
      status: 'Menunggu Pengesahan',
      department: 'Kejuruteraan',
      lastUpdated: '2024-03-15',
      action: 'Menunggu Pengesahan'
    },
    {
      id: 2,
      title: 'Pemeriksaan Keselamatan',
      jobNumber: 'JC7654321',
      status: 'Penilaian Alat Ganti',
      department: 'Keselamatan',
      lastUpdated: '2024-03-14',
      action: 'Penilaian Alat Ganti'
    },
    {
      id: 3,
      title: 'Pembaikan Elektrik',
      jobNumber: 'JC9876543',
      status: 'Kelulusan Kerja',
      department: 'Elektrik',
      lastUpdated: '2024-03-13',
      action: 'Kelulusan Kerja'
    },
    {
      id: 4,
      title: 'Pembersihan Badan Kapal',
      jobNumber: 'JC4567890',
      status: 'Selesai',
      department: 'Penyelenggaraan',
      lastUpdated: '2024-03-12',
      action: 'Lihat'
    }
  ]
  </script>
  
  <style lang="scss" scoped>
  // Add any custom styles here
  </style>