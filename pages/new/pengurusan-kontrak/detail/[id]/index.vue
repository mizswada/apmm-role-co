<template>
    <div class="bg-white rounded-lg shadow p-6 mx-auto">
        <h1 class="text-2xl font-bold mb-6">Detail Kontrak</h1>
        
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">FCW/BB2/05/20: KONTRAK PEMBELIAN INSULIN ASPART 30% & PROTAMINATED INSULIN ASPART 70% 100IU/ML INJECTION | PEJABAT KESIHATAN DAERAH KLANG BAGI TEMPOH SATU (1) TAHUN</h2>
        </div>

        <div class="mb-8">
            <RsCard>
                <template #header>
                    <h3 class="text-lg font-semibold">Jumlah Perbelanjaan dan Prestasi Mengikut Tahun</h3>
                </template>
                <ClientOnly>
                    <VueApexCharts
                        :key="changeKey"
                        width="100%"
                        height="400"
                        type="line"
                        :options="chartOptions"
                        :series="series"
                    />
                </ClientOnly>
            </RsCard>
        </div>

        <div class="mb-8">
            <RsCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold">Jadual Jumlah Perbelanjaan dan Prestasi Mengikut Tahun</h3>
                        <!-- <button class="text-blue-600 hover:text-blue-800">
                            <i class="fas fa-download mr-2"></i>
                            Muat Turun
                        </button> -->
                    </div>
                </template>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr class="bg-gray-50">
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Tahun
                                </th>
                                <th scope="col" colspan="2" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Jumlah Perbelanjaan (RM)
                                </th>
                            </tr>
                            <tr class="bg-gray-50">
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-l">
                                    Penggal 1
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Penggal 2
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(row, index) in tableData" :key="index" 
                                :class="{'bg-gray-50': index % 2 === 0}">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ row.year }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-l"
                                    :class="{'font-bold': row.year === 2022}">
                                    RM {{ formatNumber(row.penggal1) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    :class="{'font-bold': row.year === 2022}">
                                    RM {{ formatNumber(row.penggal2) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </RsCard>
        </div>
    </div>
</template>

<script setup>
import RsCard from '@/components/RsCard.vue'

const changeKey = ref(0);

// Data points for the chart
const series = ref([
    {
        name: 'Penggal 1',
        type: 'line',
        data: [0, 252681.08, 314340.11, 82666.93, 158049.70, 0]
    },
    {
        name: 'Penggal 2',
        type: 'line',
        data: [180.00, 187544.45, 55026.08, 254545.23, 322279.15, 3185581.68]
    },
    
]);

const performanceMarkers = ref([
    { year: 2022, value: 314340.11, label: 'Cemerlang', color: '#82CD47' },
    { year: 2022, value: 55026.08, label: 'Sederhana', color: '#FF69B4' },
    { year: 2021, value: 252681.08, label: 'Tidak Memuaskan', color: '#0000FF' },
    { year: 2023, value: 254545.23, label: 'Baik', color: '#FFD700' }
]);

const chartOptions = computed(() => ({
    chart: {
        id: 'contractChart',
        toolbar: {
            show: true
        },
        zoom: {
            enabled: true
        }
    },
    colors: ['#8B4513', '#228B22', '#FFA500', '#FF1493'],
    stroke: {
        width: [2, 2, 2, 2],
        curve: 'straight',
        dashArray: [0, 0, 4, 4]
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        offsetY: 10,
        itemMargin: {
            horizontal: 10,
            vertical: 10
        }
    },
    markers: {
        size: [4, 4, 0, 0],
        hover: {
            size: 6
        }
    },
    xaxis: {
        categories: [2020, 2021, 2022, 2023, 2024],
        title: {
            text: 'Tahun',
            offsetY: 10
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    yaxis: {
        title: {
            text: 'Jumlah Perbelanjaan (RM)',
            style: {
                fontSize: '12px'
            }
        },
        labels: {
            formatter: (value) => {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(1) + 'M';
                } else if (value >= 1000) {
                    return (value / 1000).toFixed(0) + 'k';
                }
                return value.toFixed(0);
            },
            style: {
                fontSize: '12px'
            }
        },
        min: 0,
        max: 3500000,
        tickAmount: 7
    },
    grid: {
        borderColor: '#f1f1f1',
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        }
    },
    tooltip: {
        y: {
            formatter: (value) => {
                return `RM ${new Intl.NumberFormat('ms-MY', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(value)}`;
            }
        }
    },
    annotations: {
        points: [
            ...performanceMarkers.value.map(marker => ({
                x: marker.year.toString(),
                y: marker.value,
                marker: {
                    size: 6,
                    fillColor: '#fff',
                    strokeColor: marker.color,
                    strokeWidth: 2,
                    radius: 2
                },
                label: {
                    text: marker.label,
                    style: {
                        color: '#fff',
                        background: marker.color
                    }
                }
            }))
        ]
    },
    // Additional legend for performance indicators
    customLegend: {
        show: true,
        position: 'bottom',
        items: [
            { label: 'Cemerlang', color: '#82CD47' },
            { label: 'Baik', color: '#FFD700' },
            { label: 'Sederhana', color: '#FF69B4' },
            { label: 'Kurang Memuaskan', color: '#A52A2A' },
            { label: 'Tidak Memuaskan', color: '#0000FF' },
            { label: 'Tiada', color: '#000000' }
        ]
    }
}));

// New table data
const tableData = ref([
    { year: 2020, penggal1: 0.00, penggal2: 180.00 },
    { year: 2021, penggal1: 252681.08, penggal2: 187544.45 },
    { year: 2022, penggal1: 314340.11, penggal2: 55026.08 },
    { year: 2023, penggal1: 82666.93, penggal2: 254545.23 },
    { year: 2024, penggal1: 158049.70, penggal2: 322279.15 },
]);

const formatNumber = (value) => {
    return new Intl.NumberFormat('ms-MY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

onMounted(() => {
    setTimeout(() => {
        changeKey.value++;
        const legendContainer = document.createElement('div');
        legendContainer.className = 'custom-performance-legend mt-4 flex flex-wrap gap-4 justify-start px-4';
        
        chartOptions.value.customLegend.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex items-center gap-2';
            
            const colorBox = document.createElement('div');
            colorBox.className = 'w-4 h-4';
            colorBox.style.backgroundColor = item.color;
            
            const label = document.createElement('span');
            label.className = 'text-sm';
            label.textContent = item.label;
            
            itemDiv.appendChild(colorBox);
            itemDiv.appendChild(label);
            legendContainer.appendChild(itemDiv);
        });

        const chartElement = document.querySelector('#contractChart');
        if (chartElement) {
            chartElement.parentElement.appendChild(legendContainer);
        }
    }, 500);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>