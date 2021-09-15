<template>
  <div class="mb-2 p-2 bg-gray-300 grid grid-cols-3" :class="{ 'bg-gray-600': task.priority == 'High' }">
    <div class="flex items-center">{{ task.name }}</div>
    <div class="flex items-center justify-center">{{ task.due_date }}</div>
    <div class="flex items-center justify-center">
      <button class="bg-orange-500 rounded text-white px-3 py-2 mr-2 hover:bg-orange-700">Edit</button>
      <button class="bg-red-500 rounded text-white px-3 py-2 mr-2 hover:bg-red-700">delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task']
}
</script>