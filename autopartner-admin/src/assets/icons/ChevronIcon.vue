<template>
    <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 1L7.5 7L13.5 1" :stroke="props.color" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>

</template>
<script setup>
const props = defineProps({ color: { type: String, default: '#53545C' } })
</script>