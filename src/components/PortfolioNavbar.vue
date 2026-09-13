<template>
  <div>
    <!-- Top Navbar -->
    <nav class="navbar">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <button id="sidebar-toggle" class="nav-btn" style="padding: 0.4rem 0.6rem;" @click="toggleSidebar" aria-label="Toggle Sidebar">
          <BaseIcon name="menu" size="18" />
        </button>
        <a href="index.html#" class="logo">
          <span class="logo-text">{{ navData.logoName }}</span>
        </a>
      </div>
      
      <div class="nav-links" :class="{ active: isMobileMenuOpen }">
        <a href="index.html#about" @click="closeMobileMenu">{{ navData.nav.about }}</a>
        <a href="index.html#projects" @click="closeMobileMenu">{{ navData.nav.projects }}</a>
        <a href="index.html#experiences" @click="closeMobileMenu">{{ navData.nav.experiences }}</a>
        <a :href="resumeUrl" @click="closeMobileMenu" class="nav-link-resume">
          <BaseIcon name="file-text" size="14" style="margin-right: 4px;" />
          <span>{{ navData.nav.resume || (lang === 'zh' ? '簡歷' : lang === 'jp' ? '履歴書' : 'Resume') }}</span>
        </a>
        <a :href="journalUrl" @click="closeMobileMenu" class="nav-link-journal">
          <BaseIcon name="book-open" size="14" style="margin-right: 4px;" />
          <span>{{ cleanJournalText(navData.nav.journal) }}</span>
        </a>
      </div>
      
      <div class="nav-controls">
        <div class="controls">
          <button id="theme-toggle" class="nav-btn" @click="toggleTheme" aria-label="Toggle Theme">
            <BaseIcon name="moon" size="16" class="icon-moon" />
            <BaseIcon name="sun" size="16" class="icon-sun" />
          </button>
          
          <select id="language-selector" class="nav-btn" :value="lang" @change="changeLanguage">
            <option value="zh">ZH</option>
            <option value="en">EN</option>
            <option value="jp">JP</option>
          </select>
          
          <button id="mobile-menu-btn" class="nav-btn menu-btn" @click="toggleMobileMenu" aria-label="Toggle Menu">
            <BaseIcon name="menu" size="18" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Side Navbar -->
    <nav class="side-navbar" :class="{ open: isSidebarOpen }">
      <div class="side-nav-links">
        <a href="index.html#about" @click="closeSidebar">{{ navData.nav.about }}</a>
        <a href="index.html#projects" @click="closeSidebar">{{ navData.nav.projects }}</a>
        <a href="index.html#skills" @click="closeSidebar">{{ navData.nav.skills }}</a>
        <a href="index.html#experiences" @click="closeSidebar">{{ navData.nav.experiences }}</a>
        <a href="index.html#courses" @click="closeSidebar">{{ navData.nav.courses }}</a>
        <a href="index.html#awards" @click="closeSidebar">{{ navData.nav.awards }}</a>
        <a :href="resumeUrl" @click="closeSidebar" style="color: var(--accent-primary);">
          <BaseIcon name="file-text" size="15" style="margin-right: 6px;" />
          <span>{{ navData.nav.resume || (lang === 'zh' ? '簡歷' : lang === 'jp' ? '履歴書' : 'Resume') }}</span>
        </a>
        <a :href="journalUrl" @click="closeSidebar" style="color: var(--accent-secondary);">
          <BaseIcon name="book-open" size="15" style="margin-right: 6px;" />
          <span>{{ cleanJournalText(navData.nav.journal) }}</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  lang: {
    type: String,
    required: true
  },
  navData: {
    type: Object,
    required: true
  }
})

const isSidebarOpen = ref(false)
const isMobileMenuOpen = ref(false)
const theme = ref('light')

const journalUrl = computed(() => {
  return 'journal.html'
})

const resumeUrl = computed(() => {
  return 'resume.html'
})

const cleanJournalText = (text) => {
  if (!text) return ''
  return text.replace(/^[^\w\u4e00-\u9fa5\u3040-\u30ff\u3400-\u4dbf]+/, '').trim()
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  if (isSidebarOpen.value) {
    document.body.classList.add('sidebar-open')
  } else {
    document.body.classList.remove('sidebar-open')
  }
}

const closeSidebar = () => {
  isSidebarOpen.value = false
  document.body.classList.remove('sidebar-open')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleTheme = () => {
  const newTheme = theme.value === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
}

const setTheme = (newTheme) => {
  theme.value = newTheme
  document.body.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}

const changeLanguage = (e) => {
  const selectedLang = e.target.value
  if (selectedLang !== props.lang) {
    window.location.href = `../${selectedLang}/index.html`
  }
}

onMounted(() => {
  // Load saved theme (default to dark)
  const savedTheme = localStorage.getItem('theme') || 'dark'
  setTheme(savedTheme)
})
</script>
