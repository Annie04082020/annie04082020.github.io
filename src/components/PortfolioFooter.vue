<template>
  <footer>
    <p>{{ data.text }}</p>
  </footer>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
