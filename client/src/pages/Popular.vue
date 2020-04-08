<template>
  <div>
    <h2>Popular articles</h2>
    <p>{{ localmsg }}</p>
    <b-row no-gutters>
      <b-col md="6">
        <h3>Most Favorited</h3>
        <div v-if="favorites.length > 0">
          <div id="articlelist">
            <li v-for="favorite in favorites" :key="favorite.id">
              <b-card
                no-body
                class="overflow-hidden"
                style="max-width: 1000px;"
              >
                <a :href="favorite.articleURL"
                  ><b-card-body id="title" v-bind:title="favorite.articleTitle">
                  </b-card-body>
                </a>
              </b-card>
            </li>
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <h3>Most Viewed</h3>
        <div v-if="viewed.length > 0">
          <div id="articlelist">
            <li v-for="article in viewed" :key="article.articleURL">
              <b-card
                no-body
                class="overflow-hidden"
                style="max-width: 1000px;"
              >
                <a :href="article.articleURL">
                  <b-card-body id="title" v-bind:title="article.articleTitle">
                  </b-card-body>
                </a>
              </b-card>
            </li>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Popular',
  data() {
    return {
      viewed: [],
      favorites: [],
      localmsg: ''
    };
  },
  mounted() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/articles/popular',
      responseType: 'json'
    })
      .then(res => {
        if (res.data) {
          for (let hist of res.data.viewed) {
            this.viewed.push(hist);
          }

          for (let fav of res.data.favorites) {
            this.favorites.push(fav);
          }
        } else {
          this.localmsg = 'Error!';
        }
      })
      .catch(err => {
        this.localmsg = err;
      })
  }
};
</script>

<style>
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
