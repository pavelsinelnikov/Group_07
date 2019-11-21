<template>
  <div>
    <form @submit.prevent>
      <!--TODO: Add search terms -->
      <b-container class="mycontainer">
        <b-row>
          <div class="input-group mb-3">
            <input
              v-model="localmsg"
              type="text"
              class="form-control"
              placeholder="Enter Filter Criteria"
              @keydown="fetchDataFromNewsAPI()"
            />
          </div>
        </b-row>
        <b-row>
          <b-form-select v-model="category" @change="fetchDataFromNewsAPI()">
            <option disabled value="">Please select a category</option>
            <option>all</option>
            <option>business</option>
            <option>entertainment</option>
            <option>general</option>
            <option>health</option>
            <option>science</option>
            <option>sports</option>
            <option>technology</option>
          </b-form-select>
        </b-row>

        <b-row id="selected-country">
          <p>Selected country: {{ country }}</p>
        </b-row>
      </b-container>
    </form>

    <div v-if="loadingStatus">
      <p>Loading...</p>
    </div>
    <div v-else-if="newsIndex > 0">
      <div id="articlelist">
        <li v-for="response in newsResponse" :key="response.id">              
     <b-card no-body class="overflow-hidden" style="max-width: 1000px;">
     <a href="#" @click="emitURL(response.result.url)" class="stretched-link"></a>
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img v-bind:src="response.result.urlToImage" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body id="title" v-bind:title="response.result.title">
          <b-card-text id="desc">
            {{response.result.description}}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
        </li>
        </div>
    </div>
    <div v-else-if="hasSelected">
      <p>
        Sorry, no news for {{ searchedLocation }}, please select another
        location or change the filters
      </p>
    </div>
    <div v-else>
      <p>
        Click a country on the map
      </p>
    </div>
  </div>
</template>

<script>
const { getCode } = require('country-list');

export default {
  props: ['country'],
  data() {
    return {
      localmsg: '',
      newsIndex: 0,
      hasSelected: false,
      newsResponse: [],
      searchedLocation: '',
      loadingStatus: false,
      category: 'all'
    };
  },
  computed: {
    compCountry() {
      return getCode(this.country);
    }
  },
  watch: {
    country() {
      this.fetchDataFromNewsAPI();
    }
  },
  methods: {
    fetchDataFromNewsAPI() {
      this.loadingStatus = true;
      this.hasSelected = true;
      this.newsIndex = 0;
      // Empty an array
      this.newsResponse = [];
      // Will only retrieve preset data
      var url =
        'https://newsapi.org/v2/top-headlines?' +
        'q=' +
        this.localmsg +
        '&' +
        'country=' +
        this.compCountry +
        '&' +
        'category=' +
        (this.category == 'all' ? '' : this.category) +
        '&' +
        'sortBy=popularity&' +
        // API Key will be given in a separate file not included in git
        // I would suggest making your own one for now
        'apiKey=' +
        `${process.env.VUE_APP_NEWS_API}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.loadingStatus = false;
          let value = data.articles;
          value.map(result => {
            // TODO: Change id field to something better rather than a count
            this.newsResponse.push({ id: this.newsIndex++, result: result });
          });
        });
      this.searchedLocation = this.country;
    },
    fetchCategoryFromNewsAPI() {
      this.loadingStatus = true;
      this.hasSelected = true;
      this.newsIndex = 0;
      // Empty an array
      this.newsResponse = [];
      // Will only retrieve preset data
      var url =
        'https://newsapi.org/v2/top-headlines?' +
        'q=' +
        this.localmsg +
        '&' +
        'category=' +
        this.compCategory +
        '&' +
        'country=' +
        this.compCountry +
        '&' +
        'sortBy=popularity&' +
        // API Key will be given in a separate file not included in git
        // I would suggest making your own one for now
        'apiKey=' +
        `${process.env.VUE_APP_NEWS_API}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.loadingStatus = false;
          let value = data.articles;
          value.map(result => {
            // TODO: Change id field to something better rather than a count
            this.newsResponse.push({ id: this.newsIndex++, result: result });
          });
        });
      this.searchedLocation = this.country;
    },

    deleteMessage(respId) {
      let index = this.newsResponse.findIndex(x => x.id == respId);
      this.newsResponse.splice(index, 1);
    },
    emitURL(url) {
      this.$emit('url-emitted', url);
    }
  }
};
</script>

<style>

#articlelist {
  list-style-type: none;
  max-height: 40vw;
  overflow: scroll;
}
#title {
  font-weight: 700;
  font-size: 1.65em;
  font-family: 'Roboto', sans-serif;
  color: #000;
  text-decoration: none !important;
  text-align: left;
}
#desc {
  font-weight: 100;
  font-size: 0.65em;
}
p {
  margin: 0 auto;
}
</style>
