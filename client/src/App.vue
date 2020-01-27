<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  name: 'app',
  components: {
    Navbar
  }
};
</script>

<style>
/* NEVER USE IMPORANT (except in this case) */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0 !important; 
}
</style>
