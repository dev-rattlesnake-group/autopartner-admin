<script setup lang="ts">
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, ArcElement, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

import { message } from 'ant-design-vue'
import type { Iparams } from '@/interfaces/params.interface'
import { reactive, onMounted, watch, ref, computed } from 'vue'
// import FilterIcon from '@/assets/icons/FilterIcon.vue'
// import SendIcon from '@/assets/icons/SendIcon.vue'
// import BagIcon from '@/assets/icons/BagIcon.vue'
// import CustomerCreateComponent from './components/CustomerCreateComponent.vue'
import router from '@/router'
import { useOrderStore } from '@/stores/order.store'
import { useAuthStore } from '@/stores/auth.store'

const props = defineProps({ screenWidth: { type: Number } })
const orderStore = useOrderStore()
const authStore = useAuthStore()
const state = reactive({
    filters: {},
    period: 7,
    page: 1,
    size: 100,
    search: '',
    sort: { field: 'id', order: 'desc' }
})

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale)
const emit = defineEmits(['header-data'])

const chartData = ref({
    labels: [],
    datasets: [{
        data: [],
        barPercentage: 0.2,
        barThickness: 20,
        borderRadius: 10,
        clip: true,
        categoryPercentage: 1,
        label: 'Orders Amount',
        backgroundColor: [
            '#C40F30',

        ],

    }]
})

const donutData = ref({
    labels: [],
    datasets: [{
        label: 'Total amount',
        data: [],
        backgroundColor: [
            '#C40F30',
            '#FF6A85',
            '#FF8E7E'

        ],
        hoverOffset: 4,
        borderWidth: 4,
        barThickness: 20
    }]
});

const setChartData = (period) => {
    orderStore.ordersTransactions.forEach(el => {
        chartData.value.labels.push(el.period_label)
        chartData.value.datasets[0].data.push(el.summary_amount)
    })
}

const setDonutData = (period) => {
    const topThreeProducts = orderStore.topProducts.length <= 3 ? [...orderStore.topProducts] : [...orderStore.topProducts.slice(2)]
    topThreeProducts.forEach(el => {
        console.log(el?.amount)
        donutData.value.labels.push(el.name)
        donutData.value.datasets[0]?.data.push(el.amount)
    })
}

const chartOptions = {
    responsive: true,
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    },
    plugins: {
        legend: {

            display: false,

        }
    }

}


const donutOptions = ref({
    responsive: true,
    plugins: {
        legend: {
            align: 'start',
            position: 'bottom',
            display: true,
            fullSize: true,
            labels: {
                font: {
                    size: 10
                },
                color: 'black',
                boxWidth: 10,
            }
        }
    }


})

// s

const getStatusColor = (id) => {
    switch (id) {
        case 1: return 'warning'
        case 2: return 'blue'
        case 3: return 'green'
    }
}
const fetchOrders = async (): Promise<void> => {
    try {
        await orderStore.getOrders({ page: state.page, size: state.size, sort: state.sort })
        setChartData()
        setDonutData()

    } catch (e) {
        console.log(e)
        message.error(e.response?.data?.message || e.message || JSON.stringify(e))
    }
}

const handleClickOrder = async (id:number): Promise<void> => {
    if (authStore.user.role === 'admin') {
        router.push({ name: 'order', params: { id } })
    }
}

onMounted(async () => {
    emit('header-data', {
        title: 'Dashboard',
        crumbs: [
            { name: 'Dashboard', route: 'customer-dashboard' },
        ]
    })

    await fetchOrders()
    // setTimeout(() => {
    //     setChartData()
    // }, 0) // 
})

</script>
<template>
    <div
        class="w-full max-w-screen max-h-full  flex text-black p-4 flex-col oveflow-y-auto overflow-x-hidden gap-4 lg:flex-row">
        <diV class="flex w-full flex-col gap-4">
            <div class="flex w-full gap-4 flex-col md:flex-row">
                <div class="board w-full md:w-1/2   h-[33svh] flex-col  text-left">
                    <p class="text-black text-2xl w-full leading-[0] py-4 h-fit">TOP Items</p>
                    <div class="h-auto  w-full overflow-hidden flex justify-center items-center">
                        <Doughnut :options="donutOptions" v-if="donutData.labels.length" :data="donutData" />
                    </div>
                </div>
                <div
                    class="board min-w-[49%]  h-[33svh] text-white !bg-[#C40F30] flex flex-col justify-between text-left gap-4 ">
                    <p class="text-2xl">Orders Summary</p>
                    <div class="w-full h-fit flex leading-normal pb-8">
                        <div class="w-1/2 flex flex-col gap-2 ">
                            <p>All Orders</p>
                            <p class="text-xl">{{ Number(orderStore.orderAmountTotal).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'GBP'
                            }) || 'No data' }}</p>
                            <p class="mt-6">Pending Orders</p>
                            <p class="text-xl">{{ orderStore.pendingOrders ?? 'No data' }}</p>
                        </div>
                        <div class="w-1/2 flex flex-col gap-2 ">
                            <p>Recent Order</p>
                            <p class="text-xl">{{ null || 'No data' }}</p>
                            <p class="mt-6">Completed Orders</p>
                            <p class="text-xl">{{ orderStore.comletedOrders ?? 'No data' }}</p>
                        </div>

                    </div>

                </div>
            </div>
            <diV class="board min-w-[36%] h-fit w-full flex flex-col items-start">
                <div class="w-full flex justify-between">
                    <p class="text-black text-2xl">Orders Transactions</p>
                    <select name="select" v-model="state.period"
                        class="rounded-md w-full max-w-[25%] md:max-w-[10rem] h-[2rem]  px-4 bg-[#EFF1F999] text-black text-md">


                        <!-- <option class="bg-[#EFF1F999] text-black" v-for="(category, index) in productStore.categories"
                            :key="index" :value="category.id">
                            {{ category.name }}
                        </option> -->
                    </select>
                </div>
                <div class="w-full flex overflow-hidden max-h-[45svh]  items-center shrink ">
                    <Bar class="w-full object-cover grow shrink max-h-full" v-if="chartData.labels.length"
                        :options="chartOptions" :data="chartData" />
                </div>

            </diV>
        </diV>

        <div class="board min-w-[36%] text-black h-fit flex flex-col items-start gap-4 ">
            <p class=" text-2xl">Order History</p>
            <div class="flex w-full flex-col leading-normal text-left gap-4">
                <div @click="handleClickOrder(order.id)"  class="w-full flex justify-between"
                    v-for="order, index in orderStore.orders" :key="index">
                    <div class="flex flex-col">
                        <span class="underline" :class="{'cursor-pointer hover:text-blue-500': authStore.user?.role === 'admin'}">{{ order.number }}</span>
                        <span class="font-semibold">{{ Number(order.total_amount).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'GBP'
                        }) }}</span>
                    </div>
                    <div class="flex flex-col gap-2 justify-center text-center">
                        <a-tag class="rounded-xl flex h-fit py-[0.1rem] px-3"
                            :color="getStatusColor(order.status_id)">{{
                                order.status }}</a-tag>
                        <p class="px-3 text-[0.65rem] leading-[0%] text-gray-500 font-semibold">{{ new
                            Date(order.created_at).toLocaleDateString() }}</p>
                    </div>

                </div>
            </div>



        </div>
    </div>
</template>
<style scoped lang="scss">
.board {
    @apply flex bg-white rounded-lg p-6;
}
</style>