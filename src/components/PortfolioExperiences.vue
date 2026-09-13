<template>
  <section class="main-section" id="experiences">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="experiences-grid">
      <template v-for="(item, index) in groupedList" :key="index">
        <!-- Grouped pair: 2 cards side by side -->
        <div v-if="item.type === 'group'" class="experience-pair">
          <div v-for="(exp, gi) in item.cards" :key="gi" class="experience-card">
            <h3>{{ exp.title }}</h3>
            <p v-if="exp.date" class="meta-info section-meta">{{ exp.date }}</p>
            <template v-if="exp.subsections">
              <div v-for="(sub, sIdx) in exp.subsections" :key="sIdx" class="experience-subsection">
                <div class="subsection-header">
                  <h4 class="subsection-title">{{ sub.subtitle }}</h4>
                  <span v-if="sub.date" class="meta-info subsection-date">{{ sub.date }}</span>
                </div>
                <ul>
                  <li v-for="(bullet, bIndex) in sub.bullets" :key="bIndex" v-html="bullet"></li>
                </ul>
              </div>
            </template>
            <ul v-else-if="exp.bullets">
              <li v-for="(bullet, bIndex) in exp.bullets" :key="bIndex" v-html="bullet"></li>
            </ul>
          </div>
        </div>
        <!-- Full-width card (e.g. Tech Community & Talks) -->
        <div v-else-if="item.type === 'full'" class="experience-card full-width">
          <h3>{{ item.card.title }}</h3>
          <p v-if="item.card.date" class="meta-info section-meta">{{ item.card.date }}</p>
          <template v-if="item.card.subsections">
            <div v-for="(sub, sIdx) in item.card.subsections" :key="sIdx" class="experience-subsection">
              <div class="subsection-header">
                <h4 class="subsection-title">{{ sub.subtitle }}</h4>
                <span v-if="sub.date" class="meta-info subsection-date">{{ sub.date }}</span>
              </div>
              <ul>
                <li v-for="(bullet, bIndex) in sub.bullets" :key="bIndex" v-html="bullet"></li>
              </ul>
            </div>
          </template>
          <ul v-else-if="item.card.bullets">
            <li v-for="(bullet, bIndex) in item.card.bullets" :key="bIndex" v-html="bullet"></li>
          </ul>
        </div>
        <!-- Normal card -->
        <div v-else class="experience-card">
          <h3>{{ item.card.title }}</h3>
          <p v-if="item.card.date" class="meta-info section-meta">{{ item.card.date }}</p>
          <template v-if="item.card.subsections">
            <div v-for="(sub, sIdx) in item.card.subsections" :key="sIdx" class="experience-subsection">
              <div class="subsection-header">
                <h4 class="subsection-title">{{ sub.subtitle }}</h4>
                <span v-if="sub.date" class="meta-info subsection-date">{{ sub.date }}</span>
              </div>
              <ul>
                <li v-for="(bullet, bIndex) in sub.bullets" :key="bIndex" v-html="bullet"></li>
              </ul>
            </div>
          </template>
          <ul v-else-if="item.card.bullets">
            <li v-for="(bullet, bIndex) in item.card.bullets" :key="bIndex" v-html="bullet"></li>
          </ul>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const groupedList = computed(() => {
  const result = []
  const seenGroups = new Set()

  for (const exp of props.data.list) {
    if (exp.fullWidth) {
      result.push({ type: 'full', card: exp })
    } else if (exp.group) {
      if (!seenGroups.has(exp.group)) {
        seenGroups.add(exp.group)
        const groupCards = props.data.list.filter(e => e.group === exp.group)
        result.push({ type: 'group', cards: groupCards })
      }
      // skip duplicates already handled above
    } else {
      result.push({ type: 'normal', card: exp })
    }
  }

  return result
})
</script>
