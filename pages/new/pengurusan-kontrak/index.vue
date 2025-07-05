<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">Pengurusan Kontrak</h1>
        
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center gap-4 mb-6">
                <h2 class="text-xl font-semibold">Senarai Kontrak</h2>
                <span class="text-gray-500">[ Tahun Mula: 2025, Tahun Hingga: 2025 ]</span>
            </div>

            <rs-table
                :data="tableData"
                :field="['siri', 'noKontrak', 'namaKontrak', 'namaSyarikat', 'mulaKontrak', 'tamatKontrak', 'tempohKontrak', 'nilaiHadBumbung', 'bakiNilaiKontrak', 'prestasi', 'tindakan']"
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
                <template v-slot:prestasi="row">
                    <rs-badge :variant="row.value.prestasi === 'Baik' ? 'success' : 'warning'">
                        {{ row.value.prestasi }}
                    </rs-badge>
                </template>
                <template v-slot:tindakan="row">
                    <button
                        class="btn btn-primary btn-sm"
                        @click="$router.push(`/new/pengurusan-kontrak/detail/${row.value.siri}`)"
                    >
                        <Icon name="mdi:eye" class="mr-1" />
                    </button>
                </template>
            </rs-table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const viewDetails = (noKontrak) => {
    alert(noKontrak)
    router.push(`/new/pengurusan-kontrak/${noKontrak}`);
};

// Sample data for the table
const tableData = ref([
    {
        siri: 1,
        noKontrak: 'FCW/BB2/05/20',
        namaKontrak: 'KONTRAK PEMBELIAN INSULIN ASPART 30% & PROTAMINATED INSULIN ASPART 70% 100IU/ML INJECTION I PEJABAT KESIHATAN DAERAH KLANG BAGI TEMPOH SATU (1) TAHUN',
        namaSyarikat: 'LESTARI SALES & SERVICES SDN. BHD.',
        mulaKontrak: '13-03-2020',
        tamatKontrak: '07-03-2025',
        tempohKontrak: '4 tahun 11 bulan 25 hari',
        nilaiHadBumbung: '46,605,285.80',
        bakiNilaiKontrak: '9,321,057.16',
        prestasi: 'Baik',
        tindakan: 'Lihat'
    },
    {
        siri: 2,
        noKontrak: 'SH/KHID/12/20',
        namaKontrak: 'MEMBEKAL DAN MENGHANTAR FLOCCULATION SOLUTION DAN MED GRADE CHLORINE UNTUK KEGUNAAN SEBAGAI BAHAN PENCUCI KOLAM HIDROTERAPI DI UNIT FISIOTERAPI, HOSPITAL SULTANAH BAHIYAH, ALOR SETAR, KEDAH BAGI TEMPOH DUA (2) TAHUN',
        namaSyarikat: 'ARJAYA ENTERPRISE',
        mulaKontrak: '13-03-2020',
        tamatKontrak: '21-01-2025',
        tempohKontrak: '4 tahun 10 bulan 8 hari',
        nilaiHadBumbung: '2,720,658,904.04',
        bakiNilaiKontrak: '544,131,780.81',
        prestasi: 'Baik',
        tindakan: 'Lihat'
    }
]);
</script>

<style lang="scss" scoped>
</style>