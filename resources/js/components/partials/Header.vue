<template>
  <header class="min-h-10 bg-blue-800 flex justify-between items-center">
    <h1 class="text-4xl ml-6 mb-3 mt-2 text-white">Projectify</h1>
    <ul class="flex">
      <li class="mr-6">
        <router-link to="/dashboard" class="text-blue-600 hover:text-white">Dashboard</router-link>
      </li>
      <li class="mr-6">
        <router-link to="/projects" class="text-blue-600 hover:text-white">Projects</router-link>
      </li>
      <li class="mr-6">
        <router-link to="/login" class="text-blue-600 hover:text-white">Login</router-link>
      </li>
      <li class="mr-6">
        <a href="" class="text-blue-600 hover:text-white">Logout</a>
      </li>
    </ul>
  </header>
</template>