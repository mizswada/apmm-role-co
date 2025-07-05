<template> 
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div class="bg-white rounded-lg shadow p-6 mt-6">
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

      <div class="bg-white rounded-lg shadow p-6 mt-6">
          <RsCard>
              <template #header>
              Kesiapsiagaan Kapal dan Bot
              </template>
              <ClientOnly>
              <VueApexCharts
                  :key="changeKey + 1"
                  width="100%"
                  height="400"
                  type="bar"
                  :options="chartOptionsKapalBot"
                  :series="seriesKapalBot"
              ></VueApexCharts>
              </ClientOnly>
          </RsCard>
      </div>
      <div class="bg-white rounded-lg shadow p-6 mt-6">
          <RsCard>
              <template #header>
              Kesiapsiagaan Bot Mengikut Maritim Negeri
              </template>
              <ClientOnly>
              <VueApexCharts
                  :key="changeKey + 2"
                  width="100%"
                  height="400"
                  type="bar"
                  :options="chartOptionsBotNegeri"
                  :series="seriesBotNegeri"
              ></VueApexCharts>
              </ClientOnly>
          </RsCard>
      </div>
      <div class="bg-white rounded-lg shadow p-6 mt-6">
          <RsCard>
              <template #header>
              Kesiapsiagaan Kapal Mengikut Maritim Negeri
              </template>
              <ClientOnly>
              <VueApexCharts
                  :key="changeKey + 3"
                  width="100%"
                  height="400"
                  type="bar"
                  :options="chartOptionsKapalNegeri"
                  :series="seriesKapalNegeri"
              ></VueApexCharts>
              </ClientOnly>
          </RsCard>
      </div>
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
  categories: [2020, 2021, 2022],
  title: { text: "Tahun" },
},
yaxis: [
  {
    title: { text: "Bilangan Aset" },
    min: 0,
    max: 200,
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
colors: ["#1976D2", "#FFEB3B", "#D32F2F"],
responsive: [
  {
    breakpoint: 768,
    options: {
      legend: { position: "bottom" },
    },
  },
],
}));

const seriesKapalBot = ref([
{
  name: "Kapal OPS",
  type: "bar",
  data: [35, 20, 45],
},
{
  name: "Bot OPS",
  type: "bar",
  data: [100, 100, 120],
},
{
  name: "% Kapal OPS",
  type: "line",
  data: [50, 40, 70],
},
{
  name: "% Bot OPS",
  type: "line",
  data: [55, 60, 75],
},
]);

const chartOptionsKapalBot = computed(() => ({
chart: {
  id: "apexChartKapalBot",
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
  categories: [2020, 2021, 2022],
  title: { text: "Tahun" },
},
yaxis: [
  {
    title: { text: "Bilangan Bot" },
    min: 0,
    max: 150,
  },
  {
    opposite: true,
    title: { text: "Peratusan Bot" },
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
colors: ["#1976D2", "#FFEB3B", "#1565C0", "#D32F2F"],
responsive: [
  {
    breakpoint: 768,
    options: {
      legend: { position: "bottom" },
    },
  },
],
}));

const seriesBotNegeri = ref([
{
  name: "Total Bot",
  type: "bar",
  data: [30, 10, 15, 20, 10, 5, 10, 5, 8, 15, 50],
},
{
  name: "% Bot OPS",
  type: "line",
  data: [50, 52, 60, 55, 58, 62, 59, 65, 53, 57, 70],
},
]);

const chartOptionsBotNegeri = computed(() => ({
chart: {
  id: "apexChartBotNegeri",
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
  categories: [
    "MN KEDAH & PERLIS",
    "MN PULAU PINANG",
    "MN PERAK",
    "MN SELANGOR",
    "MN MELAKA & N. SEMBILAN",
    "MN JOHOR",
    "MN PAHANG",
    "MN TERENGGANU",
    "MN KELANTAN",
    "MN SABAH",
    "MN SABAH & WP LABUAN"
  ],
  title: { text: "" },
  labels: {
    rotate: -45,
    style: { fontSize: '12px' }
  },
},
yaxis: [
  {
    title: { text: "Bilangan Aset" },
    min: 0,
    max: 150,
  },
  {
    opposite: true,
    title: { text: "Peratusan Bot" },
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
  enabledOnSeries: [0],
  formatter: function (val, opts) {
    if (opts.seriesIndex === 1) {
      return val + " %";
    }
    return val;
  },
},
stroke: {
  width: [0, 3],
  curve: "smooth",
},
colors: ["#FFEB3B", "#D32F2F"],
responsive: [
  {
    breakpoint: 768,
    options: {
      legend: { position: "bottom" },
    },
  },
],
}));

const seriesKapalNegeri = ref([
{
  name: "Total Kapal",
  type: "bar",
  data: [5, 3, 10, 4, 2, 12, 6, 3, 4, 10, 11],
},
{
  name: "% Kapal OPS",
  type: "line",
  data: [50, 45, 75, 55, 60, 65, 40, 55, 48, 50, 49],
},
]);

const chartOptionsKapalNegeri = computed(() => ({
chart: {
  id: "apexChartKapalNegeri",
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
  categories: [
    "MN KEDAH & PERLIS",
    "MN PULAU PINANG",
    "MN PERAK",
    "MN SELANGOR",
    "MN MELAKA & N. SEMBILAN",
    "MN JOHOR",
    "MN PAHANG",
    "MN TERENGGANU",
    "MN KELANTAN",
    "MN SABAH",
    "MN SABAH & WP LABUAN"
  ],
  title: { text: "" },
  labels: {
    rotate: -45,
    style: { fontSize: '12px' }
  },
},
yaxis: [
  {
    title: { text: "Bilangan Aset" },
    min: 0,
    max: 100,
  },
  {
    opposite: true,
    title: { text: "Peratusan Kapal" },
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
  enabledOnSeries: [0],
  formatter: function (val, opts) {
    if (opts.seriesIndex === 1) {
      return val + " %";
    }
    return val;
  },
},
stroke: {
  width: [0, 3],
  curve: "smooth",
},
colors: ["#2196F3", "#1565C0"],
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

