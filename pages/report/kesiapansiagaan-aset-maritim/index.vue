<template>
  <div class="bg-white rounded-lg shadow p-6  mx-auto">
    <h1 style="text-align:center;">Laporan Kesiapsiagaan Aset Mengikut Maritim</h1>
    <div style="background: #fff; padding: 24px; border-radius: 12px;">
      <div style="text-align:center;">
        <!-- <h2 style="margin-bottom: 0;">Kesiapsiagaan Aset Mengikut Maritim</h2> -->
        <!-- <div>Paparan: Semua Aset MN, <b>Pilihan: Tahunan</b></div> -->
      </div>
      <BarChart v-bind="barChartProps" style="height: 400px; width: 100%;" />
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <span>Sumber : JUTRA, MCGIIS</span>
        <span>Tarikh Kemaskini : 24/10/2023</span>
      </div>
      <div style="text-align:right; margin-top: 10px;">
        <button @click="exportCSV" style="background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          Export CSV
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";

// Chart data
const chartData = computed(() => ({
  labels: ["2020", "2021", "2022"],
  datasets: [
    {
      label: "Jumlah Aset",
      data: [939, 887, 1216],
      backgroundColor: ["#4285F4", "#222", "#8AB800"],
      borderRadius: 8,
      barPercentage: 0.6,
      categoryPercentage: 0.5,
    },
  ],
}));

// Chart options
const chartOptions = computed(() => ({
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      callbacks: {
        label: ctx => `Tahun ${ctx.label}: ${ctx.parsed.y}`,
      },
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      color: '#222',
      font: { weight: 'bold', size: 16 },
      formatter: value => value,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 1400,
      ticks: { stepSize: 200 },
    },
    x: {
      ticks: { font: { size: 16 } },
    },
  },
}));

const { barChartProps } = useBarChart({
  chartData,
  options: chartOptions,
});

// Export CSV function
function exportCSV() {
  const rows = [
    ["Tahun", "Jumlah Aset"],
    ...chartData.value.labels.map((year, i) => [year, chartData.value.datasets[0].data[i]]),
  ];
  const csvContent = rows.map(e => e.join(",")).join("\\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "kesiapsiagaan_aset_maritim.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
                  
                