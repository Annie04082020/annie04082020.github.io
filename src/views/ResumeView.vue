<template>
  <div class="resume-page-wrapper">
    <!-- Non-printable Top Action Bar -->
    <header class="resume-toolbar no-print">
      <div class="toolbar-container">
        <a :href="`../${lang}/index.html`" class="toolbar-btn back-btn">
          <BaseIcon name="arrow-left" size="16" />
          <span>{{ t.backToPortfolio }}</span>
        </a>

        <div class="toolbar-right">
          <div class="lang-switch">
            <a :href="`../zh/resume.html`" :class="{ active: lang === 'zh' }">ZH</a>
            <span class="sep">/</span>
            <a :href="`../en/resume.html`" :class="{ active: lang === 'en' }">EN</a>
            <span class="sep">/</span>
            <a :href="`../jp/resume.html`" :class="{ active: lang === 'jp' }">JP</a>
          </div>

          <button class="toolbar-btn print-btn" @click="handlePrint">
            <BaseIcon name="printer" size="16" />
            <span>{{ t.printPdf }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Printable Resume Sheet -->
    <main class="resume-sheet">
      <!-- Header -->
      <header class="resume-header">
        <h1 class="resume-name">{{ data.hero.name }}</h1>
        <div v-if="data.hero.ruby" class="resume-kana">
          <template v-for="(item, idx) in data.hero.ruby" :key="idx">
            <span v-if="item.separator" class="kana-sep">&nbsp;&nbsp;</span>
            <span v-else class="kana-char">{{ item.kana }}</span>
          </template>
        </div>

        <div class="resume-contacts">
          <span class="contact-item">
            <BaseIcon name="mail" size="14" />
            <a href="mailto:annie.huangah@proton.me">annie.huangah@proton.me</a>
          </span>
          <span class="contact-sep">•</span>
          <span class="contact-item">
            <BaseIcon name="github" size="14" />
            <a href="https://github.com/Annie04082020" target="_blank" rel="noopener noreferrer">github.com/Annie04082020</a>
          </span>
          <span class="contact-sep">•</span>
          <span class="contact-item">
            <BaseIcon name="linkedin" size="14" />
            <a href="https://www.linkedin.com/in/anniehuang221b/" target="_blank" rel="noopener noreferrer">linkedin.com/in/annie-huang</a>
          </span>
          <span class="contact-sep">•</span>
          <span class="contact-item">
            <BaseIcon name="globe" size="14" />
            <a :href="`../${lang}/index.html`">annie04082020.github.io</a>
          </span>
        </div>
      </header>

      <!-- Summary -->
      <section class="resume-section">
        <h2 class="section-heading">{{ t.summary }}</h2>
        <p class="summary-text">{{ data.hero.aboutText }}</p>
      </section>

      <!-- Education -->
      <section class="resume-section">
        <h2 class="section-heading">{{ t.education }}</h2>
        <div class="resume-items">
          <div v-for="(edu, idx) in data.education.items" :key="idx" class="resume-item">
            <div class="item-header">
              <strong class="item-title">{{ edu.school }}</strong>
              <span class="item-date">{{ edu.date }}</span>
            </div>
            <div class="item-sub">
              <span>{{ edu.degree }}</span>
              <span v-if="edu.note" class="item-note"> — {{ cleanNote(edu.note) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section v-if="data.skills?.list" class="resume-section">
        <h2 class="section-heading">{{ t.skills }}</h2>
        <div class="skills-grid">
          <div v-for="(cat, idx) in data.skills.list" :key="idx" class="skill-category">
            <strong class="category-name">{{ cat.category }}:</strong>
            <span class="skill-list">
              {{ cat.items.map(s => s.name + (s.detail ? ` (${s.detail})` : '')).join(' · ') }}
            </span>
          </div>
        </div>
      </section>

      <!-- Experience & Leadership -->
      <section v-if="data.experiences?.list" class="resume-section">
        <h2 class="section-heading">{{ t.experience }}</h2>
        <div class="resume-items">
          <div v-for="(exp, idx) in data.experiences.list" :key="idx" class="resume-item">
            <div class="item-header">
              <strong class="item-title">{{ exp.title }}</strong>
              <span v-if="exp.date" class="item-date">{{ exp.date }}</span>
            </div>
            <div v-if="exp.company" class="item-sub">
              <span>{{ exp.company }}</span>
            </div>

            <!-- Normal bullets -->
            <ul v-if="exp.bullets && exp.bullets.length" class="item-bullets">
              <li v-for="(b, bIdx) in exp.bullets" :key="bIdx" v-html="b"></li>
            </ul>

            <!-- Subsections (e.g. Taekwondo Club) -->
            <div v-if="exp.subsections && exp.subsections.length" class="subsections-list">
              <div v-for="(sub, sIdx) in exp.subsections" :key="sIdx" class="subsection-item">
                <div class="item-header sub-header">
                  <span class="sub-title font-medium">{{ sub.subtitle }}</span>
                  <span v-if="sub.date" class="item-date">{{ sub.date }}</span>
                </div>
                <ul v-if="sub.bullets && sub.bullets.length" class="item-bullets">
                  <li v-for="(sb, sbIdx) in sub.bullets" :key="sbIdx" v-html="sb"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Selected Projects -->
      <section class="resume-section">
        <h2 class="section-heading">{{ t.projects }}</h2>
        <div class="resume-items">
          <div v-for="proj in featuredProjects" :key="proj.id" class="resume-item">
            <div class="item-header">
              <strong class="item-title">{{ proj.title }}</strong>
              <span class="item-date">{{ proj.date }}</span>
            </div>
            <ul v-if="proj.bullets && proj.bullets.length" class="item-bullets">
              <li v-for="(b, bIdx) in proj.bullets" :key="bIdx">{{ b }}</li>
            </ul>
            <p v-else-if="proj.desc" class="item-desc">{{ proj.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Honors & Awards -->
      <section v-if="data.awards?.list" class="resume-section">
        <h2 class="section-heading">{{ t.awards }}</h2>
        <div class="resume-items">
          <div v-for="(award, aIdx) in data.awards.list" :key="aIdx" class="resume-item award-item">
            <div class="item-header">
              <span class="item-title font-normal">
                <strong>{{ award.title }}</strong>
                <span v-if="award.detail" class="text-muted">{{ award.detail }}</span>
              </span>
              <span v-if="award.date" class="item-date">{{ award.date }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { portfolioData } from '../data/portfolioData'
import BaseIcon from '../components/BaseIcon.vue'

const props = defineProps({
  lang: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: null
  }
})

const currentLang = ref(props.lang || 'en')

onBeforeMount(() => {
  if (!props.lang) {
    const htmlLang = document.documentElement.lang || 'en'
    if (htmlLang.startsWith('zh')) {
      currentLang.value = 'zh'
    } else if (htmlLang.startsWith('ja') || htmlLang.startsWith('jp')) {
      currentLang.value = 'jp'
    } else {
      currentLang.value = 'en'
    }
  }
})

const lang = computed(() => currentLang.value)
const data = computed(() => props.data || portfolioData[currentLang.value] || portfolioData.en)

const i18n = {
  en: {
    backToPortfolio: 'Back to Portfolio',
    printPdf: 'Print / Export PDF',
    summary: 'Summary',
    education: 'Education',
    skills: 'Technical Skills',
    experience: 'Experience & Leadership',
    projects: 'Selected Projects',
    awards: 'Honors & Awards'
  },
  zh: {
    backToPortfolio: '返回作品集',
    printPdf: '列印 / 匯出 PDF',
    summary: '個人簡述',
    education: '學歷背景',
    skills: '專業技能',
    experience: '實務與領導經歷',
    projects: '精選專案成果',
    awards: '榮譽與獎項'
  },
  jp: {
    backToPortfolio: 'ポートフォリオへ戻る',
    printPdf: '印刷 / PDF出力',
    summary: '要約',
    education: '学歴',
    skills: '専門スキル',
    experience: '職歴・活動実績',
    projects: '主なプロジェクト',
    awards: '受賞歴・表彰'
  }
}

const t = computed(() => i18n[currentLang.value] || i18n.en)

// Filter out 'other-projects' for clean resume presentation
const featuredProjects = computed(() => {
  return (data.value?.projects?.list || []).filter(p => p.id !== 'other-projects')
})

// Flatten and clean timeline items
const visibleExperiences = computed(() => {
  return data.value?.experiences?.timeline || []
})

const cleanNote = (text) => {
  if (!text) return ''
  return text.replace(/^[^\w\u4e00-\u9fa5\u3040-\u30ff\u3400-\u4dbf]+/, '').trim()
}

const handlePrint = () => {
  window.print()
}
</script>

<style scoped>
/* Page & Screen Presentation */
.resume-page-wrapper {
  min-height: 100vh;
  background-color: #e2e8f0;
  color: #111827;
  font-family: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  padding-bottom: 3rem;
}

/* Toolbar */
.resume-toolbar {
  background: #ffffff;
  border-bottom: 1px solid #cbd5e1;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.toolbar-container {
  max-width: 880px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.back-btn {
  color: #334155;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
}

.back-btn:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.print-btn {
  background: #0f172a;
  color: #ffffff;
  border: 1px solid #0f172a;
}

.print-btn:hover {
  background: #1e293b;
}

.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
}

.lang-switch a {
  color: #64748b;
  text-decoration: none;
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
}

.lang-switch a.active {
  color: #0284c7;
  background: rgba(2, 132, 199, 0.1);
}

.lang-switch .sep {
  color: #cbd5e1;
}

/* Printable Document Sheet */
.resume-sheet {
  max-width: 860px;
  margin: 2rem auto;
  background: #ffffff;
  padding: 3rem 3.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
}

/* Header */
.resume-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #0f172a;
}

.resume-name {
  font-family: 'Bahnschrift SemiCondensed', 'Barlow Semi Condensed', 'Noto Serif TC', serif;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  margin: 0 0 0.4rem 0;
  color: #0f172a;
}

.resume-kana {
  font-size: 0.88rem;
  color: #475569;
  letter-spacing: 0.12em;
  margin-top: -0.2rem;
  margin-bottom: 0.6rem;
}

.resume-contacts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.6rem 0.8rem;
  font-size: 0.86rem;
  color: #334155;
}

.contact-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.contact-item a {
  color: #0284c7;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

.contact-sep {
  color: #94a3b8;
}

/* Sections */
.resume-section {
  margin-bottom: 1.8rem;
}

.section-heading {
  font-family: 'Bahnschrift SemiCondensed', 'Barlow Semi Condensed', 'Noto Serif TC', serif;
  font-size: 1.18rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #0f172a;
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 0.35rem;
  margin: 0 0 0.9rem 0;
}

.summary-text {
  font-size: 0.93rem;
  color: #334155;
  line-height: 1.7;
  margin: 0;
  text-align: justify;
}

/* Item List */
.resume-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resume-item {
  page-break-inside: avoid;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: 0.98rem;
}

.item-title {
  color: #0f172a;
}

.item-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  color: #64748b;
  flex-shrink: 0;
}

.item-sub {
  font-size: 0.88rem;
  color: #475569;
  margin-top: 0.15rem;
}

.item-note {
  color: #0284c7;
  font-weight: 500;
}

.item-bullets {
  margin: 0.4rem 0 0 0;
  padding-left: 1.3rem;
  font-size: 0.9rem;
  color: #334155;
}

.item-bullets li {
  margin-bottom: 0.25rem;
}

.item-desc {
  font-size: 0.9rem;
  color: #334155;
  margin: 0.3rem 0 0 0;
}

/* Skills */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.9rem;
}

.skill-category {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.category-name {
  color: #0f172a;
  min-width: 140px;
}

.skill-list {
  color: #334155;
  flex: 1;
}

.award-item .item-title {
  font-size: 0.9rem;
}

.text-muted {
  color: #64748b;
}

/* Print Optimization */
@media print {
  .no-print {
    display: none !important;
  }

  body, .resume-page-wrapper {
    background: #ffffff !important;
    padding: 0 !important;
    margin: 0 !important;
    color: #000000 !important;
  }

  .resume-sheet {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0.5cm 0.8cm !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  .section-heading {
    border-bottom: 1px solid #000000 !important;
    color: #000000 !important;
  }

  .resume-header {
    border-bottom: 2px solid #000000 !important;
  }

  .resume-name {
    color: #000000 !important;
  }

  .contact-item a {
    color: #000000 !important;
    text-decoration: none !important;
  }

  .resume-item {
    page-break-inside: avoid;
  }

  @page {
    margin: 1.2cm 1.5cm;
    size: A4 portrait;
  }
}

/* Responsive */
@media (max-width: 680px) {
  .resume-sheet {
    padding: 1.8rem 1.2rem;
    margin: 1rem 0.5rem;
  }

  .toolbar-container {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }

  .toolbar-right {
    justify-content: space-between;
  }

  .item-header {
    flex-direction: column;
    gap: 0.15rem;
  }

  .category-name {
    min-width: 100%;
  }
}
</style>
