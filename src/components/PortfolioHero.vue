<template>
  <header class="hero" id="about">
    <div class="hero-container">
      <div class="hero-title">
        <h1><span class="highlight-yellow">{{ data.name }}</span></h1>
        <p v-for="(sub, index) in data.subtitles" :key="index" class="subtitle">{{ sub }}</p>

        <div class="hero-contact">
          <a href="mailto:annie.huangah@proton.me">📧 annie.huangah@proton.me</a>
          <a href="https://github.com/Annie04082020" target="_blank">💻 github.com/Annie04082020</a>
          <a href="https://www.linkedin.com/in/annie-huang-8375331a7/" target="_blank">🔗 linkedin.com/in/annie-huang</a>
        </div>
      </div>

      <div class="hero-content">
        <div class="hero-section">
          <h2 class="highlight-yellow">{{ data.aboutTitle }}</h2>
          <p>{{ data.aboutText }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
