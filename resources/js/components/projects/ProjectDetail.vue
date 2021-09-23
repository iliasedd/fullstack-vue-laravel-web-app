<template>
  <div class="p-4 m-4 bg-white rounded flex flex-col">
    <div class="flex justify-between">
      <h1 class="text-2xl text-gray-700">Project Detail #{{ id }}</h1>
      <div>
        <button @click="showForm = true" class="bg-orange-500 rounded text-white px-3 py-2 mr-6 hover:bg-orange-700">Edit</button>
        <button @click="deleteProject()" class="bg-red-500 rounded text-white px-3 py-2 mr-6 hover:bg-red-700">Delete Project</button>
      </div>
    </div>

    <div class="flex justify" v-show="showForm">
      <ProjectEditForm v-if="project.id > 0" @cancel-form="showForm = false" :project="project" @project-edited="fetchProject" />
    </div>

    <div v-if="project.id > 0" class="mt-6">
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
        <div class="flex justify-between mb-6">
          <h2 class="text-2xl text-gray-600 mb-4">Tasks</h2>
          <button class="bg-blue-500 rounded text-white px-3 py-2 mr-6 hover:bg-blue-700" @click="addTask">Add Task</button>
        </div>

        <div class="flex justify-center" v-show="showTaskForm">
          <div class='flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto'>
            <div class='w-2 bg-gray-800'></div>
            <div class='flex items-center px-2 py-3'>
              <form @submit.prevent="handleTaskSubmit" class="w-full max-w-sm">
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">Name</label>
                  </div>
                  <div class="md:w-2/3">
                    <input v-model="task.name" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text">
                  </div>
                </div>

                <div class="flex items-center">
                  <div class="w-1/3"></div>
                  <div class="w-2/3">
                    <p v-if="taskErrMsg" class="mb-4 text-xs text-red-500 italic">{{ taskErrMsg }}</p>
                  </div>
                </div>

                <div class="md:flex md:items-center">
                  <div class="md:w-1/3"></div>
                  <div class="md:w-2/3">
                    <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Add</button>
                    <button @click="cancelForm" class="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <TaskItem v-for="task in project.tasks" :key="task.id" :task="task" @delete-task="deleteTask" @edit-task="editTask" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'
import ProjectEditForm from './ProjectEditForm.vue'
import axios from 'axios'

export default {
  props: ["id"],
  components: {
    TaskItem,
    ProjectEditForm
  },
  data() {
    return {
      project: [],
      showForm: false,
      showTaskForm: false,
      task: {
        name: "",
        project_id: this.project.id
      },
      taskErrMsg: "",
      taskId: 0
    }
  },
  methods: {
    deleteProject() {
      axios.delete("api/projects/"+this.id).then(res => {
        this.$router.push({ name: 'projects' })
      })
    },
    fetchProject() {
      this.showForm = false
      axios.get("api/projects/"+this.id).then(res => {
        this.project = res.data.data
      })
    },
    addTask() {
      this.showTaskForm = true
      this.task.name = ""
      this.taskErrMsg = ""
    },
    editTask(id) {
      const task = this.project.tasks.filter(i => i.id == id)[0]
      this.showTaskForm = true
      this.task.name = task.name
      this.taskErrMsg = ""
      this.taskId = id
    },
    deleteTask(id) {
      axios.delete("api/tasks/"+this.id).then(res => {
        // this.project.tasks
        const index = this.project.tasks.map(i => i.id).indexOf(id)
        this.project.tasks.splice(index, 1)
      })
    },
    async handleTaskSubmit() {
      if (this.taskId > 0) {
        // edit task
        try {
          const response = await axios.put('api/tasks/'+this.taskId, this.task)
          if (response.data.status == 'OK') {
            const index = this.project.tasks.map(i => i.id).indexOf(this.taskId)
            this.project.tasks.splice(index, 1, response.data.data)
            this.showTaskForm = false
            this.taskErrMsg = ""
          }
        } catch (e) {
          if (e.response.data.error.name[0].length > 0) {
            this.taskErrMsg = e.response.data.error.name[0]
          }
        }
      } else {
        // create task
        try {
          const response = await axios.post('api/tasks', this.task)
          if (response.data.status == 'OK') {
            this.project.tasks.push(response.data.data)
            this.showTaskForm = false
            this.taskErrMsg = ""
          }
        } catch (e) {
          if (e.response.data.error.name[0].length > 0) {
            this.taskErrMsg = e.response.data.error.name[0]
          }
        }
      }
    },
    cancelForm() {
      this.showTaskForm = false
      this.taskErrMsg = ""
    }
  },
  mounted() {
    this.fetchProject()
  }
}
</script>