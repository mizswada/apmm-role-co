<template>
    <div>
        <h1>Dashboard</h1>
        
        <div class="bg-white rounded-lg shadow">
            <div class="p-6">     
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold">Senarai Tugasan</h2>                    
                </div>           
                <rs-table
                    :data="tableData"
                    :field="['bil', 'idJutra', 'namaPemohon', 'status', 'tindakan']"
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
                    <template v-slot:status="row">
                        {{ row.text }}
                        
                    </template>
                    
                    <template v-slot:tindakan="row">
                        <div class="flex gap-2">
                            <button @click="$router.push(`/lihatTugasan`)" class="text-blue-600 hover:text-blue-800">
                                <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
                            </button>
                            <!-- <button @click="$router.push(`/kemaskiniTugasan`)" class="text-blue-600 hover:text-blue-800">
                                <Icon class="text-primary" name="heroicons:pencil-square-16-solid"></Icon>
                            </button> -->
                            <!-- <rs-button >
                                <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
                            </rs-button> -->
                            <!-- <rs-button variant="warning" size="sm">Kemaskini</rs-button> -->
                        </div>
                    </template>
                </rs-table>
            </div>
        </div>
    </div>
</template>

<script setup>
const tableData = [
    {
        bil: 1,
        idJutra: 'JUT001',
        namaPemohon: 'Ahmad bin Abdullah',
        status: 'Semakan Kad Kerja',
        tindakan: ''
    },
    {
        bil: 2,
        idJutra: 'JUT002',
        namaPemohon: 'Siti binti Omar',
        status: 'Pengesahan Cannabilize',
        tindakan: ''
    },
    {
        bil: 3,
        idJutra: 'JUT001',
        namaPemohon: 'Ahmad bin Abdullah',
        status: 'Semakan Kad Kerja',
        tindakan: ''
    },
];
</script>

<style lang="scss" scoped>
h1 {
    @apply text-2xl font-bold mb-4;
}

p {
    @apply mb-4;
}
</style>