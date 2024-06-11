<script setup>
import { message } from 'ant-design-vue'
import { useOrderStore } from '@/stores/order.store'
import { reactive, onMounted, watch, ref, computed } from 'vue'
import FilterIcon from '@/assets/icons/FilterIcon.vue'
import SendIcon from '@/assets/icons/SendIcon.vue'
import BagIcon from '@/assets/icons/BagIcon.vue'


import router from '@/router'
const props = defineProps({ screenWidth: { type: Number } })
const orderStore = useOrderStore()
const state = reactive({
  filters: {},
  page: 1,
  size: 10,
  search: '',
  sort: { field: 'id', order: 'desc' }
})

const openCreateModal = ref(false)
const emit = defineEmits(['header-data'])
const isLoading = ref(false)
const columns = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 100,

  },
  {
    title: 'Order Number',
    dataIndex: 'number',
    key: 'number',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 250
    // fixed: 'left',
  },

  {
    title: 'Order Total',
    dataIndex: 'total_amount',
    key: 'total_amount',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 200
    // filteredValue: state.filters?.phone || null
  },
  {
    title: 'Invoice',
    dataIndex: 'invoice',
    key: 'invoice',
    resizable: true,
    filterSearch: true,
    sorter: true,
    sortDirections: ['desc', 'asc'],
    width: 310
    // filteredValue: state.filters?.all_orders || null
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 100
    // filteredValue: state.filters?.order_total || null
  },

  {
    title: 'Items',
    dataIndex: 'items_total',
    key: 'items_total',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 100
  },
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
const columnsMobile = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 50
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
    title: 'Items',
    dataIndex: 'items_total',
    key: 'items_total',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 50
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

const responsiveColumns = computed(() => {
  if (props.screenWidth > 850) return columns.value
  else return columnsMobile.value
})

const fetchOrders = async () => {
  isLoading.value = true
  try {
    await orderStore.getOrders({ page: state.page, size: state.size, sort: state.sort })
    columns.value.forEach((column) => {
      let filters = orderStore.orders.map((customer) => {
        return customer[column.key]
      })
      column.filters = [...new Set(filters)].map((f) => {
        return { text: f, value: f }
      })
    })
  } catch (e) {
    message.error(e.response?.data?.message || e.message || JSON.stringify(e))
  }
  isLoading.value = false
}

onMounted(async () => {
  emit('header-data', {
    title: 'Orders',
    crumbs: [{ name: 'Orders', route: 'orders' }]
  })
  await fetchOrders()
})
const handleResizeColumn = (w, col) => {
  col.width = w
}


const onChange = async (pagination, filters, sorter) => {
  try {
    Object.keys(filters).forEach((key) => {
      state.filters[key] = filters[key]
    })
    state.page = pagination.current
    state.size = pagination.pageSize

    const params = {
      filter: filters,
      page: pagination.current,
      size: pagination.pageSize
    }

    if (sorter?.field && sorter?.order) {
      const { field, order } = sorter
      state.sort = { field, order }
      params['sort'] = { field, order }
    }

    if (state.search) params['search'] = state.search

    await orderStore.getOrders(params)
  } catch (e) {
    console.log(e)
    message.error(e.response?.data?.message || e.message || JSON.stringify(e))
  }
}
watch(
  () => state.search,
  async (val) => {
    const params = {
      filter: state.filters,
      page: state.page,
      size: state.size,
      sort: state.sort
    }
    if (val) params['search'] = val
    await orderStore.getOrders(params)
  }
)
const getStatusColor = (id) => {
  switch (id) {
    case 1: return 'warning'
    case 2: return 'blue'
    case 3: return 'green'
  }
}
</script>
<template>
  <div class="admin-wrapper">
    <div class="customer-panels flex-col md:flex-row">
      <div class="customer-panels_all w-full md:w-[49.4%]">

        <div class="customer-panels_all_top">
          <div class="customer-panels_all_top_icon">
            <BagIcon />
          </div>
        </div>
        <div class="customer-panels_all_bottom">
          <div class="customer-panels_all_bottom_col flex-col">
            <p>All Orders</p>
            <span>{{ orderStore.total }} <span>+15.80%</span></span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>Completed Orders</p>
            <span>{{ orderStore.comletedOrders }} </span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>Pending Orders</p>
            <span>{{ orderStore.pendingOrders }} </span>
          </div>
        </div>
      </div>
      <div class="customer-panels_all w-full md:w-[49.4%]">
        <div class="customer-panels_all_top">
          <div class="customer-panels_all_top_icon">
            <BagIcon />
          </div>
        </div>
        <div class="customer-panels_all_bottom">
          <div class="customer-panels_all_bottom_col">
            <p>Order Total</p>
            <span>{{ Number(orderStore.orderAmountTotal).toLocaleString('en-US', {
              style: 'currency',
              currency: 'GBP'
            }) }} <span>+15.80%</span></span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>Items Total</p>
            <span>{{ orderStore.orderItemsTotal }} </span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>New Orders</p>
            <span>{{ orderStore.total }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="customer-table">
      <a-table 
      :columns="responsiveColumns" 
      :data-source="orderStore.orders"
      @change="onChange"
      @resizeColumn="handleResizeColumn" 
      :showHeader="true" :loading="isLoading" :pagination="{
          current: state.page,
          total: orderStore.total,
          pageSize: state.size,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20]
        }">
        <template #title>
          <div class="customer-table_filters">
            <p>Orders</p>
            <div class="customer-table_filters_filter" v-if="props.screenWidth > 850">
              <a-input v-model:value="state.search"></a-input>
              <button>
                <FilterIcon />Filter
              </button>
              <button>
                <SendIcon />Download
              </button>
              <!-- <button>bulk_action</button> -->
            </div>
          </div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column?.key === 'status'">
            <span>
              <a-tag :color="getStatusColor(record.status_id)">
                {{ record.status }}
              </a-tag>
            </span>
          </template>
          <template v-if="column?.key === 'created_at'">
            <p class="text-xs md:text-sm">{{ new Date(record.created_at).toLocaleString() }}</p>
          </template>
          <template v-if="column?.key === 'total_amount'">
            {{
              Number(record.total_amount).toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP'
              })
            }}
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
    </div>
    <div></div>
  </div>
</template>
<style scoped lang="scss">
.admin-wrapper {
  @apply w-full  h-fit flex text-black p-4 pt-0  flex-col overflow-y-auto overflow-x-hidden gap-4;

  .cutomer-header {
    @apply w-full flex items-center justify-between;
    color: var(--Black-60, #45464e);
    font-family: Inter;

    font-style: normal;
    font-weight: 500;
    line-height: normal;

    .cutomer-header_btn {
      cursor: pointer;
      color: #fff;
      text-align: center;
      font-family: Inter;

      font-style: normal;
      font-weight: 400;
      line-height: normal;
      border-radius: 12px;
      background: #c40f30;
      border: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem 0.5rem 1rem;

      &:hover {
        opacity: 0.75;
      }
    }
  }

  .customer-panels {
    @apply w-full flex py-4 gap-4;

    .customer-panels_all {
      @apply flex flex-col p-4 rounded-lg bg-[#fff] min-h-[14vh];

      &_top {
        @apply w-full flex justify-between h-1/2;

        &_icon {
          padding: 0.5rem;
          border-radius: 5px;
          background-color: #ececec;
          height: fit-content;
          display: flex;
        }
      }

      &_bottom {
        @apply w-full flex justify-between h-1/2;

        &_col {
          display: flex;
          flex-direction: column;
          width: 33%;
          align-items: flex-start;
          text-align: start;

          p {
            color: var(--Black-30, #8b8d97);
            font-family: Inter;
            font-size: clamp(12px, 14px, 1.2vw);
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }

          span {
            color: var(--Black-60, #45464e);
            font-family: Poppins;
            font-size: 20px;
            font-size: clamp(14px, 20px, 1.25vw);
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            span {
              margin-left: 5px;
              margin-top: 7px;
              color: var(--Action-Green, #519c66);
              font-family: Inter;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }
        }
      }
    }

    .customer-panels_new {
      border-radius: 12px;
      background: #fff;
      min-width: 49.4%;
      min-height: 14vh;
    }
  }

  .customer-table {
    width: 100%;
    height:fit-content;
    // min-height: 100%;
    // max-height: 90%;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    padding: 0 1rem;
    border-radius: 12px;
    background: #fff;

    .id {
      color: #3c8cfc;
      font-weight: 700;
    }

    & :deep(.ant-table-body) {
      // scrollbar-color: #3d3df3 #e0e0e0 !important;
      scrollbar-width: none !important;
    }

    /* Firefox */
    &_filters {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem;

      p {
        color: var(--Black-60, #45464e);

        /* Paragraph 1/Medium */
        margin-left: -10px;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      &_filter {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-right: 2rem;

        button {
          color: var(--Black-50, #53545c);
          text-align: center;

          /* Label 2/Regular */
          font-family: Inter;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 0.5rem 0 0.5rem;
          height: 2rem;
          border-radius: 4px;
          border: 1px solid var(--Black-50, #53545c);
          background: #fff;

          &:hover {
            // background: rgba(94, 99, 102, 0.08);
            border: 1px solid #3c8cfc;
          }
        }
      }
    }
  }
}
</style>
