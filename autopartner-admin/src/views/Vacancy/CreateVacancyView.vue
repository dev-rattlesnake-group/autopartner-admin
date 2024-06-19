<script setup lang="ts">
import { reactive, onMounted, ref, watch } from 'vue'

import BulkIcon from '@/assets/icons/BulkIcon.vue'
import { message } from 'ant-design-vue'
import { authHeader } from '@/services/auth-header.service'
import type { UploadChangeParam } from 'ant-design-vue'
import router from '@/router'
import { useVacancyStore } from '@/stores/vacancy.store'


const API_URL = import.meta.env.VITE_API_URL

const emit = defineEmits(['header-data'])
onMounted(async () => {
  emit('header-data', {
    title: 'Create New Vacancy',
    crumbs: [
      { name: 'Vacancies', route: 'vacancies' },
      { name: 'Vacancy', route: 'vacancies' }
    ]
  })

})
const headers = authHeader()
const productStore = useVacancyStore()
const productForm = reactive({
  title: '',
  description_1: '',
  description_2: '',
  description_3: '',
  description_4: '',
  description_5: '',
  description_6: '',
  description_7: ''
})
const errors = reactive({
  title: false,
  description_1: false,
})

const fileList = ref([])

const validateForm = () => {
  if (
    !productForm.title ||
    !productForm.description_1
  ) {
    message.error(
      `${!productForm.title ? 'Название ' : ''} ${!productForm.description_1 ? 'Описание 1' : ''} обязательные поля`
    )

    errors.title = !productForm.title
    errors.description_1 = !productForm.description_1

    setTimeout(() => {
      errors.title = false
      errors.description_1 = false

    }, 2600)

    return false
  }
  return true
}

const createProduct = async () => {
  try {
    if (!validateForm()) return

    await productStore.create(productForm)
    message.success('Вакансия создана успешно')
    router.push({ name: 'vacancies' })
    // closeModal(true)
  } catch (e: any) {
    console.log(e)
    message.error(e.response?.data?.error?.detail || e.message || JSON.stringify(e))
  }
}


</script>
<template>
  <div
    class="w-full max-h-full flex text-black p-4  flex-col-reverse lg:flex-row overflow-y-auto overflow-x-hidden gap-4">
    <div class="md:w-[60%] w-full rounded-lg bg-white h-full flex flex-col items-start p-6 gap-4">
      <p class="title">Новая Вакансия</p>
      <!-- <p class="text-black">{{ fileList }}</p> -->
      <div class="w-full flex gap-12">
        <div class="flex flex-col w-[45%] gap-6 text-black">
          <input type="text" v-model="productForm.title" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Название" :class="{ 'border border-red-500 ': errors.title }" />

          <input type="text" v-model="productForm.description_1" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Описание 1" :class="{ 'border border-red-500 ': errors.description_1 }" />
          <input type="text" v-model="productForm.description_2" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Описание 2" />
          <input type="text" v-model="productForm.description_3" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Описание 3" />
        </div>
        <div class="flex flex-col w-[45%] gap-6 text-black h-full">


          <input type="text" v-model="productForm.description_4" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Описание 4" />
          <input type="text" v-model="productForm.description_5" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Описание 5" />
          <input type="text" v-model="productForm.description_6" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Описание 6" />
          <input type="text" v-model="productForm.description_7" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Описание 7" />

          <div class="w-full flex items-end gap-6 justfy-self-end self-endh-full flex-col lg:flex-row">

            <button
              class="lg:px-8 px-4 w-fit py-3 bg-[#c40f30] text-gray-500 rounded-xl leading-[100%] text-[14px] text-white hover:opacity-75"
              @click="createProduct()">
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="md:w-[39%] w-full rounded-lg bg-white h-full flex flex-col p-6">
      <a-upload-dragger v-model:fileList="fileList" listType="picture" name="file" :multiple="false"
        :action="`${API_URL}/upload/image`" :headers="headers" @change="handleChange">
        <div class="w-full flex flex-col items-center min-h-[50%] pb-[4rem]">
          <BulkIcon class="mt-[4rem]" />
          <p class="upload-text text-xl font-semibold text-[#c40f30] mt-4">Upload Image</p>
          <p class="ant-upload-hint">Upload image to your product.</p>
          <p class="ant-upload-hint mt-[-0.3rem]">
            File Format <span class="font-semibold">jpeg</span>
          </p>
        </div>
      </a-upload-dragger>
    </div> -->
  </div>
</template>
<style scoped lang="scss">
.title {
  color: #000;
  text-align: center;

  /* subHeading 3/Medium */
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.ant-picker {
  //   position: relative;
  background-color: #eff1f999;
  padding: 0.8rem;
}
</style>
