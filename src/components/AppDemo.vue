<template>
  <section class="mt-16 w-full max-w-xl">
    <div class="flex flex-col w-full gap-2">
      <form @submit.prevent="handleSubmit" class="relative flex justify-center items-center">
        <img src="../assets/link.svg" alt="link_icon" class="absolute left-0 my-2 ml-3 w-5" />
        <input
          type="url"
          placeholder="Enter a URL"
          v-model="article.url"
          required
          class="url_input peer"
        />
        <button
          type="submit"
          class="submit_btn peer-focus:text-gray-700 peer-focus:border-gray-700"
        >
          <p>↵</p>
        </button>
      </form>
      <!-- Browser URL History -->
      <div class="flex flex-col gap-1 max-h-60 overflow-y-auto">
        <div
          v-for="(item, idx) in history"
          :key="`link-${idx}`"
          @click.prevent="article = item"
          class="link_card"
        >
          <div class="copy_btn" @click="handleCopy(item.url)">
            <img
              :src="copyBtnPath(item.url)"
              alt="copy_icon"
              class="w-[40%] h-[40%] object-contain"
            />
          </div>
          <p class="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
            {{ item.url }}
          </p>
        </div>
      </div>
    </div>
    <!-- Display Results -->
    <div class="my-10 max-w-full flex justify-center items-center">
      <img
        v-if="isFetching"
        src="../assets/loader.svg"
        alt="loader"
        class="w-20 h-20 object-contain"
      />
      <p v-else-if="error" class="font-inter font-bold text-black text-center">
        Something Went Wrong
        <br />
        <span class="font-satoshi font-normal text-gray-700">
          {{ error }}
        </span>
      </p>
      <div v-else-if="article.summary" class="flex flex-col gap-3">
        <h2 class="font-satoshi font-bold text-gray-600 text-xl">
          Article <span class="blue_gradient">Summary</span>
        </h2>
        <div class="summary_box">
          <p class="font-inter font-medium text-sm text-gray-700">{{ article.summary }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useArticleStore } from '../stores/article'
import { mapStores } from 'pinia'

export default {
  name: 'AppDemo',
  data() {
    return {
      article: {
        url: '',
        summary: ''
      },
      history: [],
      isFetching: false,
      error: '',
      copyUrl: ''
    }
  },
  computed: {
    ...mapStores(useArticleStore)
  },
  mounted() {
    const articles = JSON.parse(localStorage.getItem('articles'))

    if (articles) this.history = articles
  },
  methods: {
    async handleSubmit() {
      try {
        this.isFetching = true
        await this.articleStore.fetchSummary(this.article.url)

        this.history = [this.article, ...this.history]
        this.article = {
          ...this.article,
          summary: this.articleStore.getSummary
        }
        this.isFetching = false
        localStorage.setItem('articles', JSON.stringify(this.history))
      } catch (e) {
        this.isFetching = false
        this.error = e.message
      }
    },
    handleCopy(url) {
      this.copyUrl = url
      navigator.clipboard.writeText(url)
      alert('Successfully Copied to Clipboard')
    },
    copyBtnPath(url) {
      return new URL(`../assets/${this.copyUrl === url ? 'tick' : 'copy'}.svg`, import.meta.url)
        .href
    }
  }
}
</script>
