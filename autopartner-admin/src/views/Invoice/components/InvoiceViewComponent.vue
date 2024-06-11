<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useInvoiceStore } from '@/stores/invoice.store'
import { message } from 'ant-design-vue'

const props = defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['close'])
import { reactive, onMounted } from 'vue'
import Logo from '@/assets/Logo.vue';
import CloseIcon from '@/assets/icons/CloseIcon.vue';
const closeModal = (isSuccess: boolean) => {
  emit('close', isSuccess)
}

// const customerForm = reactive({
//   name: '',
//   company: '',
//   company_vat: '',
//   delivery_address: '',
//   billing_address: '',
//   password: '',
//   phone: '',
//   email: '',
//   vat: '',
//   note: ''
// })
// const errors = reactive({
//   name: false,
//   company: false,
//   company_vat: false,
//   delivery_address: false,
//   billing_address: false,
//   password: false,
//   phone: false,
//   email: false,
//   vat: false,
//   note: false
// })
const invoiceStore = useInvoiceStore()

// const createCustomer = async () => {
//   try {
//     if (!validateCreateCustomer()) return
//     await customerStore.createCustomer(customerForm)
//     message.success('Customer created successfully')
//     closeModal(true)
//   } catch (e) {
//     if (e.response?.data?.error.constraint == 'accounts_email_unique') {
//       message.error('Email already exists')
//       return
//     }
//     message.error(e.response?.data?.error?.detail || e.message || JSON.stringify(e))
//   }
// }
// const validateCreateCustomer = () => {
//   if (
//     !customerForm.name ||
//     !customerForm.company ||
//     !customerForm.password ||
//     !customerForm.email
//   ) {
//     message.error(
//       `${!customerForm.name ? 'Name' : ''}${!customerForm.company ? ' Company' : ''} ${
//         !customerForm.password ? ' Password' : ''
//       }${!customerForm.email ? ' Email' : ''} is required`
//     )

//     errors.email = !customerForm.email
//     errors.name = !customerForm.name
//     errors.password = !customerForm.password
//     errors.company = !customerForm.company
//     setTimeout(() => {
//       errors.email = false
//       errors.name = false
//       errors.password = false
//       errors.company = false
//     }, 2600)

//     return false
//   }
//   return true
// }
</script>
<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[250]">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-4xl min-h-[90svh] transform overflow-auto rounded-lg bg-white p-8 text-left align-middle shadow-xl transition-all">
              <!-- <DialogTitle as="p" class="w-full flex justify-center leading text-gray-900 title">
                Create New Customer
              </DialogTitle> -->
              <!-- <div class="absolute right-5 top-5">
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
              </div> -->
              <div class="absolute top-4 right-4 object-cover">
                <CloseIcon class="hover:opacity-75 cursor-pointer" @click="closeModal"/>
              </div>

              <div class="my-6 flex flex-col w-full h-full gap-[4rem] justify-start">
                <div class="w-full flex justify-end">
                  <button class="px-4 text-white bg-[#C40F30] rounded-md py-2">Download PDF</button>
                </div>
                <div class="flex w-full justify-between">
                  <p class="text-4xl font-semibold">Invoice</p>
                  <Logo class="w-[max(16rem,5vw)]" />
                </div>
                <div class="w-full flex gap-4 justify-between items-start">
                  <div class="flex gap-[2rem] items-sta">
                    <div class="flex flex-col leading-[200%] text-left gap-6">
                      <div class="flex flex-col">
                        <p class="font-semibold">Invoice Number</p>
                        <p>{{ invoiceStore.invoice?.number }}</p>
                      </div>
                      <div class="flex flex-col">
                        <p class="font-semibold">Customer</p>
                        <p>{{ invoiceStore.invoice?.account?.name }}</p>
                      </div>
                    </div>
                    <div class="flex flex-col leading-[200%] text-left gap-6">
                      <div class="flex flex-col">
                        <p class="font-semibold">Invoice Date</p>
                        <p>{{ new Date(invoiceStore.invoice?.created_at)?.toLocaleDateString() || 'No data' }}</p>
                      </div>
                      <!-- <div class="flex flex-col leading-[200%] text-left gap-6"> -->
                      <div class="flex flex-col">
                        <p class="font-semibold">Address</p>
                        <p>{{ invoiceStore.invoice?.account?.address || 'No data' }}</p>
                        <p>{{ invoiceStore.invoice?.account?.phone || 'No data' }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col leading-[200%] text-left justify-end w-1/2 px-[2rem]">
                    <p class="font-semibold">S&L INTERNATIONAL FOODS LTD</p>
                    <p class="leading-[150%]">Sovereign, 6 Blenheim Court, Peppercorn Close,
                      Cambs, Peterborough, England, PE1 2DU
                      Company number 13353972</p>
                  </div>
                </div>
                <div class="w-full">
                  <table width="100%">
                    <thead>
                      <tr class="border-y ">
                        <th scope="col" class="py-2">Description</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                        <th scope="col">VAT</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item, index in invoiceStore.invoice?.order_item" :key="index">
                        <td scope="row" class="py-2">{{ item.product_name }}</td>
                        <td scope="row">{{ item.quantity }}</td>
                        <td scope="row">{{ Number(item.product_price).toLocaleString('en-US',
                          { style: 'currency', currency: 'GBP' }) }}</td>
                        <td scope="row">20%</td>
                        <td scope="row">{{ Number(item.amount).toLocaleString('en-US',
                          { style: 'currency', currency: 'GBP' }) }}</td>

                      </tr>
                    </tbody>
                    <tfoot>
                      <tr class="border-t">
                        <th scope="row" colspan="4" class="text-right p-2">Sub Total</th>
                        <td>{{ Number(invoiceStore.invoice?.total_amount - (invoiceStore.invoice?.total_amount *
                          0.2)).toLocaleString('en-US',
                            { style: 'currency', currency: 'GBP' }) }}</td>
                      </tr>
                      <tr>
                        <th scope="row" colspan="4" class="text-right p-2">Total VAT</th>
                        <td>{{ Number(invoiceStore.invoice?.total_amount * 0.2).toLocaleString('en-US',
                          { style: 'currency', currency: 'GBP' }) }}</td>
                      </tr>
                      <tr>
                        <th scope="row" colspan="4" class="text-right p-2">Total Due</th>
                        <th>{{ Number(invoiceStore.invoice?.total_amount).toLocaleString('en-US',
                          { style: 'currency', currency: 'GBP' }) }}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="w-full flex ">
                  <div class="flex flex-col gap-4 w-[25%] pr-2">
                    <p class="font-semibold">Payment Details</p>
                    <p>Bank Name: Barclays PLC Sort-Code: 00-00-00 Accoount No.: 123456789</p>
                  </div>
                  <div class="flex flex-col gap-4 w-[48%] pr-2">
                    <p class="font-semibold">Registered Address</p>
                    <p>Sovereign, 6 Blenheim Court, Peppercorn Close, Cambs, Peterborough, England, PE1 2DU</p>
                  </div>
                  <div class="flex flex-col gap-4 w-[25%] pr-2">
                    <p class="font-semibold">Contact</p>
                    <p>Tel: +44 7657 765 789 E: info@snlfoods.com</p>
                  </div>

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
