<template>
  <section class="main-section" id="upcoming">
    <h2 class="section-title highlight-orange">{{ data.title }}</h2>
    <div class="content-box">
      <ul>
        <li v-for="(item, index) in data.items" :key="index">
          <b class="highlight-yellow">{{ item.name }}</b>
          <span v-if="item.date"> {{ item.date }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
