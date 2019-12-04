<template>
  <div>
    <b-alert v-if="infomsg" show>{{ infomsg }}</b-alert>
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
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  v-bind:src="response.result.urlToImage"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-checkbox
                  v-if="sessionExists"
                  v-bind:title="response.result.title"
                  :checked="compareToFavorites(response)"
                  @change="addToFavorites(response.result)"
                  >Favorite</b-checkbox
                >
                <a
                  href="#"
                  @click="
                    emitURL(response.result.url);
                    addToHistory(response.result);
                  "
                >
                  <b-card-body id="title" v-bind:title="response.result.title">
                    <b-card-text id="desc">
                      {{ response.result.description }}
                    </b-card-text>
                  </b-card-body>
                </a>
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
import axios from 'axios';
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
      category: 'all',
      infomsg: '',
      favoriteCheck: []
    };
  },
  computed: {
    compCountry() {
      return getCode(this.country);
    },
    sessionExists() {
      return this.$session.exists();
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
          this.checkFavorites();
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
    emitURL(url) {
      this.$emit('url-emitted', url);
    },
    checkFavorites() {
      if (this.$session.exists()) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/user/checkFavorites',
          data: {
            email: this.$session.get('email'),
            article: this.newsResponse
          }
        })
          .then(res => {
            this.favoriteCheck = res.data;
          })
          .catch(err => {
            this.infomsg = err;
          });
      }
    },
    compareToFavorites(response) {
      if (this.$session.exists()) {
        for (let entry of this.favoriteCheck) {
          if (entry && entry.articleTitle == response.result.title) {
            return true;
          }
        }
        return false;
      }
    },
    addToFavorites(result) {
      if (this.$session.exists()) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/user/addToFavorites',
          data: {
            email: this.$session.get('email'),
            title: result.title,
            url: result.url
          }
        })
          .then(res => {
            if (res.data) {
              this.infomsg = 'Favorite successfully added!';
            } else {
              this.infomsg = 'Favorite removed!';
            }
          })
          .catch(err => {
            this.infomsg = err;
          });
      }
    },
    addToHistory(result) {
      if (this.$session.exists()) {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/user/addToHistory',
          data: {
            result: result,
            email: this.$session.get('email')
          }
        })
          .then(res => {
            if (res.data) {
              this.infomsg = 'History successfully added!';
            } else {
              this.infomsg = 'History could not be added!';
            }
          })
          .catch(err => {
            this.infomsg = err;
          });
      }
    }
  }
};
</script>

<style>
#articlelist {
  list-style-type: none;
  max-height: 124vh;
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
