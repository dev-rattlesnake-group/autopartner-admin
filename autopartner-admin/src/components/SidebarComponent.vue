<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import CategoryIcon from '@/assets/icons/CategoryIcon.vue'
import UsersIcon from '@/assets/icons/UsersIcon.vue'
import FolderIcon from '@/assets/icons/FolderIcon.vue'
import BagIcon from '@/assets/icons/BagIcon.vue'
import SettingIcon from '@/assets/icons/SettingIcon.vue'
import CartIcon from '@/assets/icons/CartIcon.vue'
import FavoriteIcon from '@/assets/icons/FavoriteIcon.vue'
import LogoutIcon from '@/assets/icons/LogoutIcon.vue'
const props = defineProps({ menu: { type: Object }, currentRoute: { type: String } })
import { ref, onMounted, watch } from 'vue'

const authStore = useAuthStore()
const adminMenuData = [

  // { title: 'Аккаунты', route: 'customers', icon: 'UsersIcon' },

  { title: 'Продукты', route: 'products', icon: 'BagIcon' },

]
const customerMenuData = [

]
const menu = ref([])
const logOut = () => {
  authStore.logout()
  router.push({ name: 'login' })
  authStore.isSidebarMenuVisible = false
}

watch(() => authStore?.user?.role, (value) => {

  if (value == 'admin') menu.value = adminMenuData
  else if (value == 'customer') menu.value = customerMenuData
})

const handleClickMenu = (route) => {
  router.push({ name: route })
  authStore.isSidebarMenuVisible = false
}
const selectedKeys = ref([])
const icon = (name) => {
  switch (name) {
    case 'CategoryIcon':
      return CategoryIcon
    case 'UsersIcon':
      return UsersIcon
    case 'FolderIcon':
      return FolderIcon
    case 'BagIcon':
      return BagIcon
    case 'CartIcon':
      return CartIcon
    case 'SettingIcon':
      return SettingIcon
    case 'FavoriteIcon':
      return FavoriteIcon
    default:
      return UsersIcon
  }
}

watch(() => props.currentRoute, (val) => {
  selectedKeys.value = [val]
  if (val == 'customer') selectedKeys.value = ['customers']

})

onMounted(async () => {
  if (authStore?.user?.role == 'admin') {
    menu.value = adminMenuData
  }
  else if (authStore?.user?.role == 'customer') {
    menu.value = customerMenuData
  }
  setTimeout(() => {
    selectedKeys.value = [props?.currentRoute]
  }, 0)
})
</script>
<template>
  <div class="sidebar-wrapper">
    <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
      <a-menu-item v-for="item in menu" :key="item.route" @click="handleClickMenu(item.route)">
        <div class="sidebar-menu_item">
          <component :is="icon(item.icon)" :color="selectedKeys[0] == item.route ? '#FFFF' : undefined" />
          <span> {{ item.title }}</span>
        </div>
      </a-menu-item>
    </a-menu>
    <div class="sidebar-logout" @click="logOut">
      <LogoutIcon />
      <p>Log Out</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.sidebar-wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  // align-items: space-between;
  justify-content: space-between;

  .ant-menu {
    padding: 0 0.5rem 0 0.5rem;
    user-select: none;
    color: black;

    & :deep(.ant-menu-item-selected) {
      // border:2px solid black;
      background-color: #c40f30 !important;


      color: white;
      font-weight: 600;

      & :deep(svg) {
        fill: #ffff;
      }
    }
  }

  .sidebar-menu_item {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;

  }

  .sidebar-logout {
    color: #000;
    display: flex;
    align-items: center;
    // justify-content: center;
    gap: 0.5rem;
    // padding-left:1.7rem;
    // width:100%;
    /* Label 1/Regular */
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 2rem;
    margin: 0 0.5rem 4rem 0.5rem;
    padding: 0.7rem 1rem 0.7rem 1.2rem;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background: rgb(245, 241, 241);
    }
  }
}
</style>
