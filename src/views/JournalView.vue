<template>
  <PortfolioNavbar :lang="lang" :navData="activeNavData" />
  <div class="main-wrapper">
    <section class="main-section" style="padding-top: 5rem;">
      <a href="index.html" class="back-link">{{ labels.back }}</a>

      <div class="content-box">
        <!-- Private Gate: Locked State Screen -->
        <div v-if="!isUnlocked" class="editor-card private-gate-card">
          <h3>🔒 {{ labels.privateGateTitle }}</h3>
          <p style="font-size: 0.95rem; color: var(--meta-text); margin-bottom: 1.5rem;">
            {{ labels.privateGateHint }}
          </p>
          <div class="editor-form-group" style="text-align: left;">
            <label>{{ labels.tokenLabel }}</label>
            <input 
              type="password" 
              class="editor-input" 
              v-model="githubToken" 
              :placeholder="labels.tokenPlaceholder" 
              @keyup.enter="verifyAndUnlock"
            />
          </div>
          <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <input type="checkbox" id="remember-token" v-model="rememberToken" />
            <label for="remember-token" style="font-size: 0.85rem; color: var(--meta-text); cursor: pointer;">
              {{ labels.rememberToken }}
            </label>
          </div>
          <div class="editor-buttons" style="justify-content: center;">
            <button class="btn-primary" style="padding: 0.75rem 2rem;" @click="verifyAndUnlock">
              🔑 {{ labels.unlockBtn }}
            </button>
          </div>
          <div v-if="statusMessage" class="status-msg" :class="statusType" style="margin-top: 1.5rem;">
            {{ statusMessage }}
          </div>
        </div>

        <!-- Unlocked View: Journal Reader & Toolbar -->
        <div v-else>
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

            <div class="journal-actions" style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
              <button 
                v-if="selectedLogId" 
                class="btn-edit" 
                @click="startEditCurrentEntry"
              >
                ✏️ {{ labels.editEntryBtn }}
              </button>

              <button 
                v-if="selectedLogId" 
                class="btn-danger" 
                :disabled="isDeleting" 
                @click="handleDelete"
              >
                🗑️ {{ isDeleting ? labels.deleting : labels.deleteBtn }}
              </button>

              <button class="btn-primary" style="padding: 0.5rem 0.9rem; font-size: 0.9rem;" @click="startNewEntry">
                ➕ {{ labels.newEntry }}
              </button>

              <button class="btn-secondary" style="padding: 0.5rem 0.9rem; font-size: 0.9rem;" @click="lockEditor">
                🔒 {{ labels.lockBtn }}
              </button>
            </div>
          </div>

          <!-- Hidden File Input for Attachments (Multi-file & All formats) -->
          <input 
            type="file" 
            ref="fileInputRef" 
            multiple
            style="display: none;" 
            @change="handleFileInputChange" 
            accept="*"
          />

          <!-- Editor Panel -->
          <div v-if="showLockPanel" class="editor-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="margin: 0;">
                <span v-if="isEditingExisting">✏️ {{ labels.editTitleHeader }}</span>
                <span v-else>➕ {{ labels.editorTitle }}</span>
              </h3>
              <button class="btn-secondary" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" @click="showLockPanel = false">
                ✕ {{ labels.closeBtn }}
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
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                <label>{{ labels.contentLabel }}</label>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn-attach" :disabled="isUploading" @click="triggerFileInput">
                    📎 {{ isUploading ? labels.attachUploading : labels.attachBtn }}
                  </button>
                  <button class="btn-attach" @click="insertCsvTemplate">
                    📊 {{ labels.csvInsertBtn }}
                  </button>
                </div>
              </div>

              <!-- Drag & Drop Zone for Files -->
              <div 
                class="drop-zone-container" 
                :class="{ 'is-dragging': isDragging }"
                @dragover.prevent="onDragOver"
                @dragleave.prevent="onDragLeave"
                @drop.prevent="onFileDrop"
              >
                <div v-if="isDragging" class="drop-overlay">
                  <span style="font-size: 2.5rem; margin-bottom: 0.5rem;">📂</span>
                  <span>{{ labels.dropOverlayText }}</span>
                </div>

                <textarea 
                  class="editor-textarea" 
                  v-model="newContent" 
                  :placeholder="labels.contentPlaceholder"
                ></textarea>
              </div>
            </div>

            <!-- Live Preview section -->
            <div v-if="newContent" class="preview-box">
              <h4>{{ labels.previewTitle }}</h4>
              <div id="journal-content" v-html="previewHtml"></div>
            </div>

            <div class="editor-buttons">
              <button class="btn-primary" :disabled="isPublishing || isUploading" @click="handlePublish">
                {{ isPublishing ? labels.publishing : (isEditingExisting ? labels.updateBtn : labels.publishBtn) }}
              </button>
              <button class="btn-secondary" @click="showLockPanel = false">{{ labels.closeBtn }}</button>
            </div>

            <div v-if="statusMessage" class="status-msg" :class="statusType">
              {{ statusMessage }}
            </div>
          </div>

          <!-- Markdown content injected here -->
          <div id="journal-content" v-html="journalHtml"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted, onUnmounted, watch } from 'vue'
import { marked } from 'marked'
import { portfolioData } from '../data/portfolioData'
import PortfolioNavbar from '../components/PortfolioNavbar.vue'

// Private repo where all journal files and attachments are stored
const PRIVATE_REPO_OWNER = 'annie04082020'
const PRIVATE_REPO_NAME = 'journal-private'

const lang = ref('en')
const logs = ref([])
const selectedLogId = ref('')
const journalHtml = ref('')

// GitHub Direct Publishing, Lock & Attachment States
const showLockPanel = ref(false)
const isUnlocked = ref(false)
const githubToken = ref('')
const rememberToken = ref(true)

const isEditingExisting = ref(false)
const editingFilename = ref('')

const newTitle = ref('')
const newDate = ref(todayDateString())
const newContent = ref('')
const isPublishing = ref(false)
const isDeleting = ref(false)
const isUploading = ref(false)
const isDragging = ref(false)
const statusMessage = ref('')
const statusType = ref('')

const fileInputRef = ref(null)
const blobUrls = ref([])  // tracks blob: URLs created for private attachments

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

function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

// CSV Parser and Interactive Table Generator
function parseAndRenderCsvTables(htmlStr) {
  if (!htmlStr) return ''

  // Replace <pre><code class="language-csv">...</code></pre> with styled HTML Table
  return htmlStr.replace(/<pre><code class="(?:language-csv|lang-csv)">([\s\S]*?)<\/code><\/pre>/gi, (match, csvContent) => {
    // Decode HTML entities
    const txt = document.createElement('textarea')
    txt.innerHTML = csvContent
    const rawCsv = txt.value.trim()

    if (!rawCsv) return match

    const lines = rawCsv.split(/\r?\n/).filter(line => line.trim() !== '')
    if (lines.length === 0) return match

    const rows = lines.map(line => {
      // Basic CSV splitter handling quotes
      const result = []
      let cell = ''
      let inQuotes = false
      for (let i = 0; i < line.length; i++) {
        const c = line[i]
        if (c === '"') {
          inQuotes = !inQuotes
        } else if (c === ',' && !inQuotes) {
          result.push(cell.trim())
          cell = ''
        } else {
          cell += c
        }
      }
      result.push(cell.trim())
      return result
    })

    const header = rows[0]
    const bodyRows = rows.slice(1)

    let tableHtml = '<div class="csv-table-wrapper">'
    tableHtml += '<div class="csv-table-header">'
    tableHtml += '<span class="csv-table-title">📊 CSV Data Table</span>'
    tableHtml += '<button class="csv-download-btn" onclick="downloadCsvData(this)">📥 下載 .csv</button>'
    tableHtml += '</div>'
    tableHtml += `<div class="csv-data-store" style="display:none;">${rawCsv.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`
    tableHtml += '<table class="csv-table"><thead><tr>'
    
    header.forEach(h => {
      tableHtml += `<th>${h}</th>`
    })
    tableHtml += '</tr></thead><tbody>'

    bodyRows.forEach(r => {
      tableHtml += '<tr>'
      r.forEach(c => {
        tableHtml += `<td>${c}</td>`
      })
      tableHtml += '</tr>'
    })

    tableHtml += '</tbody></table></div>'
    return tableHtml
  })
}

// Global browser CSV download handler
if (typeof window !== 'undefined') {
  window.downloadCsvData = function(btn) {
    const wrapper = btn.closest('.csv-table-wrapper')
    const rawCsv = wrapper.querySelector('.csv-data-store').innerText
    const blob = new Blob(['\uFEFF' + rawCsv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `data-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }
}

const previewHtml = computed(() => {
  if (!newContent.value) return ''
  const parsed = marked.parse(newContent.value)
  return parseAndRenderCsvTables(parsed)
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
      error: '<p>無法載入日誌。若在本地開啟檔案，瀏覽器可能會阻擋載入。請使用 Live Server 等伺服器工具開啟。</p>',
      loadFail: '<p>讀取日誌文章失敗。請確認文章是否存在。</p>',
      unlock: '解鎖發布',
      newEntry: '寫新日誌',
      privateGateTitle: '🔒 私密日誌空間',
      privateGateHint: '請輸入 Access Key / GitHub Token 以解鎖並閱讀日誌內文：',
      unlockTitle: '解鎖日誌發布功能',
      unlockHint: '請輸入 GitHub Access Token (PAT) 以獲得發布權限：',
      tokenLabel: 'GitHub Token / Access Key',
      tokenPlaceholder: '貼上 ghp_xxxxxxxxxxxx',
      rememberToken: '在這台電腦上記住 Key',
      unlockBtn: '解鎖日誌空間',
      cancelBtn: '取消',
      editorTitle: '撰寫新日誌',
      editTitleHeader: '編輯日誌內容',
      lockBtn: '鎖定離開',
      titleLabel: '文章標題',
      titlePlaceholder: '例如：今日課題解法與心得',
      dateLabel: '發布日期',
      contentLabel: 'Markdown 內文',
      contentPlaceholder: '可直接拖曳檔案進來，支援 .v, .vhdl, .py, .cpp, .js 等多個程式檔/圖片/文件...',
      previewTitle: '即時預覽',
      publishBtn: '🚀 發布至 GitHub',
      updateBtn: '💾 儲存修改內容',
      publishing: '處理中...',
      closeBtn: '關閉編輯器',
      editEntryBtn: '編輯此文章',
      deleteBtn: '刪除此文章',
      deleteConfirm: '確定要刪除這篇日誌文章嗎？刪除後將無法復原。',
      deleting: '刪除中...',
      deleteSuccess: '🗑️ 成功刪除文章！',
      attachBtn: '上傳附件 (可拖曳/多檔/程式碼)',
      attachUploading: '上傳中',
      attachSuccess: '📎 附件上傳成功！已自動插入下載連結',
      csvInsertBtn: '插入 CSV 範本',
      dropOverlayText: '📂 放開滑鼠以批次上傳檔案 (支援多檔 / .v / .vhdl / .py / 圖片 / 文件)',
      batchUploadSuccess: '個檔案上傳成功！已自動插入連結',
      errTitleRequired: '請輸入文章標題與內容',
      errTokenRequired: '請先輸入 Access Key / Token',
      publishSuccess: '🎉 儲存成功！GitHub Pages 將在 1-2 分鐘內自動重新部署。'
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
      privateGateTitle: '🔒 プライベートジャーナル',
      privateGateHint: 'エントリーを閲覧・編集するには Access Key / GitHub Token を入力してください：',
      unlockTitle: '投稿機能のロック解除',
      unlockHint: '直接投稿するためには GitHub Access Token (PAT) を入力してください：',
      tokenLabel: 'GitHub Token / Access Key',
      tokenPlaceholder: 'ghp_xxxxxxxxxxxx を貼り付け',
      rememberToken: 'この端末に Key を保存する',
      unlockBtn: 'ジャーナルをロック解除',
      cancelBtn: 'キャンセル',
      editorTitle: '新規ジャーナルの執筆',
      editTitleHeader: 'ジャーナルエントリーの編集',
      lockBtn: 'ロックする',
      titleLabel: 'タイトル',
      titlePlaceholder: '例: 本日の課題と解決策',
      dateLabel: '日付',
      contentLabel: 'Markdown 本文',
      contentPlaceholder: 'ファイルをドラッグ&ドロップ可能 (.v, .vhdl, .py, .cpp, 画像, ドキュメント対応)...',
      previewTitle: 'リアルタイムプレビュー',
      publishBtn: '🚀 GitHub へ公開',
      updateBtn: '💾 変更を保存',
      publishing: '処理中...',
      closeBtn: '閉じる',
      editEntryBtn: 'この投稿を編集',
      deleteBtn: 'この投稿を削除',
      deleteConfirm: 'このエントリーを削除してもよろしいですか？この操作は取り消せません。',
      deleting: '削除中...',
      deleteSuccess: '🗑️ エントリーを削除しました！',
      attachBtn: '添付ファイルをアップロード (ドラッグ&ドロップ/複数/コード対応)',
      attachUploading: 'アップロード中',
      attachSuccess: '📎 アップロード成功！ダウンロードリンクを挿入しました',
      csvInsertBtn: 'CSV テンプレートを挿入',
      dropOverlayText: '📂 マウスを離してファイルを一括アップロード (.v / .vhdl / .py / 複数対応)',
      batchUploadSuccess: '個のファイルをアップロードしました！',
      errTitleRequired: 'タイトルと本文を入力してください',
      errTokenRequired: 'Access Key / Token を入力してください',
      publishSuccess: '🎉 保存成功！GitHub Pages に反映されるまで1〜2分かかります。'
    }
  } else {
    return {
      back: '← Back to Portfolio',
      select: 'Select Entry:',
      loading: '<p>Loading journal entry...</p>',
      error: '<p>Failed to load the journal database.</p>',
      loadFail: '<p>Error parsing the journal entry. It may have been moved or deleted.</p>',
      unlock: 'Unlock Workspace',
      newEntry: 'New Entry',
      privateGateTitle: '🔒 Private Journal Workspace',
      privateGateHint: 'Enter your Access Key / GitHub Token to unlock and view journal entries:',
      unlockTitle: 'Unlock Journal Publisher',
      unlockHint: 'Enter your GitHub Access Token (PAT) with write permission:',
      tokenLabel: 'GitHub Token / Access Key',
      tokenPlaceholder: 'Paste ghp_xxxxxxxxxxxx',
      rememberToken: 'Remember Key on this device',
      unlockBtn: 'Unlock Journal',
      cancelBtn: 'Cancel',
      editorTitle: 'Write New Journal Entry',
      editTitleHeader: 'Edit Journal Entry',
      lockBtn: 'Lock Workspace',
      titleLabel: 'Entry Title',
      titlePlaceholder: 'e.g., Daily task insights and solution',
      dateLabel: 'Date',
      contentLabel: 'Markdown Content',
      contentPlaceholder: 'Drag & drop files here (.v, .vhdl, .py, .cpp, images, docs supported)...',
      previewTitle: 'Live Preview',
      publishBtn: '🚀 Publish to GitHub',
      updateBtn: '💾 Save Changes',
      publishing: 'Processing...',
      closeBtn: 'Close Editor',
      editEntryBtn: 'Edit Entry',
      deleteBtn: 'Delete Entry',
      deleteConfirm: 'Are you sure you want to delete this journal entry? This action cannot be undone.',
      deleting: 'Deleting...',
      deleteSuccess: '🗑️ Entry deleted successfully!',
      attachBtn: 'Attach Files (Drag & Drop / Multi-file / Code)',
      attachUploading: 'Uploading',
      attachSuccess: '📎 Attachment uploaded! Link inserted.',
      csvInsertBtn: 'Insert CSV Template',
      dropOverlayText: '📂 Drop files to upload in batch (.v / .vhdl / .py / multi-file)',
      batchUploadSuccess: 'files uploaded successfully!',
      errTitleRequired: 'Please provide both title and content.',
      errTokenRequired: 'Please enter Access Key / Token.',
      publishSuccess: '🎉 Saved successfully! GitHub Pages will auto-deploy in 1-2 minutes.'
    }
  }
})

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
  fetchLogsIndex()
}

const lockEditor = () => {
  isUnlocked.value = false
  githubToken.value = ''
  localStorage.removeItem('journal_gh_token')
  showLockPanel.value = false
}

const startNewEntry = () => {
  isEditingExisting.value = false
  editingFilename.value = ''
  newTitle.value = ''
  newDate.value = todayDateString()
  newContent.value = ''
  statusMessage.value = ''
  showLockPanel.value = true
}

const startEditCurrentEntry = async () => {
  if (!selectedLogId.value) return
  const currentEntry = logs.value.find(l => l.id === selectedLogId.value)
  if (!currentEntry) return

  isEditingExisting.value = true
  editingFilename.value = selectedLogId.value
  newTitle.value = currentEntry.title
  newDate.value = currentEntry.date || todayDateString()
  statusMessage.value = labels.value.loading
  statusType.value = 'loading'
  showLockPanel.value = true

  try {
    const res = await fetch(
      `https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/logs/${selectedLogId.value}`,
      {
        headers: {
          'Authorization': `Bearer ${githubToken.value.trim()}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )
    if (!res.ok) throw new Error('Failed to fetch entry content for editing.')
    const resData = await res.json()
    newContent.value = decodeURIComponent(escape(atob(resData.content.replace(/\s/g, ''))))
    statusMessage.value = ''
  } catch (err) {
    console.error('Error loading markdown for edit:', err)
    statusMessage.value = `❌ ${err.message}`
    statusType.value = 'error'
  }
}

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const insertCsvTemplate = () => {
  const csvSnippet = `\n\`\`\`csv\n項目,狀態,備註\n課題 A,已完成,符合預期\n課題 B,進行中,測試中\n\`\`\`\n`
  newContent.value += csvSnippet
}

// Drag and drop event handlers
const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onFileDrop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer && event.dataTransfer.files
  if (files && files.length > 0) {
    processFilesBatch(files)
  }
}

const handleFileInputChange = (event) => {
  const files = event.target.files
  if (files && files.length > 0) {
    processFilesBatch(files)
  }
}

// Multi-file batch upload processor (uploads to private repo)
const processFilesBatch = async (fileList) => {
  const files = Array.from(fileList)
  if (!files || files.length === 0) return

  if (!githubToken.value.trim()) {
    statusMessage.value = labels.value.errTokenRequired
    statusType.value = 'error'
    return
  }

  isUploading.value = true
  statusType.value = 'loading'
  const token = githubToken.value.trim()

  let successCount = 0

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    statusMessage.value = `${labels.value.attachUploading} (${i + 1}/${files.length}): ${file.name}...`

    try {
      const arrayBuf = await file.arrayBuffer()
      const base64Content = arrayBufferToBase64(arrayBuf)
      const timestamp = Date.now()
      const safeFilename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')}`
      const targetPath = `attachments/${safeFilename}`

      const uploadRes = await fetch(`https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${targetPath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `upload attachment: ${file.name}`,
          content: base64Content
        })
      })

      if (!uploadRes.ok) {
        const errJson = await uploadRes.json()
        throw new Error(errJson.message || `Upload failed (Status ${uploadRes.status})`)
      }

      const ext = file.name.split('.').pop().toLowerCase()
      const isImg = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'].includes(ext)
      // Use gh-private:// scheme so loadMarkdown knows to fetch via API
      const privatePath = `gh-private://attachments/${safeFilename}`

      if (isImg) {
        newContent.value += `\n![${file.name}](${privatePath})\n`
      } else {
        newContent.value += `\n[📎 下載 ${file.name}](${privatePath})\n`
      }

      successCount++
    } catch (err) {
      console.error(`Error uploading ${file.name}:`, err)
      statusMessage.value = `❌ ${file.name}: ${err.message}`
      statusType.value = 'error'
    }
  }

  if (successCount > 0) {
    statusMessage.value = `🎉 ${successCount} ${labels.value.batchUploadSuccess}`
    statusType.value = 'success'
  }

  isUploading.value = false
  if (fileInputRef.value) fileInputRef.value.value = ''
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
  const timestamp = Date.now()
  const dateFormatted = newDate.value || todayDateString()
  
  // If editing existing, reuse filename; if new entry, generate new filename
  const filename = isEditingExisting.value && editingFilename.value
    ? editingFilename.value
    : `log-${dateFormatted.replace(/-/g, '')}-${timestamp.toString().slice(-4)}.md`
    
  const mdPath = `logs/${filename}`
  const indexPath = `logs/index.json`

  try {
    // 1. Fetch current index.json from GitHub
    const indexRes = await fetch(`https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${indexPath}`, {
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
    let indexList = JSON.parse(rawIndexJson)

    if (isEditingExisting.value) {
      // Update existing item in index
      const item = indexList.find(i => i.id === filename)
      if (item) {
        item.title = newTitle.value.trim()
        item.date = dateFormatted
      } else {
        indexList.unshift({ id: filename, title: newTitle.value.trim(), date: dateFormatted })
      }
    } else {
      // Prepend new entry
      indexList.unshift({ id: filename, title: newTitle.value.trim(), date: dateFormatted })
    }

    const updatedIndexStr = JSON.stringify(indexList, null, 2)
    const updatedIndexBase64 = utf8ToBase64(updatedIndexStr)

    // 2. Update index.json via GitHub API
    const updateIndexRes = await fetch(`https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${indexPath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `${isEditingExisting.value ? 'update' : 'add'} journal entry: ${newTitle.value.trim()}`,
        content: updatedIndexBase64,
        sha: currentSha
      })
    })

    if (!updateIndexRes.ok) {
      const errJson = await updateIndexRes.json()
      throw new Error(`Failed to update index.json: ${errJson.message || updateIndexRes.statusText}`)
    }

    // 3. Create or Update markdown file on GitHub
    // Fetch SHA if file exists
    let existingMdSha = undefined
    try {
      const mdCheckRes = await fetch(`https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${mdPath}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      if (mdCheckRes.ok) {
        const mdCheckData = await mdCheckRes.json()
        existingMdSha = mdCheckData.sha
      }
    } catch (e) {
      // New file, no SHA
    }

    const mdBase64 = utf8ToBase64(newContent.value)
    const createMdRes = await fetch(`https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${mdPath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `${isEditingExisting.value ? 'update' : 'create'} journal file: ${filename}`,
        content: mdBase64,
        ...(existingMdSha ? { sha: existingMdSha } : {})
      })
    })

    if (!createMdRes.ok) {
      const errJson = await createMdRes.json()
      throw new Error(`Failed to save markdown file: ${errJson.message || createMdRes.statusText}`)
    }

    // Success! Update local UI immediately
    logs.value = indexList
    selectedLogId.value = filename
    const parsedHtml = marked.parse(newContent.value)
    journalHtml.value = parseAndRenderCsvTables(parsedHtml)

    // Reset form
    newTitle.value = ''
    newContent.value = ''
    isEditingExisting.value = false
    editingFilename.value = ''

    statusMessage.value = labels.value.publishSuccess
    statusType.value = 'success'

    setTimeout(() => {
      showLockPanel.value = false
      statusMessage.value = ''
    }, 1500)

  } catch (err) {
    console.error('Publishing error:', err)
    statusMessage.value = `❌ Error: ${err.message}`
    statusType.value = 'error'
  } finally {
    isPublishing.value = false
  }
}

const handleDelete = async () => {
  if (!selectedLogId.value) return

  const currentEntry = logs.value.find(l => l.id === selectedLogId.value)
  const entryTitle = currentEntry ? currentEntry.title : selectedLogId.value

  if (!confirm(`${labels.value.deleteConfirm}\n\n[ ${entryTitle} ]`)) {
    return
  }

  if (!githubToken.value.trim()) {
    statusMessage.value = labels.value.errTokenRequired
    statusType.value = 'error'
    showLockPanel.value = true
    return
  }

  isDeleting.value = true
  statusMessage.value = labels.value.deleting
  statusType.value = 'loading'
  showLockPanel.value = true

  const token = githubToken.value.trim()
  const targetFilename = selectedLogId.value
  const mdPath = `logs/${targetFilename}`
  const indexPath = `logs/index.json`

  try {
    // 1. Delete markdown file if it exists on GitHub
    const fileRes = await fetch(`https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${mdPath}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (fileRes.ok) {
      const fileData = await fileRes.json()
      const fileSha = fileData.sha

      await fetch(`https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${mdPath}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `delete journal file: ${targetFilename}`,
          sha: fileSha
        })
      })
    }

    // 2. Fetch index.json from GitHub and remove entry
    const indexRes = await fetch(`https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${indexPath}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (!indexRes.ok) {
      throw new Error(`Failed to fetch index.json for deletion.`)
    }

    const indexData = await indexRes.json()
    const currentSha = indexData.sha
    const rawIndexJson = decodeURIComponent(escape(atob(indexData.content.replace(/\s/g, ''))))
    let indexList = JSON.parse(rawIndexJson)

    // Remove deleted entry from index
    indexList = indexList.filter(item => item.id !== targetFilename)

    const updatedIndexStr = JSON.stringify(indexList, null, 2)
    const updatedIndexBase64 = utf8ToBase64(updatedIndexStr)

    const updateIndexRes = await fetch(`https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${indexPath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `remove journal entry from index: ${targetFilename}`,
        content: updatedIndexBase64,
        sha: currentSha
      })
    })

    if (!updateIndexRes.ok) {
      const errJson = await updateIndexRes.json()
      throw new Error(`Failed to update index.json after deletion: ${errJson.message || updateIndexRes.statusText}`)
    }

    // Success! Update local state
    logs.value = indexList
    if (indexList.length > 0) {
      selectedLogId.value = indexList[0].id
      loadMarkdown(indexList[0].id)
    } else {
      selectedLogId.value = ''
      journalHtml.value = '<p>No journal entries found.</p>'
    }

    statusMessage.value = labels.value.deleteSuccess
    statusType.value = 'success'

    setTimeout(() => {
      showLockPanel.value = false
      statusMessage.value = ''
    }, 1200)

  } catch (err) {
    console.error('Delete error:', err)
    statusMessage.value = `❌ Error deleting: ${err.message}`
    statusType.value = 'error'
  } finally {
    isDeleting.value = false
  }
}

// Returns MIME type from filename extension
const getMimeType = (filename) => {
  const ext = (filename.split('.').pop() || '').toLowerCase()
  const mimeMap = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', bmp: 'image/bmp',
    pdf: 'application/pdf', txt: 'text/plain',
    v: 'text/plain', vhdl: 'text/plain', py: 'text/plain',
    csv: 'text/csv', json: 'application/json',
    zip: 'application/zip', mp4: 'video/mp4', mp3: 'audio/mpeg',
  }
  return mimeMap[ext] || 'application/octet-stream'
}

// Revoke all previously created blob: URLs to free memory
const revokeOldBlobUrls = () => {
  blobUrls.value.forEach(url => URL.revokeObjectURL(url))
  blobUrls.value = []
}

// Finds gh-private:// and ../attachments/ URLs in rendered HTML,
// fetches their content from the private repo via API, and replaces
// them with blob: URLs so the browser can display/download them.
const processAttachmentUrls = async (html, token) => {
  const attachmentRegex = /(src|href)="(gh-private:\/\/attachments\/|\.\.\/attachments\/)([^"]+)"/g
  const matches = [...html.matchAll(attachmentRegex)]
  if (matches.length === 0) return html

  let processedHtml = html
  for (const match of matches) {
    const [fullMatch, attrName, , filename] = match
    const apiPath = `attachments/${filename}`
    try {
      const res = await fetch(
        `https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/${apiPath}`,
        { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json' } }
      )
      if (!res.ok) continue
      const data = await res.json()
      const byteChars = atob(data.content.replace(/\s/g, ''))
      const byteArray = new Uint8Array(byteChars.length)
      for (let i = 0; i < byteChars.length; i++) byteArray[i] = byteChars.charCodeAt(i)
      const blob = new Blob([byteArray], { type: getMimeType(filename) })
      const blobUrl = URL.createObjectURL(blob)
      blobUrls.value.push(blobUrl)
      const downloadAttr = attrName === 'href' ? ` download="${filename}"` : ''
      processedHtml = processedHtml.replace(fullMatch, `${attrName}="${blobUrl}"${downloadAttr}`)
    } catch (e) {
      console.error(`Failed to load attachment ${filename}:`, e)
    }
  }
  return processedHtml
}

const fetchLogsIndex = async () => {
  if (!isUnlocked.value) return
  const token = githubToken.value.trim()
  if (!token) return
  try {
    const res = await fetch(
      `https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/logs/index.json`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )
    if (!res.ok) throw new Error(`Could not fetch index.json (${res.status})`)
    const data = await res.json()
    const rawJson = decodeURIComponent(escape(atob(data.content.replace(/\s/g, ''))))
    const parsed = JSON.parse(rawJson)
    logs.value = parsed
    if (parsed.length > 0) {
      selectedLogId.value = parsed[0].id
    } else {
      journalHtml.value = '<p>No journal entries found.</p>'
    }
  } catch (err) {
    console.error('Error fetching logs index:', err)
    journalHtml.value = labels.value.error
  }
}

const loadMarkdown = async (filename) => {
  if (!filename || !isUnlocked.value) return
  const token = githubToken.value.trim()
  if (!token) return
  journalHtml.value = labels.value.loading
  revokeOldBlobUrls()
  try {
    const res = await fetch(
      `https://api.github.com/repos/${PRIVATE_REPO_OWNER}/${PRIVATE_REPO_NAME}/contents/logs/${filename}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )
    if (!res.ok) throw new Error('Network response was not ok')
    const data = await res.json()
    const markdownText = decodeURIComponent(escape(atob(data.content.replace(/\s/g, ''))))
    const parsedHtml = marked.parse(markdownText)
    const processedHtml = await processAttachmentUrls(parseAndRenderCsvTables(parsedHtml), token)
    journalHtml.value = processedHtml
  } catch (err) {
    console.error(`Error loading markdown file ${filename}:`, err)
    journalHtml.value = labels.value.loadFail
  }
}

const onLogChange = () => {
  loadMarkdown(selectedLogId.value)
}

watch(selectedLogId, (newId) => {
  if (newId && isUnlocked.value) {
    loadMarkdown(newId)
  }
})

onUnmounted(() => {
  revokeOldBlobUrls()
})

onMounted(() => {
  if (isUnlocked.value) {
    fetchLogsIndex()
  }
})
</script>




