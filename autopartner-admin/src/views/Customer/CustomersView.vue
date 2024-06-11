<script setup>
import { message } from 'ant-design-vue'
import { useCustomerStore } from '@/stores/customer.store'
import { reactive, onMounted, watch, ref, computed } from 'vue'
import FilterIcon from '@/assets/icons/FilterIcon.vue'
import SendIcon from '@/assets/icons/SendIcon.vue'
import UsersIcon from '@/assets/icons/UsersIcon.vue'
import BagIcon from '@/assets/icons/BagIcon.vue'
import CustomerCreateComponent from './components/CustomerCreateComponent.vue'
import router from '@/router'
const props = defineProps({ screenWidth: { type: Number } })
const customerStore = useCustomerStore()
const state = reactive({
  filters: {},
  page: 1,
  size: 10,
  search: '',
  sort: { field: 'id', order: 'desc' }
})

const isLoading = ref(false)
const openCreateModal = ref(false)
const emit = defineEmits(['header-data'])
const columns = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 40
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 200
    // fixed: 'left',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    resizable: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    filterSearch: true,
    width: 200
    // filteredValue: state.filters?.company || null
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    resizable: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    filterSearch: true,
    width: 100
    // filteredValue: state.filters?.email || null
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    resizable: true,
    filterSearch: true,
    width: 100
    // filteredValue: state.filters?.phone || null
  },
  {
    title: 'All Orders',
    dataIndex: 'all_orders',
    key: 'all_orders',
    resizable: true,
    filterSearch: true,
    sorter: true,
    sortDirections: ['desc', 'asc'],
    width: 100
    // filteredValue: state.filters?.all_orders || null
  },
  {
    title: 'Order Total',
    dataIndex: 'order_total',
    key: 'order_total',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 100
    // filteredValue: state.filters?.order_total || null
  },
  {
    title: 'Status',
    dataIndex: 'status_id',
    key: 'status_id',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 100
    // filteredValue: state.filters?.status_id || null
  },
  {
    title: 'Customer Since',
    dataIndex: 'created_at',
    key: 'created_at',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 140
    // filteredValue: state.filters?.created_at || null
  }
])
const columnsMobile = ref([
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   key: 'id',
  //   // resizable: true,
  //   filterSearch: true,
  //   sortDirections: ['desc', 'asc'],
  //   sorter: true,
  //   width: 4
  //   // filteredValue: state.filters?.id || null
  // },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true
    // fixed: 'left',
  },


  {
    title: 'All Orders',
    dataIndex: 'all_orders',
    key: 'all_orders',
    width: 20,
    filterSearch: true,
    sorter: true,
    sortDirections: ['desc', 'asc']
    // filteredValue: state.filters?.all_orders || null
  },
  {
    title: 'Order Total',
    dataIndex: 'order_total',
    key: 'order_total',
    width: 40,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true
    // filteredValue: state.filters?.order_total || null
  },
  {
    title: 'Status',
    dataIndex: 'status_id',
    key: 'status_id',
    width: 40,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true
    // filteredValue: state.filters?.status_id || null
  }
])
const responsiveColumns = computed(() => {
  if (props.screenWidth > 850) return columns.value
  else return columnsMobile.value
})

const fetchCustomers = async () => {
  isLoading.value = true
  try {
    await customerStore.getCustomers({ page: state.page, size: state.size, sort: state.sort })
    columns.value.forEach((column) => {
      let filters = customerStore.customers.map((customer) => {
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
    title: 'Customers',
    crumbs: [{ name: 'Customers', route: 'customers' }]
  })
  await fetchCustomers()
})
const handleResizeColumn = (w, col) => {
  col.width = w
}
const handleCreateCustomer = () => {
  openCreateModal.value = true
}
const closeCreateModal = async (isSuccess) => {
  if (isSuccess) await fetchCustomers()
  openCreateModal.value = false
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

    await customerStore.getCustomers(params)
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
    await customerStore.getCustomers(params)
  }
)
const console = (key) => {
  console.log('key:', key)
}
</script>
<template>
  <div class="customers-wrapper">
    <div class="cutomer-header">
      <h1 class="invisible md:visible">Customers Summary</h1>
      <button class="cutomer-header_btn w-fit " @click="handleCreateCustomer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Add a New Customer
      </button>
    </div>
    <CustomerCreateComponent :open="openCreateModal" @close="closeCreateModal" />
    <div class="customer-panels flex-col md:flex-row">
      <div class="customer-panels_all w-full md:w-[49.4%]">

        <div class="customer-panels_all_top">
          <div class="customer-panels_all_top_icon">
            <UsersIcon />
          </div>
        </div>
        <div class="customer-panels_all_bottom">
          <div class="customer-panels_all_bottom_col flex-col">
            <p>All Customers</p>
            <span>{{ customerStore.total }} <span>+15.80%</span></span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>Active</p>
            <span>{{ customerStore.activeCustomers }} </span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>In-Active</p>
            <span>{{ customerStore.inActiveCustomers }} </span>
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
            <p>New Customers</p>
            <span>{{ customerStore.total }} <span>+15.80%</span></span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>All Orders</p>
            <span>{{ customerStore.allOrders }} </span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>Abandoned Carts</p>
            <span>{{ customerStore.inActiveCustomers }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="customer-table">
      <a-table :columns="responsiveColumns" :loading="isLoading" :data-source="customerStore.customers" @change="onChange"
        @resizeColumn="handleResizeColumn" :showHeader="true" :pagination="{
          current: state.page,
          total: customerStore.total,
          pageSize: state.size,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20]
        }">
        <template #title>
          <div class="customer-table_filters">
            <p>Customers</p>
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
        <template  #bodyCell="{ column, record }">
          <template v-if="column?.key === 'status_id'">
            <span>
              <a-tag class="md:text-sm text-xs" :color="record.status_id === 1 ? 'green' : 'red'">
                {{ record.status_id === 1 ? 'Active' : 'Inactive' }}
              </a-tag>
            </span>
          </template>
          <template v-if="column?.key === 'created_at'">
            {{ new Date(record.created_at).toLocaleString() }}
          </template>
          <template v-if="column?.key === 'order_total'">
            <p class="md:text-sm text-xs">{{
              Number(record.order_total).toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP'
              })
            }}</p>
          </template>
          <template v-if="column?.key === 'all_orders'">
            <p class="md:text-sm text-xs">{{
              Number(record.all_orders)
             
            }}</p>
          </template>
          <template v-if="column?.key === 'id'">
            <div class="text-xs md:text-sm" @click="router.push({ name: 'customer', params: { id: record.id } })">
              {{ record.id }}
            </div>
          </template>
          <template v-if="column?.key === 'name'">
            <div class="cursor-pointer text-xs md:text-sm" @click="router.push({ name: 'customer', params: { id: record.id } })">
              <p class="hover:text-blue-500">{{ record.name }}</p>
            </div>
          </template>
        </template>
      </a-table>
    </div>
    <div></div>
  </div>
</template>
<style scoped lang="scss">
.customers-wrapper {
  @apply w-full h-fit flex text-black p-4 flex-col overflow-y-auto overflow-x-hidden;

  .cutomer-header {
    @apply w-full flex items-center justify-between;
    color: var(--Black-60, #45464e);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    .cutomer-header_btn {
      cursor: pointer;
      color: #fff;
      text-align: center;
      font-family: Inter;
      font-size: 14px;
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
      @apply flex flex-col p-4 rounded-lg bg-[#fff] min-h-[12vh];

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
            font-size: clamp(14px, 20px, 1.25vw);
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            display: flex;

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
    position: relative;
    width: 100%;
    max-height: 90%;

    // height:90%;
    // display: flex;
    // flex-direction: column;
    overflow-y: auto;
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
      // position: sticky;
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
