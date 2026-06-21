<template>
  <section class="main-section" id="projects">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="projects-grid">
      <div 
        v-for="project in data.list" 
        :key="project.id" 
        class="project-card" 
        :class="{ 'full-width': project.id === 'other-projects' || project.id === 'leda' && lang === 'en' }"
        @click="openModal($event, project)"
      >
        <h3>{{ project.title }}</h3>
        
        <div class="project-meta">
          <p class="meta-info">{{ project.date }}</p>
          <a 
            v-for="(link, lIndex) in project.links" 
            :key="lIndex" 
            :href="link.url" 
            target="_blank" 
            class="project-link"
            @click.stop
          >
            {{ link.text }}
          </a>
        </div>
        
        <div class="desc">
          <ul v-if="project.bullets">
            <li v-for="(bullet, bIndex) in project.bullets" :key="bIndex">{{ bullet }}</li>
          </ul>
          <p v-else>{{ project.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Modal Overlay -->
    <div v-if="activeProject" class="modal active" @click.self="closeModal">
      <div class="modal-content">
        <span class="modal-close" @click="closeModal">&times;</span>
        <div class="modal-body">
          <h3>{{ activeProject.title }}</h3>
          
          <template v-if="activeProject.modal">
            <h4>{{ activeProject.modal.processTitle }}</h4>
            <p>{{ activeProject.modal.process }}</p>
            
            <h4>{{ activeProject.modal.detailsTitle }}</h4>
            <ul v-if="activeProject.modal.bullets">
              <li v-for="(bullet, bIndex) in activeProject.modal.bullets" :key="bIndex" v-html="bullet"></li>
            </ul>
            <p v-else>{{ activeProject.modal.details }}</p>
          </template>
          
          <template v-else>
            <h4>Process</h4>
            <p>[Process details...]</p>
            <h4>More Details</h4>
            <p>[More information...]</p>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  lang: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const activeProject = ref(null)

const openModal = (e, project) => {
  // Prevent modal opening if a link was clicked
  if (e.target.closest('a')) return
  
  activeProject.value = project
  document.body.style.overflow = 'hidden' // Prevent background scroll
}

const closeModal = () => {
  activeProject.value = null
  document.body.style.overflow = '' // Restore scroll
}
</script>
