<template>
  <div>
    dashboard
    {{ user }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: null
    }
  },
  mounted() {
    axios.get('/api/user').then(res => {
      this.user = res.data
      console.log(res)
    })
  }
}
</script>