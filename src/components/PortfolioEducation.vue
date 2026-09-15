<template>
  <section class="main-section" id="education">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="content-box">
      <ul class="education-list">
        <li v-for="(item, index) in data.items" :key="index" class="education-item">
          <div class="education-main-line">
            <b class="highlight-yellow education-school">{{ item.school }}</b>
            <span class="meta-info inline-meta" v-if="item.date">{{ item.date }}</span>
          </div>
          <div v-if="item.degree" class="education-degree">
            {{ item.degree }}
          </div>
          <div v-if="item.note" class="education-note">
            {{ cleanNote(item.note) }}
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

const cleanNote = (note) => {
  if (!note) return ''
  return note.replace(/^🎓\s*/, '').trim()
}
</script>

<style scoped>
.education-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.education-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.education-main-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.education-school {
  font-size: 1.05rem;
}

.education-degree {
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.5;
}

.education-note {
  color: var(--meta-text);
  font-size: 0.88rem;
  line-height: 1.5;
  margin-top: 0.15rem;
}

.education-accordion {
  margin-top: 1.5rem;
}

.accordion-item {
  margin-top: 1rem;
}

.accordion-item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>

