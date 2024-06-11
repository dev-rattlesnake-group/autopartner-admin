<template>
    <div class="flex">
        <Menu v-slot="{ open, close }" as="div" class="relative inline-block text-left">
            <div>
                <MenuButton   
                @click="isOpen = !isOpen"            
                    class="inline-flex font-[600] w-full justify-center rounded-xl  px-4 py-2 text-sm font-medium items-center gap-8 hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    :class="colorStatuses[value]"
                    >
                    {{title}}
                    <ChevronIcon :color="'white'"  /> 
                </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems static v-if="isOpen" 
                    class="cursor-pointer absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none font-medium flex flex-col leading-normal py-4 px-4 gap-6">
                    <div  class="px-1 py-1" v-for="option, index in props.options" :key="index" @click="changeStatus(option.id)">
                        <MenuItem as="div" v-slot="{ active,close }">
                        {{ option.name }}
                        </MenuItem>
                    </div>

                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { computed, ref } from 'vue';
import ChevronIcon from "@/assets/icons/ChevronIcon.vue"

const props = defineProps({ options: { type: Object }, value: { type: String }, title: { type: Number } })
const emit = defineEmits(['update:value'])

const isOpen =ref(false)
const title = computed(() => {
    return props.options?.filter(el => el.id == props.value)?.[0]?.name || 'No data'
})

const colorStatuses = {1:'bg-gray-400 text-gray-500', 2:'bg-blue-200 text-blue-500',  3:'bg-green-200 text-green-500'}

const changeStatus = (status:number) => {
    emit('update:value', status)
    isOpen.value = false
}


</script>