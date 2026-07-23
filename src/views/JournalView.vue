<template>
  <PortfolioNavbar :lang="lang" :navData="activeNavData" />
  <div class="main-wrapper">
    <section class="main-section" style="padding-top: 5rem;">
      <a href="index.html" class="back-link">{{ labels.back }}</a>

      <div class="content-box">
        <!-- Top Toolbar & Dropdown -->
        <div style="margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
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

          <div class="journal-actions">
            <button class="lock-btn" @click="toggleLockPanel">
              <span v-if="!isUnlocked">🔒 {{ labels.unlock }}</span>
              <span v-else>✏️ {{ labels.newEntry }}</span>
            </button>
          </div>
        </div>

        <!-- Lock / Publisher Card -->
        <div v-if="showLockPanel" class="editor-card">
          <!-- Auth State: Locked -->
          <div v-if="!isUnlocked">
            <h3>🔒 {{ labels.unlockTitle }}</h3>
            <p style="font-size: 0.9rem; color: var(--meta-text); margin-bottom: 1rem;">
              {{ labels.unlockHint }}
            </p>
            <div class="editor-form-group">
              <label>{{ labels.tokenLabel }}</label>
              <input 
                type="password" 
                class="editor-input" 
                v-model="githubToken" 
                :placeholder="labels.tokenPlaceholder" 
                @keyup.enter="verifyAndUnlock"
              />
            </div>
            <div style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" id="remember-token" v-model="rememberToken" />
              <label for="remember-token" style="font-size: 0.85rem; color: var(--meta-text); cursor: pointer;">
                {{ labels.rememberToken }}
              </label>
            </div>
            <div class="editor-buttons">
              <button class="btn-primary" @click="verifyAndUnlock">{{ labels.unlockBtn }}</button>
              <button class="btn-secondary" @click="showLockPanel = false">{{ labels.cancelBtn }}</button>
            </div>
          </div>

          <!-- Auth State: Unlocked Editor -->
          <div v-else>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="margin: 0;">✏️ {{ labels.editorTitle }}</h3>
              <button class="btn-secondary" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" @click="lockEditor">
                🔒 {{ labels.lockBtn }}
              </button>
            </div>

            <div class="editor-row">
              <div class="editor-form-group">
                <label>{{ labels.titleLabel }}</label>
                <input type="text" class="editor-input" v-model="newTitle" :placeholder="labels.titlePlaceholder" />
              </div>
              <div class="editor-form-group" style="max-width: 180px;">
                <label>{{ labels.dateLabel }}</label>
                <input type="date" class="editor-input" v-model="newDate" />
              </div>
            </div>

            <div class="editor-form-group">
              <label>{{ labels.contentLabel }}</label>
              <textarea 
                class="editor-textarea" 
                v-model="newContent" 
                :placeholder="labels.contentPlaceholder"
              ></textarea>
            </div>

            <!-- Preview section -->
            <div v-if="newContent" class="preview-box">
              <h4>{{ labels.previewTitle }}</h4>
              <div id="journal-content" v-html="previewHtml"></div>
            </div>

            <div class="editor-buttons">
              <button class="btn-primary" :disabled="isPublishing" @click="handlePublish">
                {{ isPublishing ? labels.publishing : labels.publishBtn }}
              </button>
              <button class="btn-secondary" @click="showLockPanel = false">{{ labels.closeBtn }}</button>
            </div>

            <div v-if="statusMessage" class="status-msg" :class="statusType">
              {{ statusMessage }}
            </div>
          </div>
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

// GitHub Direct Publishing & Lock States
const showLockPanel = ref(false)
const isUnlocked = ref(false)
const githubToken = ref('')
const rememberToken = ref(true)

const newTitle = ref('')
const newDate = ref(todayDateString())
const newContent = ref('')
const isPublishing = ref(false)
const statusMessage = ref('')
const statusType = ref('')

function todayDateString() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function utf8ToBase64(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode('0x' + p1)
  }))
}

const previewHtml = computed(() => {
  if (!newContent.value) return ''
  return marked.parse(newContent.value)
})

onBeforeMount(() => {
  const htmlLang = document.documentElement.lang || 'en'
  if (htmlLang.startsWith('zh')) {
    lang.value = 'zh'
  } else if (htmlLang.startsWith('ja') || htmlLang.startsWith('jp')) {
    lang.value = 'jp'
  } else {
    lang.value = 'en'
  }

  // Load saved token from localStorage if available
  const savedToken = localStorage.getItem('journal_gh_token')
  if (savedToken) {
    githubToken.value = savedToken
    isUnlocked.value = true
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
      loadFail: '<p>讀取日誌文章失敗。請確認文章是否存在。</p>',
      unlock: '解鎖發布',
      newEntry: '寫新日誌',
      unlockTitle: '解鎖日誌發布功能',
      unlockHint: '請輸入 GitHub Access Token (PAT) 以獲得直接發布筆記的權限：',
      tokenLabel: 'GitHub Token (PAT)',
      tokenPlaceholder: '貼上 ghp_xxxxxxxxxxxx',
      rememberToken: '在這台電腦上記住 Token',
      unlockBtn: '解鎖並開始寫作',
      cancelBtn: '取消',
      editorTitle: '撰寫新日誌',
      lockBtn: '鎖定',
      titleLabel: '文章標題',
      titlePlaceholder: '例如：今日課題解法與心得',
      dateLabel: '發布日期',
      contentLabel: 'Markdown 內容',
      contentPlaceholder: '在這邊輸入 Markdown 內容...',
      previewTitle: '即時預覽',
      publishBtn: '🚀 發布至 GitHub',
      publishing: '發布中...',
      closeBtn: '關閉面板',
      errTitleRequired: '請輸入文章標題與內容',
      errTokenRequired: '請先輸入 GitHub Token',
      publishSuccess: '🎉 發布成功！文章已直接更新，GitHub Pages 將在 1-2 分鐘內自動重新部署。'
    }
  } else if (lang.value === 'jp') {
    return {
      back: '← ポートフォリオに戻る',
      select: 'エントリーを選択:',
      loading: '<p>エントリーを読み込み中...</p>',
      error: '<p>ジャーナルデータベースの読み込みに失敗しました。</p>',
      loadFail: '<p>ジャーナルエントリーの解析エラー。移動または削除された可能性があります。</p>',
      unlock: 'ロック解除',
      newEntry: '新規投稿',
      unlockTitle: '投稿機能のロック解除',
      unlockHint: '直接投稿するためには GitHub Access Token (PAT) を入力してください：',
      tokenLabel: 'GitHub Token (PAT)',
      tokenPlaceholder: 'ghp_xxxxxxxxxxxx を貼り付け',
      rememberToken: 'この端末に Token を保存する',
      unlockBtn: 'ロック解除して執筆',
      cancelBtn: 'キャンセル',
      editorTitle: '新規ジャーナルの執筆',
      lockBtn: 'ロックする',
      titleLabel: 'タイトル',
      titlePlaceholder: '例: 本日の課題と解決策',
      dateLabel: '日付',
      contentLabel: 'Markdown 本文',
      contentPlaceholder: 'ここに Markdown で文章を入力...',
      previewTitle: 'リアルタイムプレビュー',
      publishBtn: '🚀 GitHub へ公開',
      publishing: '公開中...',
      closeBtn: '閉じる',
      errTitleRequired: 'タイトルと本文を入力してください',
      errTokenRequired: 'GitHub Token を入力してください',
      publishSuccess: '🎉 公開成功！GitHub Pages に反映されるまで1〜2分かかります。'
    }
  } else {
    return {
      back: '← Back to Portfolio',
      select: 'Select Entry:',
      loading: '<p>Loading journal entry...</p>',
      error: '<p>Failed to load the journal database.</p>',
      loadFail: '<p>Error parsing the journal entry. It may have been moved or deleted.</p>',
      unlock: 'Unlock Publisher',
      newEntry: 'New Entry',
      unlockTitle: 'Unlock Journal Publisher',
      unlockHint: 'Enter your GitHub Access Token (PAT) with write permission to publish directly:',
      tokenLabel: 'GitHub Token (PAT)',
      tokenPlaceholder: 'Paste ghp_xxxxxxxxxxxx',
      rememberToken: 'Remember Token on this device',
      unlockBtn: 'Unlock & Write',
      cancelBtn: 'Cancel',
      editorTitle: 'Write New Journal Entry',
      lockBtn: 'Lock',
      titleLabel: 'Entry Title',
      titlePlaceholder: 'e.g., Daily task insights and solution',
      dateLabel: 'Date',
      contentLabel: 'Markdown Content',
      contentPlaceholder: 'Write markdown content here...',
      previewTitle: 'Live Preview',
      publishBtn: '🚀 Publish to GitHub',
      publishing: 'Publishing...',
      closeBtn: 'Close Panel',
      errTitleRequired: 'Please provide both title and content.',
      errTokenRequired: 'Please enter a GitHub Token.',
      publishSuccess: '🎉 Published successfully! GitHub Pages will auto-deploy in 1-2 minutes.'
    }
  }
})

const toggleLockPanel = () => {
  showLockPanel.value = !showLockPanel.value
  statusMessage.value = ''
}

const verifyAndUnlock = () => {
  if (!githubToken.value.trim()) {
    statusMessage.value = labels.value.errTokenRequired
    statusType.value = 'error'
    return
  }
  isUnlocked.value = true
  if (rememberToken.value) {
    localStorage.setItem('journal_gh_token', githubToken.value.trim())
  } else {
    localStorage.removeItem('journal_gh_token')
  }
  statusMessage.value = ''
}

const lockEditor = () => {
  isUnlocked.value = false
  githubToken.value = ''
  localStorage.removeItem('journal_gh_token')
  showLockPanel.value = false
}

const handlePublish = async () => {
  if (!newTitle.value.trim() || !newContent.value.trim()) {
    statusMessage.value = labels.value.errTitleRequired
    statusType.value = 'error'
    return
  }

  if (!githubToken.value.trim()) {
    statusMessage.value = labels.value.errTokenRequired
    statusType.value = 'error'
    return
  }

  isPublishing.value = true
  statusMessage.value = labels.value.publishing
  statusType.value = 'loading'

  const token = githubToken.value.trim()
  const repoOwner = 'annie04082020'
  const repoName = 'annie04082020.github.io'
  const timestamp = Date.now()
  const dateFormatted = newDate.value || todayDateString()
  const filename = `log-${dateFormatted.replace(/-/g, '')}-${timestamp.toString().slice(-4)}.md`
  const mdPath = `public/logs/${filename}`
  const indexPath = `public/logs/index.json`

  try {
    // 1. Fetch current index.json from GitHub
    const indexRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${indexPath}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (!indexRes.ok) {
      throw new Error(`Failed to fetch index.json (Status ${indexRes.status}). Check if token is valid.`)
    }

    const indexData = await indexRes.json()
    const currentSha = indexData.sha
    const rawIndexJson = decodeURIComponent(escape(atob(indexData.content.replace(/\s/g, ''))))
    const indexList = JSON.parse(rawIndexJson)

    // Prepend new entry
    const newEntryObj = {
      id: filename,
      title: newTitle.value.trim(),
      date: dateFormatted
    }
    indexList.unshift(newEntryObj)

    const updatedIndexStr = JSON.stringify(indexList, null, 2)
    const updatedIndexBase64 = utf8ToBase64(updatedIndexStr)

    // 2. Update index.json via GitHub API
    const updateIndexRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${indexPath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `add journal entry: ${newTitle.value.trim()}`,
        content: updatedIndexBase64,
        sha: currentSha
      })
    })

    if (!updateIndexRes.ok) {
      const errJson = await updateIndexRes.json()
      throw new Error(`Failed to update index.json: ${errJson.message || updateIndexRes.statusText}`)
    }

    // 3. Create the new markdown file via GitHub API
    const mdBase64 = utf8ToBase64(newContent.value)
    const createMdRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${mdPath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `create journal file: ${filename}`,
        content: mdBase64
      })
    })

    if (!createMdRes.ok) {
      const errJson = await createMdRes.json()
      throw new Error(`Failed to create markdown file: ${errJson.message || createMdRes.statusText}`)
    }

    // Success! Update local UI immediately
    logs.value = indexList
    selectedLogId.value = filename
    journalHtml.value = marked.parse(newContent.value)

    // Reset form
    newTitle.value = ''
    newContent.value = ''
    statusMessage.value = labels.value.publishSuccess
    statusType.value = 'success'

  } catch (err) {
    console.error('Publishing error:', err)
    statusMessage.value = `❌ Error: ${err.message}`
    statusType.value = 'error'
  } finally {
    isPublishing.value = false
  }
}

const fetchLogsIndex = async () => {
  try {
    const res = await fetch(`../logs/index.json?t=${Date.now()}`)
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
    const res = await fetch(`../logs/${filename}?t=${Date.now()}`)
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

