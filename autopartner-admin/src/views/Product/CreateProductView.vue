<script setup lang="ts">
import { reactive, onMounted, ref, watch } from 'vue'
import { useProductStore } from '@/stores/product.store'
import BulkIcon from '@/assets/icons/BulkIcon.vue'
import { message } from 'ant-design-vue'
import { authHeader } from '@/services/auth-header.service'
import type { UploadChangeParam } from 'ant-design-vue'
import router from '@/router'

const API_URL = import.meta.env.VITE_API_URL

const emit = defineEmits(['header-data'])
onMounted(async () => {
  emit('header-data', {
    title: 'Create New Product',
    crumbs: [
      { name: 'Products', route: 'products' },
      { name: 'New Product', route: 'products' }
    ]
  })
  if (!productStore.categories.length) {
    await productStore.getProductCategories()
    await productStore.getProductBrands()
  }
})
const headers = authHeader()
const productStore = useProductStore()
const productForm = reactive({
  category: 'Выберите категорию',
  brand: 'Выберите брэнд',
  name: '',
  in_stock: true,
  price: null,
  engine: '',
  vehicles_year: '',
  transmission: '',
  max_weight: '',
  cabin_type: '',
  suspension_type: '',
  suspension_cabin: '',
  suspension_chassis: '',
  brake_type: '',
  wheel_formula: '',
  axles_number: '',
  fifth_wheel_height: '',
  trailer_volume: '',
  trailer_length: '',
  euro: '',
  color: '',
  options: '',
  image_url: '',
  image_urls: [],
})
const errors = reactive({
  name: false,
  price: false,
  category_id: false,
  brand: false
})

const fileList = ref([])

const validateForm = () => {
  if (
    !productForm.name ||
    !productForm.price ||
    productForm.category == 'Выберите категорию' ||
    productForm.brand == 'Выберите брэнд'
  ) {
    message.error(
      `${!productForm.name ? 'Название ' : ''}${!productForm.price ? 'Цена ' : ''} ${productForm.category == 'Выберите категорию' ? 'Категория' : ''
      }${productForm.brand == 'Выберите брэнд' ? ' Брэнд' : ''} обязательные поля`
    )

    errors.price = !productForm.price
    errors.name = !productForm.name
    errors.category_id = productForm.category == 'Выберите категорию'
    errors.brand = !productForm.brand
    setTimeout(() => {
      errors.price = false
      errors.name = false
      errors.brand = false
      errors.category_id = false
    }, 2600)

    return false
  }
  return true
}

const createProduct = async () => {
  try {
    if (!validateForm()) return



    await productStore.createProduct(productForm)
    message.success('Product created successfully')
    router.push({ name: 'products' })
    // closeModal(true)
  } catch (e: any) {
    console.log(e)
    message.error(e.response?.data?.error?.detail || e.message || JSON.stringify(e))
  }
}

const handleChange = (info: UploadChangeParam) => {
  console.log({ fileList })
  if (info.file.status === 'removed') {
    if (info.file.url == productForm.image_url) {
      productForm.image_url = ''
    } else {
      const ind = productForm.image_urls.findIndex((el) => { el == info.file.url })
      productForm.image_urls.splice(ind, 1)

    }

  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`)
    if (!productForm.image_url) {
      productForm.image_url = `${API_URL}/upload/` + info.file.response?.data
      console.log(productForm.image_url)
    } else {
      productForm.image_urls.push(`${API_URL}/upload/` + info.file.response?.data)
      console.log(productForm.image_urls)
    }

  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
</script>
<template>
  <div
    class="w-full max-h-full flex text-black p-4  flex-col-reverse lg:flex-row overflow-y-auto overflow-x-hidden gap-4">
    <div class="md:w-[60%] w-full rounded-lg bg-white h-full flex flex-col items-start p-6 gap-4">
      <p class="title">Новый продукт</p>
      <!-- <p class="text-black">{{ fileList }}</p> -->
      <div class="w-full flex gap-12">
        <div class="flex flex-col w-[45%] gap-6 text-black">
          <input type="text" v-model="productForm.name" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Название" :class="{ 'border border-red-500 ': errors.name }" />
          <input type="text" v-model="productForm.vehicles_year" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Год выпуска" />
          <input type="text" v-model="productForm.engine" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Двигатель" />
          <input type="text" v-model="productForm.transmission" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Коробка передач" />

          <select name="select" v-model="productForm.category"
            class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999] text-black text-md"
            :class="{ 'border border-red-500 ': errors.category_id }">
            <option selected disabled>Категория</option>

            <option class="bg-[#EFF1F999] text-black" v-for="(category, index) in productStore.categories" :key="index"
              :value="category">
              {{ category }}
            </option>
          </select>
          <select name="select" v-model="productForm.brand"
            class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999] text-black text-md"
            :class="{ 'border border-red-500 ': errors.category_id }">
            <option selected disabled>Брэнд</option>

            <option class="bg-[#EFF1F999] text-black" v-for="(category, index) in productStore.brands" :key="index"
              :value="category">
              {{ category }}
            </option>
          </select>
          <div class="w-full flex gap-4 items-start leading-normal justify-between flex-wrap">
            <input type="number" v-model="productForm.price"
              class="rounded-md  w-full lg:w-[50%] h-[3rem] px-4 bg-[#EFF1F999]" placeholder="Цена"
              :class="{ 'border border-red-500 ': errors.price }" />
            <div class="leading-normal flex w-[39%] gap-2 justify-end">
              <input type="checkbox" v-model="productForm.in_stock" class="rounded-md  h-[1rem] px-4"
                label="В наличие" />

              <p class="text-sm mt-[-4px]">Товар в наличии</p>
            </div>

          </div>
          <input type="text" v-model="productForm.max_weight" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Разрешённая макс. масса" />
          <input type="text" v-model="productForm.euro" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Класс выхлопа EURO" />
          <input type="text" v-model="productForm.color" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Цвет" />
          <input v-model="productForm.options" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Доп информация" />
        </div>
        <div class="flex flex-col w-[45%] gap-6 text-black h-full">
          <input type="text" v-model="productForm.cabin_type" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Тип кабины" />
          <input type="text" v-model="productForm.suspension_type"
            class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]" placeholder="Тип подвески" />
          <input type="text" v-model="productForm.suspension_cabin"
            class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]" placeholder="Подвеска кабины" />
          <input type="text" v-model="productForm.suspension_chassis"
            class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]" placeholder="Подвеска шасси" />
          <input type="text" v-model="productForm.brake_type" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Тип тормозов" />
          <input type="text" v-model="productForm.wheel_formula" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Колесная формула" />
          <input type="text" v-model="productForm.axles_number" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Количество осей" />
          <input type="text" v-model="productForm.fifth_wheel_height"
            class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]" placeholder="Высота седельного устройства" />
          <input type="text" v-model="productForm.trailer_volume" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Объем прицепа" />
          <input type="text" v-model="productForm.trailer_length" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Длина прицепа" />
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
      <a-upload-dragger v-model:fileList="fileList" listType="picture" name="file" :multiple="true"
        :action="`${API_URL}/upload/image`" :headers="headers" @change="handleChange">
        <div class="w-full flex flex-col items-center min-h-[50%] pb-[4rem]">
          <BulkIcon class="mt-[4rem]" />
          <p class="upload-text text-xl font-semibold text-[#005534] mt-4">Upload Image</p>
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
