<script setup>
import LockIcon from '@/assets/icons/LockIcon.vue'
import MessageIcon from '@/assets/icons/MessageIcon.vue'
import { useAuthStore } from '@/stores/auth.store'
import { onMounted, reactive } from 'vue'
import { message } from 'ant-design-vue'
import router from '@/router'
const emit = defineEmits(['header-data'])
const authStore = useAuthStore()

const formState = reactive({
  email: '',
  password: ''
})
onMounted(() => {
  emit('header-data', {
    title: '',
    crumbs: [

    ]
  })
})
const validate = () => {
  if (!formState.email || !formState.password) {
    message.error('Please enter login and password')
    return false
  }

  if (formState.password.length < 4) {
    message.error('Password shoud be more than 4 characters')
    return false
  }
  return true
}

const signIn = async () => {
  try {
    // if (!validate()) return
    await authStore.login(formState.email, formState.password)
    if (authStore.role == 'admin') router.push({ name: 'products' })

  } catch (e) {
    message.error(e.response?.data?.message || e)
  }
}
</script>
<template>
  <div class="login-wrapper">
    <div class="login-panel">
      <div class="login-panel_title">
        <p class="login-title">Welcome back!</p>
        <p class="login-greetings">Login to your account</p>
      </div>
      <!-- <form class="login-panel_input"> -->
      <a-form :model="formState" name="normal_login" class="login-panel_input" @finish="signIn">
        <a-form-item name="email" :rules="[{ required: true, message: 'Enter your email' }]">
          <a-input class="email" autocomplete v-model:value="formState.email" placeholder="Email Address">
            <template #prefix>
              <message-icon />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: 'Enter your password' }]">
          <a-input-password autocomplete v-model:value="formState.password" placeholder="Password">
            <template #prefix>
              <lock-icon />
            </template>
          </a-input-password>
        </a-form-item>
        <!-- <div class="login-panel_recovery"><p>Recover Password</p></div> -->
        <a-form-item class="login-panel_button">
          <a-button type="primary" size="large" html-type="submit">Войти</a-button>
        </a-form-item>
      </a-form>
    </div>
    <!-- <div class="login-footer">S&L International Foods Ltd.</div> -->
  </div>
</template>
<style scoped lang="scss">
.login-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  position: relative;

  .login-panel {
    border-radius: 12px;
    background: #fff;
    // min-height: max(55%, 15rem);
    // min-width: 25vw;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    position: relative;

    /* justify-content: center; */
    .login-panel_title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      color: black;
    }

    .login-panel_input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 3rem;
      color: black;
      gap: 0.5rem;

      .ant-form-item-control-input-content {
        background-color: rgba(248, 248, 248, 1) !important;

        .ant-input-affix-wrapper {
          background-color: rgba(248, 248, 248, 1) !important;
          min-height: 2.7rem;
          font-size: 1.1rem;
          margin-right: 3rem;
        }

        .ant-input-affix-wrapper-status-success {
          background-color: rgba(248, 248, 248, 1) !important;
        }

        .email {
          margin-right: 4.2rem;
        }

        .ant-input-affix-wrapper :deep(.ant-input) {
          background-color: rgba(248, 248, 248, 1) !important;
        }
      }


    }

    .login-title {
      color: #000;
      text-align: center;
      font-family: 'Poppins';
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .login-greetings {
      color: var(--Black-30, #8b8d97);
      text-align: center;
      /* Paragraph 2/Regular */
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-top: 0.3rem;
    }

    .login-panel_recovery {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
      margin-top: -0.6rem;
      color: #676767;
      text-align: center;

      /* Paragraph 2/Regular */
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      :hover {
        color: red;
      }
    }

    .login-panel_button {
      width: 100%;
      margin-top: 2rem;
      display: flex;
      height: 100%;
      align-items: flex-end;
      justify-content: center;

      button {
        // width: fit-content;
        height: 3.2rem;
        border-radius: 12px;
        background: #c40f30;
        color: #fff;
        text-align: center;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        padding: 0 3.5rem 0 3.5rem;

        &:hover {
          background-color: #9e2e2e;
        }
      }
    }
  }

  .login-footer {
    position: absolute;
    bottom: 2.5rem;
    right: 50%;
    transform: translateX(50%);
    color: #676767;
    text-align: center;

    /* Paragraph 2/Regular */
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
