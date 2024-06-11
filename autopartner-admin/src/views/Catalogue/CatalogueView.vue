<script setup lang="ts">
import { useCustomerProductStore } from '@/stores/customer-product.store'
import { reactive, onMounted, watch, ref, computed } from 'vue'
import ProductCardComponent from '@/components/ProductCardComponent.vue'
import ProductCategorCheckerComponent from './components/ProductCategorCheckerComponent.vue'
import ProductFilterComponent from './components/ProductFilterComponent.vue'
const emit = defineEmits(['header-data'])

import router from '@/router'
import { message } from 'ant-design-vue'
const props = defineProps({ screenWidth: { type: Number } })
const productStore = useCustomerProductStore()
const state = reactive({
  filters: {} as Record<string, string>,
  page: 1,
  size: 100,
  search: '',
  sort: { field: 'id', order: 'desc' },
  filterFields: { categories: [], countries: [], stock: [{ name: 'In Stock', value: 'in-stock' }, { name: 'Out of Stock', value: 'out-of-stock' }] }
})
const params = {
  filter: state.filters,
  page: state.page,
  size: state.size,
  sort: state.sort
}
onMounted(async () => {
  emit('header-data', {
    title: 'Catalogue',
    crumbs: [{ name: 'catalogue', route: 'catalogue' }]
  })
  await productStore.getProductCategories()
  await productStore.getProducts(params)
  await productStore.getShoppingCart()
  const alreadyInFilters =[]
  productStore.products.forEach((product) => {
    if (!alreadyInFilters.includes(product.category_id)){
      state.filterFields.categories.push({ name: product.category, value: product.category_id })
      alreadyInFilters.push(product.category_id)
    }
    if (!alreadyInFilters.includes(product.country)){ 
    state.filterFields.countries.push({ name: product.country, value: product.country })
    alreadyInFilters.push(product.country)
    }
  })
  await productStore.getFavorites()

})

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
    await productStore.getProducts(params)
  }
)

watch(
  () => state.filters,
  async (val) => {
    const params = {
      filter: state.filters,
      page: state.page,
      size: state.size,
      sort: state.sort
    }
    if (state.search) params['search'] = val
    await productStore.getProducts(params)
  }, { deep: true }
)

const addToCart = async (productItem) => {
  try {
    await productStore.addToShoppingCart(productItem)
    message.success(`Product added to Your Cart`)
  } catch (e) {
    message.error(e.response?.data?.message || e.message || e)
  }
}

const updateFavorites = async (product_id: number) => {
  if (productStore.favoriteItemProductIds?.includes(product_id)) {
    const [{ id }] = productStore.favorites.items?.filter(item => item.product_id == product_id)
    await productStore.removeFromFavorites(id)
    message.success(`Product removed to Your Favorites`)
  } else {
    await productStore.addToFavorites(product_id)
    message.success(`Product added to Your Favorites`)
  }
}
</script>
<template>
  <div class="w-full max-w-screen h-full flex text-black p-4 flex-col oveflow-y-auto overflow-x-hidden gap-4 ">
    <div class="flex-start w-full h-fit">
      <ProductCategorCheckerComponent :categories="productStore.categories"
        @set-active-category="state.filters['category_id'] = [$event]" />
    </div>
    <div class="w-full flex items-center gap-4 h-fit leading-normal justify-end relative z-[5]">
      <a-input class="border-[0.3px] rounded-md py-[0.4rem] w-full md:w-[10.4rem] h-fit" placeholder="Search"
        v-model:value="state.search"></a-input>
      <ProductFilterComponent :filters="state.filterFields" @update-filters="state.filters = $event" />
      <button class="button-filter py-2 min-w-fit">Sort By</button>
      <!-- <button class="px-4 whitespace-nowrap">Export List</button>
              <button>bulk_action</button> -->
    </div>
    <div class="flex-start flex-col md:flex-row w-full  shrink-0 flex-wrap md:h-fit gap-5 oveflow-auto"
      v-if="productStore.products">
      <ProductCardComponent v-for="(product, index) in productStore.products" :key="index" :product="product"
        @add-to-cart="addToCart" @add-to-favorites="updateFavorites" />
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
@/stores/customer-product.store
