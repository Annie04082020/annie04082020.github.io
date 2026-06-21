<template>
  <section class="main-section" id="experiences">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="experiences-grid">
      <div 
        v-for="(exp, index) in data.list" 
        :key="index" 
        class="experience-card"
        :class="{ 'full-width': exp.bullets && exp.bullets.length > 0 && !exp.date }"
      >
        <h3>{{ exp.title }}</h3>
        <p v-if="exp.date" class="meta-info section-meta">{{ exp.date }}</p>
        <ul>
          <li v-for="(bullet, bIndex) in exp.bullets" :key="bIndex">{{ bullet }}</li>
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
