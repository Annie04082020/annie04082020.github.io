<template>
  <section class="main-section" id="upcoming">
    <h2 class="section-title highlight-orange">{{ data.title }}</h2>
    <div class="content-box">
      <ul>
        <li v-for="(item, index) in data.items" :key="index">
          <b class="highlight-yellow">{{ item.name }}</b>
          <a 
            v-if="item.url" 
            :href="item.url" 
            target="_blank" 
            rel="noopener noreferrer" 
            style="margin-left: 0.5rem; color: var(--accent); font-size: 0.85em; text-decoration: underline;"
          >[🔗 Link]</a>
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
