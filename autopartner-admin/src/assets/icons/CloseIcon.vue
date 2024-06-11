<template>
  <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.49 18.6023L17.2639 6.00305L18.3987 7.21731L6.62472 19.8165L5.49 18.6023ZM5.49 7.22769L6.63442 6.00305L18.3987 18.5919L17.2543 19.8165L5.49 7.22769Z"
      :fill="props.color" />
  </svg>

</template>
<script setup>
const props = defineProps({ color: { type: String, default: '#C40F30' } })
</script>
