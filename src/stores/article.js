import { defineStore } from 'pinia'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
  }
}

const BASE_URL = import.meta.env.VITE_RAPID_API_BASE_URL

export const useArticleStore = defineStore('article', {
  state: () => ({
    summary: ''
  }),
  getters: {
    getSummary: (state) => state.summary
  },
  actions: {
    async fetchSummary(url) {
      const response = await fetch(
        `${BASE_URL}/summarize?url=${encodeURIComponent(url)}&length=3`,
        options
      )
      const data = await response.json()
      console.log(data)
      this.summary = data.summary
    }
  }
})
