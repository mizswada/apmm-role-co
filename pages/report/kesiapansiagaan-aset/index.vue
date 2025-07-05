<template> 
    <div class="bg-white rounded-lg shadow p-6  mx-auto">
        <RsCard>
            <template #header>
            Kesiapsiagaan Aset Keseluruhan
            </template>
            <ClientOnly>
            <VueApexCharts
                :key="changeKey"
                width="100%"
                height="400"
                type="bar"
                :options="chartOptions"
                :series="series"
            ></VueApexCharts>
            </ClientOnly>
        </RsCard>
    </div>
  
</template>

<script setup>
import RsCard from '@/components/RsCard.vue'

const changeKey = ref(0);

const series = ref([
{
    name: "OA Sebenar",
    type: "bar",
    data: [62, 51],
},
{
    name: "OA Unjuran",
    type: "bar",
    data: [42, 33],
},
{
    name: "% OA Sebenar",
    type: "line",
    data: [89.86, 72.86],
},
{
    name: "% OA Unjuran",
    type: "line",
    data: [60.75, 47.08],
},
]);

const chartOptions = computed(() => ({
chart: {
    id: "apexChart",
    stacked: false,
    toolbar: { show: true },
},
legend: {
    position: "top",
},
theme: {
    mode: "light",
    palette: "palette1",
},
xaxis: {
    categories: [2020, 2021],
    title: { text: "Tahun" },
},
yaxis: [
    {
    title: { text: "Bilangan Unjuran" },
    min: 0,
    max: 100,
    },
    {
    opposite: true,
    title: { text: "%" },
    min: 0,
    max: 100,
    },
],
plotOptions: {
    bar: {
    horizontal: false,
    columnWidth: "50%",
    },
},
dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
    if (opts.seriesIndex === 2 || opts.seriesIndex === 3) {
        return val + " %";
    }
    return val;
    },
},
stroke: {
    width: [0, 0, 3, 3],
    curve: "smooth",
},
colors: ["#7B1E57", "#FFA726", "#2196F3", "#43A047"],
responsive: [
    {
    breakpoint: 768,
    options: {
        legend: { position: "bottom" },
    },
    },
],
}));

onMounted(() => {
setTimeout(() => {
    changeKey.value++;
}, 500);
});
</script>

