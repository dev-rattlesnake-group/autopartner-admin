<script setup lang="ts">
import type { CSSProperties } from 'ant-design-vue/es/_util/cssinjs/hooks/useStyleRegister'
import { RouterLink, RouterView } from 'vue-router'
import router from '@/router'
import { reactive, computed, ref, onBeforeUnmount, watch, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'

const authStore = useAuthStore()
const screenWidth = ref(document.documentElement.clientWidth)
const headerStyle: CSSProperties = {
  textAlign: 'center',
  // color: '#fff',
  height: '10svh',
  width: '100%',
  // paddingInline: 50,
  padding: 0,
  display: 'flex',
  lineHeight: '64px',
  backgroundColor: '#fff'
}

const contentStyle: CSSProperties = {
  textAlign: 'center',
  height: '90svh',

  // width:'100vw',
  // maxWidth:'calc(100vw-361px)',
  overflowY: 'auto',
  oveflowX: 'hidden',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'rgba(191, 191, 191, 0.16)'
}

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#fff',
  zIndex: 120,
  position: screenWidth.value > 850 ? 'relative' : 'absolute',
  // height:'90%'
}
screenWidth.value < 850 ? siderStyle.height = '90%' : null
const headerData = reactive({
  title: '',
  crumbs: []
})
const setHeaderData = (e: { title: string; crumbs: [] }) => {
  const { title, crumbs } = e
  headerData.title = title
  headerData.crumbs = crumbs
}



const handleResize = () => {
  screenWidth.value = document.documentElement.clientWidth
}
window.addEventListener('resize', handleResize)
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
const currentRoute = computed((): string | undefined => {
  return String(router.currentRoute.value.name) || undefined
})
</script>

<template>
  <div class="wrapper">
    <a-layout>
      <a-layout-header :style="headerStyle" class="relative">
        <HeaderComponent :screenWidth="screenWidth" :title="headerData.title" :crumbs="headerData.crumbs" />
      </a-layout-header>
      <a-layout>
        <Transition v-if="(currentRoute !== 'login')" name="slide-fade">
        <a-layout-sider v-show="(currentRoute !== 'login') &&(screenWidth > 850 || (screenWidth < 850 && authStore.isSidebarMenuVisible))"
          :style="siderStyle">
          <SidebarComponent :screenWidth="screenWidth" :current-route="currentRoute" />
        </a-layout-sider>
      </Transition>
        <a-layout-content :style="contentStyle" class="pt-4 md:pt-0 relative"
          :class="{ 'pt-0 mt-0   z-[51]': authStore.isSidebarMenuVisible }">
          <div v-if="screenWidth < 850 && authStore.isSidebarMenuVisible" class="w-full h-full left-0 top-0 absolute backdrop-blur-xl z-[20] "
            @click="authStore.isSidebarMenuVisible = false">

          </div>
          <RouterView :screenWidth="screenWidth" @header-data="setHeaderData" :class="{'select-none max-h-full':authStore.isSidebarMenuVisible}"/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  position:absolute;
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
.wrapper {
  width: 100vw;
  height: 100dvh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
