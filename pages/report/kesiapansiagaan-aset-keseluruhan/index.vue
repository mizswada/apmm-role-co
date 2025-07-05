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
    name: "OPS",
    type: "bar",
    data: [126, 124, 167],
},
{
    name: "Non OPS",
    type: "bar",
    data: [109, 123, 46],
},
{
    name: "%",
    type: "line",
    data: [54, 50, 78],
},
]);

const chartOptions = computed(() => ({
chart: {
    id: "apexChart",
    stacked: true,
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
    categories: [2020, 2021, 2022],
    title: { text: "Tahun" },
},
yaxis: [
    {
    title: { text: "Bilangan Aset" },
    min: 0,
    max: 300,
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
    enabledOnSeries: [0, 1],
    formatter: function (val, opts) {
    if (opts.seriesIndex === 2) {
        return val + " %";
    }
    return val;
    },
},
stroke: {
    width: [0, 0, 3],
    curve: "smooth",
},
colors: ["#7B1E57", "#2196F3", "#FFA726"],
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

