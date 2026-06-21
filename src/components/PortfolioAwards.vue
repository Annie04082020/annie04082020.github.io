<template>
  <section class="main-section" id="awards">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="content-box">
      <ul>
        <li v-for="(award, index) in data.list" :key="index">
          <b>{{ award.title }}</b>{{ award.detail }}
          <span class="meta-info inline-meta" v-if="award.date">{{ award.date }}</span>
        </li>
      </ul>
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
