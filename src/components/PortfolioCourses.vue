<template>
  <section class="main-section" id="courses">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="content-box">
      <div class="experience-card full-width">
        <!-- Row 1: Core Courses (first two categories) -->
        <div class="courses-flex-container">
          <div 
            v-for="cat in data.categories.slice(0, 2)" 
            :key="cat.title" 
            class="courses-column"
          >
            <details class="course-details">
              <summary>{{ cat.title }}</summary>
              <div class="course-grid">
                <div v-for="(item, idx) in cat.items" :key="idx" class="course-item">
                  <span v-if="item.domain" class="domain">{{ item.domain }}</span>
                  <span v-if="item.dept" class="dept">{{ item.dept }}</span>
                  <span>{{ item.name }}</span>
                  <a 
                    v-if="item.link" 
                    :href="item.link.url" 
                    target="_blank" 
                    class="project-link"
                    style="font-size: 0.7rem; padding: 0.1rem 0.4rem;"
                  >
                    {{ item.link.text }}
                  </a>
                  <span class="meta-info">{{ item.date }}</span>
                </div>
              </div>
            </details>
          </div>
        </div>

        <!-- Row 2: Electives (third category) -->
        <div 
          v-if="data.categories[2]" 
          class="courses-flex-container" 
          style="margin-top: 1.5rem;"
        >
          <div class="courses-column">
            <details class="course-details">
              <summary>{{ data.categories[2].title }}</summary>
              <div class="course-grid">
                <div v-for="(item, idx) in data.categories[2].items" :key="idx" class="course-item">
                  <span v-if="item.domain" class="domain">{{ item.domain }}</span>
                  <span v-if="item.dept" class="dept">{{ item.dept }}</span>
                  <span>{{ item.name }}</span>
                  <a 
                    v-if="item.link" 
                    :href="item.link.url" 
                    target="_blank" 
                    class="project-link"
                    style="font-size: 0.7rem; padding: 0.1rem 0.4rem;"
                  >
                    {{ item.link.text }}
                  </a>
                  <span class="meta-info">{{ item.date }}</span>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
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
