<script setup lang="ts">
import { reactive } from 'vue'
import BeerIcon from '@/assets/icons/BeerIcon.vue'
const props = defineProps({ categories: { type: Array } })
const state = reactive({
  colorText: '#C40F30',
  colorBg: 'white',

  activeCategory: null
})
const emit = defineEmits(['set-active-category'])
const setActiveCategory = (categoryId: number) => {
  if (state.activeCategory == categoryId) {
    state.activeCategory = null

  } else  {
    state.activeCategory = categoryId
  }
 
  emit('set-active-category', state.activeCategory)
}
</script>
<template>
  <div class="w-full flex  leading-normal gap-1  md:gap-2 h-full justify-between  overflow-x-auto">
    <div
      class="min-w-[92vw] md:min-w-[max(50%,10rem)]  lg:min-w-[max(15.95%,10rem)] rounded-lg h-fit flex flex-col px-4 py-6 gap-2 cursor-pointer  hover:drop-shadow-md ease-in-out duration-300"
      :class="{ 'bg-[#C40F30] text-white': state.activeCategory == category.id, 'bg-white text-black': state.activeCategory !== category.id }"
      v-for="(category, index) in props?.categories" :key="index" @click="setActiveCategory(category.id)">
      <div class="w-full flex items-center justify-center">
        <BeerIcon :color="state.activeCategory == category.id ? state.colorBg : state.colorText" />
      </div>
      <p class="text-xl">{{ category?.name }}</p>
      <p class="text-md">{{ category?.total }} PRODUCTS</p>
    </div>
  </div>
</template>
