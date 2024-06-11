<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import FilterIcon from '@/assets/icons/FilterIcon.vue'
import CloseIcon from '@/assets/icons/CloseIcon.vue';
import { reactive, watch, ref } from 'vue'
const emit = defineEmits(['update-filters'])
const props = defineProps({ filters: { type: Object } })
const state = reactive({
  
  filters: { category_id: [], country: [], stock: [] }
})
const isOpen = ref(false)
watch(() => state.filters, (val) => {
 emit('update-filters', state.filters)
}, { deep: true })
const addToFilters = (filterName, value) => {
  if (state.filters[filterName].includes(value)) {
    state.filters[filterName] = state.filters[filterName].filter(el => el !== value)
  } else {
    state.filters[filterName].push(value)
  }
}

</script>
<template>
  <div class="w-fit text-right">
    <Menu v-slot="{ open }" as="div" class="relative inline-block text-left">
      <div>
        <MenuButton @click="isOpen = !isOpen"
          class="inline-flex w-full justify-center rounded-md bg-white text-gray-500 px-4 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 border-[0.3px] border-gray-500">
          <FilterIcon />Filter
        </MenuButton>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems static v-if="isOpen"
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ">
          <div class="font-semibold text-[1rem] pl-2 flex w-full justify-betwen relative">Categories 
            <div @click="isOpen = false" class="absolute top-[0.2rem] right-2 object-cover ">
                <CloseIcon class="hover:opacity-75 cursor-pointer h-5 w-5" />
              </div>
          </div>
          <div class="px-1 py-1" v-for="(filter, index) in filters.categories" :key="filter.value">
            <MenuItem v-slot="{ active, close }" @click="addToFilters('category_id', filter.value)">
            <div :class="[
      active ? 'bg-[#C40F30] text-white' : 'text-gray-900',
      'group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer'
    ]">
              <input :checked="state.filters['category_id'].includes(filter.value)" type="checkbox" class="mt-1"> {{
      filter.name }}
            </div>
            </MenuItem>

          </div>
          <div class="font-semibold text-[1rem] pl-2">Item State</div>
          <div class="px-1 py-1" v-for="(filter, index) in filters.stock" :key="filter.value">
            <MenuItem v-slot="{ active, close }" @click="addToFilters('stock', filter.value)">
            <div :class="[
      active ? 'bg-[#C40F30] text-white' : 'text-gray-900',
      'group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer'
    ]">
              <input :checked="state.filters['stock'].includes(filter.value)" type="checkbox" class="mt-1"> {{
      filter.name }}
            </div>
            </MenuItem>

          </div>
          <div class="font-semibold text-[1rem] pl-2">Countries</div>
          <div class="px-1 py-1" v-for="(filter, index) in filters.countries" :key="filter.value">
            <MenuItem v-slot="{ active, close }" @click="addToFilters('country', filter.value)">
            <div :class="[
      active ? 'bg-[#C40F30] text-white' : 'text-gray-900',
      'group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer'
    ]">
              <input :checked="state.filters['country'].includes(filter.value)" type="checkbox" class="mt-1"> {{
              filter.name }}
            </div>
            </MenuItem>

          </div>

        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
