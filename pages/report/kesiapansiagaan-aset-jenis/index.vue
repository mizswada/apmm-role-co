                    
<template> 
    <div class="bg-white rounded-lg shadow p-6  mx-auto">
        <h2 class="text-2xl font-bold text-center mb-4">Kesiapsiagaan Aset Mengikut Jenis Pembaikan</h2>
        <ClientOnly>
            <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="bar"
            :options="chartOptions"
            :series="series"
            ></VueApexCharts>
        </ClientOnly>
    </div>
    
        
    </template>
    
        <script setup>
        const changeKey = ref(0);
    
        const series = ref([
        {
            name: "Jumlah Aset",
            data: [24836, 65806],
        },
        ]);
    
        const chartOptions = computed(() => ({
        chart: {
            id: "apexChart",
        },
        legend: {
            show: false,
        },
        theme: {
            mode: "light",
            palette: "palette1",
        },
        xaxis: {
            categories: ["Kapal", "Bot"],
            labels: {
            rotate: 0,
            style: {
                fontSize: '14px',
            },
            },
        },
        yaxis: {
            min: 0,
            max: 70000,
            tickAmount: 5,
            labels: {
            style: {
                fontSize: '14px',
            },
            formatter: function (val) {
                if (val >= 1000) return (val / 1000) + 'k';
                return val;
            },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
            fontSize: '16px',
            fontWeight: 'bold',
            },
            formatter: function (val) {
            return val;
            },
        },
        responsive: [
            {
            breakpoint: 768,
            options: {
                legend: {
                position: "bottom",
                },
                xaxis: {
                labels: {
                    rotate: -90,
                    style: {
                    fontSize: '12px',
                    },
                },
                },
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
                        
                      