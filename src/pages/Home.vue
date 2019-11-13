<template>
  <div>
    <b-row>
      <b-col cols="6">
        <NewsScreen
          :country="country"
          @url-emitted="setLink"
          id="apply-width"
        ></NewsScreen>
      </b-col>
      <b-col cols="6">
        <Map @country-selected="setCountry" @url-emitted="setLink"></Map>
        <PageView id="pageView" :providedLink="link"></PageView>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import NewsScreen from '../components/NewsScreen';
import Map from '../components/Map';
import PageView from '../components/PageView';

export default {
  name: 'home',
  data() {
    return {
      country: '',
      link: ''
    };
  },
  components: {
    NewsScreen,
    Map,
    PageView
  },
  methods: {
    setCountry(country) {
      this.country = country;
    },
    setLink(link) {
      this.link = link;
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
}

#page-view {
  width: 100%;
}

#apply-width {
  width: 90%;
}
</style>
