<template>
  <section class="main-section" id="education">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="content-box">
      <ul class="education-list">
        <li v-for="(item, index) in data.items" :key="index" class="education-item">
          <div class="education-header">
            <h3 class="education-school">{{ item.school }}</h3>
            <span class="education-date" v-if="item.date">{{ item.date }}</span>
          </div>
          <div v-if="item.degree" class="education-degree">
            {{ item.degree }}
          </div>
          <div v-if="item.note" class="education-note">
            <BaseIcon name="award" :size="14" />
            <span>{{ cleanNote(item.note) }}</span>
          </div>
        </li>
      </ul>

      <details v-if="data.accordionTitle" class="education-accordion">
        <summary class="education-accordion-summary">{{ data.accordionTitle }}</summary>
        <div class="accordion-content">
          <div v-for="(sec, index) in data.accordionSections" :key="index" class="accordion-item">
            <div class="accordion-item-header">
              <h4>{{ sec.title }}</h4>
              <span class="accordion-date" v-if="sec.date">{{ sec.date }}</span>
            </div>
            <p v-for="(p, pIdx) in sec.paragraphs" :key="pIdx">{{ p }}</p>
          </div>
        </div>
      </details>
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
  gap: 1.5rem;
}

.education-item {
  position: relative;
  padding-bottom: 1.35rem;
  border-bottom: 1px dashed var(--border-light);
}

.education-item:last-child {
  border-bottom: none;
  padding-bottom: 0.25rem;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.education-school {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text-color);
  margin: 0;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.education-date {
  font-family: var(--font-mono);
  font-size: 0.84rem;
  color: var(--meta-text);
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.education-degree {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text-main);
  margin-top: 0.35rem;
  line-height: 1.55;
  font-weight: 400;
}

.education-note {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent-secondary);
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.22);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
}

/* Accordion / Early Talents */
.education-accordion {
  margin-top: 1.75rem;
  border-top: 1px solid var(--border-light);
  padding-top: 1.25rem;
}

.education-accordion-summary {
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-primary);
  outline: none;
  transition: color 0.2s;
  user-select: none;
}

.education-accordion-summary:hover {
  color: var(--accent-hover);
}

.accordion-content {
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.accordion-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 1rem 1.2rem;
}

.accordion-item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.accordion-item-header h4 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--text-color);
}

.accordion-date {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--meta-text);
}

.accordion-item p {
  margin: 0.4rem 0 0 0;
  color: var(--text-main);
  font-size: 0.88rem;
  line-height: 1.6;
}
</style>
