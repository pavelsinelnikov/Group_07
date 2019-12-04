<template>
  <div id="about">
    <OtherMap></OtherMap>
  </div>
</template>

<script>
// NOTE: DOES NOT WORK WITH OTHER PAGES
import OtherMap from './../components/OtherMap.vue';

export default {
  name: 'about',
  components: {
    OtherMap
  }
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
