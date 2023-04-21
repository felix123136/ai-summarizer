<template>
  <main>
    <div class="main">
      <div class="gradient" />
    </div>

    <div class="app">
      <AppHero />
      <AppDemo />
    </div>
  </main>
</template>

<script>
import AppDemo from './components/AppDemo.vue'
import AppHero from './components/AppHero.vue'

export default {
  name: 'App',
  components: { AppDemo, AppHero }
}
</script>
