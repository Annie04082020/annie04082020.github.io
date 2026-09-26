<template>
  <section class="main-section" id="projects">
    <h2 class="section-title">{{ data.title }}</h2>

    <!-- Tag Filter Bar -->
    <div class="project-filter-bar" role="toolbar" aria-label="Project tag filters">
      <button 
        type="button" 
        class="filter-pill" 
        :class="{ active: selectedTags.length === 0 }"
        :aria-pressed="selectedTags.length === 0"
        @click="resetFilter"
      >
        <span>{{ t.all }}</span>
        <span class="filter-count">{{ data.list ? data.list.length : 0 }}</span>
      </button>

      <button 
        v-for="tag in allTags" 
        :key="tag" 
        type="button" 
        class="filter-pill" 
        :class="{ active: selectedTags.includes(tag) }"
        :aria-pressed="selectedTags.includes(tag)"
        @click="toggleTag(tag)"
      >
        <span>#{{ tag }}</span>
        <span class="filter-count">{{ getTagCount(tag) }}</span>
      </button>
    </div>

    <!-- Projects Grid with Smooth Transition -->
    <TransitionGroup name="project-fade" tag="div" class="projects-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="project-card" 
        :class="{ 'full-width': project.id === 'other-projects' }"
        :data-tags="project.tags ? project.tags.join(' ') : ''"
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
            <BaseIcon :name="getLinkIcon(link)" size="14" />
            <span>{{ cleanLinkText(link.text) }}</span>
          </a>
        </div>

        <!-- Project Tags -->
        <div v-if="project.tags && project.tags.length" class="project-card-tags">
          <button
            v-for="tag in project.tags"
            :key="tag"
            type="button"
            class="project-card-tag"
            :class="{ active: selectedTags.includes(tag) }"
            :title="selectedTags.includes(tag) ? 'Click to deselect tag' : 'Click to filter by #' + tag"
            @click.stop="toggleTag(tag)"
          >
            #{{ tag }}
          </button>
        </div>
        
        <div class="desc">
          <ul v-if="project.bullets">
            <li v-for="(bullet, bIndex) in project.bullets" :key="bIndex">{{ bullet }}</li>
          </ul>
          <p v-else>{{ project.desc }}</p>
        </div>
      </div>
    </TransitionGroup>

    <!-- Empty State -->
    <div v-if="filteredProjects.length === 0" class="no-projects-found">
      <p>{{ t.empty }}</p>
      <button type="button" class="filter-pill reset-btn active" @click="resetFilter">
        {{ t.reset }}
      </button>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
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
const selectedTags = ref([])

// Preferred presentation order for standard tags
const tagPriority = [
  'hardware',
  'control-systems',
  'firmware',
  'ai-ml',
  'web-dev',
  'game-dev',
  'competition'
]

// Fallback mapping for projects
const fallbackTagsMap = {
  'ultimate-bomb': ['hardware', 'game-dev'],
  'angry-birds': ['game-dev'],
  'yolo-v10': ['ai-ml'],
  'csl-car': ['hardware', 'control-systems', 'firmware'],
  'behind-brewing': ['hardware', 'control-systems'],
  'linux-odyssey': ['web-dev', 'competition'],
  'music-block': ['hardware', 'firmware'],
  'eco-game': ['game-dev'],
  'leda': ['ai-ml', 'web-dev'],
  'ptech': ['web-dev', 'competition'],
  'python-game': ['game-dev']
}

// Translations for filter labels
const i18n = {
  en: {
    all: 'All',
    empty: 'No projects match the selected tags.',
    reset: 'Reset filters'
  },
  zh: {
    all: '全部',
    empty: '沒有符合所選標籤的專案。',
    reset: '重置篩選'
  },
  jp: {
    all: 'すべて',
    empty: '選択したタグに一致するプロジェクトがありません。',
    reset: 'フィルターをリセット'
  }
}

const t = computed(() => i18n[props.lang] || i18n.en)

// Unique tags extracted from project list
const allTags = computed(() => {
  const set = new Set()
  const list = props.data?.list || []
  list.forEach(project => {
    const tags = project.tags || fallbackTagsMap[project.id] || []
    tags.forEach(tag => set.add(tag))
  })
  return Array.from(set).sort((a, b) => {
    const idxA = tagPriority.indexOf(a)
    const idxB = tagPriority.indexOf(b)
    if (idxA !== -1 && idxB !== -1) return idxA - idxB
    if (idxA !== -1) return -1
    if (idxB !== -1) return 1
    return a.localeCompare(b)
  })
})

// Count projects per tag
const getTagCount = (tag) => {
  const list = props.data?.list || []
  return list.filter(p => {
    const tags = p.tags || fallbackTagsMap[p.id] || []
    return tags.includes(tag)
  }).length
}

// Filtered projects (OR logic for multi-select)
const filteredProjects = computed(() => {
  const list = props.data?.list || []
  if (selectedTags.value.length === 0) {
    return list
  }
  return list.filter(project => {
    const tags = project.tags || fallbackTagsMap[project.id] || []
    return tags.some(tag => selectedTags.value.includes(tag))
  })
})

// Toggle tag selection (multi-select)
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  syncUrl()
}

// Reset filter back to All
const resetFilter = () => {
  selectedTags.value = []
  syncUrl()
}

// Read tags from query param (?tag=hardware,ai-ml or ?tags=...)
const readTagsFromUrl = () => {
  if (typeof window === 'undefined') return []
  const params = new URLSearchParams(window.location.search)
  const rawList = params.getAll('tag').concat(params.getAll('tags'))
  if (!rawList.length) return []
  
  const parsed = []
  rawList.forEach(item => {
    item.split(',').forEach(part => {
      const clean = part.trim().replace(/^#/, '').toLowerCase()
      if (clean && !parsed.includes(clean)) {
        parsed.push(clean)
      }
    })
  })
  return parsed
}

// Update URL query param to reflect filter state
const syncUrl = () => {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (selectedTags.value.length === 0) {
    url.searchParams.delete('tag')
    url.searchParams.delete('tags')
  } else {
    url.searchParams.delete('tags')
    url.searchParams.set('tag', selectedTags.value.join(','))
  }
  const target = url.pathname + (url.search ? url.search : '') + url.hash
  window.history.replaceState(null, '', target)
}

// Browser navigation (popstate) handler
const handlePopState = () => {
  const fromUrl = readTagsFromUrl()
  const valid = fromUrl.filter(t => allTags.value.includes(t))
  selectedTags.value = valid
}

onMounted(() => {
  const fromUrl = readTagsFromUrl()
  if (fromUrl.length > 0) {
    const valid = fromUrl.filter(t => allTags.value.includes(t))
    if (valid.length > 0) {
      selectedTags.value = valid
    }
  }
  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
})

const openModal = (e, project) => {
  // Prevent modal opening if a link or tag button was clicked
  if (e.target.closest('a') || e.target.closest('button')) return
  
  activeProject.value = project
  document.body.style.overflow = 'hidden' // Prevent background scroll
}

const closeModal = () => {
  activeProject.value = null
  document.body.style.overflow = '' // Restore scroll
}

const getLinkIcon = (link) => {
  if (!link) return 'external-link'
  const url = (link.url || '').toLowerCase()
  const text = (link.text || '').toLowerCase()
  if (url.includes('github') || text.includes('github')) return 'github'
  if (url.includes('youtu') || text.includes('demo') || text.includes('成果') || text.includes('video')) return 'video'
  return 'external-link'
}

const cleanLinkText = (text) => {
  if (!text) return ''
  return text.replace(/^[^\w\u4e00-\u9fa5\u3040-\u30ff\u3400-\u4dbf]+/, '').trim()
}
</script>
