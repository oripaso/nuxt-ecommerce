<template>
  <NuxtImg :src="url" :placeholder="[30, 20]" class="rounded" />
</template>
<script setup>
const props = defineProps(["url"]);
</script>
