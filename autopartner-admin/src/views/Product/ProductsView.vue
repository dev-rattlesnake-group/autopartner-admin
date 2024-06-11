<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useProductStore, type Iparams } from '@/stores/product.store'
import { reactive, onMounted, watch, ref, computed } from 'vue'
import FilterIcon from '@/assets/icons/FilterIcon.vue'
import SendIcon from '@/assets/icons/SendIcon.vue'
import BagIcon from '@/assets/icons/BagIcon.vue'
// import CustomerCreateComponent from './components/CustomerCreateComponent.vue'
import router from '@/router'
const props = defineProps({ screenWidth: { type: Number } })
const productStore = useProductStore()
const state = reactive({
  filters: {} as Record<string, string>,
  page: 1,
  size: 10,
  search: '',
  sort: { field: 'id', order: 'desc' }
})

const selectedFilterCategory = ref('All')
const openCreateModal = ref(false)
const emit = defineEmits(['header-data'])

const handleFilter = async (e: string) => {
  selectedFilterCategory.value = e
  if (e == 'All') {
    delete state.filters?.category
  } else {
    state.filters['category'] = e
  }

  const params: Iparams = {
    filter: state.filters,
    page: state.page,
    size: state.size,
    sort: state.sort
  }
  await productStore.getProducts(params)
  emit('header-data', {
    title: 'Products',
    crumbs: [
      { name: 'Products', route: 'products' },
      { name: selectedFilterCategory.value, route: 'products' }
    ]
  })
}

const isLoading = ref(false)

const columns = ref<Record<string,any>[]>([
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
    title: 'Product Name',
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
    title: 'Category',
    dataIndex: 'category_id',
    key: 'category_id',
    resizable: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    filterSearch: true,
    width: 80

    // filteredValue: state.filters?.company || null
  },
  {
    title: 'Unit Size (L)',
    dataIndex: 'unit_size',
    key: 'unit_size',
    resizable: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    filterSearch: true,
    width: 100
    // filteredValue: state.filters?.email || null
  },
  {
    title: 'Qt in Pack',
    dataIndex: 'quantity_pack',
    key: 'quantity_pack',
    resizable: true,
    filterSearch: true,
    width: 100
    // filteredValue: state.filters?.phone || null
  },
  {
    title: 'Stock (Unit)',
    dataIndex: 'stock',
    key: 'stock',
    resizable: true,
    filterSearch: true,
    width: 100
    // filteredValue: state.filters?.phone || null
  },
  {
    title: 'Shelf life',
    dataIndex: 'shelf_life',
    key: 'shelf_life',
    resizable: true,
    filterSearch: true,
    sorter: true,
    sortDirections: ['desc', 'asc'],
    width: 100
    // filteredValue: state.filters?.all_orders || null
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 80

    // filteredValue: state.filters?.order_total || null
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 80
    // filteredValue: state.filters?.status_id || null
  },
  {
    title: 'Price (Unit)',
    dataIndex: 'price',
    key: 'price',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 120
    // filteredValue: state.filters?.created_at || null
  }
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
    width: 40
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 80
    // fixed: 'left',
  },
  {
    title: 'Category',
    dataIndex: 'category_id',
    key: 'category_id',
    resizable: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    filterSearch: true,
    width: 60

    // filteredValue: state.filters?.company || null
  },
  // {
  //   title: 'Unit Size (L)',
  //   dataIndex: 'unit_size',
  //   key: 'unit_size',
  //   resizable: true,
  //   sortDirections: ['desc', 'asc'],
  //   sorter: true,
  //   filterSearch: true,
  //   width: 100
  //   // filteredValue: state.filters?.email || null
  // },
  // {
  //   title: 'Qt',
  //   dataIndex: 'quantity_pack',
  //   key: 'quantity_pack',
  //   resizable: true,
  //   filterSearch: true,
  //   width: 100
  //   // filteredValue: state.filters?.phone || null
  // },
  // {
  //   title: 'Stock (Unit)',
  //   dataIndex: 'stock',
  //   key: 'stock',
  //   resizable: true,
  //   filterSearch: true,
  //   width: 50
  //   // filteredValue: state.filters?.phone || null
  // },
  // {
  //   title: 'Shelf life',
  //   dataIndex: 'shelf_life',
  //   key: 'shelf_life',
  //   resizable: true,
  //   filterSearch: true,
  //   sorter: true,
  //   sortDirections: ['desc', 'asc'],
  //   width: 100
  //   // filteredValue: state.filters?.all_orders || null
  // },
  // {
  //   title: 'Discount',
  //   dataIndex: 'discount',
  //   key: 'discount',
  //   resizable: true,
  //   filterSearch: true,
  //   sortDirections: ['desc', 'asc'],
  //   sorter: true,
  //   width: 80

  //   // filteredValue: state.filters?.order_total || null
  // },
  // {
  //   title: 'Status',
  //   dataIndex: 'status',
  //   key: 'status',
  //   resizable: true,
  //   filterSearch: true,
  //   sortDirections: ['desc', 'asc'],
  //   sorter: true,
  //   width: 80
  //   // filteredValue: state.filters?.status_id || null
  // },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    resizable: true,
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 80
    // filteredValue: state.filters?.created_at || null
  }
])

const responsiveColumns = computed(() => {
  if (props.screenWidth < 850) return columnsMobile.value
  else return columns.value
})

const fetchProducts = async () => {
  isLoading.value = true
  try {
    await productStore.getProducts({ page: state.page, size: state.size, sort: state.sort })
    columns.value.forEach((column) => {
      let filters = productStore.products.map((product) => {
        return product[column.key]
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
    title: 'Products',
    crumbs: [
      { name: 'Products', route: 'products' },
      { name: selectedFilterCategory.value, route: 'products' }
    ]
  })
  await productStore.getProductCategories()
  await fetchProducts()
})
const handleResizeColumn = (w, col:any) => {
  col.width = w
}
const handleCreateProduct = () => {
  router.push({ name: 'createProduct' })
}
const closeCreateModal = async (isSuccess: boolean) => {
  if (isSuccess) await fetchProducts()
  openCreateModal.value = false
}

const onChange = async (
  pagination: Record<string, number>,
  filters: Record<string, string>,
  sorter: Record<string, string>
) => {
  try {
    Object.keys(filters).forEach((key) => {
      state.filters[key] = filters[key]
    })
    state.page = pagination.current
    state.size = pagination.pageSize

    const params :Iparams = {
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

    await productStore.getProducts(params)
  } catch (e) {
    console.log(e)
    message.error(e.response?.data?.message || e.message || JSON.stringify(e))
  }
}
watch(
  () => state.search,
  async (val) => {
    const params:Iparams = {
      filter: state.filters,
      page: state.page,
      size: state.size,
      sort: state.sort
    }
    if (val) params['search'] = val
    await productStore.getProducts(params)
  }
)
</script>
<template>
  <div class="customers-wrapper">
    <CustomerCreateComponent :open="openCreateModal" @close="closeCreateModal" />
    <div class="customer-panels flex flex-col lg:flex-row">
      <div class="customer-panels_all w-full lg:w-[45%] bg-[#C40F30] text-white">
        <div class="flex items-center w-full justify-between max-h-[50%] mb-[2rem]">
          <div class="flex gap-2 items-center w-fit">
            <div class="customer-panels_all_top_icon"><BagIcon :color="'white'" /></div>
            <div class="h-fit flex text-lg">Inventory Summary</div>
          </div>
          <p class="flex h-fit leading-none items-start text-sm">All Categories</p>
        </div>
        
        <div class="customer-panels_all_bottom justify-bottom mt-4">
          <div class="customer-panels_all_bottom_col">
            <p>All Products</p>
            <span>{{ productStore.total }} </span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>Categories</p>
            <span>{{ productStore.categories.length }} </span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>In-Stock</p>
            <span>{{ productStore.inStock }} </span>
          </div>
          <div class="customer-panels_all_bottom_col">
            <p>Out of Stock</p>
            <span>{{ productStore.outOfStock }} </span>
          </div>
        </div>

      </div>
      <div class="customer-panels_all  w-full lg:w-[35%] bg-white justify-start items-start">
        <div class="flex flex-col text-black h-full w-full items-start justify-start text-gray-500">
          <div
            class="leading-[100%] mt-2 mb-6 cursor-pointer hover:text-black"
            :class="{ underline: selectedFilterCategory === 'All' }"
            @click="handleFilter('All')"
          >
            All products
          </div>
          <div class="flex w-full gap-6 flex-col md:flex-row">
            <div class="flex flex-col leading-[200%] mr-0 md:mr-6 items-start">
              <div
                class="cursor-pointer hover:text-black"
                :class="{ underline: selectedFilterCategory === 'Beer' }"
                @click="handleFilter('Beer')"
              >
                Beer
              </div>
              <div
                class="cursor-pointer hover:text-black"
                :class="{ underline: selectedFilterCategory === 'Cider' }"
                @click="handleFilter('Cider')"
              >
                Cider
              </div>
              <div
                class="cursor-pointer hover:text-black"
                @click="handleFilter('Wine')"
                :class="{ underline: selectedFilterCategory === 'Wine' }"
              >
                Wine
              </div>
            </div>
            <div class="flex flex-col leading-[200%] ml-0 md:ml-6 items-start">
              <div
                class="cursor-pointer hover:text-black"
                @click="handleFilter('Cocktails')"
                :class="{ underline: selectedFilterCategory === 'Cocktails' }"
              >
                Cocktails
              </div>
              <div
                class="cursor-pointer hover:text-black"
                @click="handleFilter('Alchohol free')"
                :class="{ underline: selectedFilterCategory === 'Alchohol free' }"
              >
                Alchohol free
              </div>
              <div
                class="cursor-pointer hover:text-black"
                @click="handleFilter('Snacks')"
                :class="{ underline: selectedFilterCategory === 'Snacks' }"
              >
                Snacks
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class=" w-full lg:w-[18%] flex flex-col gap-4 ml-4 items-end px-4 lg:px-0">
        <button
          class="cutomer-header_btn bg-[#c40f30] w-fit px-4 text-white"
          @click="handleCreateProduct"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 5V19"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 12H19"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Add a New Product
        </button>
        <button
          class="cutomer-header_btn bg-white text-black justify-center flex items-center rounded-xl gap-2 px-4 w-fit"
          @click="handleCreateProduct"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 5V19"
              stroke="#9A9A9A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 12H19"
              stroke="#9A9A9A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="mr-5">Upload CSV List</p>
        </button>
      </div>
    </div>
    <div class="customer-table">
      <a-table
        :columns="responsiveColumns"
        :loading="isLoading"
        :data-source="productStore.products"
        @change="onChange"
        
        @resizeColumn="handleResizeColumn"
        :showHeader="true"
   
        :pagination="{
          current: state.page,
          total: productStore.total,
          pageSize: state.size,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20]
        }"
      >
        <template #title>
          <div class="customer-table_filters">
            <p>Products</p>
            <div class="customer-table_filters_filter" v-if="props.screenWidth > 850">
              <a-input v-model:value="state.search"></a-input>
              <button><FilterIcon />Filter</button>
              <button><SendIcon />Download</button>
              <button class="px-4 whitespace-nowrap">Export List</button>
          
            </div>
          </div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column?.key === 'status'">
            <div
              class="text-xs md:text-sm py-[0.2rem] px-[0.7rem] border rounded-lg flex items-center justify-center w-fit font-semibold"
              :class="{
                'bg-[#EBEBEB] text-gray-600': record.status == 'draft',
                'bg-green-200 text-green-600': record.status == 'published'
              }"
            >
              {{ record.status }}
            </div>
          </template>
          <template v-if="column?.key === 'stock'">
            <div
              class="text-xs md:text-sm  py-[0.2rem] px-[0.7rem] whitespace-nowrap rounded-lg flex items-center justify-center w-fit h-fit"
              :class="{
                'bg-green-100 text-green-600': record.stock > 0,
                'bg-[#F57E77] text-red-600': record.stock <= 0
              }"
            >
              {{ record.stock > 0 ? `In-Stock: ${record.stock}` : `Out of Stock` }}
            </div>
          </template>
          <template v-if="column?.key === 'category_id'">
            <p class="text-xs md:text-sm">{{ record.category }}</p>
          </template>
          <template v-if="column?.key === 'price'">
            <p class="text-xs md:text-sm">{{
              Number(record.price).toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP'
              })
            }}</p>
          </template>
          <template v-if="column?.key === 'id'">
            <div
              class="text-sm"
            
            >
            <p class="text-xs md:text-sm"> {{ record.id }}</p>
            </div>
          </template>
          <template v-if="column?.key === 'name'">
            <div class="cursor-pointer flex items-center gap-4" @click="router.push({name:'updateProduct', params:{id:record.id}})">
              <div
                class="mt-2 min-w-[2.5rem] max-w-[2.5rem] border-2 rounded-md overflow-hidden flex items-center justify-center"
                :class="{ 'h-fit': record.image_url, 'h-[2.5rem]': !record.image_url }"
              >
                <img v-if="record.image_url" :src="record.image_url" alt="" />
                <p v-else class="text-xs font-semibold text-center">No Image</p>
              </div>
              <p class="text-xs md:text-sm hover:text-blue-500">{{ record.name }}</p>
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
  @apply w-full  h-fit flex text-black p-4 pt-0  flex-col overflow-y-auto overflow-x-hidden gap-4;

  .cutomer-header_btn {
    cursor: pointer;
    // color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 12px;
    // background: #c40f30;
    border: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    &:hover {
      opacity: 0.75;
    }
  }

  .customer-panels {
    width: 100%;
    // min-height: 100%;
    // display: flex;
    padding: 1rem 0 1rem 0;
    gap: 1rem;
    .customer-panels_all {
      border-radius: 12px;
      // background: #fff;
      //  width: 49.4%;
      min-height: 14vh;
      display: flex;
      flex-direction: column;
      padding: 1rem;

      &_top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 50%;
        &_icon {
          padding: 0.5rem;
          border-radius: 5px;
          // background-color: #ececec;
          height: fit-content;
          display: flex;
        }
      }
      &_bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        // height: 50%;
        &_col {
          display: flex;
          flex-direction: column;
          width: 33%;
          align-items: flex-start;
          text-align: start;
          p {
            // color: var(--Black-30, #8b8d97);
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
          span {
            // color: var(--Black-60, #45464e);
            font-family: Poppins;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            span {
              // color: var(--Action-Green, #519c66);
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
        overflow-x: auto;
        display: flex;
        flex-direction: column;
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
    } /* Firefox */
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
