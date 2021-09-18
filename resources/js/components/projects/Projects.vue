<template>
  <div class="p-4 m-4 bg-white rounded flex flex-col">
    <div class="flex justify-between">
      <h1 class="text-2xl text-gray-700">Projects</h1>
      <button class="bg-red-500 rounded text-white px-3 py-2 mr-6 hover:bg-red-700" @click="showForm = true">Add Project</button>
    </div>

    <div v-show="showForm" class="flex justify-center">
      <ProjectForm @cancel-form="showForm = false" @project-added="fetchProjects" />
    </div>

    <div class="justify-center flex">
      <table class="table-auto justify-center">
        <thead>
          <tr>
            <th class="border px-4 py-2">ID</th>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Tasks</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          <ProjectItem v-for="project in projects" :key="project.id" :project="project" @project-deleted="fetchProjects" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProjectItem from './ProjectItem.vue'
import ProjectForm from './ProjectForm.vue'

export default {
  data() {
    return {
      projects: [],
      showForm: false
    }
  },
  components: {
    ProjectItem,
    ProjectForm
  },
  mounted() {
    this.fetchProjects()
  },
  methods: {
    fetchProjects() {
      this.showForm = false
      axios.get('api/projects').then(res => {
        console.log(res)
        this.projects = res.data.data
      })
    }
  }
}
</script>