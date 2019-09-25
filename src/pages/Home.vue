<template>
  <div>
    <h2>Home</h2>
    <Map @country-selected="setCountry"></Map>
    <NewsScreen :country="country"></NewsScreen>
  </div>
</template>

<script>
import NewsScreen from '../components/NewsScreen.vue';
import Map from '../components/Map.vue';

export default {
  name: 'home',
  data() {
    return {
      country: ''
    };
  },
  components: {
    NewsScreen,
    Map,
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
