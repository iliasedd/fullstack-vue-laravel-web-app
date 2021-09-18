<template>
  <div>
    <div class='flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto'>
      <div class='w-2 bg-gray-800'></div>

      <div class='flex items-center px-2 py-3'>
        <form @submit.prevent="handleSubmit" class="w-full max-w-sm">
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Name
              </label>
            </div>
            <div class="md:w-2/3">
              <input v-model="projectName" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text">
            </div>
          </div>

          <div class="flex items-center">
            <div class="w-1/3"></div>
            <div class="w-2/3">
              <p v-if="errorMsg" class="mb-4 text-xs text-red-500 italic">{{ errorMsg }}</p>
            </div>
          </div>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                Add
              </button>
              <button @click="cancelForm" class="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectName: this.project.name,
      errorMsg: ''
    }
  },
  props: ['project'],
  methods: {
    cancelForm() {
      this.name = ""
      this.errorMsg = ""
      this.$emit('cancel-form')
    },
    async handleSubmit() {
      try {
        const response = await axios.put('api/projects'+this.project.id, { name: this.projectName })
        if (response.data.status == 'OK') {
          this.name = ""
          this.errorMsg = ""
          this.$emit('project-edited')
        }
      } catch (e) {
        if (e.response.data.error.name[0].length > 0) {
          this.errorMsg = e.response.data.error.name[0]
        }
      }
    }
  }
}
</script>