<script setup lang="ts">
import { reactive, onMounted, ref, watch } from 'vue'
import BulkIcon from '@/assets/icons/BulkIcon.vue'
import { message } from 'ant-design-vue'
import { authHeader } from '@/services/auth-header.service'
import type { UploadChangeParam } from 'ant-design-vue'
import router from '@/router'
import { useNewsStore } from '@/stores/news.store'

const API_URL = import.meta.env.VITE_API_URL

const emit = defineEmits(['header-data'])
onMounted(async () => {
  emit('header-data', {
    title: 'Create New News',
    crumbs: [
      { name: 'News', route: 'news' },
      { name: 'New', route: 'news' }
    ]
  })

})
const headers = authHeader()
const productStore = useNewsStore()
const productForm = reactive({
  title: '',
  content: '',
  date: null,
  image_url: '',
})
const errors = reactive({
  title: false,
  author: false,
  content: false,
  date: false
})

const fileList = ref([])

const validateForm = () => {
  if (
    !productForm.title ||
    !productForm.content ||
    !productForm.date
  ) {
    message.error(
      `${!productForm.title ? 'Название ' : ''} ${!productForm.content ? 'Контент' : ''
      }${!productForm.date ? ' Дата' : ''} обязательные поля`
    )

    errors.title = !productForm.title
    errors.content = !productForm.content
    errors.date = !productForm.date
    setTimeout(() => {
      errors.title = false
      errors.author = false
      errors.content = false
      errors.date = false
    }, 2600)

    return false
  }
  return true
}

const createProduct = async () => {
  try {
    if (!validateForm()) return

    await productStore.createNews(productForm)
    message.success('Новость создана успешно')
    router.push({ name: 'news' })
    // closeModal(true)
  } catch (e: any) {
    console.log(e)
    message.error(e.response?.data?.error?.detail || e.message || JSON.stringify(e))
  }
}

const handleChange = (info: UploadChangeParam) => {

  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`)
    productForm.image_url = `${API_URL}/upload/` + info.file.response?.data
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
</script>
<template>
  <div
    class="w-full max-h-full flex text-black p-4  flex-col-reverse lg:flex-row overflow-y-auto overflow-x-hidden gap-4">
    <div class="md:w-[60%] w-full rounded-lg bg-white h-full flex flex-col items-start p-6 gap-4">
      <p class="title">Новая новость</p>
      <!-- <p class="text-black">{{ fileList }}</p> -->
      <div class="w-full flex gap-12">
        <div class="flex flex-col w-[45%] gap-6 text-black">
          <input type="text" v-model="productForm.title" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Название" :class="{ 'border border-red-500 ': errors.title }" />

          <div class="flex flex-col w-full items-start gap-4">
            <p class="leading-[100%] text-gray-400 text-sm">Дата новости</p>
            <a-date-picker v-model:value="productForm.date" :format="dateFormat" />
          </div>

        </div>
        <div class="flex flex-col w-[45%] gap-6 text-black h-full">
          <textarea type="text" rows="13" cols="5" v-model="productForm.content"
            class="resizeable leading-normal rounded-md w-full py-4 px-4 bg-[#EFF1F999]" placeholder="Контент" />

          <div class="w-full flex items-end gap-6 justfy-self-end self-endh-full flex-col lg:flex-row">

            <button
              class="lg:px-8 px-4 w-fit py-3 bg-[#005534] text-gray-500 rounded-xl leading-[100%] text-[14px] text-white hover:opacity-75"
              @click="createProduct()">
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-[39%] w-full rounded-lg bg-white h-full flex flex-col p-6">
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
    </div>
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
