<template>
  <section class="main-section" id="education">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="content-box">
      <ul>
        <li v-for="(item, index) in data.items" :key="index" style="margin-top: 0.8rem;">
          <b class="highlight-yellow">{{ item.school }}</b> <span v-if="item.degree"> {{ item.degree }}</span>
          <span class="meta-info inline-meta" v-if="item.date">{{ item.date }}</span>
          <template v-if="item.note">
            <br>{{ item.note }}
          </template>
        </li>
      </ul>

      <details class="education-accordion">
        <summary>{{ data.accordionTitle }}</summary>
        <div class="accordion-content">
          <div v-for="(sec, index) in data.accordionSections" :key="index" class="accordion-item">
            <h4>{{ sec.title }}</h4>
            <span class="meta-info inline-meta">{{ sec.date }}</span>
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
