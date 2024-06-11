<template>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Folder">
      <path
        id="Stroke 1"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5341 10.6754C14.5341 13.1033 13.103 14.5344 10.6751 14.5344H5.39447C2.96043 14.5344 1.52661 13.1033 1.52661 10.6754V5.3825C1.52661 2.95796 2.41825 1.52686 4.84686 1.52686H6.204C6.69122 1.52753 7.14993 1.75621 7.44172 2.14639L8.06125 2.97018C8.3544 3.35968 8.81311 3.58903 9.30033 3.58971H11.2207C13.6547 3.58971 14.5531 4.82878 14.5531 7.30625L14.5341 10.6754Z"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        id="Stroke 3"
        d="M5.07617 9.81414H11.0035"
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
