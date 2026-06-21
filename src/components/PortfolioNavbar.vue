<template>
  <div>
    <!-- Top Navbar -->
    <nav class="navbar">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <button id="sidebar-toggle" class="nav-btn" style="padding: 0.4rem 0.6rem;" @click="toggleSidebar">
          <span>☰</span>
        </button>
        <a href="#" class="logo">
          <span class="highlight-yellow">{{ navData.logoName }}</span>
        </a>
      </div>
      
      <div class="nav-links" :class="{ active: isMobileMenuOpen }">
        <a href="index.html#about" @click="closeMobileMenu">{{ navData.nav.about }}</a>
        <a href="index.html#projects" @click="closeMobileMenu">{{ navData.nav.projects }}</a>
        <a href="index.html#experiences" @click="closeMobileMenu">{{ navData.nav.experiences }}</a>
        <a :href="journalUrl" @click="closeMobileMenu" style="color: var(--accent);">{{ navData.nav.journal }}</a>
      </div>
      
      <div class="nav-controls">
        <div class="controls">
          <button id="theme-toggle" class="nav-btn" @click="toggleTheme">
            <span class="icon-moon">🌙</span>
            <span class="icon-sun">☀️</span>
          </button>
          
          <select id="language-selector" class="nav-btn" :value="lang" @change="changeLanguage">
            <option value="zh">ZH</option>
            <option value="en">EN</option>
            <option value="jp">JP</option>
          </select>
          
          <button id="mobile-menu-btn" class="nav-btn menu-btn" @click="toggleMobileMenu">
            <span>≡</span>
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
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

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
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light'
  setTheme(savedTheme)
})
</script>
