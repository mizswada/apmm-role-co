                    
<template> 
    <div class="bg-white rounded-lg shadow p-6  mx-auto mb-6">
        <h1 style="text-align:center;" class="mb-6">
            LAPORAN KESIAPSIAGAAN KAPAL DAN BOT APMM MENGIKUT NEGERI
        </h1>        
        <ClientOnly>
            <VueApexCharts
            :key="changeKey + '-combined'"
            width="100%"
            height="400"
            type="line"
            :options="combinedChartOptions"
            :series="combinedSeries"
            ></VueApexCharts>
        </ClientOnly>
    </div>
    <div class="bg-white rounded-lg shadow p-6  mx-auto">   
        <h1 style="text-align:center;" class="mb-6">
            LAPORAN KESIAPSIAGAAN KAPAL DAN BOT APMM MENGIKUT STATUS NON OPS
        </h1> 
        <ClientOnly>  
            <VueApexCharts
            :key="changeKey + '-nonops'"
            width="100%"
            height="400"
            type="bar"
            :options="nonOpsChartOptions"
            :series="nonOpsSeries"
            ></VueApexCharts>
        </ClientOnly>
    </div>
</template>

<script setup>
    const changeKey = ref(0);

    const series = ref([
    {
        name: "KAPAL",
        data: [3, 3, 6, 2, 0, 11, 5, 4, 3, 15, 18],
    },
    {
        name: "BOT",
        data: [14, 5, 8, 11, 6, 17, 4, 7, 5, 19, 70],
    },
    ]);

    const jutraSeries = ref([
    {
        name: "JUTRA KAPAL",
        type: "line",
        data: [0, 2, 2, 2, 0, 3, 2, 2, 2, 8, 10],
    },
    {
        name: "JUTRA BOT",
        type: "line",
        data: [6, 4, 5, 4, 2, 13, 3, 3, 5, 12, 56],
    },
    ]);

    const combinedSeries = ref([
    {
        name: "Aset KAPAL",
        type: "bar",
        data: [3, 3, 6, 2, 0, 11, 5, 4, 3, 15, 18],
    },
    {
        name: "Aset BOT",
        type: "bar",
        data: [14, 5, 8, 11, 6, 17, 4, 7, 5, 19, 70],
    },
    {
        name: "JUTRA KAPAL",
        type: "line",
        data: [0, 2, 2, 2, 0, 3, 2, 2, 2, 8, 10],
    },
    {
        name: "JUTRA BOT",
        type: "line",
        data: [6, 4, 5, 4, 2, 13, 3, 3, 5, 12, 56],
    },
    ]);

    const nonOpsSeries = ref([
    {
        name: "Sedang Dibaiki KAPAL",
        type: "bar",
        data: [2, 1, 3, 1, 0, 5, 3, 2, 1, 6, 6],
    },
    {
        name: "Sedang Dibaiki BOT",
        type: "bar",
        data: [3, 0, 1, 1, 0, 2, 0, 0, 0, 6, 10],
    },
    {
        name: "Menunggu Pembaikan KAPAL",
        type: "bar",
        data: [1, 0, 1, 2, 0, 2, 0, 0, 0, 2, 2],
    },
    {
        name: "Menunggu Pembaikan BOT",
        type: "bar",
        data: [5, 0, 0, 2, 4, 1, 0, 0, 0, 4, 4],
    },
    {
        name: "Mothball KAPAL",
        type: "bar",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        name: "Mothball BOT",
        type: "bar",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    ]);

    const chartOptions = computed(() => ({
        chart: {
            id: "apexChart",
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
                "Kedah/Perlis",
                "Pulau Pinang",
                "Perak",
                "Selangor",
                "N. Sembilan/Melaka",
                "Johor",
                "Pahang",
                "Terengganu",
                "Kelantan",
                "Sarawak",
                "Sabah",
            ],
        },
        yaxis: {
            title: {
                text: "Jumlah Aset",
            },
            min: 0,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        responsive: [
            {
            breakpoint: 768,
            options: {
                legend: {
                position: "bottom",
                },
            },
            },
        ],
        }));

    const jutraChartOptions = computed(() => ({
        chart: {
            id: "jutraChart",
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
                "Kedah/Perlis",
                "Pulau Pinang",
                "Perak",
                "Selangor",
                "N. Sembilan/Melaka",
                "Johor",
                "Pahang",
                "Terengganu",
                "Kelantan",
                "Sarawak",
                "Sabah",
            ],
        },
        yaxis: {
            title: {
                text: "Jumlah JUTRA",
            },
            min: 0,
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth',
        },
        responsive: [
            {
            breakpoint: 768,
            options: {
                legend: {
                position: "bottom",
                },
            },
            },
        ],
    }));

    const combinedChartOptions = computed(() => ({
        chart: {
            id: "combinedChart",
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
                "Kedah/Perlis",
                "Pulau Pinang",
                "Perak",
                "Selangor",
                "N. Sembilan/Melaka",
                "Johor",
                "Pahang",
                "Terengganu",
                "Kelantan",
                "Sarawak",
                "Sabah",
            ],
        },
        yaxis: {
            title: {
                text: "Jumlah",
            },
            min: 0,
        },
        stroke: {
            width: [0, 0, 3, 3],
            curve: 'smooth',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        responsive: [
            {
            breakpoint: 768,
            options: {
                legend: {
                position: "bottom",
                },
            },
            },
        ],
    }));

    const nonOpsChartOptions = computed(() => ({
        chart: {
            id: "nonOpsChart",
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
                "Kedah/Perlis",
                "Pulau Pinang",
                "Perak",
                "Selangor",
                "N. Sembilan/Melaka",
                "Johor",
                "Pahang",
                "Terengganu",
                "Kelantan",
                "Sarawak",
                "Sabah",
            ],
        },
        yaxis: {
            title: {
                text: "Jumlah NON OPS",
            },
            min: 0,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        responsive: [
            {
            breakpoint: 768,
            options: {
                legend: {
                position: "bottom",
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
                    
                  