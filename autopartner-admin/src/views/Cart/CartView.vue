<script setup lang="ts">
import { reactive, onMounted, watch, ref, computed } from 'vue'
import router from '@/router'
import { message } from 'ant-design-vue'
import { useOrderStore } from '@/stores/order.store';
import { useCustomerProductStore } from '@/stores/customer-product.store'
import OrderItemMobileComponent from '@/components/OrderItemMobileComponent.vue';
const props = defineProps({ screenWidth: { type: Number } })
const emit = defineEmits(['header-data'])
const productStore = useCustomerProductStore()
const orderStore = useOrderStore()
const state = reactive({
  filters: []
})
const columns = ref<Record<string, any>[]>([

  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
    // resizable: true,
    filterSearch: true,
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
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 120
    // filteredValue: state.filters?.id || null
  },
  {
    title: 'Qty',
    dataIndex: 'quantity',
    key: 'quantity',
    // resizable: true,
    filterSearch: true,
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
    filterSearch: true,
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
    filterSearch: true,
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
    filterSearch: true,
    sortDirections: ['desc', 'asc'],
    sorter: true,
    width: 120
    // filteredValue: state.filters?.id || null
  },

])
const createOrder = async (): Promise<void> => {
  if (!productStore.shopping_cart?.items?.length) {
    message.error('Empty shopping cart')
    return
  }
  try {
    const cartId = productStore.shopping_cart.id
    await orderStore.createOrder(cartId)
    await productStore.getShoppingCart()
    message.success(`Order created sucсesfully `)
  } catch (e) {
    console.log(e)
    message.error(e.response?.data?.message || e.message || e)
  }
}

const clearCart = async () => {
  if (!productStore.shopping_cart?.items?.length) {
    message.error('Empty shopping cart')
    return
  }
  try {
    // const cartId = productStore.shopping_cart.id 
    // await productStore
    // await productStore.getShoppingCart()
    // message.success(`Order created sucсesfully `)
  } catch (e) {
    console.log(e)
    message.error(e.response?.data?.message || e.message || e)
  }
}

const addToCart = async (productItem: Record<string, any>): Promise<void> => {
  try {
    const cartItemDto = {
      product_id: productItem.product_id,
      quantity: productItem.quantity + 1,
      product_price: productItem.product_price,

    }
    await productStore.addToShoppingCart(cartItemDto)
    message.success(`Product added to Your Cart`)
  } catch (e) {
    message.error(e.response?.data?.message || e.message || e)
  }
}

const removeFromCart = async (productItem: Record<string, any>): Promise<void> => {
  try {
    const cartItemDto = {
      product_id: productItem.product_id,
      quantity: productItem.quantity - 1,
      product_price: productItem.product_price,

    }
    await productStore.addToShoppingCart(cartItemDto)
    message.success(`Product removed from Your Cart`)
  } catch (e) {
    message.error(e.response?.data?.message || e.message || e)
  }
}


onMounted(async (): Promise<void> => {
  emit('header-data', {
    title: 'Shopping Cart',
    crumbs: [{ name: 'shopping cart', route: 'shopping-cart' }]
  })
  await productStore.getShoppingCart()

})




</script>
<template>
  <div class="w-full h-full flex-start text-black p-4 flex-col oveflow-y-auto gap-4 ">
    <div class="w-full  bg-white rounded-md p-4" v-if="screenWidth > 650">
      <!-- {{ productStore.shopping_cart }} -->
      <a-table :bordered="false" :columns="columns" :data-source="productStore?.shopping_cart?.items" @change="onChange"
        :showHeader="true" :scroll="{ y: `47.5svh` }" :row-selection="rowSelection" :pagination="false">
        <template #title>
          <div class="w-full  flex">
            <p class="font-semibold text-lg">Total Items: <span class="text-red-500 font-semibold">{{
              productStore.shopping_cart?.items?.length || 0 }}</span></p>
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
              <span class="font-bold text-lg"> {{ Number(productStore.shopping_cart?.total_amount ||
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
          <a-table-summary fixed>
            <a-table-summary-cell>
            </a-table-summary-cell>
            <a-table-summary-cell>
            </a-table-summary-cell>
            <a-table-summary-cell>
            </a-table-summary-cell>
            <a-table-summary-cell class="text-md w-full py-4">
              <button @click="createOrder" :disabled="!productStore.shopping_cart?.items?.length"
                class="hover:opacity-75 leading-[100%] h-[2.3rem] bg-[#C40F30] font-bold text-white flex rounded-md px-6 w-[80%] py-2 justify-center items-center">
                Create Order
              </button>
            </a-table-summary-cell>
            <a-table-summary-cell class="text-md w-full py-4">
              <button @click="clearCart" :disable="false"
                class="hover:opacity-75  leading-[100%] h-[2.3rem] bg-gray-300 font-bold text-white flex rounded-md px-6 w-[80%] py-2 justify-center items-center">
                Clear All
              </button>
            </a-table-summary-cell>
            <a-table-summary-cell>

            </a-table-summary-cell>
          </a-table-summary>

        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column?.key === 'product_name'">
            <div class="cursor-pointer flex items-center gap-4 text-center">
              <div
                class="mt-2 min-w-[2.5rem] max-w-[2.5rem] border-2 rounded-md overflow-hidden flex items-center justify-center"
                :class="{ 'h-9 ': record.product_url, 'h-[2.5rem]': !record.product_url }">
                <img class="object-cover" v-if="record.product_url" :src="record.product_url"
                  :alt="record.product_name" />
                <p v-else class="text-xs font-semibold text-center">No Image</p>
              </div>
              <p class="hover:text-blue-500">{{ record.product_name }}</p>
            </div>
          </template>
          <template v-if="column?.key === 'quantity'">
            <div class="w-full flex justify-start gap-4 ">
              <div>
                <p class="">{{ record.quantity }}</p>
              </div>
              <div>

                <div class="flex flex-col gap-2">
                  <button @click="addToCart(record)"
                    class="font-bold cursor-pointer hover:text-blue-500  hover:drop-shadow-lg flex items-center justify-center w-[1rem] h-[1rem] border">+</button>
                  <button @click="removeFromCart(record)"
                    class="font-bold cursor-pointer hover:text-blue-500  hover:drop-shadow-md flex items-center justify-center w-[1rem] h-[1rem] border">-</button>

                </div>
              </div>
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
      <OrderItemMobileComponent :order="productStore.shopping_cart">
        <div class="flex gap-4 w-full">
          <button @click="createOrder" :disabled="!productStore.shopping_cart?.items?.length"
            class="hover:opacity-75 leading-[100%] h-[2.3rem] bg-[#C40F30] font-bold text-white flex rounded-md px-6 w-[80%] py-2 justify-center items-center">
            Create Order
          </button>
          <button @click="clearCart" :disable="false"
            class="hover:opacity-75  leading-[100%] h-[2.3rem] bg-gray-300 font-bold text-white flex rounded-md px-6 w-[80%] py-2 justify-center items-center">
            Clear All
          </button>
        </div>
      </OrderItemMobileComponent>
    </div>

  </div>
</template>
<style scoped lang="scss">
.flex-start {
  @apply flex items-start justify-start;
}

.button-filter {
  @apply border-[0.3px] border-gray-500 px-4 gap-2 items-center rounded-md h-fit py-[0.4rem] flex leading-normal hover:opacity-75 bg-white;
}
</style>
