<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">Audit Trail</h1>

        <div class="p-6 bg-white rounded-lg shadow">
                <!-- Search Form -->
                <RsFieldset label="Tapisan Audit Trail" class="mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormKit
                            type="select"
                            label="Kategori"
                            name="kategori"
                            placeholder="Semua"
                            :options="['Semua']"
                        />
                        
                        <FormKit
                            type="select"
                            label="Sub Kategori"
                            name="subKategori"
                            placeholder="All"
                            :options="['All']"
                        />

                        <FormKit
                            type="select"
                            label="Jenis Aktiviti"
                            name="jenisAktiviti" 
                            placeholder="Semua"
                            :options="['Semua']"
                        />

                        <FormKit
                            type="text"
                            label="Alamat IP"
                            name="alamatIP"
                            placeholder="0.0.0.0/0"
                        />

                        <FormKit
                            type="select"
                            label="Pengguna"
                            name="pengguna"
                            placeholder="All"
                            :options="['All']"
                        />

                        <FormKit
                            type="number"
                            label="Papar/Rekod"
                            name="paparRekod"
                            placeholder="10"
                            value="10"
                        />

                        <FormKit
                            type="date"
                            label="Tarikh Mula"
                            name="tarikhMula"
                        />

                        <FormKit
                            type="date"
                            label="Tarikh Tamat"
                            name="tarikhTamat"
                        />
                    </div>

                    <div class="flex justify-between mt-4">
                        <RsButton variant="primary-text" @click="resetForm">Set Semula</RsButton>
                        <RsButton @click="searchRecords">Tapis</RsButton>
                    </div>
                </RsFieldset>
        </div>
        <!-- Audit Trail Table -->
        <div class="p-6 mt-4 bg-white rounded-lg shadow">
            <rs-table
                :data="auditTrailData"
                :field="['bil', 'tarikhDanMasa', 'namaPenguna','kategori', 'penerangan', 'jenisAktiviti', 'alamatIP', 'status']"
                :options="{
                    variant: 'default',
                    striped: true,
                    borderless: true,
                    hover: true
                }"
                :options-advanced="{
                    filterable: false,
                    outsideBorder: true,
                    responsive: true
                }"
                advanced
            >
            <template v-slot:bil="data">
                {{ data.value.num }}
            </template>

            <template v-slot:tarikhDanMasa="data">
                {{ data.value.tarikhDanMasa }}
            </template>

            <template v-slot:namaPengguna="data">
                {{ data.value.namaPengguna }}
            </template>

            <template v-slot:kategoriSubKategori="data">
                {{ data.value.kategoriSubKategori }}
            </template>     

            <template v-slot:penerangan="data">
                {{ data.value.penerangan }}
            </template>

            <template v-slot:jenisAktiviti="data">
                {{ data.value.jenisAktiviti }}
            </template>

            <template v-slot:alamatIP="data">
                {{ data.value.alamatIP }}
            </template>

            <template v-slot:status="data">               
                <rs-badge :variant="data.value.status === 'Berjaya' ? 'success' : 'danger'">
                    {{ data.value.status }}
                </rs-badge>
            </template>            
            
            </rs-table>
        </div>
    </div>
</template>

<script setup>
const auditTrailData = ref([
  {
    num: 1,
    tarikhDanMasa: '2024-03-27 09:15:23',
    namaPengguna: 'Ahmad Bin Abdullah',
    kategoriSubKategori: 'Pengguna / Profil',
    penerangan: 'Kemaskini maklumat profil pengguna',
    jenisAktiviti: 'Kemaskini',
    alamatIP: '192.168.1.100',
    status: 'Berjaya'
  },
  {
    num: 2,
    tarikhDanMasa: '2024-03-27 09:10:45',
    namaPengguna: 'Sarah Binti Mohamed',
    kategoriSubKategori: 'Sistem / Konfigurasi',
    penerangan: 'Penetapan parameter sistem',
    jenisAktiviti: 'Tambah',
    alamatIP: '192.168.1.101',
    status: 'Berjaya'
  },
  {
    num: 3,
    tarikhDanMasa: '2024-03-27 09:05:12',
    namaPengguna: 'Raj Kumar',
    kategoriSubKategori: 'Laporan / Bulanan',
    penerangan: 'Muat turun laporan bulanan',
    jenisAktiviti: 'Muat Turun',
    alamatIP: '192.168.1.102',
    status: 'Berjaya'
  },
  {
    num: 4,
    tarikhDanMasa: '2024-03-27 09:00:30',
    namaPengguna: 'Lee Wei Ming',
    kategoriSubKategori: 'Dokumen / Surat',
    penerangan: 'Penghapusan surat lama',
    jenisAktiviti: 'Padam',
    alamatIP: '192.168.1.103',
    status: 'Gagal'
  },
  {
    num: 5,
    tarikhDanMasa: '2024-03-27 08:55:18',
    namaPengguna: 'Nurul Binti Hassan',
    kategoriSubKategori: 'Pengguna / Kebenaran',
    penerangan: 'Penetapan kebenaran pengguna baharu',
    jenisAktiviti: 'Tambah',
    alamatIP: '192.168.1.104',
    status: 'Berjaya'
  },
  {
    num: 6,
    tarikhDanMasa: '2024-03-27 08:50:55',
    namaPengguna: 'John Smith',
    kategoriSubKategori: 'Sistem / Log',
    penerangan: 'Paparan log sistem',
    jenisAktiviti: 'Papar',
    alamatIP: '192.168.1.105',
    status: 'Berjaya'
  },
  {
    num: 7,
    tarikhDanMasa: '2024-03-27 08:45:33',
    namaPengguna: 'Amir Bin Razak',
    kategoriSubKategori: 'Dokumen / Fail',
    penerangan: 'Muat naik fail baharu',
    jenisAktiviti: 'Muat Naik',
    alamatIP: '192.168.1.106',
    status: 'Berjaya'
  },
  {
    num: 8,
    tarikhDanMasa: '2024-03-27 08:40:22',
    namaPengguna: 'Siti Aminah',
    kategoriSubKategori: 'Pengguna / Kata Laluan',
    penerangan: 'Reset kata laluan pengguna',
    jenisAktiviti: 'Kemaskini',
    alamatIP: '192.168.1.107',
    status: 'Berjaya'
  },
  {
    num: 9,
    tarikhDanMasa: '2024-03-27 08:35:10',
    namaPengguna: 'Tan Mei Ling',
    kategoriSubKategori: 'Laporan / Audit',
    penerangan: 'Jana laporan audit',
    jenisAktiviti: 'Jana',
    alamatIP: '192.168.1.108',
    status: 'Berjaya'
  },
  {
    num: 10,
    tarikhDanMasa: '2024-03-27 08:30:45',
    namaPengguna: 'Kumar Patel',
    kategoriSubKategori: 'Sistem / Backup',
    penerangan: 'Backup sistem automatik',
    jenisAktiviti: 'Backup',
    alamatIP: '192.168.1.109',
    status: 'Berjaya'
  }
]);

const columns = [
    { key: 'num', label: '#' },
    { key: 'tarikhDanMasa', label: 'Tarikh dan Masa' },
    { key: 'namaPengguna', label: 'Nama Pengguna' },
    { key: 'kategoriSubKategori', label: 'Kategori / Sub Kategori' },
    { key: 'penerangan', label: 'Penerangan' },
    { key: 'jenisAktiviti', label: 'Jenis Aktiviti' },
    { key: 'alamatIP', label: 'Alamat IP' },
    { key: 'status', label: 'Status' }
];

const resetForm = () => {
    // Reset form logic here
};

const searchRecords = () => {
    // Search records logic here
};
</script>

<style lang="scss" scoped>

</style>