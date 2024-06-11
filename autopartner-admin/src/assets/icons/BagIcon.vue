<template>
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Bag">
      <path
        id="Path_33955"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.7955 15.3572H4.83274C2.64249 15.3572 0.962199 14.5661 1.43948 11.382L1.99522 7.06691C2.28943 5.47816 3.30283 4.87012 4.19201 4.87012H11.4624C12.3646 4.87012 13.3192 5.52393 13.6592 7.06691L14.2149 11.382C14.6203 14.2065 12.9857 15.3572 10.7955 15.3572Z"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        id="Path_33956"
        d="M10.8935 4.7132C10.8935 3.00886 9.51188 1.62723 7.80755 1.62723V1.62723C6.98683 1.62375 6.19854 1.94734 5.61698 2.52645C5.03541 3.10556 4.70849 3.89248 4.7085 4.7132H4.7085"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        id="Line_192"
        d="M9.92601 7.92993H9.89332"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        id="Line_193"
        d="M5.76122 7.92993H5.72853"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>
<script setup>
const props = defineProps({ color: { type: String, default: '#53545C' } })
</script>
