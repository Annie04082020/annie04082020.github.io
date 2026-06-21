<template>
  <PortfolioNavbar :lang="lang" :navData="activeData" />
  <div class="main-wrapper">
    <PortfolioHero :data="activeData.hero" />
    <PortfolioUpcoming :data="activeData.upcoming" />
    <PortfolioEducation :data="activeData.education" />
    <PortfolioProjects :lang="lang" :data="activeData.projects" />
    <PortfolioSkills :data="activeData.skills" />
    <PortfolioCoding :data="activeData.portfolio" />
    <PortfolioExperiences :data="activeData.experiences" />
    <PortfolioCourses :data="activeData.courses" />
    <PortfolioAwards :data="activeData.awards" />
    <PortfolioFooter :data="activeData.footer" />
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { portfolioData } from '../data/portfolioData'
import PortfolioNavbar from '../components/PortfolioNavbar.vue'
import PortfolioHero from '../components/PortfolioHero.vue'
import PortfolioUpcoming from '../components/PortfolioUpcoming.vue'
import PortfolioEducation from '../components/PortfolioEducation.vue'
import PortfolioProjects from '../components/PortfolioProjects.vue'
import PortfolioSkills from '../components/PortfolioSkills.vue'
import PortfolioCoding from '../components/PortfolioCoding.vue'
import PortfolioExperiences from '../components/PortfolioExperiences.vue'
import PortfolioCourses from '../components/PortfolioCourses.vue'
import PortfolioAwards from '../components/PortfolioAwards.vue'
import PortfolioFooter from '../components/PortfolioFooter.vue'

const lang = ref('en')

// Detect language from html lang attribute before mount
onBeforeMount(() => {
  const htmlLang = document.documentElement.lang || 'en'
  if (htmlLang.startsWith('zh')) {
    lang.value = 'zh'
  } else if (htmlLang.startsWith('ja') || htmlLang.startsWith('jp')) {
    lang.value = 'jp'
  } else {
    lang.value = 'en'
  }
})

const activeData = computed(() => {
  return portfolioData[lang.value] || portfolioData.en
})
</script>
