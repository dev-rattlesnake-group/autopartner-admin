<script setup lang="ts">
import { reactive, onMounted, ref, watch } from 'vue'
import { useProductStore } from '@/stores/product.store'
import router from '@/router'
import BulkIcon from '@/assets/icons/BulkIcon.vue'
import { message } from 'ant-design-vue'
import { authHeader } from '@/services/auth-header.service'
import type { UploadChangeParam } from 'ant-design-vue'


const API_URL = import.meta.env.VITE_API_URL

const emit = defineEmits(['header-data'])

const headers = authHeader()
const productStore = useProductStore()
const productForm = reactive({
  id: null,
  name: '',
  code: '',
  ean: '',
  category_id: 'Category',
  price: null,
  rrp: null,
  stock: null,
  next_delivery_date: null,
  unit_measure: '',
  quantity_pack: '',
  shelf_life: null,
  alc_vol: null,
  unit_size: null,
  country: '',
  image_url: '',
  status: 'published'
})
const errors = reactive({
  name: false,
  price: false,
  category_id: false,
  stock: false
})
const oldPrice = ref(null)
const fileList = ref([])
const isVatAdded = ref(false)

onMounted(async () => {
  emit('header-data', {
    title: 'Edit Product',
    crumbs: [
      { name: 'Products', route: 'products' },
      { name: 'Edit Product', route: 'products' }
    ]
  })
  if (!productStore.categories.length) {
    await productStore.getProductCategories()
  }
  await productStore.getProduct(Number(router?.currentRoute?.value?.params?.id))
  Object.keys(productForm).forEach(formProperty => {
    switch (formProperty) {
      case 'next_delivery_date': break
      case 'price': { 
        productForm[formProperty] = Number(productStore.product?.[formProperty])
        break }
      // case 
      default: productForm[formProperty] = productStore.product?.[formProperty]

    }
  })
  productForm.name = productStore.product.name


})

watch(
  () => productForm.price,
  (val) => {
    isVatAdded.value = false
  }
)




const addVat = () => {
  if (!productForm.price) {
    message.error('Set price')
    return
  }
  if (!isVatAdded.value) {
    oldPrice.value = productForm.price
    productForm.price = (productForm.price * 1.2).toFixed(2)
    setTimeout(() => {
      isVatAdded.value = true
    }, 100)
    return
  }
  if (isVatAdded.value) {
    productForm.price = oldPrice.value
    isVatAdded.value = false
    return
  }
}

const validateForm = () => {
  if (
    !productForm.name ||
    !productForm.price ||
    productForm.category_id == 'Category' ||
    !productForm.stock
  ) {
    message.error(
      `${!productForm ? 'Name' : ''}${!productForm.price ? 'Price' : ''} ${productForm.category_id == 'Category' ? ' Category' : ''
      }${!productForm.stock ? ' Stock' : ''} is required`
    )

    errors.price = !productForm.price
    errors.name = !productForm.name
    errors.category_id = productForm.category_id == 'Category'
    errors.stock = !productForm.stock
    setTimeout(() => {
      errors.price = false
      errors.name = false
      errors.stock = false
      errors.category_id = false
    }, 2600)

    return false
  }
  return true
}

const updateProduct = async () => {
  try {
    if (!validateForm()) return


    await productStore.updateProduct(productForm)
    message.success('Product updated successfully')
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
      <p class="title">Edit Inventory Item</p>
      <!-- <p class="text-black">{{ fileList }}</p> -->
      <div class="w-full flex gap-12">
        <div class="flex flex-col w-[45%] gap-6 text-black">
          <input type="text" v-model="productForm.name" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Product Name" :class="{ 'border border-red-500 ': errors.name }" />
          <input type="text" v-model="productForm.ean" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="EAN" />
          <input type="text" v-model="productForm.code" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="CODE" />

          <select name="select" v-model="productForm.category_id"
            class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999] text-black text-md"
            :class="{ 'border border-red-500 ': errors.category_id }">
            <option selected disabled>Category</option>

            <option class="bg-[#EFF1F999] text-black" v-for="(category, index) in productStore.categories" :key="index"
              :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <div class="w-full flex gap-4">
            <input type="number" v-model="productForm.price" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
              placeholder="Price (Unit)" :class="{ 'border border-red-500 ': errors.price }" />
            <input type="text" v-model="productForm.rrp" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
              placeholder="RRP" />
          </div>
          <div class="w-full flex justify-between items-center">
            <p class="leading-[100%] text-gray-400">VAT (20%)</p>
            <div class="flex gap-2 cursor-pointer" @click="addVat">
              <p class="leading-[100%] text-gray-400">Add</p>
              <div class="rounded-full w-[1rem] h-[1rem]"
                :class="{ 'bg-green-500': isVatAdded == true, 'bg-red-500': isVatAdded !== true }"></div>
            </div>
          </div>
          <input type="number" min="1" max="1000" v-model="productForm.stock"
            class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]" placeholder="Stock"
            :class="{ 'border border-red-500 ': errors.stock }" />
          <div class="flex flex-col w-full items-start gap-4">
            <p class="leading-[100%] text-gray-400 text-sm">Next delivery date</p>
            <a-date-picker v-model:value="productForm.next_delivery_date" />
          </div>
        </div>
        <div class="flex flex-col w-[45%] gap-6 text-black h-full">
          <input type="text" v-model="productForm.unit_measure" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Unit of Measure" />
          <input type="text" v-model="productForm.quantity_pack" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Quantity in a pack" />
          <input type="text" v-model="productForm.shelf_life" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Shelf Life" />
          <input type="text" v-model="productForm.alc_vol" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Alc. Vol. (%)" />
          <input type="number" v-model="productForm.unit_size" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Unit Size (L)" />
          <input type="text" v-model="productForm.country" class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
            placeholder="Country" />
          <div class="w-full flex items-end gap-6 justfy-self-end self-endh-full flex-col lg:flex-row">
            <!-- <button
              class="lg:px-8 px-4 w-fit py-3 bg-[#DCDCDC] text-gray-500 rounded-xl leading-[100%] text-[14px] hover:opacity-75"
             >
              Save Product
            </button> -->
            <button
              class="lg:px-8 px-4 w-fit py-3 bg-[#c40f30] text-gray-500 rounded-xl leading-[100%] text-[14px] text-white hover:opacity-75"
              @click="updateProduct">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-[39%] w-full rounded-lg bg-white h-full flex flex-col p-6">
      <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="false" :action="`${API_URL}/upload/image`"
        :headers="headers" @change="handleChange">
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
