<template>
  <div class="flex h-full justify-center items-center">
    <div>
      <div>
        <h1 class="mb-6 text-center font-bold text-gray-600">Login Form</h1>
      </div>
      <form @submit.prevent="handleLogin()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="text" placeholder="email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="password" placeholder="******">
          <p v-if="errorMsg" class="text-red-500 text-xs italic">{{ errorMsg }}</p>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMsg: ''
    }
  },
  computed: {
    ...mapGetters(["authenticated"])
  },
  methods: {
    async handleLogin() {
      // alert(this.email+" "+this.password)
      this.errorMsg = ''
      // action
      try {
        await this.$store.dispatch('signIn', { email: this.email, password: this.password })
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        this.errorMsg = error
      }
    }
  },
  mounted() {
    if (this.authenticated) {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>