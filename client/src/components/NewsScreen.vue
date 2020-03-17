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
            <option disabled value>Please select a category</option>
            <option>all</option>
            <option value="news/Business">Business</option>
            <option value="news/Arts_and_Entertainment">Arts and Entertainment</option>
            <option value="news/Health">Health</option>
            <option value="news/Politics">Politics</option>
            <option value="news/Science">Science</option>
            <option value="news/Sports">Sports</option>
            <option value="news/Technology">Technology</option>
          </b-form-select>
        </b-row>

        <b-row id="selected-country">
          <b-col>
            <p>Selected country: {{ this.countryList.toString() }}</p>
          </b-col>
          <!-- <b-col sm="2">
            <b-button @click="clearDataFromNewsAPI()">Clear</b-button>
          </b-col>-->
        </b-row>
      </b-container>
    </form>

    <div v-if="loadingStatus">
      <p>Loading...</p>
    </div>
    <div v-else-if="newsResponse.length > 0">
      <div id="articlelist">
        <li v-for="response in newsResponse" :key="response.id">
          <b-card no-body class="overflow-hidden" style="max-width: 1000px;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img v-bind:src="response.image" class="rounded-0"></b-card-img>
              </b-col>
              <b-col md="6">
                <b-checkbox
                  v-if="sessionExists"
                  v-bind:title="response.title"
                  :checked="compareToFavorites(response.id)"
                  @change="addToFavorites(response.id)"
                >Favorite</b-checkbox>
                <a
                  href="#"
                  @click="
                    emitArticleId(response.id);
                    addToHistory(response.id);
                  "
                >
                  <b-card-body id="title" v-bind:title="response.title">
                    <b-card-text id="desc">{{ response.body }}</b-card-text>
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
        Sorry, no news for {{ country.name }}, please select another
        location or change the filters
      </p>
    </div>
    <div v-else>
      <p>Click a country on the map</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["country"],
  data() {
    return {
      localmsg: "",
      hasSelected: false,
      newsResponse: [],
      searchedLocation: "",
      loadingStatus: false,
      category: "all",
      infomsg: "",
      fcountry: "",
      favoriteCheck: [],
      countryList: [],
      counter: 0
    };
  },
  computed: {
    // compCountry() {
    //   return getCode(this.country);
    // },
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
    clearDataFromNewsAPI() {
      this.newsResponse = [];
      this.countryList = [];
      this.hasSelected = false;
      this.infomsg = "";
      this.counter = 0;
    },
    fetchDataFromNewsAPI() {
      if (!(this.countryList.indexOf(this.country.name) > -1)) {
        this.fcountry = this.country.name.replace(/ /g, "_");
        this.loadingStatus = true;
        this.hasSelected = true;
        this.newsIndex++;
        this.infomsg = "";
        this.counter++;
        this.countryList.push(this.country.name);
        // Empty an array
        // this.newsResponse = [];
        // Will only retrieve preset data
        var url =
          "https://eventregistry.org/api/v1/article/getArticles?" +
          "locationUri=http://en.wikipedia.org/wiki/" +
          this.fcountry +
          (this.category == "all" ? "" : "&categoryUri=" + this.category) +
          "&keyword=" +
          this.localmsg +
          "&keywordLoc=title" +
          "&lang=eng&includeArticleLocation=true&articleBodyLen=200&articlesCount=15&isDuplicateFilter=skipDuplicates&hasDuplicateFilter=skipHasDuplicates&apiKey=" +
          `${process.env.VUE_APP_NEWS_API}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.loadingStatus = false;
            // adds a unique id to each of the news articles
            this.newsResponse = this.newsResponse.concat(data.articles.results);
            this.addArticleData();
          });
      } else {
        this.counter--;
        if (this.counter == 0) {
          this.hasSelected = false;
        }
        // Deselecting specific countries in future update
        this.countryList = this.countryList.filter(e => e != this.country.name);
        this.newsResponse = this.newsResponse.filter(obj => {
          if (obj.location.type == "country") {
            return obj.location.label.eng != this.country.name;
          }
        });
      }
      //this.searchedLocation = this.country;
    },
    emitArticleId(articleId) {
      this.$emit("articleId-emitted", articleId);
    },
    checkFavorites() {
      if (this.$session.exists()) {
        axios({
          method: "post",
          url: "http://localhost:3000/user/checkFavorites",
          data: {
            userId: this.$session.get("userId")
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
    compareToFavorites(articleId) {
      if (this.$session.exists()) {
        for (let entry of this.favoriteCheck) {
          if (
            entry &&
            entry.ArticleId === articleId &&
            entry.RegisteredUserId === this.$session.get("userId")
          ) {
            return true;
          }
        }
        return false;
      }
    },
    addToFavorites(articleId) {
      if (this.$session.exists()) {
        axios({
          method: "post",
          url: "http://localhost:3000/user/favorites",
          data: {
            userId: this.$session.get("userId"),
            articleId: articleId
          }
        })
          .then(res => {
            if (res.data) {
              this.infomsg = "Favorite successfully added!";
            } else {
              this.infomsg = "Favorite removed!";
            }
          })
          .catch(err => {
            this.infomsg = err;
          });
      }
    },
    addToHistory(articleId) {
      if (this.$session.exists()) {
        axios({
          method: "POST",
          url: "http://localhost:3000/user/history",
          data: {
            userId: this.$session.get("userId"),
            articleId: articleId
          }
        })
          .then(res => {
            if (res.data) {
              this.infomsg = "History successfully added!";
            } else {
              this.infomsg = "History could not be added!";
            }
          })
          .catch(err => {
            this.infomsg = err;
          });
      }

      axios({
        method: "POST",
        url: "http://localhost:3000/article/viewArticle",
        data: {
          articleId: articleId
        }
      }).catch(err => {
        this.infomsg = err;
      });
    },
    addArticleData() {
      axios({
        method: "POST",
        url: "http://localhost:3000/article/articles",
        data: {
          articles: this.newsResponse
        }
      })
        .then(res => {
          // adds a unique id to each of the news articles
          for (let i = 0; i < this.newsResponse.length; i++) {
            this.newsResponse[i].id = res.data[i].id;
          }
          this.checkFavorites();
          // if (res.data) {
          //   this.infomsg = 'Articles successfully added!';

          // } else {
          //   this.infomsg = 'Articles could not be added!';
          //   return null
          // }
        })
        .catch(err => {
          this.infomsg = err;
        });
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
  font-family: "Roboto", sans-serif;
  color: #000;
  text-decoration: none !important;
  text-align: left;
}
#desc {
  /* overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical; */
  font-weight: 100;
  font-size: 0.65em;
}
p {
  margin: 0 auto;
}
</style>
