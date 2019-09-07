<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <NewsScreen></NewsScreen>
  </div>
</template>

<script>
import NewsScreen from './components/NewsScreen.vue';

export default {
  name: 'app',
  components: {
    NewsScreen,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
