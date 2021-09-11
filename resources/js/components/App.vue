<template>
  <div class="flex flex-col h-screen justify-content-between">
    <Header />
    <main class="flex-grow bg-blue-100">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './partials/Header.vue'
import Footer from './partials/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>