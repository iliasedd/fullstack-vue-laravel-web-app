<template>
  <header class="min-h-10 bg-blue-800 flex justify-between items-center">
    <h1 class="text-4xl ml-6 mb-3 mt-2 text-white">Projectify</h1>
    <ul class="flex">
      <li class="mr-6" v-if="isAuth">
        <router-link to="/dashboard" class="text-blue-600 hover:text-white">Dashboard</router-link>
      </li>
      <li class="mr-6" v-if="isAuth">
        <router-link to="/projects" class="text-blue-600 hover:text-white">Projects</router-link>
      </li>
      <li class="mr-6" v-if="!isAuth">
        <router-link to="/login" class="text-blue-600 hover:text-white">Login</router-link>
      </li>
      <li class="mr-6" v-if="isAuth">
        <a href="" class="text-blue-600 hover:text-white" @click="handleLogout()">Logout</a>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    // isAuth() {
    //   return this.$store.state.authenticated
    // }
    ...mapGetters({
      isAuth: "authenticated"
    })
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>