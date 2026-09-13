<template>
  <section class="main-section" id="upcoming">
    <h2 class="section-title highlight-orange">{{ data.title }}</h2>
    <div class="content-box">
      <ul>
        <li v-for="(item, index) in data.items" :key="index" style="margin-bottom: 1rem;">
          <div style="margin-bottom: 0.3rem;">
            <b class="highlight-yellow" style="font-size: 1.05rem;">{{ item.name }}</b>
            <a 
              v-if="item.url" 
              :href="item.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              style="margin-left: 0.5rem; color: var(--accent); font-size: 0.85em; text-decoration: underline; display: inline-flex; align-items: center; gap: 0.25rem;"
            ><BaseIcon name="external-link" :size="13" />Link</a>
            <span v-if="item.date" style="margin-left: 0.5rem; color: var(--text-secondary); font-size: 0.9em;"> {{ item.date }}</span>
          </div>
          <p v-if="item.desc" style="margin: 0.3rem 0 0.5rem 0; color: var(--text-secondary); line-height: 1.6;">{{ item.desc }}</p>
          <ul v-if="item.bullets" style="margin: 0.3rem 0 0.5rem 1.2rem; list-style-type: disc;">
            <li v-for="(b, bi) in item.bullets" :key="bi" style="margin-bottom: 0.25rem; color: var(--text-secondary);" v-html="b"></li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import BaseIcon from './BaseIcon.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
