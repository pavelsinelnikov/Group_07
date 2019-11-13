<template>
  <div>
    <b-container class="bv-example-row">
        <b-row>
          <b-col>    
                <NewsScreen :country="country" @url-emitted="setLink"></NewsScreen>
          </b-col>
          <b-col cols="7">
                <Map @country-selected="setCountry" @url-emitted="setLink"></Map>
                <PageView id="pageView" :providedLink="link"></PageView>
          </b-col>
      </b-row>
  </b-container>
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

#pageView {
  width: 70%;
}
</style>
