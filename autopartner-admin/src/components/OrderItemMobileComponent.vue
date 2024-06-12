<script setup lang="ts">
import { useOrderStore } from '@/stores/order.store'
const orderStore = useOrderStore()
const props = defineProps({ screenWidth: { type: Number }, order: { type: Object, default: {} } })
</script>
<template>
    <div class="full-flex bg-[#FFFFFF] rounded-lg flex-col px-4 py-8 gap-4">
        <div class="full-flex ">
            <p class="font-semibold text-lg">Total Items:
                <span class="text-red-500 font-semibold">{{
                    order?.items?.length || 0 }}</span>
            </p>
        </div>
        <div v-for="item, index in order?.items" :key="index"
            class="border-b border-black full-flex items-start gap-4 py-4">

            <div class="w-fit flex items-center justify-center ">
                <img class="object-cover w-[3.5rem] rounded-sm" v-if="item.product_image||item.product_url" :src="item.product_image||item.product_url"
                    :alt="item.product_image||item.product_url" />
            </div>
            <div class="full-flex flex-col gap-1 text-left leading-normal">
                <p class="font-semibold text-lg">
                    {{ item.product_name }}

                </p>
                <div class="full-flex gap-2">
                    <p class="text-sm text-gray-400">Qty:<span class="font-semibold  text-black">{{ item.quantity }}</span></p>
                    <p class="text-sm text-gray-400">Discount: {{ order.discount || 0 }}%</p>
                    <p class="text-sm text-gray-400">VAT: {{ order.discount || '-' }}</p>
                </div>
                <div class="full-flex">
                    <p class="text-lg text-black font-semibold">Unit Price:
                        {{ Number(item.product_price).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'GBP'
                        }) }}</p>
                </div>
            </div>

        </div>
        <div class="full-flex text-xl text-black font-bold text-left py-4">
            <div class="flex flex-col w-[49%]">
                Total:
            </div>
            <div class="flex flex-col w-[49%] ">
                <p> {{ Number(order?.total_amount||0).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'GBP'
                }) }}</p>
            </div>

        </div>

        <div class="full-flex">
               <slot></slot>
        </div>

    </div>
</template>
<style scoped lang="scss">
.full-flex {
    @apply flex w-full;
}
</style>