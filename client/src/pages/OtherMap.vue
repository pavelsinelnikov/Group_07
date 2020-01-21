<template>
  <div>
    <OtherMap @country-selected="setCountry"/>
    <p>Selected Country: {{country.name}}</p>
    <button>Submit</button>
  </div>
</template>

<script>
// NOTE: DOES NOT WORK WITH OTHER PAGES
import OtherMap from './../components/OtherMap.vue';

export default {
  name: 'about',
  data() {
    return {
      country: {}
    };
  },
  components: {
    OtherMap
  },
  methods: {
    setCountry(country) {
      this.country = country;
    }
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
