<template>
  <div>
    <form @submit.prevent>
      <!--TODO: Add search terms -->
    <div class="container">
    <div class="row">
    <div class="col-sm">
      <b-dropdown id="dropdown-text" text="Category" class="m-2" type="dark" variant="danger">
        <b-dropdown-text style="width: 240px;">
          Choose a category:
        </b-dropdown-text>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item-button @click="fetchCategoryFromNewsAPI()">Sports</b-dropdown-item-button>
        <b-dropdown-item-button @click="fetchCategoryFromNewsAPI()">Science</b-dropdown-item-button>
        <b-dropdown-item-button @click="fetchCategoryFromNewsAPI()">Technology</b-dropdown-item-button>
                <b-dropdown-item-button @click="fetchCategoryFromNewsAPI()">Health</b-dropdown-item-button>
        <b-dropdown-item-button @click="fetchCategoryFromNewsAPI()">Entertainment</b-dropdown-item-button>
      </b-dropdown>
    </div>
    
    <div class="col-sm">
      <p>Selected country: {{ country }}</p>
    </div>
        <div class="col-sm">

      <div class="input-group mb-3">
        <input v-model="localmsg"  type="text" class="form-control" placeholder="Enter Filter Criteria">
        <div class="input-group-append">
          <button @click="fetchDataFromNewsAPI()" class="btn btn-outline-secondary" type="button">Search</button>
        </div>
      </div>      
      <!-- <select v-model="selectedCountry">
        <option disabled value>Select a country...</option>
        <option
          v-for="country in countries"
          :key="country.id"
          :value="country.code"
          >{{ country.name }}</option
        >
      </select> -->
        </div>
    </div>
    </div>
    </form>

    <div v-if="loadingStatus">
      <p>Loading...</p>
    </div>
    <div v-else-if="newsIndex > 0">
      <ul>
        <div class="row">
          <li v-for="response in newsResponse" :key="response.id">
            <div class="col-sm-10">
              <b-card
                title=" "
                img-top
                tag="article"
                style="max-width: 20rem;
                        min-width: 20rem;"
                class="mb-4"
              >
                <b-card-text>
                  {{ response.result.title }}
                </b-card-text>
                <b-button
                  @click="emitURL(response.result.url)"
                  variant="primary"
                  >See more</b-button
                >
              </b-card>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <div v-else-if="hasSelected">
      <p>
        Sorry, no news for {{ searchedLocation }}, please select another
        location
      </p>
    </div>
    <div v-else>
      <p>
        Press Search!
      </p>
    </div>
  </div>
</template>

<script>
const { getCode } = require('country-list');

//?? const { getCatCode } = require('category-list');

export default {
  props: ['country'],
  data() {
    return {
      localmsg: '',
      newsIndex: 0,
      hasSelected: false,
      newsResponse: [],
      searchedLocation: '',
      loadingStatus: false
    };
  },
  computed: {
    compCountry() {
      return getCode(this.country);
    },
    // compCategory() {
    //   return getCatCode(this.category);
    // }
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
ul {
  list-style-type: none;
}
</style>