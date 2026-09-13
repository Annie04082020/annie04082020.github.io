<template>
  <section class="main-section" id="education">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="content-box">
      <ul class="education-list">
        <li v-for="(item, index) in data.items" :key="index" class="education-item">
          <div class="education-main-line">
            <span class="education-school-degree">
              <b class="highlight-yellow">{{ item.school }}</b>
              <span v-if="item.degree" class="education-degree"> {{ item.degree }}</span>
            </span>
            <span class="meta-info inline-meta" v-if="item.date">{{ item.date }}</span>
          </div>
          <div v-if="item.note" class="education-note">
            {{ item.note }}
          </div>
        </li>
      </ul>

      <details class="education-accordion">
        <summary>{{ data.accordionTitle }}</summary>
        <div class="accordion-content">
          <div v-for="(sec, index) in data.accordionSections" :key="index" class="accordion-item">
            <div class="accordion-item-header">
              <h4>{{ sec.title }}</h4>
              <span class="meta-info inline-meta">{{ sec.date }}</span>
            </div>
            <p v-for="(p, pIdx) in sec.paragraphs" :key="pIdx">{{ p }}</p>
          </div>
        </div>
      </details>
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
