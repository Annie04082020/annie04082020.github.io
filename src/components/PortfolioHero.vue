<template>
  <header class="hero" id="about">
    <div class="hero-container">
      <div class="hero-title">
        <div class="hero-status-tag">
          <span class="status-indicator"></span>
          <span class="status-text">PORTFOLIO // SYSTEM ACTIVE</span>
        </div>
        
        <h1 :class="{ 'has-kana': !!data.kana }"><span class="hero-name-gradient">{{ data.name }}</span></h1>
        <div v-if="data.kana" class="hero-name-kana">{{ data.kana }}</div>
        
        <div class="hero-subtitles">
          <p v-for="(sub, index) in data.subtitles" :key="index" class="subtitle">
            <span class="subtitle-bullet">&gt;</span> {{ sub }}
          </p>
        </div>

        <div class="hero-contact">
          <a href="mailto:annie.huangah@proton.me" class="contact-badge">
            <span class="contact-icon">📧</span>
            <span>annie.huangah@proton.me</span>
          </a>
          <a href="https://github.com/Annie04082020" target="_blank" rel="noopener noreferrer" class="contact-badge">
            <span class="contact-icon">💻</span>
            <span>github.com/Annie04082020</span>
          </a>
          <a href="https://www.linkedin.com/in/anniehuang221b/" target="_blank" rel="noopener noreferrer" class="contact-badge">
            <span class="contact-icon">🔗</span>
            <span>linkedin.com/in/annie-huang</span>
          </a>
        </div>
      </div>

      <div class="hero-content">
        <div class="hero-section">
          <h2>{{ data.aboutTitle }}</h2>
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
