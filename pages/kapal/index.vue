<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Papan Pemuka Pengurusan Kapal</h1>
      <p class="text-gray-600">Pantau dan urus armada anda</p>
    </div>

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Jumlah Kapal</p>
            <h3 class="text-2xl font-bold">150</h3>
          </div>
          <div class="p-3 bg-blue-100 rounded-full">
            <Icon class="text-primary" name="fluent:vehicle-ship-20-filled"></Icon>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Kapal Aktif</p>
            <h3 class="text-2xl font-bold">120</h3>
          </div>
          <div class="p-3 bg-green-100 rounded-full">
            <Icon class="text-primary" name="fluent:vehicle-ship-20-filled"></Icon>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Penyelenggaraan</p>
            <h3 class="text-2xl font-bold">25</h3>
          </div>
          <div class="p-3 bg-yellow-100 rounded-full">
            <Icon class="text-primary" name="fluent:vehicle-ship-20-filled"></Icon>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Tidak Aktif</p>
            <h3 class="text-2xl font-bold">5</h3>
          </div>
          <div class="p-3 bg-red-100 rounded-full">
            <Icon class="text-primary" name="fluent:vehicle-ship-20-filled"></Icon>
          </div>
        </div>
      </div>
    </div>

    <!-- Ship List Table -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Kapal Berdaftar</h2>
          <button  @click="$router.push('/kapal/add')" class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Icon class="text-white" name="material-symbols:add"></Icon>
            Tambah Kapal Baru
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <rs-table
            :data="ships"
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
                  data.text === 'Aktif'
                    ? 'success'
                    : data.text === 'Tidak Aktif'
                    ? 'warning'
                    : 'danger'
                "
              >
                {{ data.text }}
              </rs-badge>
            </template>
            <template v-slot:action="data">
              <button 
                @click="$router.push(`/kapalDetails`)"
                class="text-blue-600 hover:text-blue-800"
              >
                <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
              </button>
            </template>
          </rs-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const ships = [
  {
    id: 1,
    name: 'KD Kedah',
    imoNumber: 'IMO1234567',
    status: 'Aktif',
    type: 'Vessel',
    lastUpdated: '2024-03-15',
    action: 'Lihat'
  },
  // {
  //   id: 2,
  //   name: 'MV Pacific Voyager',
  //   imoNumber: 'IMO7654321',
  //   status: 'Penyelenggaraan',
  //   type: 'Pembawa Pukal',
  //   lastUpdated: '2024-03-14',
  //   action: 'Lihat'
  // },
  // {
  //   id: 3,
  //   name: 'MV Atlantic Explorer',
  //   imoNumber: 'IMO9876543',
  //   status: 'Aktif',
  //   type: 'Kapal Tangki',
  //   lastUpdated: '2024-03-13',
  //   action: 'Lihat'
  // },
  // {
  //   id: 4,
  //   name: 'MV Indian Ocean',
  //   imoNumber: 'IMO4567890',
  //   status: 'Tidak Aktif',
  //   type: 'Kontena',
  //   lastUpdated: '2024-03-12',
  //   action: 'Lihat'
  // }
]
</script>

<style lang="scss" scoped>
// Add any custom styles here
</style>