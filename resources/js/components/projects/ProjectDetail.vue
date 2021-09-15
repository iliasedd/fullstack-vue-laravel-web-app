<template>
  <div class="p-4 m-4 bg-white rounded flex flex-col">
    <div class="flex justify-between">
      <h1 class="text-2xl text-gray-700">Project Detail #{{ id }}</h1>
      <button class="bg-red-500 rounded text-white px-3 py-2 mr-6 hover:bg-red-700">Delete Project</button>
    </div>

    <div v-if="project.id > 0">
      <div class="flex">
        <div class="w-1/6 p-2">
          <div class="bg-gray-400 text-gray-700 p-2 text-left">Project Name</div>
        </div>

        <div class="w-1/2 p-2">
          <div class="bg-gray-400 text-gray-700 p-2 text-left">{{ project.name }}</div>
        </div>
      </div>

      <div class="flex">
        <div class="w-1/6 p-2">
          <div class="bg-gray-400 text-gray-700 p-2 text-left">Created Date</div>
        </div>

        <div class="w-1/2 p-2">
          <div class="bg-gray-400 text-gray-700 p-2 text-left">{{ project.created_at }}</div>
        </div>
      </div>

      <div class="flex">
        <div class="w-1/6 p-2">
          <div class="bg-gray-400 text-gray-700 p-2 text-left">Updated Date</div>
        </div>

        <div class="w-1/2 p-2">
          <div class="bg-gray-400 text-gray-700 p-2 text-left">{{ project.updated_at }}</div>
        </div>
      </div>

      <div v-if="project.tasks.length > 0" class="my-4">
        <h2 class="text-2xl text-green-600 mb-4">Tasks</h2>
        <TaskItem v-for="task in project.tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'
import axios from 'axios'

export default {
  props: ["id"],
  components: {
    TaskItem
  },
  data() {
    return {
      project: []
    }
  },
  mounted() {
    axios.get('api/projects'+this.id).then(res => {
      this.project = res.data.data
    })
  }
}
</script>