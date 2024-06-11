<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '@/router'
import { message } from 'ant-design-vue'
import { useOrderStore } from '@/stores/order.store'
import ProfileIcon from '@/assets/icons/ProfileIcon.vue'
import CreditCardIcon from '@/assets/icons/CreditCardIcon.vue'
import LocationIcon from '@/assets/icons/LocationIcon.vue'
import OrderItemMobileComponent from '@/components/OrderItemMobileComponent.vue'
import OrderStatusChangerComponent from './components/OrderStatusChangerComponent.vue'

const orderStore = useOrderStore()
const emit = defineEmits(['header-data'])
const props = defineProps({ screenWidth: { type: Number } })

const fetchItem = async () => {
  try {
    await orderStore.getOrder(router.currentRoute?.value?.params?.id)
    orderStatus.value = orderStore?.order?.status_id
  } catch (e) {
    message.error(e.response?.data?.message || e.message || JSON.stringify(e))
  }
}

const orderStatus = ref(null)
const columns = ref<Record<string, any>[]>([

  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
    // resizable: true,
    filterSearch: false,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 360
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Unit Price',
    dataIndex: 'product_price',
    key: 'product_price',
    // resizable: true,
    filterSearch: false,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 420
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Qty',
    dataIndex: 'quantity',
    key: 'quantity',
    // resizable: true,
    filterSearch: false,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 120
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    // resizable: true,
    filterSearch: false,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 120
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Order Total',
    dataIndex: 'amount',
    key: 'amount',
    // resizable: true,
    filterSearch: false,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 120
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'VAT',
    dataIndex: 'vat',
    key: 'vat',
    // resizable: true,
    filterSearch: false,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 120
    // filteredValue: state.filters?.id || null
  },

])
const changeOrderStatus = async (status: number) => {
  try {
    await orderStore.updateOrderStatus(status)
    await fetchItem()
    message.success('Orders status has been changed successfully')


  } catch (e) {
    message.error(e.response?.data?.message || e.message || JSON.stringify(e))
  }

}

onMounted(async () => {
  await fetchItem()
  emit('header-data', {
    title: `Order №${orderStore.order?.number}`,
    crumbs: [
      { name: 'Orders', route: 'orders' },
      {
        name: `№${orderStore.order?.number}`,
        route: 'order',
        routeparams: orderStore.order?.id
      }
    ]
  })
  orderStatus.value = orderStore?.order?.status_id
})
</script>
<template>
  <div class="w-full max-h-full flex text-black p-4  pt-0  lg:pt-4  flex-col overflow-y-auto overflow-x-hidden gap-4">
    <div class="w-full flex flex-col items-center  gap-4 mt-4 md:mt-0 h-fit">
      <div class="w-full flex leading-normal my-2  relative z-[7] justify-between gap-4   md:items-center  flex-col md:flex-row">
       <div class="flex gap-4  flex-col md:flex-row text-left">
        <p class="text-base font-semibold">Order № <span class="underline font-normal">{{orderStore.order?.number}}</span></p>
        <p class="text-base font-semibold">Order Date <span class=" font-normal">{{ new Date(orderStore.order?.created_at).toLocaleDateString() }}</span></p>
       </div> 
       <div  class="flex gap-4 justify-end lg:justify-start">

        
        <OrderStatusChangerComponent :options="orderStore.orderStatuses" :value="orderStatus"
          @update:value="changeOrderStatus" />
        <button @click=""
          class="px-[1.5rem] shrink-1 border-[#C40F30] border grow-0 py-2 hover:opacity-75 rounded-xl text-white bg-[#C40F30] flex leading-normal">
          Cancel Order
        </button>
      </div> 
      </div>

      <div class="flex w-full gap-4 flex-col md:flex-row h-fit">

        <div
          class="rounded-lg bg-white overflow-hidden min-w-fit  w-full md:w-[27%] min-h-[10rem] flex flex-col p-4 gap-4 justify-between">
          <div class="w-full flex gap-4 relative">
            <div class="p-[0.3rem] bg-[#B3B3B329] rounded-md w-fit h-fit">
              <ProfileIcon />
            </div>
            <div class="flex flex-col text-left gap-1">
              <p class="grey-text">{{ orderStore.order?.customer.name }}</p>
              <p class="grey-text-sm">

                <span class="text-black font-[500]">{{
                  orderStore.order?.customer.company_name
                  }}</span>
              </p>
            </div>
            <a-tag class="h-fit absolute right-0 top-0"
              :color="orderStore.order?.customer?.status === 1 ? 'green' : 'red'">
              {{ orderStore.order?.customer?.status === 1 ? 'Active' : 'Inactive' }}
            </a-tag>
          </div>
          <div class="w-full flex gap-4 relative leading-normal flex-wrap">
            <div class="flex flex-col w-[48%] text-left items-start">
              <p class="grey-text ">Phone</p>
              <span class="text-black font-[500]">{{
                orderStore.order?.customer.phone
                }}</span>
            </div>
            <div class="flex flex-col w-[48%] text-left items-start">
              <p class="grey-text ">Email</p>
              <span class="text-black font-[500]">{{
                orderStore.order?.customer.email
                }}</span>
            </div>

          </div>

        </div>

        <div
          class="rounded-lg bg-white overflow-hidden min-w-fit  w-full md:w-[38.2%] min-h-[10rem] p-4 flex flex-col justify-between">
          <div class="w-full flex gap-4 relative ">
            <div class="p-[0.4rem] bg-[#B3B3B329] rounded-md w-fit h-fit">
              <LocationIcon />
            </div>
          </div>
          <div class="w-full flex  items-center justify-between flex-wrap mt-6 gap-4">
            <div class="flex flex-col items-start">
              <p class="grey-text-sm">Billing Address</p>
              <span class="mt-1 text-black font-[500] leading-[100%]">{{
                orderStore.order?.customer?.billing_address || 'None'
                }}</span>
            </div>
            <div class="flex flex-col items-start">
              <p class="grey-text-sm">Delivery Address</p>
              <span class="mt-1 text-black font-[500] leading-[100%]">{{
                orderStore.order?.customer?.delivery_address || 'None'
                }}</span>
            </div>
          </div>
        </div>

        <div
          class="rounded-lg bg-white overflow-hidden min-w-fit  w-full md:w-[33%] min-h-[10rem] p-4 flex flex-col justify-between">
          <div class="w-full flex gap-4   relative items-center">
            <div class="p-[0.4rem] bg-[#B3B3B329] rounded-md w-fit h-fit">
              <CreditCardIcon />
            </div>
            <p class="leading-normal">Documents</p>
            <!-- <p class="text-sm text-gray-600">Order № <span class="text-base  font-semibold">{{ orderStore.order?.number }}</span></p > -->
          </div>
          <div class="w-full flex flex-col items-start mt-6">

            <p class="grey-text">Invoice № <span class="text-black font-[600]">{{ orderStore.order?.invoice_number
                }}</span></p>
            <div class="w-full flex gap-4 items-center">

            </div>
          </div>
        </div>

      </div>

  

      <div class="w-full overflow-x-hidden h-full rounded-lg" v-if="screenWidth > 650">
        <a-table :bordered="false" :columns="columns" :data-source="orderStore?.order?.items" @change="onChange"
          :showHeader="true" :row-selection="rowSelection" :pagination="false">
          <template #title>
            <div class="w-full flex">
              <p class="font-semibold text-lg">Total Items: <span class="text-red-500 font-semibold">{{
                orderStore?.order?.items?.length || 0 }}</span></p>
            </div>
          </template>

          <template #summary>
            <a-table-summary-row>
              <a-table-summary-cell></a-table-summary-cell>
              <a-table-summary-cell>
                <!-- <a-typography-text>{{ totals.totalRepayment }}</a-typography-text> -->
              </a-table-summary-cell>
              <a-table-summary-cell>
                <!-- <a-typography-text>{{ totals.totalRepayment }}</a-typography-text> -->
              </a-table-summary-cell>
              <a-table-summary-cell class="font-semibold text-lg">
                Total
              </a-table-summary-cell>
              <a-table-summary-cell>
                <span class="font-bold text-lg"> {{ Number(orderStore?.order?.total_amount ||
                  0).toLocaleString('en-US',
                    { style: 'currency', currency: 'GBP' }) }}</span>
              </a-table-summary-cell>
              <a-table-summary-cell>
                <!-- <a-typography-text>{{ totals.totalRepayment }}</a-typography-text> -->
              </a-table-summary-cell>
            </a-table-summary-row>
            <a-table-summary-row>
              <a-table-summary-cell></a-table-summary-cell>
              <a-table-summary-cell>
                <!-- <a-typography-text>{{ totals.totalRepayment }}</a-typography-text> -->
              </a-table-summary-cell>
              <a-table-summary-cell>
                <!-- <a-typography-text>{{ totals.totalRepayment }}</a-typography-text> -->
              </a-table-summary-cell>
              <a-table-summary-cell class="font-semibold text-lg">

              </a-table-summary-cell>
              <a-table-summary-cell>
              </a-table-summary-cell>
              <a-table-summary-cell>
                <!-- <a-typography-text>{{ totals.totalRepayment }}</a-typography-text> -->
              </a-table-summary-cell>
            </a-table-summary-row>


          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column?.key === 'product_name'">
              <div class="cursor-pointer flex items-center gap-4 text-center">
                <div
                  class="mt-2 min-w-[2.5rem] max-w-[2.5rem] border-2 rounded-md overflow-hidden flex items-center justify-center"
                  :class="{ 'h-9 ': record.product_image, 'h-[2.5rem]': !record.product_image }">
                  <img class="object-cover" v-if="record.product_image" :src="record.product_image"
                    :alt="record.product_name" />
                  <p v-else class="text-xs font-semibold text-center">No Image</p>
                </div>
                <p class="hover:text-blue-500">{{ record.product_name }}</p>
              </div>
            </template>
            <template v-if="column?.key === 'quantity'">

              <div>
                <p class="">{{ record.quantity }}</p>
              </div>

            </template>
            <template v-if="column?.key === 'product_price'">
              {{
                Number(record.product_price).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'GBP'
                })
              }}
            </template>
            <template v-if="column?.key === 'amount'">
              {{
                Number(record.amount).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'GBP'
                })
              }}
            </template>
          </template>
        </a-table>
      </div>

      <div class="w-full overflow-x-hidden h-full" v-if="screenWidth < 650">
        <OrderItemMobileComponent :order="orderStore.order" />
      </div>

    </div>
  </div>
</template>
<style scoped lang="scss">
.grey-text {
  color: var(--Black-30, #8b8d97);

  /* Paragraph 2/Regular */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.grey-text-sm {
  color: var(--Black-30, #8b8d97);

  /* Paragraph 2/Regular */
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
