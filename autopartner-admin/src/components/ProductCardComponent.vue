<script setup lang="ts">
import { reactive, computed } from 'vue'
import HeartIcon from '@/assets/icons/HeartIcon.vue'
import { message } from 'ant-design-vue'
import { useCustomerProductStore } from '@/stores/customer-product.store';

const emit = defineEmits(['add-to-cart', 'add-to-favorites'])
const props = defineProps({ product: { type: Object } })
const state = reactive({
  reserved: 0,
  favoritesActive: 'none'
})
const productStore = useCustomerProductStore()

const isInStock = computed(() => {
  if (props.product?.stock > 0) return true
  else return false
})

const addToCart = (product) => {
  if (!state.reserved || state.reserved<=0) {
    message.error('Set correct quantity')
    return
  }
  if (state.reserved > product.stock ) {
    message.error(`Quantity ${state.reserved} is out of stock`)
    return
  }
  const productDto = { product_id: product.id, quantity: state.reserved, product_price: product.price, amount: Number(product.price * state.reserved).toFixed(2) }
  emit('add-to-cart', productDto)
}



</script>
<template>
  <div
    class="start-font select-none flex flex-col items-start md:justify-start justify-between bg-white rounded-lg sm:max-h-[62svh] md:min-h-[40svh] min-w-fit w-full md:w-[max(24.2%,22rem)] lg:w-[max(24.1%,16rem)]  shrink-0 leading-normal hover:drop-shadow-md ease-in-out duration-300 overflow-hidden">
    <div class="min-w-fit w-full rounded-t-lg h-[max(22rem,34svh)] md:max-h-[45%]  bg-img relative"
      :style="{ backgroundImage: 'url(' + product?.image_url + ')' }">
      <div class="absolute top-4 left-0 py-[1px] rounded-r-md text-white font-semibold flex items-center px-3" :class="{
        'bg-[#15B278C9]': isInStock,
        'bg-[#C40F30]': !isInStock
      }">
        {{ isInStock ? `In Stock: ${props.product.stock}` : 'Out of Stock' }}
      </div>
      <div class="absolute top-4 right-4 w-4 h-4 cursor-pointer" @click="emit('add-to-favorites', product?.id)">
        <HeartIcon :isActive="productStore.favoriteItemProductIds?.includes(product.id)" />
      </div>
    </div>

    <div class="text-left p-4 h-[4rem] leading-normal">
      <p class="text-lg font-semibold">{{ product.name }}</p>
    </div>
    <div class="card-col">
      <div class="flex items-center justify-start gap-2 w-1/2 text-green-500">
        <span class="font-semibold mt-2">Price </span>
        <span class="text-2xl md:text-lg lg:text-lg xl:text-2xl font-semibold">
          {{
        Number(product.price).toLocaleString('en-US', {
          style: 'currency',
          currency: 'GBP'
        })
      }}</span>
      </div>
      <div class="flex flex-col gap-0 w-1/2 text-sm md:text-xs lg:text-xs xl:text-sm">
        <div class="flex justify-between w-full flex-row">
          <p>EAN</p>
          <p class="font-semibold">{{ product.ean || 'none' }}</p>
        </div>
        <div class="flex justify-between w-full flex-row">
          <p>CODE</p>
          <p class="font-semibold">{{ product.code || 'none' }}</p>
        </div>
        <div class="flex justify-between w-full flex-row">
          <p>Country</p>
          <p class="font-semibold">{{ product.country || 'none' }}</p>
        </div>
        <div class="flex justify-between w-full flex-row">
          <p>Shelf life</p>
          <p class="font-semibold">{{ product.shelf_life || 'none' }}</p>
        </div>
        <div class="flex justify-between w-full flex-row">
          <p>RRP</p>
          <p class="font-semibold">{{ product.rrp || 'none' }}</p>
        </div>
      </div>
    </div>
    <div class="card-col my-4">
      <div class="w-1/2 flex flex-col gap-2 justify-between items-center text-start">
        <input type="number" v-model="state.reserved" min="0"
          class="h-[2.3rem] border-[0.5px] border-black rounded-md text-center max-w-full" />
        <p>{{ product.quantity_pack }} units in Box</p>
      </div>
      <div class="w-1/2 flex flex-col gap-2">
        <button @click="addToCart(product)" :disable="!isInStock"
          class="h-[2.3rem] font-bold text-white flex rounded-md px-4 py-2 justify-center w-full" :class="{
        'bg-gray-300': !isInStock,
        'bg-[#C40F30]': isInStock
      }">
          {{ isInStock ? 'Add to cart' : 'Out of Stock' }}
        </button>
        <button class="h-[2.3rem] bg-[#C2C2C2] text-xs text-gray-600 flex rounded-md px-4 py-2 justify-center items-center w-full">
          Calculate Margin
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.start-font {
  font-family: Inter;

  .bg-img {

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .card-col {
    @apply flex gap-2 w-full px-4 flex gap-2 w-full px-4;

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
