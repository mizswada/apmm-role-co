<template>
    <div class="p-6">
    <!-- Page Header -->
    <div class="mb-6">
        <h1 class="text-2xl font-bold">Pendaftaran Kapal</h1>
        <p class="text-gray-600">Daftar aset maritim baru</p>
    </div>

    <!-- Add Ship Form -->
    <div class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information Section -->
        <div class="border-b pb-6">
            <h2 class="text-lg font-semibold mb-4">Maklumat Asas</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Ship Name -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kapal</label>
                <input
                type="text"
                v-model="form.shipName"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nama kapal"
                required
                />
            </div>

            <!-- IMO Number -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombor IMO</label>
                <input
                type="text"
                v-model="form.imoNumber"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nombor IMO"
                required
                />
            </div>

            <!-- Call Sign -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tanda Panggilan</label>
                <input
                type="text"
                v-model="form.callSign"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan tanda panggilan"
                required
                />
            </div>

            <!-- MMSI Number -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombor MMSI</label>
                <input
                type="text"
                v-model="form.mmsiNumber"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nombor MMSI"
                required
                />
            </div>
            </div>
        </div>

        <!-- Technical Specifications Section -->
        <div class="border-b pb-6">
            <h2 class="text-lg font-semibold mb-4">Spesifikasi Teknikal</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Ship Type -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Kapal</label>
                <select
                v-model="form.shipType"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                >
                <option value="">Pilih jenis kapal</option>
                <option value="container">Kontena</option>
                <option value="bulk">Pembawa Pukal</option>
                <option value="tanker">Kapal Tangki</option>
                <option value="general">Kargo Am</option>
                <option value="passenger">Penumpang</option>
                <option value="fishing">Kapal Nelayan</option>
                <option value="offshore">Sokongan Luar Pesisir</option>
                </select>
            </div>

            <!-- Gross Tonnage -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Berat Kasar</label>
                <input
                type="number"
                v-model="form.grossTonnage"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan berat kasar"
                required
                />
            </div>

            <!-- Length Overall -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Panjang Keseluruhan (m)</label>
                <input
                type="number"
                v-model="form.lengthOverall"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan panjang keseluruhan"
                required
                />
            </div>

            <!-- Breadth -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Lebar (m)</label>
                <input
                type="number"
                v-model="form.breadth"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan lebar"
                required
                />
            </div>

            <!-- Draft -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Draf (m)</label>
                <input
                type="number"
                v-model="form.draft"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan draf"
                required
                />
            </div>

            <!-- Year Built -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tahun Dibina</label>
                <input
                type="number"
                v-model="form.yearBuilt"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan tahun dibina"
                required
                />
            </div>
            </div>
        </div>

        <!-- Registration Details Section -->
        <div class="border-b pb-6">
            <h2 class="text-lg font-semibold mb-4">Butiran Pendaftaran</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Flag State -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Negara Bendera</label>
                <input
                type="text"
                v-model="form.flagState"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan negara bendera"
                required
                />
            </div>

            <!-- Port of Registry -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Pelabuhan Pendaftaran</label>
                <input
                type="text"
                v-model="form.portOfRegistry"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan pelabuhan pendaftaran"
                required
                />
            </div>

            <!-- Classification Society -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Persatuan Klasifikasi</label>
                <select
                v-model="form.classificationSociety"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                >
                <option value="">Pilih persatuan klasifikasi</option>
                <option value="abs">ABS</option>
                <option value="dnv">DNV</option>
                <option value="lr">Lloyd's Register</option>
                <option value="bureau-veritas">Bureau Veritas</option>
                <option value="class-nk">Class NK</option>
                <option value="other">Lain-lain</option>
                </select>
            </div>

            <!-- Status -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                v-model="form.status"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                >
                <option value="">Pilih status</option>
                <option value="active">Aktif</option>
                <option value="maintenance">Penyelenggaraan</option>
                <option value="inactive">Tidak Aktif</option>
                <option value="laid-up">Disimpan</option>
                </select>
            </div>
            </div>
        </div>

        <!-- Additional Information -->
        <div>
            <h2 class="text-lg font-semibold mb-4">Maklumat Tambahan</h2>
            <div class="grid grid-cols-1 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                <textarea
                v-model="form.remarks"
                class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Masukkan sebarang catatan tambahan"
                ></textarea>
            </div>
            </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end gap-4">
            <button
            type="button"
            @click="$router.push('/kapal')"
            class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
            Batal
            </button>
            <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
            Daftar Kapal
            </button>
        </div>
        </form>
    </div>
    </div>
</template>

<script setup>
definePageMeta({
  title: "Tambah Kapal",
  // middleware: ["auth"], // This is for Login Auth for page
  // requiresAuth: true,  // This is use for Login Auth for page
});
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  // Basic Information
  shipName: '',
  imoNumber: '',
  callSign: '',
  mmsiNumber: '',
  
  // Technical Specifications
  shipType: '',
  grossTonnage: '',
  lengthOverall: '',
  breadth: '',
  draft: '',
  yearBuilt: '',
  
  // Registration Details
  flagState: '',
  portOfRegistry: '',
  classificationSociety: '',
  status: '',
  
  // Additional Information
  remarks: ''
})


</script>

<style lang="scss" scoped>
// Add any custom styles here
</style>