<template>
    <div id="app">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">DTP Software></router-link>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/tutoriais" class="nav-link">Lista de Tutoriais</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/add" class="nav-link">Novo</router-link>
          </li>
        </div>
      </nav>
      <div class="container mt-3">
            <router-view/>
      </div>
    </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  /*components: {
    HelloWorld
  } */
}
</script>

<style>

</style>
