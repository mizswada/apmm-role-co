                    
<template> 
<div class="bg-white rounded-lg shadow p-6  mx-auto">
    <h2 class="text-2xl font-bold text-center mb-4">Kesiapsiagaan Aset Mengikut Negeri</h2>
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
        data: [110, 89, 103, 103, 82, 134, 81, 93, 76, 119, 226],
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
        "MN SARAWAK",
        "MN SABAH & WP LABUAN",
        ],
        labels: {
        rotate: -45,
        style: {
            fontSize: '12px',
        },
        },
    },
    yaxis: {
        min: 0,
        max: 250,
        tickAmount: 5,
        labels: {
        style: {
            fontSize: '12px',
        },
        },
    },
    dataLabels: {
        enabled: true,
        style: {
        fontSize: '14px',
        fontWeight: 'bold',
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
                fontSize: '10px',
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
                    
                  