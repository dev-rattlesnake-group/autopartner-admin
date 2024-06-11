<template>
  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="2 User">
      <path
        id="Stroke 1"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.98675 11.4624C10.2146 11.4624 12.9735 11.9515 12.9735 13.9054C12.9735 15.8593 10.233 16.3624 6.98675 16.3624C3.758 16.3624 1 15.8777 1 13.9229C1 11.9682 3.73963 11.4624 6.98675 11.4624Z"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        id="Stroke 3"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.9868 8.67375C4.86755 8.67375 3.14905 6.95613 3.14905 4.83688C3.14905 2.71763 4.86755 1 6.9868 1C9.10517 1 10.8237 2.71763 10.8237 4.83688C10.8315 6.94825 9.1253 8.66588 7.01392 8.67375H6.9868Z"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        id="Stroke 5"
        d="M13.0168 7.67786C14.4177 7.48098 15.4966 6.27873 15.4992 4.82361C15.4992 3.38948 14.4536 2.19948 13.0825 1.97461"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        id="Stroke 7"
        d="M14.8651 11.0471C16.2222 11.2492 17.1699 11.7252 17.1699 12.7052C17.1699 13.3799 16.7236 13.8174 16.0026 14.0912"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>
<script setup>
const props= defineProps({color:{type:String, default:'#53545C'}})
</script>
