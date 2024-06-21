<script setup>
import Logo from '@/assets/Logo.vue'
const props = defineProps({
  title: { type: String },
  crumbs: { type: Array, default: () => [] },
  screenWidth: { type: Number }
})
import { useAuthStore } from '@/stores/auth.store'
import { useCustomerProductStore } from '@/stores/customer-product.store'
import { computed, ref } from 'vue'
import NotificationIcon from '@/assets/icons/NotificationIcon.vue'
import UsersIcon from '@/assets/icons/UsersIcon.vue'
import HomeIcon from '@/assets/icons/HomeIcon.vue'
import CartIcon from '@/assets/icons/CartIcon.vue'
import CategoryIcon from '@/assets/icons/CategoryIcon.vue'
const authStore = useAuthStore()
import router from '@/router'

const productStore = useCustomerProductStore()
const toHome = () => {
  if (authStore.user.role == 'admin') router.push({ name: 'products' })

}
const toLogin = () => {
  router.push({ name: 'login' })
}
const title = computed(() => {
  return props.title
})
const crumbs = computed(() => {
  return props.crumbs
})

const openMenuDrawer = () => {
  authStore.isSidebarMenuVisible = !authStore.isSidebarMenuVisible
}

console.log(router.currentRoute)


</script>
<template>
  <div class="header-wrapper">
    <div class="header-logo items-center justify-center " v-show="router.currentRoute.value.name !== 'login'">
      <Logo class=" md:ml-4 md:w-[44%] w-[min(44%,4rem)] max-h-[90%] cursor-pointer " @click="toLogin" />
    </div>
    <div class="header-main">
      <div class="header-main-up" v-show="props.screenWidth > 850">
        <div class="header-main-up_title">
          <p>{{ title }}</p>
        </div>
        <!-- <div class="header-main-up_control font-semibold" v-if="crumbs.length">
          <div v-if="authStore.user?.role == 'admin'"
            class="rounded-md border-[1px] py-[0.3rem] px-[1rem] leading-normal">Main Admin</div>
          <div @click="router.push({ name: 'shopping-cart' })" v-if="authStore.user?.role == 'customer'"
            class="cursor-pointer flex items-center gap-2 text-md rounded-md py-[0.3rem] px-[1rem] leading-normal bg-[#C40F30] text-white">
            <CartIcon :color="'white'" />
            {{ (productStore.shopping_cart?.total_amount || 0).toLocaleString('en-US', {
              style: 'currency',
              currency: 'GBP'
            }) }}
          </div> -->
        <!-- <a-select size="small" v-model:value="userName" /> -->
        <!-- <NotificationIcon />
          <button class="header-main-up_control_button">
            <UsersIcon />
          </button>
        </div> -->

      </div>


      <div class="header-main-down h-[1.8rem] flex items-center"
        :class="{ 'absolute bottom-[-1.82rem] z-[50] left-0 bg-[#ECECEC] ': props.screenWidth < 850 }"
        v-if="crumbs.length">
        <div class="header-main-down-breadcrumbs">
          <HomeIcon @click="toHome" class="home" />
          <span> / </span>
          <span class="header-main-down-breadcrumbs_current" @click="router.push({ name: crumbs[0].route })">{{
            crumbs[0].name }}</span>
          <span v-if="crumbs.length > 1">
            /
            <span class="header-main-down-breadcrumbs_current" @click="router.push({ name: crumbs[1].route })">{{
              crumbs[1].name }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-end h-full items-center pr-6"
      v-if="props.screenWidth < 850 && router.currentRoute.value.name !== 'login'">
      <CategoryIcon @click="openMenuDrawer" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.header-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  /* padding: 1rem 0 1rem 0; */
  justify-content: flex-start;

  // align-items: center;
  .header-main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header-main-up {
      width: 100%;
      min-height: 66%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 2rem 0.2rem 1rem;

      /* border:1px solid black; */
      .header-main-up_title {
        color: var(--Black-60, #45464e);

        /* subHeading 3/Medium */
        font-family: Poppins;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      .header-main-up_control {
        display: flex;
        gap: 1rem;
        align-items: center;

        .ant-select {
          background: #f5f5f5 !important;

          .ant-select-selector {
            background: #f5f5f5 !important;
          }
        }

        .header-main-up_control_button {
          border-radius: 8px;
          background: #f5f5f5;
          border: 0;
          padding: 5px;
          cursor: pointer;
        }
      }
    }

    .header-main-down {
      width: 100%;
      min-height: 33%;
      // border-top: 1px solid var(--Stroke, #f1f3f9);
      display: flex;
      align-items: center;
      padding: 0.2rem 0 0.2rem 1rem;

      .header-main-down-breadcrumbs {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        color: #8b8d97;

        .home {
          cursor: pointer;

          &:hover {
            opacity: 0.75;
          }
        }

        .header-main-down-breadcrumbs_current {
          cursor: pointer;

          &:hover {
            color: red;
          }
        }
      }
    }
  }

  .header-logo {
    color: #000;
    min-width: 200px;
    font-family: Poppins;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 200px;


    height: auto;
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 1rem;
  }
}
</style>
