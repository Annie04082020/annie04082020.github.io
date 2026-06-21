<template>
  <PortfolioNavbar :lang="lang" :navData="activeNavData" />
  <div class="main-wrapper">
    <section class="main-section" style="padding-top: 5rem;">
      <a href="index.html" class="back-link">{{ labels.back }}</a>

      <div class="content-box">
        <!-- Dropdown to select different entries -->
        <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <label for="log-selector" style="font-weight: 600; color: var(--meta-text);">
            {{ labels.select }}
          </label>
          <select 
            id="log-selector" 
            class="nav-btn" 
            style="min-width: 200px; cursor: pointer;"
            v-model="selectedLogId"
            @change="onLogChange"
          >
            <option v-for="log in logs" :key="log.id" :value="log.id">
              {{ log.date }} - {{ log.title }}
            </option>
          </select>
        </div>

        <!-- Markdown content injected here -->
        <div id="journal-content" v-html="journalHtml"></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted, watch } from 'vue'
import { marked } from 'marked'
import { portfolioData } from '../data/portfolioData'
import PortfolioNavbar from '../components/PortfolioNavbar.vue'

const lang = ref('en')
const logs = ref([])
const selectedLogId = ref('')
const journalHtml = ref('')
const errorMsg = ref('')

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

const activeNavData = computed(() => {
  return portfolioData[lang.value] || portfolioData.en
})

const labels = computed(() => {
  if (lang.value === 'zh') {
    return {
      back: '← 回到主頁面',
      select: '選擇日誌文章:',
      loading: '<p>載入文章中...</p>',
      error: '<p>無法載入日誌。如果您在本地直接開啟檔案，瀏覽器可能會阻擋載入。請使用 Live Server 等伺服器工具開啟。</p>',
      loadFail: '<p>讀取日誌文章失敗。請確認文章是否存在。</p>'
    }
  } else if (lang.value === 'jp') {
    return {
      back: '← ポートフォリオに戻る',
      select: 'エントリーを選択:',
      loading: '<p>エントリーを読み込み中...</p>',
      error: '<p>ジャーナルデータベースの読み込みに失敗しました。</p>',
      loadFail: '<p>ジャーナルエントリーの解析エラー。移動または削除された可能性があります。</p>'
    }
  } else {
    return {
      back: '← Back to Portfolio',
      select: 'Select Entry:',
      loading: '<p>Loading journal entry...</p>',
      error: '<p>Failed to load the journal database.</p>',
      loadFail: '<p>Error parsing the journal entry. It may have been moved or deleted.</p>'
    }
  }
})

const fetchLogsIndex = async () => {
  try {
    const res = await fetch('../logs/index.json')
    if (!res.ok) throw new Error('Could not fetch index.json')
    const data = await res.json()
    logs.value = data
    if (data.length > 0) {
      selectedLogId.value = data[0].id
    } else {
      journalHtml.value = '<p>No journal entries found.</p>'
    }
  } catch (err) {
    console.error('Error fetching logs index:', err)
    journalHtml.value = labels.value.error
  }
}

const loadMarkdown = async (filename) => {
  if (!filename) return
  journalHtml.value = labels.value.loading
  try {
    const res = await fetch(`../logs/${filename}`)
    if (!res.ok) throw new Error('Network response was not ok')
    const markdownText = await res.text()
    // Parse markdown to HTML
    journalHtml.value = marked.parse(markdownText)
  } catch (err) {
    console.error(`Error loading markdown file ${filename}:`, err)
    journalHtml.value = labels.value.loadFail
  }
}

const onLogChange = () => {
  loadMarkdown(selectedLogId.value)
}

watch(selectedLogId, (newId) => {
  if (newId) {
    loadMarkdown(newId)
  }
})

onMounted(() => {
  fetchLogsIndex()
})
</script>
