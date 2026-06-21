<template>
  <section class="main-section" id="portfolio">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="content-box">
      <div class="experience-card full-width">
        <h3>{{ data.subtitle }}</h3>
        <ul>
          <li v-for="(item, index) in data.items" :key="index">
            <a :href="item.url" target="_blank" class="project-link">{{ item.title }}</a>{{ item.desc }}
          </li>
        </ul>
      </div>
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
