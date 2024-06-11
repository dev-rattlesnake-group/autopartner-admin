<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useCustomerStore } from '@/stores/customer.store'
import { message } from 'ant-design-vue'

const props = defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['close'])
import { reactive } from 'vue'
const closeModal = (isSuccess: boolean) => {
  emit('close', isSuccess)
}
const customerForm = reactive({
  name: '',
  company: '',
  company_vat: '',
  delivery_address: '',
  billing_address: '',
  password: '',
  phone: '',
  email: '',
  vat: '',
  note: ''
})
const errors = reactive({
  name: false,
  company: false,
  company_vat: false,
  delivery_address: false,
  billing_address: false,
  password: false,
  phone: false,
  email: false,
  vat: false,
  note: false
})
const customerStore = useCustomerStore()
const createCustomer = async () => {
  try {
    if (!validateCreateCustomer()) return
    await customerStore.createCustomer(customerForm)
    message.success('Customer created successfully')
    closeModal(true)
  } catch (e) {
    if (e.response?.data?.error.constraint == 'accounts_email_unique') {
      message.error('Email already exists')
      return
    }
    message.error(e.response?.data?.error?.detail || e.message || JSON.stringify(e))
  }
}
const validateCreateCustomer = () => {
  if (
    !customerForm.name ||
    !customerForm.company ||
    !customerForm.password ||
    !customerForm.email
  ) {
    message.error(
      `${!customerForm.name ? 'Name' : ''}${!customerForm.company ? ' Company' : ''} ${
        !customerForm.password ? ' Password' : ''
      }${!customerForm.email ? ' Email' : ''} is required`
    )

    errors.email = !customerForm.email
    errors.name = !customerForm.name
    errors.password = !customerForm.password
    errors.company = !customerForm.company
    setTimeout(() => {
      errors.email = false
      errors.name = false
      errors.password = false
      errors.company = false
    }, 2600)

    return false
  }
  return true
}
</script>
<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[250]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-4xl min-h-[50svh] transform overflow-hidden rounded-lg bg-white p-4 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="p" class="w-full flex justify-center leading text-gray-900 title">
                Create New Customer
              </DialogTitle>
              <div class="absolute right-5 top-5">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="#1C1D22"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="#1C1D22"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div class="mt-6 flex flex-col w-full gap-4">
                <p class="title-sub mb-2">Customer Information</p>
                <div class="w-full flex justify-between items-center">
                  <input
                    type="text"
                    v-model="customerForm.name"
                    class="rounded-md w-[49%] h-[3rem] px-4 bg-[#EFF1F999] outline-0"
                    placeholder="Customer Name *"
                    :class="{ 'border border-red-500 ': errors.name }"
                  />
                  <input
                    type="text"
                    v-model="customerForm.password"
                    class="rounded-md w-[49%] h-[3rem] px-4 bg-[#EFF1F999]"
                    placeholder="Password *"
                    :class="{ 'border border-red-500 ': errors.password }"
                  />
                </div>
                <div class="w-full flex justify-between items-center">
                  <input
                    type="text"
                    v-model="customerForm.company"
                    class="rounded-md w-[49%] h-[3rem] px-4 bg-[#EFF1F999] outline-0"
                    placeholder="Company Name *"
                    :class="{ 'border border-red-500': errors.company }"
                  />
                  <input
                    type="text"
                    v-model="customerForm.email"
                    class="rounded-md w-[49%] h-[3rem] px-4 bg-[#EFF1F999]"
                    placeholder="Email*"
                    :class="{ 'border border-red-500 ': errors.email }"
                  />
                </div>
                <div class="w-full flex justify-between">
                  <div class="w-[49%] flex flex-col gap-4 items-start">
                    <input
                      type="text"
                      v-model="customerForm.company_vat"
                      class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
                      placeholder="Company Number"
                    />
                    <input
                      type="text"
                      v-model="customerForm.vat"
                      class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
                      placeholder="VAT Number"
                    />
                    <p class="my-2 title-adress">Address</p>
                    <input
                      type="text"
                      v-model="customerForm.delivery_address"
                      class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
                      placeholder="Delivery Address"
                    />
                    <input
                      type="text"
                      v-model="customerForm.billing_address"
                      class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
                      placeholder="Billing Address"
                    />
                  </div>
                  <div class="w-[49%] flex flex-col gap-4">
                    <input
                      type="text"
                      v-model="customerForm.phone"
                      class="rounded-md w-full h-[3rem] px-4 bg-[#EFF1F999]"
                      placeholder="Phone"
                    />
                    <textarea
                      v-model="customerForm.note"
                      placeholder="Note"
                      class="rounded-md w-full h-[13.8rem] bg-[#EFF1F999] p-4"
                    />
                  </div>
                </div>
                <div class="flex w-full items-center justify-center gap-4 my-[1.5rem]">
                  <button
                    @click="closeModal"
                    class="rounded-md border-[#C40F30] border text-[#C40F30] px-[2.5rem] py-2 hover:opacity-75"
                  >
                    Cancel
                  </button>
                  <button
                    @click="createCustomer"
                    class="px-[0.7rem] border-[#C40F30] border py-2 hover:opacity-75 rounded-md text-white bg-[#C40F30]"
                  >
                    Create Customer
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped>
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
.title-sub {
  color: var(--Black-30, #8b8d97);

  /* Paragraph 1/Medium */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.title-adress {
  color: var(--Black-50, #53545c);

  /* Label 1/Regular */
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
