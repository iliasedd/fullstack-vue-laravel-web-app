<template>
  <div class="p-4 m-4 bg-white rounded flex">
    <h1 class="text-2xl text-gray-700">Dashboard</h1>

    <p class="mt-4">
      Hello <span class="font-bold">{{ user.name }}</span>, Welcome to the dashboard. You have registered with the email <span class="italic">{{ user.email }}</span>
    </p>

    <p class="mt-2">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias distinctio nihil illum porro, voluptatem asperiores. Facere sunt explicabo quas perspiciatis doloremque dolorum placeat unde? Vero, eveniet. Laboriosam quas sunt voluptatem impedit! Dignissimos eum at laboriosam, cupiditate repellendus quis cum quod debitis molestias fuga ab alias nam, quibusdam excepturi! Dicta, soluta.
    </p>
    <p class="mt-2">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias distinctio nihil illum porro, voluptatem asperiores. Facere sunt explicabo quas perspiciatis doloremque dolorum placeat unde? Vero, eveniet. Laboriosam quas sunt voluptatem impedit! Dignissimos eum at laboriosam, cupiditate repellendus quis cum quod debitis molestias fuga ab alias nam, quibusdam excepturi! Dicta, soluta.
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(["user"])
  }
}
</script>