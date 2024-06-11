<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import router from '@/router'
import { message } from 'ant-design-vue'
import { useCustomerStore } from '@/stores/customer.store'
import { useOrderStore } from '@/stores/order.store'
import ProfileIcon from '@/assets/icons/ProfileIcon.vue'
import CreditCardIcon from '@/assets/icons/CreditCardIcon.vue'
import LocationIcon from '@/assets/icons/LocationIcon.vue'

const props = defineProps({ screenWidth: { type: Number } })
const customerStore = useCustomerStore()

const emit = defineEmits(['header-data'])


const isLoading = ref(false)



const orderColumns = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 50,

  },
  {
    title: 'Order Number',
    dataIndex: 'number',
    key: 'number',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 200
    // fixed: 'left',
  },

  {
    title: 'Order Total',
    dataIndex: 'total_amount',
    key: 'total_amount',
    resizable: true,
    filterSearch: true,
    width: 200
    // filteredValue: state.filters?.phone || null
  },
  // {
  //   title: 'Invoice',
  //   dataIndex: 'invoice',
  //   key: 'invoice',
  //   resizable: true,
  //   filterSearch: true,
  //   sorter: true,
  //   sortDirections: ['desc', 'asc'],
  //   width: 310
  //   // filteredValue: state.filters?.all_orders || null
  // },
  {
    title: 'Status',
    dataIndex: 'status_id',
    key: 'status_id',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 100
    // filteredValue: state.filters?.order_total || null
  },

  // {
  //   title: 'Items',
  //   dataIndex: 'items_total',
  //   key: 'items_total',
  //   resizable: true,
  //   filterSearch: true,
  //   sortDirections: ['desc', 'asc'],
  //   sorter: true,
  //   width: 100
  // },
  {
    title: 'Order Date',
    dataIndex: 'created_at',
    key: 'created_at',
    resizable: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    filterSearch: true,
    width: 200
    // filteredValue: state.filters?.email || null
  },
])

const orderColumnsMobile = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 46
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Order Number',
    dataIndex: 'number',
    key: 'number',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 150
    // fixed: 'left',
  },
  {
    title: 'Order Total',
    dataIndex: 'total_amount',
    key: 'total_amount',
    resizable: true,
    filterSearch: true,
    width: 80
    // filteredValue: state.filters?.phone || null
  },

  {
    title: 'Order Date',
    dataIndex: 'created_at',
    key: 'created_at',
    resizable: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    filterSearch: true,
    width: 120
    // filteredValue: state.filters?.email || null
  },
])

const invoiceColumns = ref<Record<string, any>[]>([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 60
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Invoice Number',
    dataIndex: 'number',
    key: 'number',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 200
    // fixed: 'left',
  },

  {
    title: 'Orders',
    dataIndex: 'order_id',
    key: 'order_id',
    resizable: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    filterSearch: true,
    width:100
    // filteredValue: state.filters?.email || null
  },
  {
    title: 'Amount Due',
    dataIndex: 'total_amount',
    key: 'total_amount',
    resizable: true,
    filterSearch: true,
    width:100
    // filteredValue: state.filters?.phone || null
  },
  {
    title: 'Status',
    dataIndex: 'status_id',
    key: 'status_id',
    resizable: true,
    filterSearch: true,
    width: 140
    // filteredValue: state.filters?.phone || null
  },
  {
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at',
    resizable: true,
    filterSearch: true,
    width: 140,
    sortDirections: ['desc', 'asc']
    // filteredValue: state.filters?.all_orders || null
  }

])

const invoiceColumnsMobile = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',

    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 45
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Invoice Number',
    dataIndex: 'number',
    key: 'number',

    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 120
    // fixed: 'left',
  },
  // {
  //     title: 'Company',
  //     dataIndex: 'company',
  //     key: 'company',

  //     sortDirections: ['desc', 'asc'],
  //     sorter: true,
  //     width: 80
  //     // filteredValue: state.filters?.company || null
  // },

  {
    title: 'Amount Due',
    dataIndex: 'total_amount',
    key: 'total_amount',

    width: 80
    // filteredValue: state.filters?.phone || null
  },
  {
    title: 'Status',
    dataIndex: 'status_id',
    key: 'status_id',

    width: 65
    // filteredValue: state.filters?.phone || null
  },

])

const responsiveOrderColumns = computed(() => {
  if (props.screenWidth > 850) return orderColumns.value
  else return orderColumnsMobile.value
})

const responsiveInvoiceColumns = computed(() => {
  if (props.screenWidth > 850) return invoiceColumns.value
  else return invoiceColumnsMobile.value
})

const fetchCustomer = async () => {
  isLoading.value = true
  try {
    await customerStore.getCustomer(router.currentRoute?.value?.params?.id)
  } catch (e) {
    message.error(e.response?.data?.message || e.message || JSON.stringify(e))
    // isLoading.value = false
  }
  isLoading.value = false

}
const getStatusColor = (id) => {
  switch (id) {
    case 1: return 'warning'
    case 2: return 'blue'
    case 3: return 'green'
  }
}
const getStatusName = (id) => {
  switch (id) {
    case 1: return 'pending'
    case 2: return 'accepted'
    case 3: return 'completed'
  }
}


onMounted(async () => {
  await fetchCustomer()

  emit('header-data', {
    title: customerStore.customer?.name,
    crumbs: [
      { name: 'customers', route: 'customers' },
      {
        name: customerStore.customer?.name,
        route: 'customers',
        routeparams: customerStore.customer?.id
      }
    ]
  })
})
</script>
<template>
  <div class="w-full  h-fit flex text-black p-4 pt-0 md:pt-4 flex-col overflow-y-auto overflow-x-hidden gap-4">
    <div class="w-full flex flex-col md:flex-row items-center min-h-[10svh] gap-4 mt-4 md:mt-0">
      <div class="card md:w-[31%] ">
        <div class="w-full flex gap-4 relative">
          <div class="p-[0.3rem] bg-[#B3B3B329] rounded-md w-fit h-fit">
            <ProfileIcon />
          </div>
          <div class="flex flex-col text-left gap-1">
            <p class="grey-text">{{ customerStore.customer?.name }}</p>
            <p class="grey-text-sm">
              Customer since
              <span class="text-black font-[500]">{{
                new Date(customerStore.customer?.created_at).toLocaleDateString()
              }}</span>
            </p>
          </div>
          <a-tag class="h-fit absolute right-0 top-0"
            :color="customerStore.customer?.status_id === 1 ? 'green' : 'red'">
            {{ customerStore.customer?.status_id === 1 ? 'Active' : 'Inactive' }}
          </a-tag>
        </div>
        <div class="w-full  flex gap-4 relatve">
          <div class="w-fit md:w-1/2 flex flex-col items-start justify-start">
            <p class="grey-text-sm">Company Name</p>
            <span class="mt-1 text-black font-[500] leading-[100%]">{{
              customerStore.customer?.company
            }}</span>
            <p class="grey-text-sm mt-4">Phone</p>
            <span class="mt-1 text-black font-[500] leading-[100%]">{{
              customerStore.customer?.phone
            }}</span>
          </div>
          <div class="w-1/2 flex flex-col items-start justify-start">
            <p class="grey-text-sm">VAT Number</p>
            <span class="mt-1 text-black font-[500] leading-[100%]">{{
              customerStore.customer?.vat || 'None'
            }}</span>
            <p class="grey-text-sm mt-4">Email</p>
            <span class="mt-1 text-black font-[500] leading-[100%]">{{
              customerStore.customer?.email
            }}</span>
          </div>
        </div>
      </div>

      <div class="card md:w-[19%]">
        <div class="w-full flex gap-4 relative">
          <div class="p-[0.4rem] bg-[#B3B3B329] rounded-md w-fit h-fit">
            <CreditCardIcon />
          </div>
        </div>
        <div class="w-full flex flex-col items-start mt-2">
          <p class="grey-text-sm">Company Name</p>
          <span class="mt-1 text-black font-[500] leading-[100%]">{{
            customerStore.customer?.company
          }}</span>
          <p class="grey-text-sm mt-4">Company vat</p>
          <span class="mt-1 text-black font-[500] leading-[100%]">{{
            customerStore.customer?.company_vat || 'None'
          }}</span>
        </div>
      </div>

      <div class="card md:w-[25%]">
        <div class="w-full flex gap-4 relative">
          <div class="p-[0.4rem] bg-[#B3B3B329] rounded-md w-fit h-fit">
            <LocationIcon />
          </div>
        </div>
        <div class="w-full flex flex-col items-start mt-6">
          <p class="grey-text-sm">Billing Address</p>
          <span class="mt-1 text-black font-[500] leading-[100%]">{{
            customerStore.customer?.billing_address || 'None'
          }}</span>
          <p class="grey-text-sm mt-4">Delivery Address</p>
          <span class="mt-1 text-black font-[500] leading-[100%]">{{
            customerStore.customer?.delivery_address || 'None'
          }}</span>
        </div>
      </div>

      <div class="card md:w-[21%]">
        <div class="w-full flex gap-4 relative">
          <div class="p-[0.4rem] bg-[#B3B3B329] rounded-md w-fit h-fit">
            <CreditCardIcon />
          </div>
        </div>
        <div class="w-full flex flex-col items-start mt-6">
          <p class="grey-text-sm">Total Amount Due</p>
          <div
            class="mt-2 mb-6 px-2 w-[8rem] border-[#C3C3C3] border-[0.5] flex leading-[100%] text-lg items-center justify-start text-left bg-[#F5F5F5] py-2 text-red-500 font-[600] rounded-lg">
            <p>
              {{
                customerStore.totalAmountCustomer.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'GBP'
                })
              }}
            </p>
          </div>
        </div>
      </div>

    </div>

    <div class="w-full p-4 bg-white items-center justify-center rounded-lg min-h-[11rem]">
      <a-table  v-if="customerStore.customer?.orders?.length" :columns="responsiveOrderColumns"
        :data-source="customerStore.customer?.orders" @change="onChange" @resizeColumn="handleResizeColumn"
        :showHeader="true" :scroll="{ y: '21svh' }" :loading="isLoading" :pagination="false">
        <template #title>
          <div class="flex w-full justify-start  items-center gap-4">
            <p class="text-lg font-semibold">Customer Orders</p>
            <!-- <div class="customer-table_filters_filter" v-if="props.screenWidth > 850">
              <a-input v-model:value="ordersFilter.search"></a-input>
             
            </div> -->
          </div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column?.key === 'status_id'">
            <span>
              <a-tag :color="getStatusColor(record.status_id)">
                {{ getStatusName(record.status_id) }}
              </a-tag>
            </span>
          </template>
          <template v-if="column?.key === 'created_at'">
            <p class="text-xs md:text-sm">{{ new Date(record.created_at).toLocaleString() }}</p>
          </template>
          <template v-if="column?.key === 'total_amount'">
            <p class="text-xs md:text-sm">{{
              Number(record.total_amount).toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP'
              })
            }}</p>
          </template>
          <template v-if="column?.key === 'id'">
            <div class="text-sm" @click="router.push({ name: 'order', params: { id: record.id } })">
              <p class="text-xs md:text-sm"> {{ record.id }}</p>
            </div>
          </template>
          <template v-if="column?.key === 'number'">
            <div class="cursor-pointer " @click="router.push({ name: 'order', params: { id: record.id } })">
              <p class="hover:text-blue-500 text-xs md:text-sm">{{ '№' + record.number }}</p>
            </div>
          </template>
        </template>
      </a-table>
      <div v-if="!customerStore.customer?.orders?.length" class="text-2xl text-gray-400">No Customer Orders</div> 
    </div>

    <div class="card w-full items-center justify-center">
      <a-table v-if="customerStore.customer?.invoices?.length" :scroll="{ y: '22svh' }"
        :columns="responsiveInvoiceColumns" :data-source="customerStore.customer?.invoices" @change="onChange"
        @resizeColumn="handleResizeColumn" :showHeader="true" :loading="isLoading" :pagination="false">
        <template #title>
          <div class="flex w-full justify-start  items-center gap-4">
            <p class="text-lg font-semibold">Customer Invoices</p>
            
          </div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column?.key === 'status_id'">
            <div
              class=" py-[0.2rem] px-[0.7rem] border rounded-lg flex items-center justify-center w-fit font-semibold md:text-sm text-xs"
              :class="{
                'bg-[#EBEBEB] text-gray-600': record.status_id == 1,
                'bg-green-200 text-green-600': record.status_id == 2
              }">
              {{ record.status_id == 1 ? 'unpaid' : 'paid' }}
            </div>
          </template>

          <template v-if="column?.key === 'number'">
            <div class="md:text-sm text-xs hover:text-blue-500 cursor-pointer" @click="openViewInvoiceModal(record.id)">
              {{ record.number }}
            </div>
          </template>
          <template v-if="column?.key === 'total_amount'">
            <p class="md:text-sm text-xs ">{{
              Number(record.total_amount).toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP'
              })
            }}</p>
          </template>
          <template v-if="column?.key === 'id'">
            <div class="text-xs md:text-sm hover:text-blue-500 cursor-pointer" @click="openViewInvoiceModal(record.id)">
              {{ record.id }}
            </div>
          </template>

          <template v-if="column?.key === 'created_at'">
            <p class="text-xs md:text-sm">{{ new Date(record.created_at).toLocaleString() }}</p>
          </template>

        </template>
      </a-table>
      <div v-if="!customerStore.customer?.invoices?.length" class="text-2xl text-gray-400">No Customer Invoices</div> 
    </div>

  </div>
</template>
<style scoped lang="scss">
.card {
  @apply rounded-lg bg-white overflow-hidden min-w-fit   w-full min-h-[11rem] p-4 flex justify-between flex-col;
}

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
