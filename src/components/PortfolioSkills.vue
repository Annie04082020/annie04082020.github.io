<template>
  <section class="main-section" id="skills">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="skills-grid">
      <div 
        v-for="(cat, index) in data.list" 
        :key="index" 
        class="skill-card"
        :class="{ 'full-width': cat.isFullWidth }"
      >
        <h3>{{ cat.category }}</h3>
        <ul>
          <li v-for="(item, iIndex) in cat.items" :key="iIndex">
            <b v-if="item.meta">{{ item.name }}</b>
            <span v-else>{{ item.name }}</span>
            
            <span v-if="item.detail" class="score-detail" v-html="formatDetail(item.detail)"></span>
            <span v-if="item.meta" class="meta-info inline-meta">{{ item.meta }}</span>
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

// Helper to support line breaks in details (like English scores)
const formatDetail = (text) => {
  return text ? text.replace(/ \| /g, '<br>') : ''
}
</script>
